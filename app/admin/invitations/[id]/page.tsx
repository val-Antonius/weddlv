import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { InvitationDashboard } from '@/components/admin/invitation-dashboard'
import { InvitationDashboardSkeleton } from '@/components/admin/invitation-dashboard-skeleton'

interface InvitationPageProps {
  params: {
    id: string
  }
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  // Fetch invitation with RSVPs
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select(`
      *,
      rsvps (*)
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !invitation) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/50 to-orange-50/50">
      <Suspense fallback={<InvitationDashboardSkeleton />}>
        <InvitationDashboard invitation={invitation} />
      </Suspense>
    </div>
  )
}