'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, PartyPopper, Star } from 'lucide-react'

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
      <section className="py-20 px-4 bg-gradient-to-tr from-pink-300 via-yellow-300 to-green-300">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg"
          >
            <motion.h2 
              className="font-pacifico text-5xl md:text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              It's Party Time! 🎉
            </motion.h2>
            <p className="font-nunito text-2xl text-gray-700">
              Our wedding celebration is happening now! 🥳
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, gradient: 'from-pink-400 to-rose-400', icon: Heart },
    { label: 'Hours', value: timeLeft.hours, gradient: 'from-yellow-400 to-orange-400', icon: Sparkles },
    { label: 'Minutes', value: timeLeft.minutes, gradient: 'from-purple-400 to-fuchsia-400', icon: PartyPopper },
    { label: 'Seconds', value: timeLeft.seconds, gradient: 'from-blue-400 to-sky-400', icon: Star }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-pink-300 via-yellow-300 to-green-300 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute opacity-20"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`
            }}
          >
            {i % 4 === 0 && <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />}
            {i % 4 === 1 && <Sparkles className="w-6 h-6 text-yellow-400" />}
            {i % 4 === 2 && <PartyPopper className="w-7 h-7 text-purple-400" />}
            {i % 4 === 3 && <Star className="w-6 h-6 text-blue-400" />}
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
          <motion.h2 
            className="font-quicksand text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Countdown to Love! 💕
          </motion.h2>
          <p className="font-nunito text-xl text-white drop-shadow-lg max-w-2xl mx-auto">
            Every second brings us closer to our magical day! ✨
          </p>
          <motion.div 
            className="w-40 h-2 bg-white/80 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
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
                  rotate: index % 2 === 0 ? 5 : -5
                }}
                className="text-center"
              >
                <div className={`bg-gradient-to-br ${unit.gradient} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                  {/* Floating icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3 + index,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-2 right-2 text-white/30"
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="text-4xl md:text-6xl font-quicksand font-bold text-white mb-2 drop-shadow-lg"
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-sm md:text-base font-nunito text-white font-semibold uppercase tracking-wider">
                    {unit.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="font-pacifico text-2xl md:text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Until we say "I Do!" 💍
            </p>
            <motion.div 
              className="flex justify-center mt-2 gap-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>💕</span>
              <span>✨</span>
              <span>🎉</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}