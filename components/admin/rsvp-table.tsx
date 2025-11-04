'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Database } from '@/types/database'

type RSVP = Database['public']['Tables']['rsvps']['Row']

interface RSVPTableProps {
  rsvps: RSVP[]
  loading?: boolean
}

export function RSVPTable({ rsvps, loading = false }: RSVPTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'attending' | 'not-attending'>('all')

  // Filter RSVPs based on search term and attendance filter
  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesSearch = 
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rsvp.phone && rsvp.phone.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAttendance = 
      attendanceFilter === 'all' ||
      (attendanceFilter === 'attending' && rsvp.attendance) ||
      (attendanceFilter === 'not-attending' && !rsvp.attendance)

    return matchesSearch && matchesAttendance
  })

  // Calculate statistics
  const totalRsvps = rsvps.length
  const attendingCount = rsvps.filter(r => r.attendance).length
  const notAttendingCount = rsvps.filter(r => !r.attendance).length
  const totalGuests = rsvps.filter(r => r.attendance).reduce((sum, r) => sum + r.guest_count, 0)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RSVP Management</CardTitle>
          <CardDescription>Loading RSVP data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-600">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>RSVP Management</CardTitle>
        <CardDescription>
          View and manage guest RSVPs for your wedding invitation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalRsvps}</div>
            <div className="text-sm text-blue-600">Total RSVPs</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{attendingCount}</div>
            <div className="text-sm text-green-600">Attending</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{notAttendingCount}</div>
            <div className="text-sm text-red-600">Not Attending</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalGuests}</div>
            <div className="text-sm text-purple-600">Total Guests</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={attendanceFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAttendanceFilter('all')}
            >
              All ({totalRsvps})
            </Button>
            <Button
              variant={attendanceFilter === 'attending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAttendanceFilter('attending')}
            >
              Attending ({attendingCount})
            </Button>
            <Button
              variant={attendanceFilter === 'not-attending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAttendanceFilter('not-attending')}
            >
              Not Attending ({notAttendingCount})
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRsvps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    {searchTerm || attendanceFilter !== 'all' 
                      ? 'No RSVPs match your filters' 
                      : 'No RSVPs yet. Share your invitation to start receiving responses!'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRsvps.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    <TableCell className="font-medium">{rsvp.name}</TableCell>
                    <TableCell>{rsvp.email}</TableCell>
                    <TableCell>{rsvp.phone || '-'}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rsvp.attendance
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {rsvp.attendance ? 'Attending' : 'Not Attending'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {rsvp.attendance ? rsvp.guest_count : '-'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {rsvp.message || '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Export Button */}
        {filteredRsvps.length > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => exportToCSV(filteredRsvps)}
              className="w-full sm:w-auto"
            >
              Export to CSV
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function exportToCSV(rsvps: RSVP[]) {
  const headers = [
    'Name',
    'Email',
    'Phone',
    'Attendance',
    'Guest Count',
    'Message',
    'Date'
  ]

  const csvContent = [
    headers.join(','),
    ...rsvps.map(rsvp => [
      `"${rsvp.name}"`,
      `"${rsvp.email}"`,
      `"${rsvp.phone || ''}"`,
      rsvp.attendance ? 'Yes' : 'No',
      rsvp.attendance ? rsvp.guest_count : '',
      `"${rsvp.message || ''}"`,
      new Date(rsvp.created_at).toLocaleDateString()
    ].join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `rsvps-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
