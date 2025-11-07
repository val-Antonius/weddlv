'use client'

import { motion } from 'framer-motion'
import { Zap, Star, Heart } from 'lucide-react'
import Image from 'next/image'

interface GreetingsSectionProps {
  couple: {
    bride: { name: string; photo?: string }
    groom: { name: string; photo?: string }
  }
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

export function GreetingsSection({ couple }: GreetingsSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-br from-yellow-400 via-red-500 to-blue-600">
      {/* Sunburst background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `conic-gradient(from 0deg, #fbbf24, #ef4444, #3b82f6, #fbbf24)`
        }}
      />

      {/* Action words floating */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-20 left-10 bg-red-600 text-white px-4 py-2 border-4 border-black font-bold text-xl transform -rotate-12"
        style={comicTextStyle}
      >
        WHAM!
      </motion.div>

      <motion.div
        animate={{ 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-32 right-20 bg-blue-600 text-white px-4 py-2 border-4 border-black font-bold text-xl transform rotate-12"
        style={comicTextStyle}
      >
        LOVE!
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-32 left-16 bg-yellow-400 text-black px-4 py-2 border-4 border-black font-bold text-xl transform -rotate-6"
        style={comicTextStyle}
      >
        POW!
      </motion.div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main title in speech bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          className="relative mb-12"
        >
          <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            {/* Speech bubble tail */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[24px] border-r-[24px] border-t-[24px] border-l-transparent border-r-transparent border-t-black"></div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase tracking-wider" style={comicTextStyle}>
              YOU'RE INVITED!
            </h1>
            <p className="text-lg md:text-xl text-gray-800 font-bold">
              TO THE MOST SUPER WEDDING EVER!
            </p>
          </div>
        </motion.div>

        {/* Couple Photos in comic panels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
        >
          {couple.bride.photo && (
            <motion.div 
              className="relative"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0]
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-48 h-48 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-2">
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={couple.bride.photo}
                    alt={couple.bride.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              {/* Comic effect burst */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 bg-red-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>
            </motion.div>
          )}

          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl bg-yellow-400 border-4 border-black p-4 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            ⚡
          </motion.div>

          {couple.groom.photo && (
            <motion.div 
              className="relative"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 2, -2, 0]
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-48 h-48 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-2">
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={couple.groom.photo}
                    alt={couple.groom.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              {/* Comic effect burst */}
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Zap size={20} />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Couple Names in comic style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <h2 className="text-3xl md:text-5xl font-bold text-black uppercase tracking-wider mb-2" style={comicTextStyle}>
              {couple.bride.name} & {couple.groom.name}
            </h2>
            <div className="flex justify-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
              <Star className="w-6 h-6 text-red-600" fill="currentColor" />
              <Star className="w-6 h-6 text-blue-600" fill="currentColor" />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-yellow-400 border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <motion.div 
              className="w-2 h-6 bg-black rounded-full"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}