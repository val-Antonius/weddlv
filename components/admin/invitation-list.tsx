'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Eye, Edit, Trash2, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Invitation } from '@/types/invitation'

interface InvitationWithRSVPs extends Invitation {
  rsvps?: Array<{
    id: string
    attendance: boolean
    guest_count: number
  }>
}

export function InvitationList() {
  const [invitations, setInvitations] = useState<InvitationWithRSVPs[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvitations()
  }, [])

  async function fetchInvitations() {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('invitations')
      .select(`
        *,
        rsvps (
          id,
          attendance,
          guest_count
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invitations:', error)
      return
    }

    setInvitations(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this invitation?')) {
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting invitation:', error)
      return
    }

    setInvitations(invitations.filter(inv => inv.id !== id))
  }

  const getRSVPStats = (invitation: InvitationWithRSVPs) => {
    const rsvps = invitation.rsvps || []
    const attending = rsvps.filter((r: any) => r.attendance)
    const totalGuests = attending.reduce((sum: number, r: any) => sum + r.guest_count, 0)
    
    return {
      total: rsvps.length,
      attending: attending.length,
      totalGuests
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Invitations</h2>
        <Link href="/admin/invitations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invitation
          </Button>
        </Link>
      </div>

      {invitations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold">No invitations yet</h3>
              <p className="text-muted-foreground">
                Create your first wedding invitation to get started.
              </p>
              <Link href="/admin/invitations/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Invitation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>RSVPs</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => {
                  const stats = getRSVPStats(invitation)
                  const config = invitation.config_json
                  
                  return (
                    <TableRow key={invitation.id}>
                      <TableCell className="font-medium">
                        {invitation.slug}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {config.template}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={invitation.is_published ? 'default' : 'outline'}>
                          {invitation.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {stats.attending}/{stats.total} ({stats.totalGuests} guests)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(invitation.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(invitation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
