'use client'

import { motion } from 'framer-motion'
import { Diamond, Frame } from 'lucide-react'
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
      {/* Art Deco geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-zinc-900 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-zinc-900 rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-zinc-900 transform -translate-y-1/2 rotate-45"></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 border border-zinc-900 transform -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Decorative frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="border-2 border-zinc-900 p-12 md:p-16 relative"
        >
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-white border-2 border-zinc-900"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-zinc-900"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white border-2 border-zinc-900"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-zinc-900"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="font-cinzel text-4xl md:text-6xl text-zinc-900 mb-6 tracking-wider">
              WEDDING INVITATION
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-zinc-900"></div>
              <Diamond className="w-6 h-6 text-zinc-900" />
              <div className="w-16 h-px bg-zinc-900"></div>
            </div>
            <p className="font-crimson text-lg md:text-xl text-zinc-700 italic">
              The honour of your presence is requested
            </p>
          </motion.div>

          {/* Couple Photos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12"
          >
            {couple.bride.photo && (
              <div className="relative">
                <div className="w-48 h-48 border-4 border-zinc-900 relative overflow-hidden">
                  <Image
                    src={couple.bride.photo}
                    alt={couple.bride.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full grayscale"
                  />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-zinc-900"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-900"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-zinc-900"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-zinc-900"></div>
              </div>
            )}

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-4xl text-zinc-900"
            >
              <Diamond className="w-8 h-8" />
            </motion.div>

            {couple.groom.photo && (
              <div className="relative">
                <div className="w-48 h-48 border-4 border-zinc-900 relative overflow-hidden">
                  <Image
                    src={couple.groom.photo}
                    alt={couple.groom.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full grayscale"
                  />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-zinc-900"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-900"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-zinc-900"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-zinc-900"></div>
              </div>
            )}
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center"
          >
            <h2 className="font-great-vibes text-4xl md:text-6xl text-zinc-900 mb-6">
              {couple.bride.name} & {couple.groom.name}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-px bg-zinc-900"></div>
              <Frame className="w-6 h-6 text-zinc-900" />
              <div className="w-24 h-px bg-zinc-900"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-px h-16 bg-zinc-900 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}