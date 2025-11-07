'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Star } from 'lucide-react'

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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            SAVE THE DATE
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Mark your calendars for these momentous occasions
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Star className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="border-2 border-zinc-900 bg-white p-8 drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 relative"
            >
              {/* Art Deco corner decorations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-r border-b border-zinc-900"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-zinc-900"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-r border-t border-zinc-900"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-l border-t border-zinc-900"></div>
              
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-zinc-900 flex items-center justify-center mx-auto mb-6 bg-white">
                  <Calendar className="w-8 h-8 text-zinc-900" />
                </div>
                
                <h3 className="font-cinzel text-2xl text-zinc-900 mb-6 tracking-wide">
                  {event.name}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5 text-zinc-700" />
                    <span className="font-crimson text-sm text-zinc-700">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-5 h-5 text-zinc-700" />
                    <span className="font-crimson text-sm text-zinc-700">
                      {event.time}
                    </span>
                  </div>
                  
                  <div className="flex items-start justify-center gap-3">
                    <MapPin className="w-5 h-5 text-zinc-700 mt-0.5" />
                    <div className="font-crimson text-sm text-zinc-700 text-center">
                      <p className="font-semibold">{event.venue}</p>
                      <p className="opacity-80">{event.address}</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative bottom element */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-8 h-px bg-zinc-900"></div>
                  <div className="w-1 h-1 bg-zinc-900 rotate-45"></div>
                  <div className="w-8 h-px bg-zinc-900"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional events */}
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
                  className="border border-zinc-900 bg-white p-6 divide-y divide-zinc-200"
                >
                  <h4 className="font-cinzel text-xl text-zinc-900 mb-3 tracking-wide">
                    {event.name}
                  </h4>
                  <div className="pt-3 space-y-2 text-sm text-zinc-700 font-crimson">
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