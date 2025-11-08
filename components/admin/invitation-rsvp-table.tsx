'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import type { Invitation } from '@/types/invitation'

interface RSVP {
  id: string
  name: string
  email: string
  attendance: boolean
  guest_count: number
  message?: string
  created_at: string
}

interface InvitationRSVPTableProps {
  rsvps: RSVP[]
  invitation: Pick<Invitation, 'id' | 'slug' | 'config_json'>
}

export function InvitationRSVPTable({ rsvps, invitation }: InvitationRSVPTableProps) {
  const attending = rsvps.filter(r => r.attendance)
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0)

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Attendance', 'Guest Count', 'Message', 'Date']
    const csvData = rsvps.map(rsvp => [
      rsvp.name,
      rsvp.email,
      rsvp.attendance ? 'Yes' : 'No',
      rsvp.guest_count,
      rsvp.message || '',
      new Date(rsvp.created_at).toLocaleDateString()
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${invitation.slug}-rsvps.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{rsvps.length}</p>
              <p className="text-sm text-gray-600">Total RSVPs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{attending.length}</p>
              <p className="text-sm text-gray-600">Attending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{rsvps.length - attending.length}</p>
              <p className="text-sm text-gray-600">Not Attending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{totalGuests}</p>
              <p className="text-sm text-gray-600">Total Guests</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RSVP Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All RSVPs</CardTitle>
            {rsvps.length > 0 && (
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {rsvps.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Guests</TableHead>

                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    <TableCell className="font-medium">{rsvp.name}</TableCell>
                    <TableCell>{rsvp.email}</TableCell>
                    <TableCell>
                      <Badge variant={rsvp.attendance ? 'default' : 'secondary'}>
                        {rsvp.attendance ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>{rsvp.guest_count}</TableCell>

                    <TableCell className="max-w-48 truncate">
                      {rsvp.message || '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2">No RSVPs yet</p>
              <p className="text-sm text-gray-500">
                Share your invitation link to start receiving responses
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}