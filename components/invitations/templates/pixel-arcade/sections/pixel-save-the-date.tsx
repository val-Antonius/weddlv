'use client'

import { motion } from 'framer-motion'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelSaveTheDateProps {
  config: PixelArcadeConfig
}

export function PixelSaveTheDate({ config }: PixelSaveTheDateProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).toUpperCase()
  }

  return (
    <section id="save-the-date" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 py-20 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Achievement Unlocked Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-yellow-300 text-gray-900 px-6 py-2 inline-block font-bold text-lg mb-8 border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.orange.500)]"
        >
          🏆 ACHIEVEMENT UNLOCKED
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
          className="bg-gray-800 border-4 border-cyan-400 p-8 mb-8 shadow-[8px_8px_0px_0px_theme(colors.purple.500)]"
        >
          <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4" style={{
            textShadow: '3px 3px 0px #ff00ff'
          }}>
            SAVE THE DATE
          </div>
          
          <div className="text-2xl text-lime-400 font-mono mb-6">
            QUEST BEGINS ON:
          </div>

          {/* Date Display */}
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 20px #00ffff',
                '0 0 40px #ff00ff',
                '0 0 20px #00ffff'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-black border-4 border-magenta-500 p-6 inline-block"
          >
            <div className="text-3xl md:text-5xl font-bold text-yellow-300 font-mono" style={{
              textShadow: '2px 2px 0px #000000'
            }}>
              {formatDate(config.couple.weddingDate)}
            </div>
          </motion.div>
        </motion.div>

        {/* Venue Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-indigo-900 border-4 border-lime-400 p-6 mb-8 shadow-[6px_6px_0px_0px_theme(colors.green.600)]"
        >
          <div className="text-xl text-lime-400 font-mono mb-2">LOCATION:</div>
          <div className="text-2xl font-bold text-white" style={{
            textShadow: '2px 2px 0px #000000'
          }}>
            {config.couple.venue}
          </div>
        </motion.div>

        {/* Power-Up Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center space-x-8 mb-8"
        >
          {[
            { icon: '💍', label: 'RINGS', color: 'text-yellow-300' },
            { icon: '🎵', label: 'MUSIC', color: 'text-cyan-400' },
            { icon: '🍰', label: 'CAKE', color: 'text-magenta-500' },
            { icon: '💐', label: 'FLOWERS', color: 'text-lime-400' }
          ].map((item, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="text-center"
            >
              <div className="text-4xl mb-2 bg-gray-800 border-2 border-white p-3 shadow-[4px_4px_0px_0px_theme(colors.gray.600)]">
                {item.icon}
              </div>
              <div className={`text-sm font-mono font-bold ${item.color}`}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 2, delay: 0.8 }}
          className="bg-gray-800 border-4 border-white p-4 mb-8"
        >
          <div className="text-yellow-300 font-mono mb-2">WEDDING PREPARATION:</div>
          <div className="bg-gray-600 h-6 border-2 border-gray-400">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '85%' }}
              transition={{ duration: 2, delay: 1 }}
              className="h-full bg-gradient-to-r from-lime-400 to-cyan-400"
            />
          </div>
          <div className="text-cyan-400 font-mono text-sm mt-2">85% COMPLETE</div>
        </motion.div>

        {/* Next Level Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.red.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.red.700)] transition-all duration-100"
          onClick={() => {
            document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          NEXT LEVEL →
        </motion.button>
      </div>
    </section>
  )
}