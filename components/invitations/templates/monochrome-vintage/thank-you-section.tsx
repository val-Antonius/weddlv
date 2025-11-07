'use client'

import { motion } from 'framer-motion'
import { Award, Crown, Diamond, Star } from 'lucide-react'

interface ThankYouSectionProps {
  couple: {
    bride: { name: string }
    groom: { name: string }
  }
}

export function ThankYouSection({ couple }: ThankYouSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-zinc-100 relative overflow-hidden">
      {/* Background Art Deco patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-zinc-900 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-zinc-900"></div>
        <div className="absolute bottom-40 left-40 w-20 h-20 bg-zinc-900 rotate-12"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 border border-zinc-900 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-zinc-900"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-zinc-900 rotate-45"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Main thank you message */}
          <div className="border-4 border-zinc-900 p-12 md:p-16 bg-white drop-shadow-2xl relative">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-zinc-900"></div>
            <div className="absolute top-0 right-0 w-12 h-12 bg-zinc-900"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-zinc-900"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-zinc-900"></div>
            
            {/* Art Deco corner elements */}
            <div className="absolute top-16 left-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>
            <div className="absolute top-16 right-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>
            <div className="absolute bottom-16 left-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>
            <div className="absolute bottom-16 right-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>

            {/* Decorative icons */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-8 left-1/2 transform -translate-x-1/2 text-zinc-900"
            >
              <Diamond size={24} />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-zinc-900"
            >
              <Star size={24} />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="font-cinzel text-4xl md:text-6xl text-zinc-900 mb-8 tracking-wider">
                THANK YOU
              </h2>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-32 h-px bg-zinc-900"></div>
                <Crown className="w-6 h-6 text-zinc-900" />
                <div className="w-32 h-px bg-zinc-900"></div>
              </div>
              
              <p className="font-crimson text-lg md:text-xl text-zinc-700 leading-relaxed mb-8 max-w-3xl mx-auto italic">
                Your distinguished presence has graced our celebration with elegance and joy. 
                We are profoundly grateful for your participation in this momentous occasion 
                and for the honor of sharing our love story with you.
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p className="font-great-vibes text-3xl md:text-4xl text-zinc-900 mb-4">
                  With sincere appreciation,
                </p>
                <p className="font-cinzel text-2xl md:text-3xl text-zinc-900 tracking-wide">
                  {couple.bride.name} & {couple.groom.name}
                </p>
              </motion.div>
              
              {/* Decorative bottom element */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-zinc-900"></div>
                <div className="w-2 h-2 bg-zinc-900 rotate-45"></div>
                <div className="w-8 h-px bg-zinc-900"></div>
              </div>
            </motion.div>
          </div>

          {/* Additional decorative quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <div className="border-2 border-zinc-900 p-6 bg-white inline-block">
              <blockquote className="font-great-vibes text-2xl md:text-3xl text-zinc-900 max-w-2xl mx-auto">
                "Love is the master key that opens the gates of happiness"
              </blockquote>
            </div>
          </motion.div>

          {/* Final decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-8 h-8 text-zinc-900" />
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Diamond className="w-10 h-10 text-zinc-900" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Crown className="w-8 h-8 text-zinc-900" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-100 to-transparent"></div>
    </section>
  )
}