'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'

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
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="border-2 border-zinc-900 p-12 bg-white"
          >
            <h2 className="font-cinzel text-4xl md:text-6xl text-zinc-900 mb-4 tracking-wider">
              THE DAY HAS ARRIVED
            </h2>
            <p className="font-crimson text-xl text-zinc-700 italic">
              Our wedding celebration begins now
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white relative overflow-hidden">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-24 h-24 border border-zinc-900 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-zinc-900"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-zinc-900 rotate-12"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-zinc-900 rotate-45"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            COUNTDOWN TO FOREVER
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Every moment brings us closer to our eternal union
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Diamond className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
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
              <div className="border-2 border-zinc-900 p-6 md:p-8 bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 hover:scale-105 relative">
                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-white border border-zinc-900"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-zinc-900"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white border border-zinc-900"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border border-zinc-900"></div>
                
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl md:text-6xl font-cinzel text-zinc-900 mb-2 tracking-wider"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>
                <div className="text-sm md:text-base font-crimson text-zinc-700 tracking-widest">
                  {unit.label}
                </div>
                
                {/* Decorative line */}
                <div className="w-8 h-px bg-zinc-900 mx-auto mt-3"></div>
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
          <div className="border border-zinc-900 p-6 bg-white inline-block">
            <p className="font-great-vibes text-2xl md:text-3xl text-zinc-900">
              Until we become one
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}