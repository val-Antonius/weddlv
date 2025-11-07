import { Resend } from 'resend'

// Initialize Resend client only when needed
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

interface RSVPEmailData {
  guestName: string
  guestEmail: string
  guestPhone?: string
  attendance: boolean
  guestCount: number
  message?: string
  invitationTitle?: string
  coupleNames?: string
  hostEmail: string
}

export async function sendRSVPNotificationEmail(data: RSVPEmailData) {
  try {
    const client = getResendClient()
    if (!client) {
      throw new Error('Resend client not available')
    }
    
    const { error } = await client.emails.send({
      from: 'weddlv@resend.dev', // Update this with your verified domain
      to: [data.hostEmail],
      subject: `New RSVP: ${data.guestName} - ${data.attendance ? 'Attending' : 'Not Attending'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New RSVP Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Guest Information</h3>
            <p><strong>Name:</strong> ${data.guestName}</p>
            <p><strong>Email:</strong> ${data.guestEmail}</p>
            ${data.guestPhone ? `<p><strong>Phone:</strong> ${data.guestPhone}</p>` : ''}
          </div>

          <div style="background: ${data.attendance ? '#e8f5e8' : '#ffe8e8'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">RSVP Status</h3>
            <p><strong>Will Attend:</strong> ${data.attendance ? '✅ Yes' : '❌ No'}</p>
            ${data.attendance ? `<p><strong>Number of Guests:</strong> ${data.guestCount}</p>` : ''}
          </div>

          ${data.message ? `
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Message from Guest</h3>
              <p style="font-style: italic;">"${data.message}"</p>
            </div>
          ` : ''}

          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              This RSVP was submitted for: ${data.invitationTitle || 'Wedding Invitation'}${data.coupleNames ? ` (${data.coupleNames})` : ''}
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Email send error:', error)
      return { error: 'Failed to send email notification' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected email error:', error)
    return { error: 'An unexpected error occurred while sending email' }
  }
}

export async function sendGuestConfirmationEmail(data: RSVPEmailData) {
  try {
    const client = getResendClient()
    if (!client) {
      throw new Error('Resend client not available')
    }
    
    const { error } = await client.emails.send({
      from: 'weddlv@resend.dev', // Update this with your verified domain
      to: [data.guestEmail],
      subject: `RSVP Confirmation - ${data.invitationTitle || 'Wedding'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center; margin-bottom: 30px;">
            RSVP Confirmation
          </h2>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 8px; text-align: center;">
            <h3 style="color: #555; margin-top: 0;">Thank you for your RSVP!</h3>
            <p style="font-size: 18px; margin: 20px 0;">
              ${data.attendance 
                ? `✅ We're delighted to confirm your attendance for ${data.guestCount} guest${data.guestCount > 1 ? 's' : ''}!` 
                : '❌ We have received your RSVP and noted that you are unable to attend.'
              }
            </p>
            <p style="color: #666;">
              ${data.invitationTitle || 'The wedding celebration'}${data.coupleNames ? ` with ${data.coupleNames}` : ''}
            </p>
          </div>

          <div style="margin: 30px 0; padding: 20px; background: #fff8dc; border-radius: 8px;">
            <h4 style="color: #555; margin-top: 0;">Your RSVP Details:</h4>
            <p><strong>Name:</strong> ${data.guestName}</p>
            <p><strong>Email:</strong> ${data.guestEmail}</p>
            <p><strong>Status:</strong> ${data.attendance ? 'Attending' : 'Not Attending'}</p>
            ${data.attendance ? `<p><strong>Guests:</strong> ${data.guestCount}</p>` : ''}
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              If you need to make any changes to your RSVP, please contact the couple directly.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Guest confirmation email error:', error)
      // Don't fail the RSVP if confirmation email fails
      return { success: true, warning: 'RSVP saved but confirmation email failed' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected guest email error:', error)
    // Don't fail the RSVP if confirmation email fails
    return { success: true, warning: 'RSVP saved but confirmation email failed' }
  }
}
