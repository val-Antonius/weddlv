import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface EventsSectionProps {
  config: InvitationConfigFormValues
  className?: string
}

export function EventsSection({ config, className }: EventsSectionProps) {
  const { template, events } = config

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200',
          title: 'text-amber-900 font-serif text-3xl md:text-4xl',
          card: 'bg-white/90 border-amber-200',
          eventTitle: 'text-amber-800 font-serif text-xl',
          eventTime: 'text-amber-600',
          eventVenue: 'text-amber-700',
          badge: 'bg-amber-200 text-amber-800'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-200',
          title: 'text-pink-900 font-cursive text-3xl md:text-4xl',
          card: 'bg-white/90 border-pink-200',
          eventTitle: 'text-pink-800 font-cursive text-xl',
          eventTime: 'text-rose-600',
          eventVenue: 'text-pink-700',
          badge: 'bg-pink-200 text-pink-800'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200',
          title: 'text-gray-900 font-sans text-3xl md:text-4xl font-bold',
          card: 'bg-white/90 border-gray-200',
          eventTitle: 'text-gray-800 font-sans text-xl font-semibold',
          eventTime: 'text-gray-600',
          eventVenue: 'text-gray-700',
          badge: 'bg-gray-200 text-gray-800'
        }
    }
  }

  const styles = getTemplateStyles()

  if (events.length === 0) {
    return null
  }

  return (
    <section className={`py-16 px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={styles.title}>
            Wedding Events
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.id} className={`${styles.card} shadow-lg`}>
              <CardContent className="p-8 space-y-6">
                {/* Event Type Badge */}
                <div className="text-center">
                  <Badge className={styles.badge}>
                    {event.type === 'akad' ? '🕌 Akad Nikah' :
                     event.type === 'reception' ? '🎉 Resepsi' : '📅 ' + event.title}
                  </Badge>
                </div>

                {/* Event Title */}
                <div className="text-center">
                  <h3 className={styles.eventTitle}>
                    {event.title}
                  </h3>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <Calendar className={`h-5 w-5 ${styles.eventTime}`} />
                    <div>
                      <p className={styles.eventTime + ' font-medium'}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  {event.time && (
                    <div className="flex items-center gap-3">
                      <Clock className={`h-5 w-5 ${styles.eventTime}`} />
                      <p className={styles.eventTime + ' font-medium'}>
                        {event.time}
                      </p>
                    </div>
                  )}

                  {/* Venue */}
                  {event.venue && (
                    <div className="flex items-center gap-3">
                      <MapPin className={`h-5 w-5 ${styles.eventVenue}`} />
                      <div>
                        <p className={styles.eventVenue + ' font-medium'}>
                          {event.venue}
                        </p>
                        {event.address && (
                          <p className="text-sm text-gray-600 mt-1">
                            {event.address}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Maps Link */}
                  {event.mapsLink && (
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full"
                      >
                        <a
                          href={event.mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View on Google Maps
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Notes */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            We look forward to celebrating with you!
          </p>
        </div>
      </div>
    </section>
  )
}
