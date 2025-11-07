'use client'

import { motion } from 'framer-motion'
import { Heart, Leaf } from 'lucide-react'
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
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 text-emerald-600"
        >
          <Leaf size={40} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 text-amber-500"
        >
          <Leaf size={35} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-dancing text-4xl md:text-6xl text-emerald-800 mb-4">
            You're Invited
          </h1>
          <p className="font-inter text-lg md:text-xl text-emerald-700 max-w-2xl mx-auto">
            Join us as we celebrate the beginning of our forever journey together
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
        >
          {couple.bride.photo && (
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-emerald-200/50 border-4 border-white">
                <Image
                  src={couple.bride.photo}
                  alt={couple.bride.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 text-rose-300"
              >
                <Heart size={24} fill="currentColor" />
              </motion.div>
            </div>
          )}

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl text-emerald-600"
          >
            &
          </motion.div>

          {couple.groom.photo && (
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-emerald-200/50 border-4 border-white">
                <Image
                  src={couple.groom.photo}
                  alt={couple.groom.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-2 -left-2 text-rose-300"
              >
                <Heart size={24} fill="currentColor" />
              </motion.div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="font-playfair text-3xl md:text-5xl text-emerald-800 mb-4">
            {couple.bride.name} & {couple.groom.name}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-emerald-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}