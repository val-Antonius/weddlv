'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisCountdownProps {
  config: MemphisAbstractConfig
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export function MemphisCountdown({ config }: MemphisCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  })

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
      setTimeLeft(calculateTimeLeft(config.couple.weddingDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [config.couple.weddingDate])

  if (timeLeft.total <= 0) {
    return (
      <section id="countdown" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200 py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl font-black bg-red-500 text-white px-8 py-4 border-8 border-black shadow-[16px_16px_0_theme(colors.cyan.400)] transform rotate-3">
            IT'S TIME!
          </div>
          <div className="text-3xl font-bold mt-8">The celebration has begun! 🎉</div>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="countdown" className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-100 via-purple-100 to-lime-100 py-20 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #ec4899 25%, transparent 25%),
            linear-gradient(-45deg, #fde047 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #22d3ee 75%),
            linear-gradient(-45deg, transparent 75%, #a855f7 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-6xl md:text-7xl font-black mb-8">
            <span className="inline-block transform -rotate-6 bg-cyan-400 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.red.500)] mr-4">
              COUNT
            </span>
            <span className="inline-block transform rotate-3 bg-pink-400 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.yellow.300)]">
              DOWN
            </span>
          </div>
          <div className="text-2xl font-bold bg-white border-4 border-black px-6 py-3 transform rotate-1 shadow-[6px_6px_0_theme(colors.purple.600)] inline-block">
            TO THE BIG DAY!
          </div>
        </motion.div>

        {/* Countdown Display */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Days */}
            <motion.div
              animate={{ 
                rotate: [2, -2, 2],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-red-500 border-8 border-black transform rotate-2 shadow-[12px_12px_0_theme(colors.cyan.400)] p-8 relative"
            >
              <div className="text-6xl md:text-7xl font-black text-white mb-2">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-2xl font-black text-yellow-300">DAYS</div>
              
              {/* Corner decoration */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-300 rounded-full border-4 border-black" />
            </motion.div>

            {/* Hours */}
            <motion.div
              animate={{ 
                rotate: [-3, 3, -3],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-yellow-300 border-8 border-black transform -rotate-3 shadow-[12px_12px_0_theme(colors.purple.600)] p-8 relative"
            >
              <div className="text-6xl md:text-7xl font-black text-black mb-2">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-2xl font-black text-red-500">HOURS</div>
              
              {/* Corner decoration */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-pink-400 rotate-45 border-4 border-black" />
            </motion.div>

            {/* Minutes */}
            <motion.div
              animate={{ 
                rotate: [1, -4, 1],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-lime-500 border-8 border-black transform rotate-1 shadow-[12px_12px_0_theme(colors.orange.500)] p-8 relative"
            >
              <div className="text-6xl md:text-7xl font-black text-black mb-2">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-2xl font-black text-purple-600">MINUTES</div>
              
              {/* Corner decoration */}
              <div className="absolute -bottom-3 -right-3 w-4 h-8 bg-cyan-400 skew-x-12 border-4 border-black" />
            </motion.div>

            {/* Seconds */}
            <motion.div
              animate={{ 
                rotate: [-2, 5, -2],
                scale: timeLeft.seconds % 2 === 0 ? [1, 1.1, 1] : [1, 1.05, 1]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-purple-600 border-8 border-black transform -rotate-2 shadow-[12px_12px_0_theme(colors.lime.500)] p-8 relative"
            >
              <div className="text-6xl md:text-7xl font-black text-white mb-2">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-2xl font-black text-yellow-300">SECONDS</div>
              
              {/* Corner decoration */}
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-orange-500 border-4 border-black" />
            </motion.div>
          </div>
        </motion.div>

        {/* Excitement Meter */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <div className="bg-white border-8 border-black transform rotate-1 shadow-[12px_12px_0_theme(colors.pink.400)] p-8">
            <div className="text-3xl font-black mb-6 transform -rotate-2">EXCITEMENT METER:</div>
            
            <div className="relative h-16 bg-gray-200 border-4 border-black overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '95%' }}
                transition={{ duration: 2, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-red-500 via-yellow-300 via-pink-400 to-cyan-400 relative"
              >
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl"
                >
                  🚀
                </motion.div>
              </motion.div>
            </div>
            
            <div className="text-xl font-bold mt-4 text-red-500">MAXIMUM HYPE ACHIEVED!</div>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { number: Math.floor(timeLeft.total / (1000 * 60)), label: 'MINUTES LEFT', color: 'bg-cyan-400', shadow: 'shadow-[6px_6px_0_theme(colors.red.500)]' },
            { number: Math.floor(timeLeft.total / 1000), label: 'SECONDS LEFT', color: 'bg-pink-400', shadow: 'shadow-[6px_6px_0_theme(colors.yellow.300)]' },
            { number: Math.floor(timeLeft.total / (1000 * 60 * 60)), label: 'HOURS LEFT', color: 'bg-lime-500', shadow: 'shadow-[6px_6px_0_theme(colors.purple.600)]' }
          ].map((fact, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
              className={`${fact.color} border-4 border-black transform ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'} ${fact.shadow} p-6`}
            >
              <div className="text-4xl font-black text-black mb-2">
                {fact.number.toLocaleString()}
              </div>
              <div className="text-lg font-bold text-white">{fact.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
          whileHover={{ 
            scale: 1.1, 
            rotate: -5,
            boxShadow: "16px 16px 0 theme(colors.cyan.400)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white text-2xl font-black px-12 py-6 transform rotate-3 border-8 border-black shadow-[12px_12px_0_theme(colors.purple.600)] hover:shadow-[16px_16px_0_theme(colors.cyan.400)] transition-all duration-200"
          onClick={() => {
            document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          LET'S RSVP! →
        </motion.button>
      </div>
    </section>
  )
}