'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Zap, Star } from 'lucide-react'
import Image from 'next/image'

interface PhotoSliderSectionProps {
  photos: string[]
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

const comicQuotes = [
  "LOVE CONQUERS ALL!",
  "TOGETHER WE'RE UNSTOPPABLE!",
  "SUPER COUPLE POWERS ACTIVATED!",
  "LOVE IS OUR SUPERPOWER!",
  "HEROES IN LOVE!",
  "DYNAMIC DUO FOREVER!"
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-4" style={comicTextStyle}>
              PHOTO GALLERY
            </h2>
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              COMING SOON!
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-yellow-400">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white border-4 border-black p-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-4" style={comicTextStyle}>
              HERO GALLERY!
            </h2>
            <div className="bg-red-600 text-white px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              EPIC MOMENTS CAPTURED!
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main slider */}
          <motion.div 
            className="relative bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
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
                  
                  {/* Comic overlay with quote */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div 
                        className="bg-yellow-400 border-4 border-black p-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {/* Speech bubble tail */}
                        <div className="absolute -top-3 left-8 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-yellow-400"></div>
                        <div className="absolute -top-4 left-7 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-black"></div>
                        
                        <blockquote className="text-xl md:text-2xl font-bold text-black text-center max-w-3xl mx-auto uppercase tracking-wide" style={comicTextStyle}>
                          {comicQuotes[currentIndex % comicQuotes.length]}
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-red-600 hover:bg-red-700 border-4 border-black text-white flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-blue-600 hover:bg-blue-700 border-4 border-black text-white flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Play/Pause button */}
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 border-4 border-black text-black flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            {/* Action burst */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 left-4 bg-green-500 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Zap size={20} />
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
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
                  w-16 h-16 border-4 border-black overflow-hidden transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  ${index === currentIndex 
                    ? 'scale-110 border-red-600' 
                    : 'hover:border-yellow-400 opacity-70 hover:opacity-100'
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

          {/* Progress indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {photos.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                className={`
                  h-4 border-2 border-black transition-all duration-300
                  ${index === currentIndex 
                    ? 'w-8 bg-red-600' 
                    : 'w-4 bg-yellow-400 hover:bg-yellow-500'
                  }
                `}
              />
            ))}
          </div>

          {/* Photo counter */}
          <div className="text-center mt-4">
            <motion.div 
              className="bg-white border-4 border-black px-4 py-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-bold text-black uppercase tracking-wide">
                PHOTO {currentIndex + 1} OF {photos.length}
              </span>
            </motion.div>
          </div>

          {/* Action words */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-4 -right-4 bg-purple-600 text-white px-3 py-1 border-4 border-black font-bold text-sm transform rotate-12"
            style={comicTextStyle}
          >
            POW!
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}