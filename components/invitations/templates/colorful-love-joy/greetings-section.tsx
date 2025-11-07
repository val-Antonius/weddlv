'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, PartyPopper } from 'lucide-react'
import Image from 'next/image'

interface GreetingsSectionProps {
  couple: {
    bride: { name: string; photo?: string }
    groom: { name: string; photo?: string }
  }
}

export function GreetingsSection({ couple }: GreetingsSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`
            }}
          >
            {i % 3 === 0 && <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />}
            {i % 3 === 1 && <Sparkles className="w-5 h-5 text-yellow-400" />}
            {i % 3 === 2 && <PartyPopper className="w-5 h-5 text-purple-400" />}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1 
            className="font-pacifico text-5xl md:text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            You're Invited!
          </motion.h1>
          <p className="font-nunito text-xl md:text-2xl text-white drop-shadow-lg max-w-2xl mx-auto">
            Join us for the most colorful celebration of love! 🌈
          </p>
        </motion.div>

        {/* Couple Photos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
        >
          {couple.bride.photo && (
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg shadow-pink-500/50 border-4 border-white relative">
                <Image
                  src={couple.bride.photo}
                  alt={couple.bride.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center"
              >
                <Heart className="w-4 h-4 text-white" fill="currentColor" />
              </motion.div>
            </motion.div>
          )}

          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl"
          >
            💕
          </motion.div>

          {couple.groom.photo && (
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg shadow-blue-500/50 border-4 border-white relative">
                <Image
                  src={couple.groom.photo}
                  alt={couple.groom.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="font-quicksand text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            {couple.bride.name} & {couple.groom.name}
          </h2>
          <motion.div 
            className="w-32 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Bouncing scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-12 border-4 border-white rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
            <motion.div 
              className="w-2 h-4 bg-white rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}