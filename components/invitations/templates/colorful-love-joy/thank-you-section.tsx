'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, PartyPopper, Gift } from 'lucide-react'

interface ThankYouSectionProps {
  couple: {
    bride: { name: string }
    groom: { name: string }
  }
}

export function ThankYouSection({ couple }: ThankYouSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="absolute opacity-20"
            style={{
              left: `${5 + i * 6}%`,
              top: `${10 + (i % 5) * 15}%`
            }}
          >
            {i % 5 === 0 && <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />}
            {i % 5 === 1 && <Star className="w-6 h-6 text-yellow-400" />}
            {i % 5 === 2 && <Sparkles className="w-7 h-7 text-purple-400" />}
            {i % 5 === 3 && <PartyPopper className="w-6 h-6 text-blue-400" />}
            {i % 5 === 4 && <Gift className="w-7 h-7 text-green-400" />}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Main thank you message */}
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 md:p-16 shadow-lg relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Floating decorations inside card */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-6 left-6 text-pink-300"
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [360, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-6 right-6 text-yellow-300"
            >
              <Star size={28} />
            </motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-6 left-6 text-purple-300"
            >
              <Sparkles size={30} />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, -360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-6 right-6 text-blue-300"
            >
              <PartyPopper size={32} />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2 
                className="font-pacifico text-5xl md:text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-8"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Thank You! 🎉
              </motion.h2>
              
              <motion.div 
                className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <p className="font-nunito text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                Your love, laughter, and colorful energy have made our celebration absolutely magical! 
                Thank you for being part of our rainbow love story and for filling our hearts with so much joy! 🌈💕
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p className="font-pacifico text-3xl md:text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                  With all our love & gratitude,
                </p>
                <p className="font-quicksand text-2xl md:text-3xl font-bold text-gray-700">
                  {couple.bride.name} & {couple.groom.name}
                </p>
              </motion.div>
              
              {/* Colorful emoji decoration */}
              <motion.div 
                className="flex justify-center gap-2 text-4xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💕
                </motion.span>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  🌈
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                >
                  🎊
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Additional joyful quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <blockquote className="font-pacifico text-2xl md:text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent max-w-2xl mx-auto">
                "Life is a party, and love is the confetti!" 🎉
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Final celebration animation */}
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
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-10 h-10 text-pink-500" fill="currentColor" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-12 h-12 text-yellow-500" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  rotate: [0, -360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-purple-500" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <PartyPopper className="w-10 h-10 text-blue-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Final emoji celebration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <motion.div 
              className="text-5xl"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🥳🎊🌈💖✨🎉
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-300 to-transparent"></div>
    </section>
  )
}