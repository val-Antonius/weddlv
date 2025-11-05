import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/(auth)/actions'
import { RSVPTable } from '@/components/admin/rsvp-table'
import { DashboardClient } from '@/components/admin/dashboard-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Database } from '@/types/database'

export default async function AdminDashboard() {
  // Get current user
  const supabase = await createClient()
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-pink-50/50 to-orange-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage your wedding invitations</p>
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

            <DashboardClient invitations={invitations || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
