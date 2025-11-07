'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface PhotoSliderSectionProps {
  photos: string[]
}

const inspirationalQuotes = [
  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
  "A successful marriage requires falling in love many times, always with the same person.",
  "The best thing to hold onto in life is each other.",
  "Love is composed of a single soul inhabiting two bodies.",
  "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
  "Love doesn't make the world go round. Love is what makes the ride worthwhile."
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
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Our Journey Together
          </h2>
          <p className="font-inter text-lg text-emerald-700">
            Photos coming soon...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Our Journey Together
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Capturing the beautiful moments that led us to this special day
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main slider */}
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl shadow-emerald-200/30 border-2 border-emerald-100">
            <div className="relative h-96 md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photos[currentIndex]}
                    alt={`Photo ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay with quote */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-dancing text-xl md:text-2xl text-white text-center max-w-3xl mx-auto"
                      >
                        "{inspirationalQuotes[currentIndex % inspirationalQuotes.length]}"
                      </motion.blockquote>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>

            {/* Play/Pause button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5 text-emerald-600" />
              ) : (
                <Play className="w-5 h-5 text-emerald-600 ml-0.5" />
              )}
            </button>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300
                  ${index === currentIndex 
                    ? 'border-emerald-500 scale-110 shadow-lg' 
                    : 'border-emerald-200 hover:border-emerald-300 opacity-70 hover:opacity-100'
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
              </button>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'w-8 bg-emerald-600' 
                    : 'w-2 bg-emerald-300 hover:bg-emerald-400'
                  }
                `}
              />
            ))}
          </div>

          {/* Photo counter */}
          <div className="text-center mt-4">
            <span className="font-inter text-emerald-600">
              {currentIndex + 1} of {photos.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}