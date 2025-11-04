import { Suspense } from 'react'
import { InvitationEditor } from '@/components/forms/invitation-editor'
import { InvitationEditorSkeleton } from '@/components/forms/invitation-editor-skeleton'

export default function CreateInvitationPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Invitation</h1>
        <p className="text-muted-foreground">
          Design your beautiful wedding invitation with our easy-to-use editor.
        </p>
      </div>

      <Suspense fallback={<InvitationEditorSkeleton />}>
        <InvitationEditor mode="create" />
      </Suspense>
    </div>
  )
}
