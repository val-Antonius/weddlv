'use client'

import { motion } from 'framer-motion'
import { Award, Crown } from 'lucide-react'
import Image from 'next/image'

interface CoupleDetailsSectionProps {
  couple: {
    bride: { name: string; parents: string; photo?: string }
    groom: { name: string; parents: string; photo?: string }
  }
}

export function CoupleDetailsSection({ couple }: CoupleDetailsSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zinc-100 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            THE COUPLE
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Award className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <div className="border-2 border-zinc-900 p-8 bg-white drop-shadow-2xl relative">
                {/* Art Deco corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-zinc-900"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-zinc-900"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-zinc-900"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-zinc-900"></div>
                
                {couple.bride.photo && (
                  <div className="w-40 h-40 mx-auto mb-6 border-4 border-zinc-900 overflow-hidden">
                    <Image
                      src={couple.bride.photo}
                      alt={couple.bride.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full grayscale"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-zinc-900" />
                </div>
                
                <h3 className="font-cinzel text-3xl text-zinc-900 mb-4 tracking-wide">
                  {couple.bride.name}
                </h3>
                
                <div className="text-zinc-700 font-crimson">
                  <p className="text-sm mb-2 italic">Daughter of</p>
                  <p className="text-lg">{couple.bride.parents}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <div className="border-2 border-zinc-900 p-8 bg-white drop-shadow-2xl relative">
                {/* Art Deco corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-zinc-900"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-zinc-900"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-zinc-900"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-zinc-900"></div>
                
                {couple.groom.photo && (
                  <div className="w-40 h-40 mx-auto mb-6 border-4 border-zinc-900 overflow-hidden">
                    <Image
                      src={couple.groom.photo}
                      alt={couple.groom.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full grayscale"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-zinc-900" />
                </div>
                
                <h3 className="font-cinzel text-3xl text-zinc-900 mb-4 tracking-wide">
                  {couple.groom.name}
                </h3>
                
                <div className="text-zinc-700 font-crimson">
                  <p className="text-sm mb-2 italic">Son of</p>
                  <p className="text-lg">{couple.groom.parents}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="border-2 border-zinc-900 p-8 bg-white max-w-3xl mx-auto">
            <blockquote className="font-great-vibes text-3xl md:text-4xl text-zinc-900 mb-4">
              "Two souls, one heart"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-zinc-900"></div>
              <div className="w-2 h-2 bg-zinc-900 rotate-45"></div>
              <div className="w-16 h-px bg-zinc-900"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}