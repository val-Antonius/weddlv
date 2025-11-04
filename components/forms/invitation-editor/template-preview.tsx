'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Eye, Sparkles } from 'lucide-react'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface TemplatePreviewProps {
  config: InvitationConfigFormValues
  slug: string
  isModal?: boolean
  onClose?: () => void
}

export function TemplatePreview({ 
  config, 
  slug, 
  isModal = false, 
  onClose 
}: TemplatePreviewProps) {
  const {
    template,
    couple,
    events,
    gallery,
    settings
  } = config

  const previewContent = (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Preview Mode</span>
          <Badge variant="outline" className="text-xs">Template: {template}</Badge>
        </div>
        {isModal && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Preview Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Couple Information */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {couple.bride.nickname || couple.bride.fullName} & {couple.groom.nickname || couple.groom.fullName}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Together with their parents
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              {couple.bride.photo && (
                <img
                  src={couple.bride.photo}
                  alt="Bride"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
              )}
              <h3 className="text-xl font-semibold text-pink-600 mb-2">The Bride</h3>
              <p className="text-lg mb-1">{couple.bride.fullName}</p>
              <p className="text-sm text-gray-600">Daughter of {couple.bride.parents}</p>
            </div>
            <div className="text-center">
              {couple.groom.photo && (
                <img
                  src={couple.groom.photo}
                  alt="Groom"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
              )}
              <h3 className="text-xl font-semibold text-blue-600 mb-2">The Groom</h3>
              <p className="text-lg mb-1">{couple.groom.fullName}</p>
              <p className="text-sm text-gray-600">Son of {couple.groom.parents}</p>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Wedding Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div key={event.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                    {event.type === 'akad' ? '🕌 Akad Nikah' :
                     event.type === 'reception' ? '🎉 Resepsi' : '📅 ' + event.title}
                  </span>
                </div>
                <div className="space-y-2 text-center">
                  <p className="font-semibold text-gray-800">{event.title}</p>
                  <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">{event.time}</p>
                  <p className="font-medium text-gray-800">{event.venue}</p>
                  <p className="text-sm text-gray-600">{event.address}</p>
                  {event.mapsLink && (
                    <a
                      href={event.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      View on Google Maps
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Preview */}
        {gallery.photos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.photos.slice(0, 8).map((photo, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={photo}
                    alt={`Gallery photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
              {gallery.photos.length > 8 && (
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    +{gallery.photos.length - 8} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Info */}
        <div className="border-t pt-6 text-center text-sm text-gray-600">
          <div className="flex justify-center gap-6 mb-4">
            {settings.enableGuestbook && (
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                Guestbook Enabled
              </span>
            )}
            {settings.showProtocolPopup && (
              <span className="flex items-center gap-1">
                <Badge variant="outline">Health Protocol</Badge>
              </span>
            )}
          </div>
          <p>Language: {settings.language === 'en' ? 'English' : 'Bahasa Indonesia'}</p>
          <p className="text-xs mt-2">weddlv.com/{slug}</p>
        </div>
      </div>
    </div>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
          {previewContent}
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <div className="w-full h-full overflow-auto">
            {/* Miniature version of preview */}
            <div className="transform scale-50 origin-top" style={{ width: '200%' }}>
              {previewContent}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
