'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { InvitationCard } from './invitation-card'
import type { Invitation } from '@/types/invitation'

interface InvitationWithRSVPs extends Invitation {
  rsvps?: Array<{
    id: string
    attendance: boolean
    guest_count: number
  }>
}

interface InvitationGridProps {
  userId: string
}

export function InvitationGrid({ userId }: InvitationGridProps) {
  const [invitations, setInvitations] = useState<InvitationWithRSVPs[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvitations()
  }, [userId])

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
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invitations:', error)
      return
    }

    setInvitations(data || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="flex items-center space-x-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[1, 2, 3].map((j) => (
                      <div key={j}>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mx-auto mb-1" />
                        <div className="h-3 w-12 bg-gray-200 rounded animate-pulse mx-auto" />
                      </div>
                    ))}
                  </div>

                  {/* Template Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1" />
                      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-10 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Your Invitations</h2>
          <p className="text-gray-600">
            {invitations.length === 0 
              ? 'Create your first wedding invitation to get started'
              : `${invitations.length} invitation${invitations.length !== 1 ? 's' : ''} created`
            }
          </p>
        </div>
        <Link href="/admin/invitations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invitation
          </Button>
        </Link>
      </div>

      {/* Invitations Grid */}
      {invitations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-8 w-8 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No invitations yet</h3>
                <p className="text-gray-600 max-w-md">
                  Create your first beautiful wedding invitation and start collecting RSVPs from your guests.
                </p>
              </div>
              <Link href="/admin/invitations/create">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Invitation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </div>
      )}
    </div>
  )
}