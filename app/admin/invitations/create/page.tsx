import { Suspense } from 'react'
import { InvitationEditor } from '@/components/forms/invitation-editor'
import { InvitationEditorSkeleton } from '@/components/forms/invitation-editor-skeleton'

export default function CreateInvitationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense fallback={<InvitationEditorSkeleton />}>
          <InvitationEditor mode="create" />
        </Suspense>
      </div>
    </div>
  )
}
