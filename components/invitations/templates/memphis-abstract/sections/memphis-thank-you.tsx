'use client'

import { motion } from 'framer-motion'
import { Trophy, Heart, Star } from 'lucide-react'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisThankYouProps {
  config: MemphisAbstractConfig
}

export function MemphisThankYou({ config }: MemphisThankYouProps) {
  return (
    <section id="thank-you" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200 py-20 relative overflow-hidden">
      {/* Explosive Confetti Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              ['w-2 h-2', 'w-3 h-3', 'w-1 h-4', 'w-4 h-1', 'w-2 h-6'][Math.floor(Math.random() * 5)]
            } ${
              ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500', 'bg-lime-500', 'bg-red-500', 'bg-blue-600'][Math.floor(Math.random() * 8)]
            } ${
              ['rounded-full', '', 'rotate-45', 'skew-x-12'][Math.floor(Math.random() * 4)]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 100, -50, 0],
              x: [0, Math.random() * 200 - 100, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 720, Math.random() * 360],
              scale: [0, 1, 0.5, 1, 0],
              opacity: [0, 1, 0.8, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Explosive Thank You */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          className="mb-16"
        >
          <div className="text-8xl md:text-9xl font-black mb-8">
            <motion.span
              animate={{ 
                rotate: [2, -2, 2],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block bg-red-500 text-white px-8 py-4 border-8 border-black shadow-[16px_16px_0_theme(colors.cyan.400)] transform rotate-3 mr-6"
            >
              THANK
            </motion.span>
            <motion.span
              animate={{ 
                rotate: [-3, 3, -3],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block bg-yellow-300 text-black px-8 py-4 border-8 border-black shadow-[16px_16px_0_theme(colors.purple.600)] transform -rotate-6"
            >
              YOU
            </motion.span>
          </div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl md:text-4xl font-black bg-white border-6 border-black px-8 py-4 transform rotate-1 shadow-[12px_12px_0_theme(colors.lime.500)] inline-block"
          >
            FOR JOINING OUR GEOMETRIC ADVENTURE!
          </motion.div>
        </motion.div>

        {/* Appreciation Message */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-pink-400 via-cyan-400 to-lime-500 border-8 border-black p-8 transform -rotate-1 shadow-[16px_16px_0_theme(colors.purple.600)] relative">
            <div className="text-2xl md:text-3xl font-bold text-black leading-relaxed">
              Your presence made our celebration absolutely WILD and WONDERFUL! 
              Thank you for being part of our chaotic, colorful, perfectly imperfect love story!
            </div>
            
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-500 rotate-45 border-4 border-black" />
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full border-4 border-black" />
            <div className="absolute -bottom-4 -left-4 w-6 h-12 bg-blue-600 skew-x-12 border-4 border-black" />
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-yellow-300 border-4 border-black" />
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <Trophy className="text-yellow-300" size={48} />,
              title: "PARTY LEGENDS",
              description: "You made it EPIC!",
              color: "bg-purple-600",
              shadow: "shadow-[8px_8px_0_theme(colors.yellow.300)]"
            },
            {
              icon: <Heart className="text-red-500" size={48} />,
              title: "LOVE AMPLIFIERS", 
              description: "You multiplied our joy!",
              color: "bg-cyan-400",
              shadow: "shadow-[8px_8px_0_theme(colors.red.500)]"
            },
            {
              icon: <Star className="text-lime-400" size={48} />,
              title: "MEMORY MAKERS",
              description: "Unforgettable moments!",
              color: "bg-orange-500",
              shadow: "shadow-[8px_8px_0_theme(colors.lime.400)]"
            }
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 1.4 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? 3 : -3,
                y: -10
              }}
              className={`${badge.color} border-6 border-black p-8 text-center transform ${
                index % 2 === 0 ? 'rotate-2' : '-rotate-2'
              } ${badge.shadow} hover:shadow-[12px_12px_0_theme(colors.pink.400)] transition-all duration-200 relative`}
            >
              <div className="mb-4">{badge.icon}</div>
              <div className="text-2xl font-black text-white mb-2">
                {badge.title}
              </div>
              <div className="text-lg font-bold text-black">
                {badge.description}
              </div>
              
              {/* Badge decorations */}
              <div className={`absolute -top-2 -right-2 w-4 h-4 ${
                ['bg-pink-400', 'bg-yellow-300', 'bg-lime-500'][index]
              } rounded-full border-2 border-black`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Final Stats */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.8, type: "spring" }}
          className="bg-black border-8 border-white p-8 mb-16 max-w-3xl mx-auto transform rotate-1 shadow-[16px_16px_0_theme(colors.pink.400)] relative"
        >
          <div className="text-white text-center">
            <div className="text-3xl font-black text-yellow-300 mb-6">
              FINAL GEOMETRIC STATS:
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-black">
              <div>
                <div className="text-4xl text-cyan-400 mb-2">∞</div>
                <div className="text-lg text-white">LOVE LEVEL</div>
              </div>
              <div>
                <div className="text-4xl text-pink-400 mb-2">MAX</div>
                <div className="text-lg text-white">HAPPINESS</div>
              </div>
              <div>
                <div className="text-4xl text-lime-400 mb-2">999+</div>
                <div className="text-lg text-white">MEMORIES</div>
              </div>
              <div>
                <div className="text-4xl text-orange-500 mb-2">ALL</div>
                <div className="text-lg text-white">FRIENDS</div>
              </div>
            </div>
          </div>

          {/* Stats decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rotate-45 border-4 border-white" />
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-600 rounded-full border-4 border-white" />
        </motion.div>

        {/* Couple Credits */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="bg-white border-6 border-black p-6 mb-12 max-w-xl mx-auto transform -rotate-2 shadow-[10px_10px_0_theme(colors.cyan.400)]"
        >
          <div className="text-2xl font-black text-purple-600 mb-4">
            STARRING:
          </div>
          <div className="space-y-2 text-xl font-bold">
            <div className="bg-pink-400 text-black px-4 py-2 border-4 border-black transform rotate-1 shadow-[4px_4px_0_theme(colors.yellow.300)] inline-block">
              {config.couple.bride}
            </div>
            <div className="text-3xl">💕</div>
            <div className="bg-cyan-400 text-black px-4 py-2 border-4 border-black transform -rotate-1 shadow-[4px_4px_0_theme(colors.red.500)] inline-block">
              {config.couple.groom}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-400 text-black text-xl font-black px-10 py-5 border-6 border-black shadow-[8px_8px_0_theme(colors.purple.600)] hover:shadow-[12px_12px_0_theme(colors.red.500)] transition-all duration-200 transform rotate-2"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            RELIVE THE CHAOS!
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white text-xl font-black px-10 py-5 border-6 border-black shadow-[8px_8px_0_theme(colors.yellow.300)] hover:shadow-[12px_12px_0_theme(colors.pink.400)] transition-all duration-200 transform -rotate-2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Geometric Wedding Celebration',
                  text: 'Join our wild and wonderful wedding!',
                  url: window.location.href
                })
              }
            }}
          >
            SPREAD THE LOVE!
          </motion.button>
        </motion.div>

        {/* Final Message */}
        <motion.div
          animate={{ 
            rotate: [1, -1, 1],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-black bg-gradient-to-r from-red-500 to-purple-600 text-white px-8 py-4 border-6 border-black shadow-[8px_8px_0_theme(colors.yellow.300)] inline-block transform rotate-1"
        >
          KEEP BEING GEOMETRICALLY AWESOME! ✨
        </motion.div>
      </div>
    </section>
  )
}