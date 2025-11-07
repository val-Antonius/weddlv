'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelCountdownProps {
  config: PixelArcadeConfig
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export function PixelCountdown({ config }: PixelCountdownProps) {
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
      <section id="countdown" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl font-bold text-yellow-300 mb-4" style={{
            textShadow: '4px 4px 0px #ff0000'
          }}>
            GAME OVER
          </div>
          <div className="text-2xl text-cyan-400">THE WEDDING HAS BEGUN! 🎉</div>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="countdown" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20 relative">
      {/* Digital Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '100vh'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {Math.random().toString(2).substr(2, 8)}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Timer Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 text-2xl font-mono font-bold mb-8"
          style={{ textShadow: '2px 2px 0px #000000' }}
        >
          ⚠️ BOSS BATTLE COUNTDOWN ⚠️
        </motion.div>

        {/* Main Countdown Display */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-black border-4 border-red-500 p-8 mb-8 shadow-[8px_8px_0px_0px_theme(colors.red.700)]"
        >
          <div className="text-3xl text-yellow-300 font-mono mb-6">
            TIME UNTIL FINAL BOSS:
          </div>

          {/* Time Units */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { value: timeLeft.days, label: 'DAYS', color: 'text-cyan-400' },
              { value: timeLeft.hours, label: 'HOURS', color: 'text-magenta-500' },
              { value: timeLeft.minutes, label: 'MINUTES', color: 'text-lime-400' },
              { value: timeLeft.seconds, label: 'SECONDS', color: 'text-yellow-300' }
            ].map((unit, i) => (
              <motion.div
                key={unit.label}
                animate={{ 
                  scale: unit.label === 'SECONDS' ? [1, 1.1, 1] : 1 
                }}
                transition={{ 
                  duration: 1, 
                  repeat: unit.label === 'SECONDS' ? Infinity : 0 
                }}
                className="bg-gray-800 border-2 border-white p-4 shadow-[4px_4px_0px_0px_theme(colors.gray.600)]"
              >
                <div className={`text-4xl md:text-6xl font-bold font-mono ${unit.color}`} style={{
                  textShadow: '2px 2px 0px #000000'
                }}>
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-white font-mono text-sm mt-2">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Health Bar Style Progress */}
          <div className="bg-gray-700 border-2 border-white p-2">
            <div className="text-yellow-300 font-mono text-sm mb-1">PREPARATION LEVEL:</div>
            <div className="bg-red-800 h-4 border border-gray-400 relative">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '90%' }}
                transition={{ duration: 2 }}
                className="h-full bg-gradient-to-r from-red-500 to-yellow-300"
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white font-bold">
                90% READY
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'EXCITEMENT LEVEL', value: 'MAX', color: 'border-cyan-400 text-cyan-400' },
            { label: 'LOVE POWER', value: '∞', color: 'border-magenta-500 text-magenta-500' },
            { label: 'HAPPINESS METER', value: 'FULL', color: 'border-lime-400 text-lime-400' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`bg-gray-800 border-2 ${stat.color} p-4 font-mono`}
            >
              <div className="text-white text-sm mb-1">{stat.label}:</div>
              <div className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Warning Message */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="bg-red-900 border-4 border-red-500 p-4 mb-8 font-mono"
        >
          <div className="text-yellow-300 text-lg font-bold">
            ⚡ WARNING: EPIC CELEBRATION APPROACHING ⚡
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.green.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.green.700)] transition-all duration-100"
          onClick={() => {
            document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          PREPARE FOR BATTLE
        </motion.button>
      </div>
    </section>
  )
}