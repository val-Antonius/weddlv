'use client'

import { motion } from 'framer-motion'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelGreetingsProps {
  config: PixelArcadeConfig
}

export function PixelGreetings({ config }: PixelGreetingsProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900 relative">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #00ffff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="text-center z-10 px-4">
        {/* Blinking "INSERT COIN" */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-yellow-300 text-sm mb-8 font-mono"
        >
          INSERT COIN TO CONTINUE
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="text-6xl md:text-8xl font-bold mb-8 text-cyan-400"
          style={{
            textShadow: '4px 4px 0px #ff00ff, 8px 8px 0px #000000',
            imageRendering: 'pixelated'
          }}
        >
          WEDDING
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl md:text-3xl text-lime-400 mb-12 font-mono"
          style={{ textShadow: '2px 2px 0px #000000' }}
        >
          {config.content.greeting}
        </motion.div>

        {/* 8-bit Hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center space-x-4 mb-12"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                delay: i * 0.1, 
                duration: 0.6, 
                repeat: Infinity, 
                repeatDelay: 2 
              }}
              className="w-8 h-8 bg-red-500"
              style={{
                clipPath: 'polygon(50% 85%, 85% 50%, 85% 15%, 65% 15%, 50% 30%, 35% 15%, 15% 15%, 15% 50%)',
                imageRendering: 'pixelated'
              }}
            />
          ))}
        </motion.div>

        {/* Press Start Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-magenta-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.purple.500)] hover:shadow-[6px_6px_0px_0px_theme(colors.purple.500)] transition-all duration-100"
          style={{ imageRendering: 'pixelated' }}
          onClick={() => {
            document.getElementById('couple-details')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          PRESS START
        </motion.button>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute top-8 left-8 text-yellow-300 font-mono"
        >
          <div>SCORE: 999999</div>
          <div>LIVES: ♥ ♥ ♥</div>
        </motion.div>

        {/* High Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute top-8 right-8 text-yellow-300 font-mono text-right"
        >
          <div>HI-SCORE</div>
          <div className="text-2xl">LOVE</div>
        </motion.div>
      </div>
    </section>
  )
}