import { Suspense } from 'react'
import { InvitationEditor } from '@/components/forms/invitation-editor'
import { InvitationEditorSkeleton } from '@/components/forms/invitation-editor-skeleton'
import { InvitationHeader } from '@/components/forms/invitation-header'

export default function CreateInvitationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      {/* Header Section */}
      <InvitationHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <Suspense fallback={<InvitationEditorSkeleton />}>
              <InvitationEditor mode="create" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200/20 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200/20 rounded-full blur-xl" />
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-amber-200/20 rounded-full blur-xl" />
      </div>
    </div>
  )
}
