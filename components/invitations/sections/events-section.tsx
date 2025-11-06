'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import type { EventDetails } from '@/types/invitation'

interface EventsSectionProps {
  events: EventDetails[]
  template: 'simple-modern' | 'classic-elegant' | 'romantic-feminine'
  className?: string
}

export function EventsSection({ events, template, className }: EventsSectionProps) {
  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100',
          title: 'text-amber-900',
          card: 'bg-amber-50 border-amber-200',
          eventCard: 'bg-white border-amber-200',
          icon: 'text-amber-600',
          button: 'bg-amber-600 hover:bg-amber-700 text-white'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100',
          title: 'text-pink-900',
          card: 'bg-pink-50 border-pink-200',
          eventCard: 'bg-white border-pink-200',
          icon: 'text-pink-600',
          button: 'bg-pink-600 hover:bg-pink-700 text-white'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100',
          title: 'text-gray-900',
          card: 'bg-gray-50 border-gray-200',
          eventCard: 'bg-white border-gray-200',
          icon: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700 text-white'
        }
    }
  }

  const styles = getTemplateStyles()

  const openInMaps = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank', 'noopener,noreferrer')
  }

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!events || events.length === 0) {
    return null
  }

  return (
    <section className={`py-16 ${styles.container} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${styles.title}`}>
            Wedding Events
          </h2>
          <p className="text-lg opacity-80">
            Join us for these special moments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card key={event.id || index} className={`${styles.eventCard} shadow-lg overflow-hidden`}>
              <CardHeader className={`pb-4 ${styles.card}`}>
                <CardTitle className="text-xl text-center font-semibold">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <Calendar className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="font-medium text-gray-900">Date</p>
                    <p className="text-gray-600">{formatEventDate(event.date)}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <Clock className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="font-medium text-gray-900">Time</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <MapPin className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Venue</p>
                    <p className="text-gray-600">{event.venue}</p>
                    {event.address && (
                      <p className="text-sm text-gray-500 mt-1">{event.address}</p>
                    )}
                  </div>
                </div>

                {/* Maps Button */}
                {event.address && (
                  <Button
                    onClick={() => openInMaps(event.address)}
                    className={`w-full ${styles.button} flex items-center justify-center gap-2`}
                    aria-label={`Get directions to ${event.venue}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Maps
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className={`${styles.card} max-w-2xl mx-auto`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className={`h-5 w-5 ${styles.icon}`} />
                <h3 className="font-semibold text-gray-900">Getting There</h3>
              </div>
              <p className="text-sm text-gray-600">
                Click the "Open in Google Maps" button for detailed directions and real-time traffic updates. 
                Consider carpooling or using ride-sharing services for convenience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
