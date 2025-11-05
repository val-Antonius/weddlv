'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardClientProps {
  invitations: any[]
}

export function DashboardClient({ invitations }: DashboardClientProps) {
  return (
    <>
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
              navigator.clipboard.writeText(window.location.origin)
              alert('Domain copied to clipboard!')
            }}
          >
            Copy Domain
          </Button>
        </CardContent>
      </Card>
    </>
  )
}