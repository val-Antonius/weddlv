'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Star } from 'lucide-react'
import Image from 'next/image'

interface PhotoSliderSectionProps {
  photos: string[]
}

const vintageQuotes = [
  "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
  "I have found the one whom my soul loves.",
  "Two souls with but a single thought, two hearts that beat as one.",
  "Love is not just looking at each other, it's looking in the same direction.",
  "The best love is the kind that awakens the soul and makes us reach for more.",
  "A successful marriage requires falling in love many times, always with the same person."
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
      <section className="py-20 px-4 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-4 tracking-wider">
            OUR GALLERY
          </h2>
          <p className="font-crimson text-lg text-zinc-700 italic">
            Photographs to follow...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            OUR GALLERY
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Moments captured in time, memories preserved forever
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Star className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main slider */}
          <div className="relative border-4 border-zinc-900 bg-white drop-shadow-2xl overflow-hidden">
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
                    className="object-cover grayscale"
                  />
                  
                  {/* Vintage overlay with quote */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="border-2 border-white p-6 bg-black/50 backdrop-blur-sm">
                        <motion.blockquote
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="font-great-vibes text-xl md:text-2xl text-white text-center max-w-3xl mx-auto"
                        >
                          "{vintageQuotes[currentIndex % vintageQuotes.length]}"
                        </motion.blockquote>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 border-2 border-white bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 border-2 border-white bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Play/Pause button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 w-12 h-12 border-2 border-white bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-zinc-900"></div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-900"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-zinc-900"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-zinc-900"></div>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-16 h-16 border-2 overflow-hidden transition-all duration-300
                  ${index === currentIndex 
                    ? 'border-zinc-900 scale-110 drop-shadow-lg' 
                    : 'border-zinc-400 hover:border-zinc-700 opacity-70 hover:opacity-100'
                  }
                `}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full grayscale"
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
                  h-2 transition-all duration-300
                  ${index === currentIndex 
                    ? 'w-8 bg-zinc-900' 
                    : 'w-2 bg-zinc-400 hover:bg-zinc-600'
                  }
                `}
              />
            ))}
          </div>

          {/* Photo counter */}
          <div className="text-center mt-4">
            <div className="border border-zinc-900 px-4 py-2 bg-white inline-block">
              <span className="font-crimson text-zinc-900 tracking-wide">
                {currentIndex + 1} OF {photos.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}