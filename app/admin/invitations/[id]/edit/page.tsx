import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { InvitationEditor } from '@/components/forms/invitation-editor'
import { InvitationEditorSkeleton } from '@/components/forms/invitation-editor-skeleton'
import { getInvitation } from '@/lib/actions/invitation-actions'

interface EditInvitationPageProps {
  params: {
    id: string
  }
}

export default async function EditInvitationPage({ params }: EditInvitationPageProps) {
  const { id } = await params

  // Fetch invitation data
  const result = await getInvitation(id)

  if (!result.success) {
    notFound()
  }

  const invitation = result.data

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Invitation</h1>
        <p className="text-muted-foreground">
          Update your wedding invitation details
        </p>
      </div>

      <Suspense fallback={<InvitationEditorSkeleton />}>
        <InvitationEditor 
          mode="edit" 
          initialData={invitation}
        />
      </Suspense>
    </div>
  )
}
