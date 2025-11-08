'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Edit, BarChart3, Users, Calendar, MapPin } from 'lucide-react'
import type { Invitation } from '@/types/invitation'

interface InvitationCardProps {
  invitation: Invitation & {
    rsvps?: Array<{
      id: string
      attendance: boolean
      guest_count: number
    }>
  }
}

export function InvitationCard({ invitation }: InvitationCardProps) {
  const rsvps = invitation.rsvps || []
  const attending = rsvps.filter(r => r.attendance)
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0)
  const config = invitation.config_json

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{invitation.slug}</CardTitle>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              {config.events?.[0]?.date && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(config.events[0].date).toLocaleDateString()}</span>
                </div>
              )}
              {config.events?.[0]?.venue && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate max-w-32">{config.events[0].venue}</span>
                </div>
              )}
            </div>
          </div>
          <Badge variant={invitation.is_published ? 'default' : 'outline'}>
            {invitation.is_published ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{rsvps.length}</p>
            <p className="text-xs text-gray-600">RSVPs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{attending.length}</p>
            <p className="text-xs text-gray-600">Attending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{totalGuests}</p>
            <p className="text-xs text-gray-600">Guests</p>
          </div>
        </div>

        {/* Template Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Template</p>
            <Badge variant="secondary" className="text-xs">
              {config.template}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Created</p>
            <p className="text-xs text-gray-600">
              {new Date(invitation.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link href={`/admin/invitations/${invitation.id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href={`/${invitation.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/invitations/${invitation.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}