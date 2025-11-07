'use client'

import { motion } from 'framer-motion'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisCoupleDetailsProps {
  config: MemphisAbstractConfig
}

export function MemphisCoupleDetails({ config }: MemphisCoupleDetailsProps) {
  return (
    <section id="couple-details" className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-orange-100 to-lime-100 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #ec4899 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #fde047 2px, transparent 2px),
            radial-gradient(circle at 50% 50%, #22d3ee 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px, 80px 80px, 100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-6xl font-black transform -rotate-3 bg-yellow-300 px-8 py-4 inline-block border-8 border-black shadow-[12px_12px_0_theme(colors.pink.400)] mb-8">
            MEET THE COUPLE
          </div>
        </motion.div>

        {/* Couple Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Bride */}
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -10 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-right"
          >
            <div className="relative">
              {/* Photo Placeholder */}
              <div className="w-80 h-80 mx-auto lg:ml-auto bg-gradient-to-br from-pink-400 to-purple-600 transform rotate-6 border-8 border-black shadow-[16px_16px_0_theme(colors.cyan.400)] mb-8 relative overflow-hidden">
                <div className="absolute inset-4 bg-white flex items-center justify-center text-6xl font-black text-gray-400 transform -rotate-6">
                  PHOTO
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full border-4 border-black" />
                <div className="absolute -bottom-4 -left-4 w-8 h-16 bg-lime-500 rotate-45 border-4 border-black" />
              </div>

              {/* Name */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-pink-400 text-white text-5xl font-black px-8 py-4 transform -rotate-3 border-8 border-black shadow-[8px_8px_0_theme(colors.purple.600)] mb-6 inline-block"
              >
                {config.couple.bride}
              </motion.div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-white border-4 border-black p-4 transform rotate-2 shadow-[6px_6px_0_theme(colors.orange.500)]">
                  <div className="text-xl font-bold">THE CREATIVE ONE</div>
                  <div className="text-gray-600">Loves art, design & bold colors</div>
                </div>
                <div className="bg-cyan-400 border-4 border-black p-4 transform -rotate-1 shadow-[6px_6px_0_theme(colors.red.500)]">
                  <div className="text-xl font-bold">FAVORITE SHAPE</div>
                  <div className="text-black">Asymmetric triangles</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* VS/Heart Connector */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-20"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-red-500 rounded-full border-8 border-black shadow-[8px_8px_0_theme(colors.yellow.300)] flex items-center justify-center text-6xl"
              >
                ❤️
              </motion.div>
              {/* Surrounding shapes */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rotate-45 border-2 border-black"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-cyan-400 rounded-full border-2 border-black"
              />
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ x: 100, opacity: 0, rotate: 10 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="relative">
              {/* Photo Placeholder */}
              <div className="w-80 h-80 mx-auto lg:mr-auto bg-gradient-to-br from-cyan-400 to-blue-600 transform -rotate-6 border-8 border-black shadow-[16px_16px_0_theme(colors.orange.500)] mb-8 relative overflow-hidden">
                <div className="absolute inset-4 bg-white flex items-center justify-center text-6xl font-black text-gray-400 transform rotate-6">
                  PHOTO
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-lime-500 border-4 border-black" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-600 rounded-full border-4 border-black" />
              </div>

              {/* Name */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-cyan-400 text-black text-5xl font-black px-8 py-4 transform rotate-3 border-8 border-black shadow-[8px_8px_0_theme(colors.lime.500)] mb-6 inline-block"
              >
                {config.couple.groom}
              </motion.div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-white border-4 border-black p-4 transform -rotate-2 shadow-[6px_6px_0_theme(colors.purple.600)]">
                  <div className="text-xl font-bold">THE LOGICAL ONE</div>
                  <div className="text-gray-600">Brings order to the chaos</div>
                </div>
                <div className="bg-yellow-300 border-4 border-black p-4 transform rotate-1 shadow-[6px_6px_0_theme(colors.blue.600)]">
                  <div className="text-xl font-bold">FAVORITE SHAPE</div>
                  <div className="text-black">Perfect circles</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-lime-500 text-black text-3xl font-black px-12 py-6 transform rotate-2 border-8 border-black shadow-[12px_12px_0_theme(colors.red.500)] inline-block">
            OPPOSITES ATTRACT!
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white text-xl font-black px-8 py-4 transform -rotate-2 border-6 border-black shadow-[8px_8px_0_theme(colors.yellow.300)] hover:shadow-[12px_12px_0_theme(colors.pink.400)] transition-all duration-200"
            onClick={() => {
              document.getElementById('save-the-date')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            CONTINUE THE STORY →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}