'use client'

import { motion } from 'framer-motion'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisGreetingsProps {
  config: MemphisAbstractConfig
}

export function MemphisGreetings({ config }: MemphisGreetingsProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-cyan-100 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-pink-400 rounded-full opacity-80"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-40 right-32 w-24 h-24 bg-yellow-300 rotate-45 opacity-70"
        />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-32 left-40 w-20 h-40 bg-cyan-400 skew-x-12 opacity-60"
        />
        <motion.div
          animate={{ x: [0, 30, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-28 h-28 bg-purple-600 rounded-full opacity-50"
        />
      </div>

      <div className="text-center z-10 px-4 max-w-4xl">
        {/* Main Title */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 150 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-black text-black mb-4 relative">
            <span className="inline-block transform -rotate-3 bg-pink-400 px-4 py-2 shadow-[8px_8px_0_theme(colors.cyan.400)]">
              WE
            </span>
            <span className="inline-block transform rotate-6 bg-yellow-300 px-4 py-2 ml-4 shadow-[8px_8px_0_theme(colors.purple.600)]">
              ARE
            </span>
          </h1>
          <h1 className="text-8xl md:text-9xl font-black text-black">
            <span className="inline-block transform rotate-2 bg-cyan-400 px-4 py-2 shadow-[8px_8px_0_theme(colors.orange.500)]">
              GETTING
            </span>
            <span className="inline-block transform -rotate-6 bg-lime-500 px-4 py-2 ml-4 shadow-[8px_8px_0_theme(colors.red.500)]">
              MARRIED
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-3xl md:text-4xl font-bold transform -rotate-2 bg-white border-8 border-black px-8 py-4 inline-block shadow-[12px_12px_0_theme(colors.pink.400)]">
            {config.content.greeting}
          </div>
        </motion.div>

        {/* Geometric Decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center items-center space-x-8 mb-12"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className={`w-12 h-12 ${
                ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500'][i]
              } ${
                ['rounded-full', '', 'rotate-45', 'rounded-full', ''][i]
              } border-4 border-black shadow-[4px_4px_0_theme(colors.black)]`}
            />
          ))}
        </motion.div>

        {/* Squiggle Divider */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="mb-12"
        >
          <svg width="300" height="60" className="mx-auto">
            <motion.path
              d="M10,30 Q50,10 90,30 T170,30 T250,30 T290,30"
              stroke="#ec4899"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </svg>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: "16px 16px 0 theme(colors.cyan.400)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white text-2xl font-black px-12 py-6 transform rotate-3 border-8 border-black shadow-[12px_12px_0_theme(colors.yellow.300)] hover:shadow-[16px_16px_0_theme(colors.cyan.400)] transition-all duration-200"
          onClick={() => {
            document.getElementById('couple-details')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          LET'S GO!
        </motion.button>

        {/* Corner Decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full border-4 border-black"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-8 right-8 w-12 h-12 bg-yellow-300 rotate-45 border-4 border-black"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-8 left-8 w-14 h-14 bg-cyan-400 border-4 border-black"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 right-8 w-10 h-20 bg-lime-500 skew-x-12 border-4 border-black"
        />
      </div>
    </section>
  )
}