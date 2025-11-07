'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface CountdownSectionProps {
  weddingDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export function CountdownSection({ weddingDate }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })

  const calculateTimeLeft = (targetDate: string): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingDate])

  if (timeLeft.total <= 0) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-6xl text-emerald-800 mb-4">
              The Day Has Arrived! 🎉
            </h2>
            <p className="font-inter text-xl text-emerald-700">
              Our wedding celebration is happening now!
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'emerald' },
    { label: 'Hours', value: timeLeft.hours, color: 'amber' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'rose' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'green' }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-amber-50 relative overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className={`absolute text-emerald-600`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`
            }}
          >
            <Heart size={40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Counting Down to Forever
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Every second brings us closer to our special day
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`
                bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-emerald-200/30 
                border-2 border-${unit.color}-200 hover:shadow-3xl transition-all duration-300
                hover:scale-105
              `}>
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-4xl md:text-6xl font-playfair text-${unit.color}-700 mb-2`}
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>
                <div className={`text-sm md:text-base font-inter text-${unit.color}-600 uppercase tracking-wider`}>
                  {unit.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="font-dancing text-2xl md:text-3xl text-emerald-700">
            Until we say "I Do"
          </p>
        </motion.div>
      </div>
    </section>
  )
}