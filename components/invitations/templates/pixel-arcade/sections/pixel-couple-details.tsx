'use client'

import { motion } from 'framer-motion'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelCoupleDetailsProps {
  config: PixelArcadeConfig
}

export function PixelCoupleDetails({ config }: PixelCoupleDetailsProps) {
  return (
    <section id="couple-details" className="min-h-screen flex items-center justify-center bg-gray-900 py-20 relative">
      {/* Pixel Border Frame */}
      <div className="absolute inset-8 border-4 border-cyan-400" style={{
        borderImage: 'repeating-linear-gradient(45deg, #00ffff 0, #00ffff 10px, #ff00ff 10px, #ff00ff 20px) 4'
      }} />

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Level Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-yellow-300 text-xl font-mono mb-8"
        >
          LEVEL 1: CHARACTER SELECT
        </motion.div>

        {/* VS Screen Layout */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Player 1 */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            {/* Character Frame */}
            <div className="bg-indigo-900 border-4 border-cyan-400 p-6 mb-4 shadow-[8px_8px_0px_0px_theme(colors.purple.500)]">
              <div className="w-32 h-32 mx-auto bg-gradient-to-b from-cyan-400 to-cyan-600 mb-4 border-2 border-white" style={{
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
              }} />
              <div className="text-2xl font-bold text-cyan-400 mb-2" style={{
                textShadow: '2px 2px 0px #000000'
              }}>
                {config.couple.bride}
              </div>
              <div className="text-sm text-lime-400 font-mono">PLAYER 1</div>
            </div>

            {/* Stats */}
            <div className="bg-purple-900 border-2 border-magenta-500 p-3 text-left font-mono text-sm">
              <div className="text-yellow-300">STATS:</div>
              <div className="text-green-400">LOVE: ████████████ MAX</div>
              <div className="text-red-400">BEAUTY: ████████████ MAX</div>
              <div className="text-blue-400">CHARM: ████████████ MAX</div>
            </div>
          </motion.div>

          {/* VS Symbol */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="text-8xl font-bold text-red-500 mb-4" style={{
              textShadow: '4px 4px 0px #000000'
            }}>
              ♥
            </div>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-2xl text-magenta-500 font-mono font-bold"
            >
              LOVE
            </motion.div>
          </motion.div>

          {/* Player 2 */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            {/* Character Frame */}
            <div className="bg-indigo-900 border-4 border-magenta-500 p-6 mb-4 shadow-[8px_8px_0px_0px_theme(colors.purple.500)]">
              <div className="w-32 h-32 mx-auto bg-gradient-to-b from-magenta-500 to-magenta-700 mb-4 border-2 border-white" style={{
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
              }} />
              <div className="text-2xl font-bold text-magenta-500 mb-2" style={{
                textShadow: '2px 2px 0px #000000'
              }}>
                {config.couple.groom}
              </div>
              <div className="text-sm text-lime-400 font-mono">PLAYER 2</div>
            </div>

            {/* Stats */}
            <div className="bg-purple-900 border-2 border-cyan-400 p-3 text-left font-mono text-sm">
              <div className="text-yellow-300">STATS:</div>
              <div className="text-green-400">LOVE: ████████████ MAX</div>
              <div className="text-red-400">STRENGTH: ████████████ MAX</div>
              <div className="text-blue-400">WISDOM: ████████████ MAX</div>
            </div>
          </motion.div>
        </div>

        {/* Game Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-gray-800 border-4 border-yellow-300 p-6 font-mono"
        >
          <div className="text-yellow-300 text-lg mb-2">GAME MODE: CO-OP FOREVER</div>
          <div className="text-cyan-400">OBJECTIVE: COMPLETE WEDDING QUEST</div>
          <div className="text-lime-400">DIFFICULTY: LEGENDARY LOVE</div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-lime-400 text-gray-900 px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.green.600)] hover:shadow-[6px_6px_0px_0px_theme(colors.green.600)] transition-all duration-100"
          onClick={() => {
            document.getElementById('save-the-date')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          CONTINUE
        </motion.button>
      </div>
    </section>
  )
}