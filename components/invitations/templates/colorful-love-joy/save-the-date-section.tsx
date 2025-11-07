'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, PartyPopper, Star, Heart } from 'lucide-react'

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

const eventGradients = [
  'from-pink-400 to-rose-400',
  'from-yellow-400 to-orange-400', 
  'from-purple-400 to-fuchsia-400',
  'from-blue-400 to-sky-400',
  'from-emerald-400 to-teal-400'
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
    <section className="py-20 px-4 bg-gradient-to-bl from-emerald-200 via-blue-200 to-purple-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-quicksand text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Save the Date! 📅
          </motion.h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Mark your calendars for these amazing celebrations! 🎉
          </p>
          <motion.div 
            className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event, index) => {
            const gradient = eventGradients[index] || eventGradients[0]
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 2 : -2
                }}
                className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Floating decorations */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4 + index, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-4 right-4 text-white/30"
                >
                  {index === 0 && <PartyPopper size={24} />}
                  {index === 1 && <Star size={24} />}
                  {index === 2 && <Heart size={24} />}
                </motion.div>
                
                <div className="text-center text-white">
                  <motion.div 
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="w-8 h-8" />
                  </motion.div>
                  
                  <h3 className="font-pacifico text-2xl mb-6 drop-shadow-lg">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <span className="font-nunito text-sm">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span className="font-nunito text-sm">
                        {event.time}
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-center gap-3">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div className="font-nunito text-sm text-center">
                        <p className="font-semibold">{event.venue}</p>
                        <p className="opacity-90">{event.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
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
                <motion.div
                  key={index + 3}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-r ${eventGradients[(index + 3) % eventGradients.length]} rounded-2xl p-6 shadow-lg text-white`}
                >
                  <h4 className="font-pacifico text-xl mb-3">
                    {event.name}
                  </h4>
                  <div className="space-y-2 text-sm font-nunito">
                    <p>{formatDate(event.date)} at {event.time}</p>
                    <p>{event.venue}, {event.address}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fun emoji decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.div 
            className="text-6xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎊🎉🥳
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}