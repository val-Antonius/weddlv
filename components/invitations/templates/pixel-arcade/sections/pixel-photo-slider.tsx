'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelPhotoSliderProps {
  config: PixelArcadeConfig
}

export function PixelPhotoSlider({ config }: PixelPhotoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Demo photos if none provided
  const photos = config.content.photos.length > 0 ? config.content.photos : [
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ]

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <section id="photo-slider" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-20 relative">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="bg-magenta-500 text-white px-6 py-2 inline-block font-bold text-lg mb-4 border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.purple.700)]">
            📸 PHOTO GALLERY
          </div>
          <div className="text-3xl font-bold text-cyan-400 mb-2" style={{
            textShadow: '3px 3px 0px #ff00ff'
          }}>
            MEMORY BANK
          </div>
          <div className="text-lime-400 font-mono">
            LOADING PRECIOUS MOMENTS...
          </div>
        </motion.div>

        {/* Main Photo Display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-8"
        >
          {/* CRT Monitor Frame */}
          <div className="bg-gray-700 p-8 border-4 border-gray-500 shadow-[12px_12px_0px_0px_theme(colors.gray.800)] relative">
            {/* Screen Bezel */}
            <div className="bg-black p-4 border-4 border-gray-600 relative">
              {/* Photo Container */}
              <div className="relative aspect-video bg-gray-900 border-2 border-cyan-400 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="w-full h-full bg-gradient-to-br from-cyan-400 to-magenta-500 flex items-center justify-center text-white text-2xl font-bold"
                      style={{ imageRendering: 'pixelated' }}
                    >
                      PHOTO {currentIndex + 1}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)'
                }} />

                {/* Navigation Arrows */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-300 text-gray-900 p-3 border-2 border-white shadow-[4px_4px_0px_0px_theme(colors.yellow.600)] hover:shadow-[6px_6px_0px_0px_theme(colors.yellow.600)] transition-all duration-100"
                >
                  <ChevronLeft size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-300 text-gray-900 p-3 border-2 border-white shadow-[4px_4px_0px_0px_theme(colors.yellow.600)] hover:shadow-[6px_6px_0px_0px_theme(colors.yellow.600)] transition-all duration-100"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>

              {/* Photo Counter */}
              <div className="absolute top-2 right-2 bg-black border-2 border-lime-400 px-3 py-1 font-mono text-lime-400 text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Monitor Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-red-500 rounded-full border-2 border-gray-400" />
                ))}
              </div>
              <div className="text-gray-400 font-mono text-sm">PIXEL MONITOR v2.0</div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Navigation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-4"
        >
          {photos.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 border-4 ${
                index === currentIndex 
                  ? 'border-cyan-400 bg-cyan-400' 
                  : 'border-gray-500 bg-gray-700'
              } shadow-[4px_4px_0px_0px_theme(colors.gray.600)] transition-all duration-100`}
            >
              <div className="w-full h-full bg-gradient-to-br from-magenta-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Game-style Info Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto bg-indigo-900 border-4 border-yellow-300 p-6 font-mono"
        >
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-yellow-300 font-bold mb-1">PHOTOS LOADED:</div>
              <div className="text-2xl text-cyan-400 font-bold">{photos.length}</div>
            </div>
            <div>
              <div className="text-yellow-300 font-bold mb-1">MEMORIES:</div>
              <div className="text-2xl text-magenta-500 font-bold">∞</div>
            </div>
            <div>
              <div className="text-yellow-300 font-bold mb-1">HAPPINESS:</div>
              <div className="text-2xl text-lime-400 font-bold">MAX</div>
            </div>
          </div>
        </motion.div>

        {/* Control Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="bg-gray-800 border-4 border-magenta-500 p-4 inline-block font-mono">
            <div className="text-magenta-500 font-bold mb-2">CONTROLS:</div>
            <div className="text-cyan-400 text-sm">
              ← → ARROW KEYS OR CLICK THUMBNAILS TO NAVIGATE
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.green.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.green.700)] transition-all duration-100 font-mono"
            onClick={() => {
              document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            NEXT STAGE →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}