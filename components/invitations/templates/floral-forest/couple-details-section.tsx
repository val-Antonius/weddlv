'use client'

import { motion } from 'framer-motion'
import { Flower, Flower2 } from 'lucide-react'
import Image from 'next/image'

interface CoupleDetailsSectionProps {
  couple: {
    bride: { name: string; parents: string; photo?: string }
    groom: { name: string; parents: string; photo?: string }
  }
}

export function CoupleDetailsSection({ couple }: CoupleDetailsSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-stone-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            The Happy Couple
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <div className="absolute -top-4 -left-4 text-rose-300 opacity-60">
                <Flower size={32} />
              </div>
              <div className="absolute -bottom-4 -right-4 text-amber-500 opacity-60">
                <Flower2 size={28} />
              </div>
              
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-emerald-200/30 border border-emerald-100">
                {couple.bride.photo && (
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-emerald-100">
                    <Image
                      src={couple.bride.photo}
                      alt={couple.bride.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <h3 className="font-playfair text-3xl text-emerald-800 mb-3">
                  {couple.bride.name}
                </h3>
                
                <div className="text-emerald-600 font-inter">
                  <p className="text-sm mb-2">Daughter of</p>
                  <p className="text-lg font-medium">{couple.bride.parents}</p>
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
              <div className="absolute -top-4 -right-4 text-amber-500 opacity-60">
                <Flower size={32} />
              </div>
              <div className="absolute -bottom-4 -left-4 text-rose-300 opacity-60">
                <Flower2 size={28} />
              </div>
              
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-emerald-200/30 border border-emerald-100">
                {couple.groom.photo && (
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-emerald-100">
                    <Image
                      src={couple.groom.photo}
                      alt={couple.groom.name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <h3 className="font-playfair text-3xl text-emerald-800 mb-3">
                  {couple.groom.name}
                </h3>
                
                <div className="text-emerald-600 font-inter">
                  <p className="text-sm mb-2">Son of</p>
                  <p className="text-lg font-medium">{couple.groom.parents}</p>
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
          <blockquote className="font-dancing text-2xl md:text-3xl text-emerald-700 max-w-3xl mx-auto">
            "Two souls with but a single thought, two hearts that beat as one"
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}