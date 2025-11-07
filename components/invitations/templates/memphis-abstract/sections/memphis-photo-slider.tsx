'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisPhotoSliderProps {
  config: MemphisAbstractConfig
}

export function MemphisPhotoSlider({ config }: MemphisPhotoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
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
    <section id="photo-slider" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 via-pink-100 to-cyan-100 py-20 relative overflow-hidden">
      {/* Abstract Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, #ec4899 0, #ec4899 10px, transparent 10px, transparent 20px),
            repeating-linear-gradient(-45deg, #fde047 0, #fde047 15px, transparent 15px, transparent 30px),
            repeating-linear-gradient(90deg, #22d3ee 0, #22d3ee 5px, transparent 5px, transparent 25px)
          `
        }} />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-6xl md:text-7xl font-black mb-6">
            <span className="inline-block transform -rotate-3 bg-orange-500 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.cyan.400)] mr-4">
              PHOTO
            </span>
            <span className="inline-block transform rotate-6 bg-lime-500 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.purple.600)]">
              CHAOS
            </span>
          </div>
          <div className="text-2xl font-bold bg-white border-4 border-black px-6 py-3 transform rotate-1 shadow-[6px_6px_0_theme(colors.pink.400)] inline-block">
            OUR GEOMETRIC LOVE STORY
          </div>
        </motion.div>

        {/* Main Photo Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white border-8 border-black transform rotate-1 shadow-[20px_20px_0_theme(colors.yellow.300)] p-8 relative">
            {/* Photo Container */}
            <div className="relative aspect-video bg-gradient-to-br from-pink-200 to-cyan-200 border-6 border-black overflow-hidden transform -rotate-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.2, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-6xl font-black text-gray-400 bg-white border-4 border-black px-8 py-4 transform rotate-3 shadow-[8px_8px_0_theme(colors.purple.600)]">
                    PHOTO {currentIndex + 1}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-4 border-4 border-black shadow-[6px_6px_0_theme(colors.yellow.300)] hover:shadow-[8px_8px_0_theme(colors.cyan.400)] transition-all duration-200 rotate-3"
              >
                <ChevronLeft size={32} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 border-4 border-black shadow-[6px_6px_0_theme(colors.pink.400)] hover:shadow-[8px_8px_0_theme(colors.lime.500)] transition-all duration-200 -rotate-3"
              >
                <ChevronRight size={32} />
              </motion.button>

              {/* Photo Counter */}
              <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 border-4 border-black font-black text-lg transform rotate-6 shadow-[4px_4px_0_theme(colors.yellow.300)]">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Frame Decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rotate-45 border-4 border-black" />
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-cyan-400 rounded-full border-4 border-black" />
            <div className="absolute -bottom-4 -left-4 w-6 h-12 bg-lime-500 skew-x-12 border-4 border-black" />
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-orange-500 border-4 border-black" />
          </div>
        </motion.div>

        {/* Thumbnail Grid */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-4"
        >
          {photos.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 border-4 ${
                index === currentIndex 
                  ? 'border-red-500 bg-red-500' 
                  : 'border-black bg-white'
              } shadow-[6px_6px_0_theme(colors.purple.600)] transition-all duration-200 transform ${
                index % 3 === 0 ? 'rotate-3' : index % 3 === 1 ? '-rotate-3' : 'rotate-1'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center text-lg font-black ${
                index === currentIndex ? 'text-white' : 'text-gray-600'
              }`}>
                {index + 1}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Crazy Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {[
            { number: photos.length, label: 'WILD PHOTOS', color: 'bg-pink-400', shadow: 'shadow-[6px_6px_0_theme(colors.cyan.400)]' },
            { number: '∞', label: 'MEMORIES', color: 'bg-yellow-300', shadow: 'shadow-[6px_6px_0_theme(colors.purple.600)]' },
            { number: '100%', label: 'HAPPINESS', color: 'bg-lime-500', shadow: 'shadow-[6px_6px_0_theme(colors.red.500)]' },
            { number: '2', label: 'CRAZY PEOPLE', color: 'bg-cyan-400', shadow: 'shadow-[6px_6px_0_theme(colors.orange.500)]' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
              className={`${stat.color} border-4 border-black p-6 text-center transform ${
                i % 2 === 0 ? 'rotate-2' : '-rotate-2'
              } ${stat.shadow}`}
            >
              <div className="text-4xl font-black text-black mb-2">{stat.number}</div>
              <div className="text-lg font-bold text-white">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Squiggle Divider */}
        <motion.div
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mb-12"
        >
          <svg width="500" height="100" className="mx-auto">
            <motion.path
              d="M25,50 Q75,25 125,50 T225,50 Q275,75 325,50 T425,50 T475,50"
              stroke="#ec4899"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.path
              d="M35,60 Q85,35 135,60 T235,60 Q285,85 335,60 T435,60 T485,60"
              stroke="#22d3ee"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white text-2xl font-black px-12 py-6 transform -rotate-3 border-8 border-black shadow-[12px_12px_0_theme(colors.yellow.300)] hover:shadow-[16px_16px_0_theme(colors.pink.400)] transition-all duration-200"
            onClick={() => {
              document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            MORE CHAOS! →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}