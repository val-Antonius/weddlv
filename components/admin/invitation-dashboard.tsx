'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Eye, Users, Calendar, MapPin } from 'lucide-react'
import type { Invitation } from '@/types/invitation'

interface InvitationDashboardProps {
  invitation: Invitation & {
    rsvps?: Array<{
      id: string
      attendance: boolean
      guest_count: number
      name: string
      created_at: string
    }>
  }
}

export function InvitationDashboard({ invitation }: InvitationDashboardProps) {
  const rsvps = invitation.rsvps || []
  const attending = rsvps.filter(r => r.attendance)
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0)
  const config = invitation.config_json

  return (
    <>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/invitations">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Invitations
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">{invitation.slug}</h1>
                <p className="text-sm text-gray-600">Invitation Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={invitation.is_published ? 'default' : 'outline'}>
                {invitation.is_published ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total RSVPs</p>
                      <p className="text-2xl font-bold">{rsvps.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Attending</p>
                      <p className="text-2xl font-bold text-green-600">{attending.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Guests</p>
                      <p className="text-2xl font-bold text-purple-600">{totalGuests}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent RSVPs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent RSVPs</CardTitle>
                    <CardDescription>Latest responses from your guests</CardDescription>
                  </div>
                  <Link href={`/admin/invitations/${invitation.id}/rsvps`}>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {rsvps.length > 0 ? (
                  <div className="space-y-3">
                    {rsvps.slice(0, 5).map((rsvp) => (
                      <div key={rsvp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{rsvp.name}</div>
                          <div className="text-sm text-gray-500">
                            {rsvp.guest_count} guest{rsvp.guest_count !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <Badge variant={rsvp.attendance ? 'default' : 'secondary'}>
                          {rsvp.attendance ? 'Attending' : 'Not Attending'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No RSVPs yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Share your invitation to start receiving responses
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/${invitation.slug}`} target="_blank">
                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Page
                  </Button>
                </Link>
                <Link href={`/admin/invitations/${invitation.id}/edit`}>
                  <Button className="w-full" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Invitation
                  </Button>
                </Link>
                <Link href={`/admin/invitations/${invitation.id}/rsvps`}>
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage RSVPs
                  </Button>
                </Link>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/${invitation.slug}`)
                    alert('Invitation link copied!')
                  }}
                >
                  Copy Invitation Link
                </Button>
              </CardContent>
            </Card>

            {/* Invitation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invitation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Wedding Date</p>
                    <p className="text-sm text-gray-600">
                      {config.events?.[0]?.date ? new Date(config.events[0].date).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Venue</p>
                    <p className="text-sm text-gray-600">
                      {config.events?.[0]?.venue || 'Not set'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Template</p>
                  <Badge variant="secondary">{config.template}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-gray-600">
                    {new Date(invitation.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}