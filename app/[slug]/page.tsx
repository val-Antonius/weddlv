import { createClient } from '@/lib/supabase/server'
import { RSVPForm } from '@/components/forms/rsvp-form'
import { CoverSection } from '@/components/invitations/sections/cover-section'
import { CountdownSection } from '@/components/invitations/sections/countdown-section'
import { EventsSection } from '@/components/invitations/sections/events-section'
import { GallerySection } from '@/components/invitations/sections/gallery-section'
import { GuestbookSection } from '@/components/invitations/sections/guestbook-section'
import { GiftSection } from '@/components/invitations/sections/gift-section'
import { MusicPlayer } from '@/components/invitations/music-player'
import { HealthProtocolPopup } from '@/components/invitations/health-protocol-popup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Database } from '@/types/database'
import type { InvitationConfig } from '@/types/invitation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    to?: string
  }>
}

export default async function InvitationPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { to: guestName } = await searchParams
  const supabase = await createClient()

  // Fetch invitation by slug
  const { data: invitation, error } = await (supabase as any)
    .from('invitations')
    .select(`
      *,
      user:users(email)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Invitation Not Found</CardTitle>
            <CardDescription className="text-center">
              The wedding invitation you're looking for doesn't exist or hasn't been published yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Please check the URL or contact the couple for more information.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Parse invitation config
  let invitationConfig: InvitationConfig | null = null
  let coupleNames = ''

  try {
    invitationConfig = typeof invitation.config_json === 'string' 
      ? JSON.parse(invitation.config_json) 
      : invitation.config_json as InvitationConfig

    if (invitationConfig?.couple) {
      const brideName = invitationConfig.couple.bride?.nickname || invitationConfig.couple.bride?.fullName || ''
      const groomName = invitationConfig.couple.groom?.nickname || invitationConfig.couple.groom?.fullName || ''
      coupleNames = brideName && groomName ? `${brideName} & ${groomName}` : ''
    }
  } catch (configError) {
    console.error('Error parsing invitation config:', configError)
  }

  if (!invitationConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Configuration Error</CardTitle>
            <CardDescription className="text-center">
              There was an error loading the invitation configuration.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Music Player - Always present if configured */}
      {invitationConfig.music?.url && (
        <MusicPlayer music={invitationConfig.music} />
      )}

      {/* Health Protocol Popup - Show if enabled */}
      {invitationConfig.settings.showProtocolPopup && (
        <HealthProtocolPopup />
      )}

      {/* Cover Section */}
      <CoverSection 
        config={invitationConfig as any}
      />

      {/* Countdown Section */}
      <CountdownSection 
        targetDate={invitationConfig.events[0]?.date}
        template={invitationConfig.template}
      />

      {/* Events Section */}
      <EventsSection 
        events={invitationConfig.events}
        template={invitationConfig.template}
      />

      {/* Gallery Section */}
      {invitationConfig.gallery?.photos && invitationConfig.gallery.photos.length > 0 && (
        <GallerySection 
          config={invitationConfig as any}
        />
      )}

      {/* RSVP Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">RSVP</h2>
          <p className="text-lg text-gray-600">
            Please let us know if you can attend
          </p>
        </div>
        
        <RSVPForm 
          invitationId={invitation.id}
          invitationTitle={coupleNames || 'Wedding Invitation'}
        />
      </div>

      {/* Guestbook Section */}
      {invitationConfig.settings.enableGuestbook && (
        <GuestbookSection 
          invitationId={invitation.id}
          template={invitationConfig.template}
        />
      )}

      {/* Gift Section */}
      {invitationConfig.gift?.enabled && (
        <GiftSection 
          gift={invitationConfig.gift}
          template={invitationConfig.template}
        />
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500">
          <p className="text-sm">
            Created with ❤️ using <a href="#" className="text-indigo-600 hover:text-indigo-500">weddlv</a>
          </p>
        </div>
      </div>
    </div>
  )
}
