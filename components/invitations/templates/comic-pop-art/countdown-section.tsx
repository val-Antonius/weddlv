'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Star, Bomb, Target } from 'lucide-react'

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

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-black uppercase tracking-wider mb-4"
              style={comicTextStyle}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              IT'S SHOWTIME!
            </motion.h2>
            <div className="bg-red-600 text-white px-6 py-3 border-4 border-black inline-block font-bold text-xl" style={comicTextStyle}>
              THE WEDDING IS HAPPENING NOW!
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, bg: 'bg-red-600', icon: Bomb },
    { label: 'HOURS', value: timeLeft.hours, bg: 'bg-blue-600', icon: Zap },
    { label: 'MINUTES', value: timeLeft.minutes, bg: 'bg-yellow-400', icon: Star },
    { label: 'SECONDS', value: timeLeft.seconds, bg: 'bg-purple-600', icon: Target }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-green-500 relative overflow-hidden">
      {/* Speed lines background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-white"
            style={{
              height: '100%',
              left: `${8.33 * i}%`,
              transform: `rotate(${15 * i}deg)`,
              transformOrigin: 'center'
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -1, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white border-4 border-black p-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-4" style={comicTextStyle}>
              COUNTDOWN TO LOVE!
            </h2>
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              T-MINUS...
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {timeUnits.map((unit, index) => {
            const IconComponent = unit.icon
            
            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0]
                }}
                className="text-center relative"
              >
                <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                  {/* Corner decorations */}
                  <div className={`absolute -top-2 -left-2 w-6 h-6 ${unit.bg} border-2 border-black`}></div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 ${unit.bg} border-2 border-black`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-6 h-6 ${unit.bg} border-2 border-black`}></div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${unit.bg} border-2 border-black`}></div>
                  
                  {/* Icon burst */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3 + index, repeat: Infinity, ease: "linear" }}
                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${unit.bg} text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center`}
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="text-4xl md:text-6xl font-bold text-black mb-2 pt-4"
                    style={comicTextStyle}
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-sm md:text-base font-bold text-black uppercase tracking-wider" style={comicTextStyle}>
                    {unit.label}
                  </div>
                </div>

                {/* Action word */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className={`absolute -bottom-4 -right-2 ${unit.bg} text-white px-2 py-1 border-2 border-black font-bold text-xs transform rotate-12`}
                  style={comicTextStyle}
                >
                  {index === 0 && "TICK!"}
                  {index === 1 && "TOCK!"}
                  {index === 2 && "ZAP!"}
                  {index === 3 && "GO!"}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wider"
              style={comicTextStyle}
            >
              UNTIL THE BIG DAY!
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}