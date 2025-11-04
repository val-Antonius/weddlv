import { Suspense } from 'react'
import { InvitationList } from '@/components/admin/invitation-list'
import { InvitationListSkeleton } from '@/components/admin/invitation-list-skeleton'

export default function InvitationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
          <p className="text-muted-foreground">
            Manage your wedding invitations and track RSVPs
          </p>
        </div>
      </div>

      <Suspense fallback={<InvitationListSkeleton />}>
        <InvitationList />
      </Suspense>
    </div>
  )
}
