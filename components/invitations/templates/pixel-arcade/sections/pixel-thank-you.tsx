'use client'

import { motion } from 'framer-motion'
import { Trophy, Heart, Star } from 'lucide-react'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelThankYouProps {
  config: PixelArcadeConfig
}

export function PixelThankYou({ config }: PixelThankYouProps) {
  return (
    <section id="thank-you" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black py-20 relative">
      {/* Victory Confetti */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 100],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <div className={`w-2 h-2 ${
              ['bg-cyan-400', 'bg-magenta-500', 'bg-lime-400', 'bg-yellow-300', 'bg-red-500'][Math.floor(Math.random() * 5)]
            }`} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Victory Banner */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 150 }}
          className="mb-8"
        >
          <div className="bg-yellow-300 text-gray-900 px-8 py-4 inline-block font-bold text-2xl border-4 border-white shadow-[8px_8px_0px_0px_theme(colors.orange.500)]">
            🏆 QUEST COMPLETE! 🏆
          </div>
        </motion.div>

        {/* Main Thank You Message */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-6xl md:text-8xl font-bold text-cyan-400 mb-6" style={{
            textShadow: '6px 6px 0px #ff00ff, 12px 12px 0px #000000'
          }}>
            THANK YOU
          </div>
          
          <div className="text-2xl md:text-3xl text-lime-400 font-mono mb-8">
            FOR JOINING OUR ADVENTURE!
          </div>

          <div className="text-xl text-white font-mono max-w-2xl mx-auto leading-relaxed">
            Your presence in our wedding quest means everything to us. 
            Together, we've unlocked the ultimate achievement: LOVE!
          </div>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <Trophy className="text-yellow-300" size={48} />,
              title: "LEGENDARY GUESTS",
              description: "You made our day epic!",
              color: "border-yellow-300"
            },
            {
              icon: <Heart className="text-red-500" size={48} />,
              title: "LOVE MULTIPLIER",
              description: "Your support = +∞ happiness",
              color: "border-red-500"
            },
            {
              icon: <Star className="text-cyan-400" size={48} />,
              title: "MEMORY UNLOCKED",
              description: "This moment is saved forever",
              color: "border-cyan-400"
            }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`bg-gray-800 border-4 ${achievement.color} p-6 shadow-[6px_6px_0px_0px_theme(colors.gray.600)] hover:shadow-[8px_8px_0px_0px_theme(colors.gray.600)] transition-all duration-200`}
            >
              <div className="mb-4">{achievement.icon}</div>
              <div className="text-xl font-bold text-white font-mono mb-2">
                {achievement.title}
              </div>
              <div className="text-gray-300 font-mono text-sm">
                {achievement.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="bg-black border-4 border-magenta-500 p-8 mb-12 max-w-2xl mx-auto shadow-[8px_8px_0px_0px_theme(colors.purple.700)]"
        >
          <div className="text-magenta-500 font-bold font-mono text-xl mb-4">
            FINAL SCORE
          </div>
          
          <div className="grid grid-cols-2 gap-6 font-mono">
            <div>
              <div className="text-cyan-400 mb-2">LOVE LEVEL:</div>
              <div className="text-4xl font-bold text-yellow-300">MAX</div>
            </div>
            <div>
              <div className="text-cyan-400 mb-2">HAPPINESS:</div>
              <div className="text-4xl font-bold text-lime-400">∞</div>
            </div>
            <div>
              <div className="text-cyan-400 mb-2">MEMORIES:</div>
              <div className="text-4xl font-bold text-red-500">999+</div>
            </div>
            <div>
              <div className="text-cyan-400 mb-2">FRIENDS:</div>
              <div className="text-4xl font-bold text-magenta-500">ALL</div>
            </div>
          </div>
        </motion.div>

        {/* Couple Credits */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="bg-indigo-900 border-4 border-lime-400 p-6 mb-8 max-w-xl mx-auto"
        >
          <div className="text-lime-400 font-bold font-mono text-lg mb-4">
            GAME CREDITS
          </div>
          <div className="space-y-2 font-mono">
            <div className="text-cyan-400">
              PLAYER 1: <span className="text-white font-bold">{config.couple.bride}</span>
            </div>
            <div className="text-magenta-500">
              PLAYER 2: <span className="text-white font-bold">{config.couple.groom}</span>
            </div>
            <div className="text-yellow-300 mt-4">
              SPECIAL THANKS TO ALL OUR AMAZING GUESTS!
            </div>
          </div>
        </motion.div>

        {/* Continue Playing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="text-gray-400 font-mono mb-4">
            THE ADVENTURE CONTINUES...
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-8 py-4 text-lg font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.green.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.green.700)] transition-all duration-100 font-mono"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              PLAY AGAIN
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-8 py-4 text-lg font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.blue.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.blue.700)] transition-all duration-100 font-mono"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Wedding Invitation',
                    text: 'Join our wedding quest!',
                    url: window.location.href
                  })
                }
              }}
            >
              SHARE QUEST
            </motion.button>
          </div>
        </motion.div>

        {/* Game Over Message */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-yellow-300 font-mono text-lg"
        >
          PRESS ANY KEY TO CONTINUE...
        </motion.div>
      </div>
    </section>
  )
}