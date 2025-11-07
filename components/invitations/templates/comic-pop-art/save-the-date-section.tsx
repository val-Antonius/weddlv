'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Zap, Star, Bomb } from 'lucide-react'

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

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

const eventColors = [
  { bg: 'bg-red-600', border: 'border-red-600', icon: Zap },
  { bg: 'bg-blue-600', border: 'border-blue-600', icon: Star },
  { bg: 'bg-yellow-400', border: 'border-yellow-400', icon: Bomb }
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
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 relative">
      {/* Comic book dots pattern */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
          backgroundSize: '25px 25px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-white border-4 border-black p-6 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-2" style={comicTextStyle}>
              SAVE THE DATE!
            </h2>
            <div className="bg-red-600 text-white px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              EPIC EVENTS AHEAD!
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event, index) => {
            const colorConfig = eventColors[index] || eventColors[0]
            const IconComponent = colorConfig.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -1, 1, 0]
                }}
                className="relative"
              >
                {/* Comic panel */}
                <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                  {/* Panel corners */}
                  <div className={`absolute -top-2 -left-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${colorConfig.bg} border-2 border-black`}></div>
                  
                  {/* Action burst icon */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colorConfig.bg} text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center`}
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  
                  <div className="text-center pt-4">
                    <h3 className="text-2xl font-bold text-black uppercase tracking-wide mb-4" style={comicTextStyle}>
                      {event.name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="bg-yellow-400 border-2 border-black p-2 flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5 text-black" />
                        <span className="font-bold text-black text-sm">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      
                      <div className="bg-yellow-400 border-2 border-black p-2 flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-black" />
                        <span className="font-bold text-black text-sm">
                          {event.time}
                        </span>
                      </div>
                      
                      <div className="bg-yellow-400 border-2 border-black p-2">
                        <div className="flex items-start justify-center gap-2">
                          <MapPin className="w-5 h-5 text-black mt-0.5" />
                          <div className="font-bold text-black text-sm text-center">
                            <p>{event.venue}</p>
                            <p className="text-xs">{event.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action word */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className={`absolute -bottom-4 -right-4 ${colorConfig.bg} text-white px-3 py-1 border-4 border-black font-bold text-sm transform rotate-12`}
                  style={comicTextStyle}
                >
                  {index === 0 && "BOOM!"}
                  {index === 1 && "ZAP!"}
                  {index === 2 && "WOW!"}
                </motion.div>
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
                <div
                  key={index + 3}
                  className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <h4 className="text-xl font-bold text-black uppercase mb-3" style={comicTextStyle}>
                    {event.name}
                  </h4>
                  <div className="space-y-2 text-sm font-bold text-black">
                    <p>{formatDate(event.date)} at {event.time}</p>
                    <p>{event.venue}, {event.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Final action burst */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
          className="text-center mt-16"
        >
          <div className="bg-white border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl font-bold text-black uppercase tracking-wider"
              style={comicTextStyle}
            >
              DON'T MISS THE ACTION!
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}