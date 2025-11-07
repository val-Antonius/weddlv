'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface PhotoSliderSectionProps {
  photos: string[]
}

const joyfulQuotes = [
  "Love is the bridge between two hearts! 💕",
  "Together is a wonderful place to be! ✨",
  "You are my today and all of my tomorrows! 🌈",
  "Love is friendship set on fire! 🔥",
  "Every love story is beautiful, but ours is my favorite! 💖",
  "Life is better when we're laughing together! 😄"
]

export function PhotoSliderSection({ photos }: PhotoSliderSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || photos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, photos.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!photos.length) {
    return (
      <section className="py-20 px-4 bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-quicksand text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Our Photo Gallery 📸
          </h2>
          <p className="font-nunito text-xl text-gray-700">
            Beautiful memories coming soon! ✨
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-quicksand text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Our Colorful Journey! 📸
          </motion.h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Every picture tells a story of our love! 💕
          </p>
          <motion.div 
            className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main slider */}
          <motion.div 
            className="relative bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl p-2 shadow-lg overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative h-96 md:h-[500px] bg-white rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photos[currentIndex]}
                    alt={`Photo ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Colorful overlay with quote */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div 
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-gradient-to-r from-pink-300 to-purple-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <blockquote className="font-pacifico text-xl md:text-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-center max-w-3xl mx-auto">
                          {joyfulQuotes[currentIndex % joyfulQuotes.length]}
                        </blockquote>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-pink-500" />
            </motion.button>
            
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-purple-500" />
            </motion.button>

            {/* Play/Pause button */}
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5 text-blue-500" />
              ) : (
                <Play className="w-5 h-5 text-green-500 ml-0.5" />
              )}
            </motion.button>

            {/* Floating decorations */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 left-4 text-yellow-400"
            >
              <Sparkles size={24} />
            </motion.div>
          </motion.div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {photos.map((photo, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 border-2
                  ${index === currentIndex 
                    ? 'border-pink-500 scale-110 shadow-lg shadow-pink-500/50' 
                    : 'border-white hover:border-purple-300 opacity-70 hover:opacity-100'
                  }
                `}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </motion.button>
            ))}
          </div>

          {/* Colorful progress indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {photos.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                className={`
                  h-3 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'w-8 bg-gradient-to-r from-pink-400 to-purple-400' 
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>

          {/* Photo counter */}
          <div className="text-center mt-4">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-nunito text-gray-700 font-semibold">
                {currentIndex + 1} of {photos.length} 📷
              </span>
            </motion.div>
          </div>

          {/* Fun emoji decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8"
          >
            <motion.div 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕📸✨🌈
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}