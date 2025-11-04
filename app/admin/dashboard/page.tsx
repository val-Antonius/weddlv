import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/(auth)/actions'
import { RSVPTable } from '@/components/admin/rsvp-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Database } from '@/types/database'

export default async function AdminDashboard() {
  // Get current user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // This should be handled by middleware, but redirect as fallback
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access the admin dashboard.</p>
        </div>
      </div>
    )
  }

  // Fetch user's invitations first
  const { data: userInvitations } = await supabase
    .from('invitations')
    .select('id')
    .eq('user_id', user.id)

  // Then fetch RSVPs for those invitations
  const { data: rsvps, error: rsvpsError } = await supabase
    .from('rsvps')
    .select(`
      *
    `)
    .in('invitation_id', userInvitations?.map((inv: any) => inv.id) || [])
    .order('created_at', { ascending: false })

  // Fetch user's invitations for context
  const { data: invitations } = await supabase
    .from('invitations')
    .select('id, slug, is_published, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your wedding invitations</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <form action={signOut as any}>
                <Button type="submit" variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* RSVP Management */}
            <RSVPTable rsvps={rsvps || []} loading={!rsvps && !rsvpsError} />

            {/* Error Display */}
            {rsvpsError && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Error Loading RSVPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    There was an error loading your RSVP data. Please try refreshing the page.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Error: {rsvpsError.message}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Your invitation performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Invitations</span>
                  <span className="text-lg font-bold">{invitations?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Published</span>
                  <span className="text-lg font-bold">
                    {invitations?.filter((inv: any) => inv.is_published).length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total RSVPs</span>
                  <span className="text-lg font-bold">{rsvps?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Attending</span>
                  <span className="text-lg font-bold text-green-600">
                    {rsvps?.filter((r: any) => r.attendance).length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Your Invitations */}
            <Card>
              <CardHeader>
                <CardTitle>Your Invitations</CardTitle>
                <CardDescription>Manage your wedding invitations</CardDescription>
              </CardHeader>
              <CardContent>
                {invitations && invitations.length > 0 ? (
                  <div className="space-y-3">
                    {invitations.map((invitation: any) => (
                      <div key={invitation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{invitation.slug}</div>
                          <div className="text-sm text-gray-500">
                            {invitation.is_published ? 'Published' : 'Draft'}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/${invitation.slug}`, '_blank')}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/admin/invitations/${invitation.id}/edit`, '_blank')}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">No invitations yet</p>
                    <Button
                      onClick={() => window.open('/admin/invitations/create', '_self')}
                    >
                      Create Your First Invitation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => window.open('/admin/invitations/create', '_self')}
                >
                  Create New Invitation
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('/admin/rsvps', '_self')}
                >
                  View All RSVPs
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Copy current domain to clipboard for sharing
                    navigator.clipboard.writeText(window.location.origin)
                    alert('Domain copied to clipboard!')
                  }}
                >
                  Copy Domain
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
