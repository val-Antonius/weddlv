import { createClient } from '@/lib/supabase/server'
import { RSVPForm } from '@/components/forms/rsvp-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Database } from '@/types/database'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = params
  const supabase = createClient()

  // Fetch invitation by slug
  const { data: invitation, error } = await supabase
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
  let invitationConfig = null
  let coupleNames = ''

  try {
    invitationConfig = typeof (invitation as any).config_json === 'string' 
      ? JSON.parse((invitation as any).config_json) 
      : (invitation as any).config_json

    if (invitationConfig.couple) {
      const brideName = invitationConfig.couple.bride?.nickname || invitationConfig.couple.bride?.fullName || ''
      const groomName = invitationConfig.couple.groom?.nickname || invitationConfig.couple.groom?.fullName || ''
      coupleNames = brideName && groomName ? `${brideName} & ${groomName}` : ''
    }
  } catch (configError) {
    console.error('Error parsing invitation config:', configError)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {coupleNames || 'You\'re Invited!'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Request the pleasure of your company
            </p>
            <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              <span className="text-lg">💑</span>
              <span className="ml-2">You're Invited!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      {invitationConfig?.events && invitationConfig.events.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {invitationConfig.events.map((event: any, index: number) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-1">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                      🕐 {event.time}
                    </p>
                    <p className="text-gray-800 font-medium">
                      📍 {event.venue}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {event.address}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* RSVP Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">RSVP</h2>
          <p className="text-lg text-gray-600">
            Please let us know if you can attend by {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <RSVPForm 
          invitationId={(invitation as any).id}
          invitationTitle={coupleNames || 'Wedding Invitation'}
          onSuccess={() => {
            // You could show a success message or redirect here
            console.log('RSVP submitted successfully!')
          }}
        />
      </div>

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
