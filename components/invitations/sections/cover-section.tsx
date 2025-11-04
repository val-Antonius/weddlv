import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface CoverSectionProps {
  config: InvitationConfigFormValues
  className?: string
}

export function CoverSection({ config, className }: CoverSectionProps) {
  const { template, couple, events, settings } = config
  
  // Extract first event date for display
  const firstEvent = events[0]
  const displayDate = firstEvent ? firstEvent.date : null

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200',
          title: 'text-amber-900 font-serif text-4xl md:text-6xl',
          subtitle: 'text-amber-700',
          couple: 'text-amber-800 font-serif text-2xl md:text-3xl',
          date: 'text-amber-600',
          badge: 'bg-amber-200 text-amber-800'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-200',
          title: 'text-pink-900 font-cursive text-4xl md:text-6xl',
          subtitle: 'text-pink-700',
          couple: 'text-pink-800 font-cursive text-2xl md:text-3xl',
          date: 'text-rose-600',
          badge: 'bg-pink-200 text-pink-800'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200',
          title: 'text-gray-900 font-sans text-4xl md:text-6xl font-bold',
          subtitle: 'text-gray-600',
          couple: 'text-gray-800 font-sans text-2xl md:text-3xl font-semibold',
          date: 'text-gray-500',
          badge: 'bg-gray-200 text-gray-800'
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <section className={`min-h-screen flex items-center justify-center p-8 ${className}`}>
      <Card className={`w-full max-w-2xl ${styles.container} shadow-xl`}>
        <CardContent className="p-8 md:p-12 text-center space-y-8">
          {/* Title and Subtitle */}
          <div className="space-y-4">
            <h1 className={styles.title}>
              Wedding Invitation
            </h1>
            <p className={styles.subtitle + ' text-lg'}>
              Together with their families
            </p>
          </div>

          {/* Couple Names */}
          <div className={`space-y-4 ${styles.couple}`}>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-4">
                {couple.bride.photo && (
                  <img
                    src={couple.bride.photo}
                    alt={couple.bride.fullName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
                <div className="text-4xl">&</div>
                {couple.groom.photo && (
                  <img
                    src={couple.groom.photo}
                    alt={couple.groom.fullName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
              </div>
              <div className="space-y-2">
                <h2 className={styles.couple}>
                  {couple.bride.nickname || couple.bride.fullName}
                </h2>
                <div className="text-2xl">&</div>
                <h2 className={styles.couple}>
                  {couple.groom.nickname || couple.groom.fullName}
                </h2>
              </div>
            </div>
          </div>

          {/* Wedding Dates */}
          {displayDate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Badge className={styles.badge}>
                  {firstEvent?.title || 'Wedding Date'}
                </Badge>
                <p className={styles.date + ' text-lg font-medium'}>
                  {new Date(displayDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Template Badge */}
          <div className="pt-8">
            <Badge variant="outline" className="text-xs">
              {template.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
