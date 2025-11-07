'use client'

import { motion } from 'framer-motion'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisSaveTheDateProps {
  config: MemphisAbstractConfig
}

export function MemphisSaveTheDate({ config }: MemphisSaveTheDateProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear().toString(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    }
  }

  const dateInfo = formatDate(config.couple.weddingDate)

  return (
    <section id="save-the-date" className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-cyan-100 via-pink-100 to-yellow-100 py-20 relative overflow-hidden">
      {/* Chaotic Background Elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              ['w-4 h-4', 'w-6 h-6', 'w-8 h-8', 'w-3 h-12', 'w-12 h-3'][Math.floor(Math.random() * 5)]
            } ${
              ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500', 'bg-lime-500'][Math.floor(Math.random() * 6)]
            } ${
              ['rounded-full', '', 'rotate-45', 'skew-x-12'][Math.floor(Math.random() * 4)]
            } opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, Math.random() * 360],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
          className="mb-16"
        >
          <div className="text-7xl md:text-8xl font-black mb-8">
            <span className="inline-block transform rotate-6 bg-red-500 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.cyan.400)] mr-4">
              SAVE
            </span>
            <span className="inline-block transform -rotate-3 bg-yellow-300 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.purple.600)]">
              THE
            </span>
          </div>
          <div className="text-7xl md:text-8xl font-black">
            <span className="inline-block transform rotate-2 bg-lime-500 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.orange.500)]">
              DATE
            </span>
          </div>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Day */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-pink-400 border-8 border-black transform rotate-3 shadow-[8px_8px_0_theme(colors.yellow.300)] p-8"
            >
              <div className="text-6xl font-black text-white mb-2">{dateInfo.day}</div>
              <div className="text-xl font-bold text-black">DAY</div>
            </motion.div>

            {/* Month */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="bg-cyan-400 border-8 border-black transform -rotate-2 shadow-[8px_8px_0_theme(colors.red.500)] p-8"
            >
              <div className="text-4xl font-black text-black mb-2">{dateInfo.month}</div>
              <div className="text-xl font-bold text-white">MONTH</div>
            </motion.div>

            {/* Year */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="bg-purple-600 border-8 border-black transform rotate-1 shadow-[8px_8px_0_theme(colors.lime.500)] p-8"
            >
              <div className="text-5xl font-black text-white mb-2">{dateInfo.year}</div>
              <div className="text-xl font-bold text-yellow-300">YEAR</div>
            </motion.div>

            {/* Weekday */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -3 }}
              className="bg-orange-500 border-8 border-black transform -rotate-3 shadow-[8px_8px_0_theme(colors.pink.400)] p-8"
            >
              <div className="text-2xl font-black text-white mb-2">{dateInfo.weekday}</div>
              <div className="text-xl font-bold text-black">DAY</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Venue Info */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white border-8 border-black transform rotate-2 shadow-[16px_16px_0_theme(colors.cyan.400)] p-8 max-w-2xl mx-auto relative">
            <div className="text-3xl font-black mb-4 transform -rotate-1">LOCATION:</div>
            <div className="text-5xl font-black text-pink-400 mb-2">{config.couple.venue}</div>
            <div className="text-xl text-gray-600">Get ready for geometric fun!</div>
            
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 rotate-45 border-4 border-black" />
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full border-4 border-black" />
            <div className="absolute -bottom-4 -left-4 w-6 h-12 bg-lime-500 skew-x-12 border-4 border-black" />
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-purple-600 border-4 border-black" />
          </div>
        </motion.div>

        {/* Squiggle Divider */}
        <motion.div
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mb-16"
        >
          <svg width="400" height="80" className="mx-auto">
            <motion.path
              d="M20,40 Q60,20 100,40 T180,40 Q220,60 260,40 T340,40 T380,40"
              stroke="#ec4899"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.path
              d="M30,50 Q70,30 110,50 T190,50 Q230,70 270,50 T350,50 T390,50"
              stroke="#22d3ee"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 text-black text-2xl md:text-3xl font-black px-8 py-6 transform -rotate-1 border-8 border-black shadow-[12px_12px_0_theme(colors.purple.600)] inline-block">
            IT'S GOING TO BE ABSOLUTELY WILD!
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 8,
            boxShadow: "16px 16px 0 theme(colors.lime.500)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white text-xl font-black px-10 py-5 transform rotate-3 border-6 border-black shadow-[10px_10px_0_theme(colors.orange.500)] hover:shadow-[16px_16px_0_theme(colors.lime.500)] transition-all duration-200"
          onClick={() => {
            document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          COUNT IT DOWN! →
        </motion.button>
      </div>
    </section>
  )
}