'use client'

import { motion } from 'framer-motion'
import { Star, Zap, Target, Shield } from 'lucide-react'

interface ThankYouSectionProps {
  couple: {
    bride: { name: string }
    groom: { name: string }
  }
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

export function ThankYouSection({ couple }: ThankYouSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-red-600 via-yellow-400 to-blue-600 relative overflow-hidden">
      {/* Speed lines background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-white"
            style={{
              height: '100%',
              left: `${6.25 * i}%`,
              transform: `rotate(${22.5 * i}deg)`,
              transformOrigin: 'center'
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Action words floating */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-20 left-10 bg-red-600 text-white px-6 py-3 border-4 border-black font-bold text-2xl transform -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        style={comicTextStyle}
      >
        AMAZING!
      </motion.div>

      <motion.div
        animate={{ 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-32 right-20 bg-blue-600 text-white px-6 py-3 border-4 border-black font-bold text-2xl transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        style={comicTextStyle}
      >
        FANTASTIC!
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.25, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-32 left-16 bg-yellow-400 text-black px-6 py-3 border-4 border-black font-bold text-2xl transform -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        style={comicTextStyle}
      >
        INCREDIBLE!
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Main thank you message */}
          <motion.div 
            className="bg-white border-4 border-black p-12 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 border-4 border-black"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 border-4 border-black"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-600 border-4 border-black"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-600 border-4 border-black"></div>
            
            {/* Action bursts */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 left-1/4 bg-yellow-400 text-black w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Star size={24} />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 right-1/4 bg-red-600 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Zap size={24} />
            </motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-8 left-1/4 bg-blue-600 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Target size={24} />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, -360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 right-1/4 bg-green-500 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Shield size={24} />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2 
                className="text-5xl md:text-7xl font-bold text-black mb-8 uppercase tracking-wider pt-8"
                style={comicTextStyle}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                THANK YOU!
              </motion.h2>
              
              <div className="bg-yellow-400 border-4 border-black p-2 inline-block mb-8">
                <div className="w-32 h-2 bg-black mx-auto"></div>
              </div>
              
              <p className="text-xl md:text-2xl font-bold text-black leading-relaxed mb-8 max-w-3xl mx-auto">
                YOU'VE MADE OUR LOVE STORY THE GREATEST ADVENTURE EVER! 
                THANK YOU FOR BEING PART OF OUR SUPER TEAM AND FOR BRINGING 
                YOUR AMAZING POWERS TO OUR CELEBRATION!
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <div className="bg-red-600 text-white px-6 py-3 border-4 border-black inline-block mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-3xl md:text-4xl font-bold uppercase tracking-wider" style={comicTextStyle}>
                    WITH SUPER LOVE,
                  </p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide" style={comicTextStyle}>
                  {couple.bride.name} & {couple.groom.name}
                </p>
              </motion.div>
              
              {/* Action words grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="bg-red-600 text-white px-3 py-2 border-4 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={comicTextStyle}>
                  LOVE!
                </div>
                <div className="bg-blue-600 text-white px-3 py-2 border-4 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={comicTextStyle}>
                  JOY!
                </div>
                <div className="bg-yellow-400 text-black px-3 py-2 border-4 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={comicTextStyle}>
                  POWER!
                </div>
                <div className="bg-green-500 text-white px-3 py-2 border-4 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={comicTextStyle}>
                  UNITY!
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Final action quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <motion.div 
              className="bg-white border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ scale: 1.05 }}
            >
              <blockquote className="text-2xl md:text-3xl font-bold text-black max-w-2xl mx-auto uppercase tracking-wide" style={comicTextStyle}>
                "TOGETHER WE'RE UNSTOPPABLE!"
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Final celebration burst */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.4, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="bg-red-600 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Star size={32} />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-yellow-400 text-black w-20 h-20 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Zap size={36} />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, -360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="bg-blue-600 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Target size={32} />
              </motion.div>
            </div>
          </motion.div>

          {/* Final action words */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <motion.div 
              className="text-6xl"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="inline-block bg-red-600 text-white px-4 py-2 border-4 border-black mx-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={comicTextStyle}>
                THE
              </span>
              <span className="inline-block bg-yellow-400 text-black px-4 py-2 border-4 border-black mx-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={comicTextStyle}>
                END!
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-600 to-transparent"></div>
    </section>
  )
}