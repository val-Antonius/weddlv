import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { InvitationRSVPTable } from '@/components/admin/invitation-rsvp-table'
import { InvitationRSVPTableSkeleton } from '@/components/admin/invitation-rsvp-table-skeleton'

interface InvitationRSVPsPageProps {
  params: {
    id: string
  }
}

export default async function InvitationRSVPsPage({ params }: InvitationRSVPsPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  // Fetch invitation
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('id, slug, config_json')
    .eq('id', id)
    .eq('user_id', user.id)
    .single() as { data: { id: string; slug: string; config_json: any } | null; error: any }

  if (error || !invitation) {
    notFound()
  }

  // Fetch RSVPs for this invitation
  const { data: rsvps } = await supabase
    .from('rsvps')
    .select('*')
    .eq('invitation_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/50 to-orange-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/admin/invitations/${id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">RSVP Management</h1>
                <p className="text-sm text-gray-600">{invitation?.slug}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<InvitationRSVPTableSkeleton />}>
          <InvitationRSVPTable rsvps={rsvps || []} invitation={invitation} />
        </Suspense>
      </div>
    </div>
  )
}