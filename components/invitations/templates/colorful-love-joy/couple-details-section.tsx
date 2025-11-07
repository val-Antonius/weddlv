'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Gift } from 'lucide-react'
import Image from 'next/image'

interface CoupleDetailsSectionProps {
  couple: {
    bride: { name: string; parents: string; photo?: string }
    groom: { name: string; parents: string; photo?: string }
  }
}

export function CoupleDetailsSection({ couple }: CoupleDetailsSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-quicksand text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">
            Meet the Couple
          </h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Two hearts, one beautiful love story! 💖
          </p>
          <motion.div 
            className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              className="relative mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl p-8 shadow-lg shadow-pink-500/50 relative overflow-hidden">
                {/* Floating decorations */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 right-4 text-white/30"
                >
                  <Heart size={24} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-4 left-4 text-white/30"
                >
                  <Star size={20} />
                </motion.div>
                
                {couple.bride.photo && (
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <Image
                      src={couple.bride.photo}
                      alt={couple.bride.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <h3 className="font-pacifico text-3xl text-white mb-3 drop-shadow-lg">
                  {couple.bride.name}
                </h3>
                
                <div className="text-white">
                  <p className="font-nunito text-sm mb-2 opacity-90">Daughter of</p>
                  <p className="font-nunito text-lg font-semibold">{couple.bride.parents}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div 
              className="relative mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-gradient-to-br from-blue-400 to-sky-400 rounded-2xl p-8 shadow-lg shadow-blue-500/50 relative overflow-hidden">
                {/* Floating decorations */}
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 left-4 text-white/30"
                >
                  <Gift size={24} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-4 right-4 text-white/30"
                >
                  <Star size={20} />
                </motion.div>
                
                {couple.groom.photo && (
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <Image
                      src={couple.groom.photo}
                      alt={couple.groom.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <h3 className="font-pacifico text-3xl text-white mb-3 drop-shadow-lg">
                  {couple.groom.name}
                </h3>
                
                <div className="text-white">
                  <p className="font-nunito text-sm mb-2 opacity-90">Son of</p>
                  <p className="font-nunito text-lg font-semibold">{couple.groom.parents}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Love quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-3xl mx-auto border-4 border-gradient-to-r from-pink-300 to-purple-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <blockquote className="font-pacifico text-3xl md:text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              "Love is friendship set on fire!" 🔥💕
            </blockquote>
            <motion.div 
              className="flex justify-center mt-4 gap-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
              <Heart className="w-6 h-6 text-purple-400" fill="currentColor" />
              <Heart className="w-6 h-6 text-blue-400" fill="currentColor" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}