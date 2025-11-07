'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface Event {
  name: string
  date: string
  time: string
  venue: string
  address: string
}

interface SaveTheDateSectionProps {
  events: Event[]
}

const eventColors = [
  { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-800', icon: 'text-emerald-600' },
  { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800', icon: 'text-amber-600' },
  { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-800', icon: 'text-rose-600' }
]

export function SaveTheDateSection({ events }: SaveTheDateSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Save The Date
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Join us for these special moments as we celebrate our love
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event, index) => {
            const colors = eventColors[index] || eventColors[0]
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`${colors.bg} ${colors.border} border-2 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${colors.bg} ${colors.border} border-2 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Calendar className={`${colors.icon} w-8 h-8`} />
                  </div>
                  
                  <h3 className={`font-playfair text-2xl ${colors.text} mb-4`}>
                    {event.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className={`${colors.icon} w-5 h-5`} />
                      <span className={`font-inter text-sm ${colors.text}`}>
                        {formatDate(event.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <Clock className={`${colors.icon} w-5 h-5`} />
                      <span className={`font-inter text-sm ${colors.text}`}>
                        {event.time}
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-center gap-2">
                      <MapPin className={`${colors.icon} w-5 h-5 mt-0.5`} />
                      <div className={`font-inter text-sm ${colors.text} text-center`}>
                        <p className="font-medium">{event.venue}</p>
                        <p className="opacity-80">{event.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional events if more than 3 */}
        {events.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {events.slice(3).map((event, index) => (
                <div
                  key={index + 3}
                  className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-lg"
                >
                  <h4 className="font-playfair text-xl text-emerald-800 mb-3">
                    {event.name}
                  </h4>
                  <div className="space-y-2 text-sm text-emerald-700">
                    <p>{formatDate(event.date)} at {event.time}</p>
                    <p>{event.venue}, {event.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}