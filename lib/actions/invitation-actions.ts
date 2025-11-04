'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { invitationConfigSchema, createInvitationSchema } from '@/lib/validations'
import type { CreateInvitationFormValues, InvitationConfigFormValues } from '@/lib/validations'

export async function createInvitation(data: CreateInvitationFormValues) {
  try {
    // Validate the data
    const validatedData = createInvitationSchema.safeParse(data)
    
    if (!validatedData.success) {
      return { 
        success: false, 
        error: 'Validation failed',
        details: validatedData.error.flatten()
      }
    }

    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Create invitation
    const { data: invitation, error } = await (supabase as any)
      .from('invitations')
      .insert({
        user_id: user.id,
        slug: validatedData.data.slug,
        config_json: validatedData.data.config_json as any,
        is_published: validatedData.data.is_published,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to create invitation' }
    }

    // Revalidate cache
    revalidatePath('/admin/invitations')
    
    return { success: true, data: invitation }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function updateInvitation(
  id: string, 
  data: Partial<CreateInvitationFormValues>
) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Validate if config_json is being updated
    if (data.config_json) {
      const validatedConfig = invitationConfigSchema.safeParse(data.config_json)
      
      if (!validatedConfig.success) {
        return { 
          success: false, 
          error: 'Configuration validation failed',
          details: validatedConfig.error.flatten()
        }
      }
    }

    // Update invitation
    const updateData: any = {
      ...data,
      updated_at: new Date().toISOString(),
    }
    
    if (updateData.config_json) {
      updateData.config_json = updateData.config_json as any
    }

    const { data: invitation, error } = await (supabase as any)
      .from('invitations')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user owns the invitation
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to update invitation' }
    }

    // Revalidate cache
    revalidatePath('/admin/invitations')
    revalidatePath(`/admin/invitations/${id}/edit`)
    
    return { success: true, data: invitation }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function deleteInvitation(id: string) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Delete invitation (cascades to RSVPs and guestbook entries)
    const { error } = await (supabase as any)
      .from('invitations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user owns the invitation

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to delete invitation' }
    }

    // Revalidate cache
    revalidatePath('/admin/invitations')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function publishInvitation(id: string) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Update invitation to published
    const updateData = {
      is_published: true,
      updated_at: new Date().toISOString(),
    }

    const { data: invitation, error } = await (supabase as any)
      .from('invitations')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user owns the invitation
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to publish invitation' }
    }

    // Revalidate cache
    revalidatePath('/admin/invitations')
    revalidatePath(`/admin/invitations/${id}/edit`)
    if ((invitation as any)?.slug) {
      revalidatePath(`/${(invitation as any).slug}`)
    }
    
    return { success: true, data: invitation }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function unpublishInvitation(id: string) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Update invitation to unpublished
    const updateData = {
      is_published: false,
      updated_at: new Date().toISOString(),
    }

    const { data: invitation, error } = await (supabase as any)
      .from('invitations')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user owns the invitation
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to unpublish invitation' }
    }

    // Revalidate cache
    revalidatePath('/admin/invitations')
    revalidatePath(`/admin/invitations/${id}/edit`)
    
    return { success: true, data: invitation }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getInvitation(id: string) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    const { data: invitation, error } = await (supabase as any)
      .from('invitations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user owns the invitation
      .single()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Invitation not found' }
    }

    return { success: true, data: invitation }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getInvitationBySlug(slug: string) {
  try {
    const supabase = await createClient()
    
    const { data: invitation, error } = await (supabase as any)
      .from('invitations')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true) // Only return published invitations
      .single()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Invitation not found' }
    }

    return { success: true, data: invitation }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getUserInvitations() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await (supabase as any).auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' }
    }

    const { data: invitations, error } = await (supabase as any)
      .from('invitations')
      .select(`
        *,
        rsvps (
          id,
          attendance,
          guest_count
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Failed to fetch invitations' }
    }

    return { success: true, data: invitations || [] }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}