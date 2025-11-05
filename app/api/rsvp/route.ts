import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { sendRSVPNotificationEmail, sendGuestConfirmationEmail } from '@/lib/email'
import { rsvpSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input data
    const validatedData = rsvpSchema.safeParse(body)
    
    if (!validatedData.success) {
      console.error('Validation error:', validatedData.error)
      return Response.json(
        { error: 'Invalid form data. Please check your input and try again.' },
        { status: 400 }
      )
    }

    const { invitation_id, name, email, phone, attendance, guest_count, message } = validatedData.data

    // Create Supabase client
    const supabase = await createClient()

    // First, get the invitation details to find the host
    const { data: invitation, error: invitationError } = await supabase
      .from('invitations')
      .select(`
        *,
        user:users(email)
      `)
      .eq('id', invitation_id)
      .single()

    if (invitationError || !invitation) {
      console.error('Invitation not found:', invitationError)
      return Response.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    // Insert RSVP data
    const { data: rsvp, error: rsvpError } = await supabase
      .from('rsvps')
      .insert({
        invitation_id,
        name,
        email,
        phone,
        attendance,
        guest_count,
        message,
      } as any)
      .select()
      .single()

    if (rsvpError) {
      console.error('RSVP insert error:', rsvpError)
      
      // Handle duplicate email error specifically
      if (rsvpError.code === '23505') {
        return Response.json(
          { error: 'This email has already been used for this invitation. Each email can only submit one RSVP.' },
          { status: 409 }
        )
      }
      
      return Response.json(
        { error: 'Failed to save RSVP. Please try again.' },
        { status: 500 }
      )
    }

    // Extract couple names from invitation config if available
    let coupleNames = ''
    try {
      const config = typeof (invitation as any).config_json === 'string' 
        ? JSON.parse((invitation as any).config_json) 
        : (invitation as any).config_json
      
      if (config.couple) {
        const brideName = config.couple.bride?.nickname || config.couple.bride?.fullName || ''
        const groomName = config.couple.groom?.nickname || config.couple.groom?.fullName || ''
        coupleNames = brideName && groomName ? `${brideName} & ${groomName}` : ''
      }
    } catch (configError) {
      console.error('Error parsing invitation config:', configError)
    }

    // Send email notifications asynchronously (don't block the response)
    const emailData = {
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      attendance,
      guestCount: guest_count,
      message,
      invitationTitle: (invitation as any).slug,
      coupleNames,
      hostEmail: (invitation as any).user?.email || '',
    }

    // Send notification to host
    if (emailData.hostEmail && process.env.RESEND_API_KEY) {
      try {
        await sendRSVPNotificationEmail(emailData)
      } catch (emailError) {
        console.error('Host email notification failed:', emailError)
        // Don't fail the RSVP if email fails
      }

      // Send confirmation to guest
      try {
        await sendGuestConfirmationEmail(emailData)
      } catch (emailError) {
        console.error('Guest confirmation email failed:', emailError)
        // Don't fail the RSVP if email fails
      }
    }

    // Revalidate any pages that might show this data
    revalidatePath(`/admin/rsvps`)
    revalidatePath(`/${(invitation as any).slug}`)

    return Response.json({
      success: true,
      data: rsvp,
      message: 'RSVP submitted successfully!',
    })

  } catch (error) {
    console.error('Unexpected RSVP error:', error)
    return Response.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
