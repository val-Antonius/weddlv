import { InvitationEditorSkeleton } from '@/components/forms/invitation-editor-skeleton'

export default function EditInvitationLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Invitation</h1>
        <p className="text-muted-foreground">
          Loading your invitation data...
        </p>
      </div>

      <InvitationEditorSkeleton />
    </div>
  )
}
