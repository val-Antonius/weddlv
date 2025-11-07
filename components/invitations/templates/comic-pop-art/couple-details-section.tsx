'use client'

import { motion } from 'framer-motion'
import { Crown, Shield, Star } from 'lucide-react'
import Image from 'next/image'

interface CoupleDetailsSectionProps {
  couple: {
    bride: { name: string; parents: string; photo?: string }
    groom: { name: string; parents: string; photo?: string }
  }
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

export function CoupleDetailsSection({ couple }: CoupleDetailsSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-red-500 to-purple-600 relative">
      {/* Halftone pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 2px, transparent 2px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-yellow-400 border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider" style={comicTextStyle}>
              MEET THE HEROES!
            </h2>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 bg-white text-black px-4 py-2 border-4 border-black inline-block font-bold"
            style={comicTextStyle}
          >
            SUPER COUPLE ORIGIN STORY!
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bride - Comic Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
              whileHover={{ 
                scale: 1.02,
                x: [-2, 2, -2, 2, 0]
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Comic panel corner */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
              
              {/* Hero badge */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Crown size={20} />
              </motion.div>
              
              {couple.bride.photo && (
                <div className="w-40 h-40 mx-auto mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-100">
                  <Image
                    src={couple.bride.photo}
                    alt={couple.bride.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              <h3 className="text-3xl font-bold text-black mb-3 uppercase tracking-wide" style={comicTextStyle}>
                {couple.bride.name}
              </h3>
              
              <div className="bg-yellow-400 border-2 border-black p-3 mb-4">
                <p className="text-sm font-bold text-black uppercase">SUPER DAUGHTER OF</p>
                <p className="text-lg font-bold text-black">{couple.bride.parents}</p>
              </div>

              {/* Speech bubble */}
              <div className="relative bg-white border-4 border-black p-4 rounded-2xl">
                <div className="absolute -top-3 left-6 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-white"></div>
                <div className="absolute -top-4 left-5 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-black"></div>
                <p className="text-sm font-bold text-black">"READY FOR LOVE ADVENTURE!"</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Groom - Comic Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div 
              className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
              whileHover={{ 
                scale: 1.02,
                x: [2, -2, 2, -2, 0]
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Comic panel corner */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              
              {/* Hero badge */}
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Shield size={20} />
              </motion.div>
              
              {couple.groom.photo && (
                <div className="w-40 h-40 mx-auto mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-100">
                  <Image
                    src={couple.groom.photo}
                    alt={couple.groom.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              <h3 className="text-3xl font-bold text-black mb-3 uppercase tracking-wide" style={comicTextStyle}>
                {couple.groom.name}
              </h3>
              
              <div className="bg-yellow-400 border-2 border-black p-3 mb-4">
                <p className="text-sm font-bold text-black uppercase">SUPER SON OF</p>
                <p className="text-lg font-bold text-black">{couple.groom.parents}</p>
              </div>

              {/* Speech bubble */}
              <div className="relative bg-white border-4 border-black p-4 rounded-2xl">
                <div className="absolute -top-3 right-6 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-white"></div>
                <div className="absolute -top-4 right-5 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent border-b-black"></div>
                <p className="text-sm font-bold text-black">"LOVE POWERS ACTIVATED!"</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Action burst */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block">
            <div className="bg-yellow-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wider"
                style={comicTextStyle}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TOGETHER THEY'RE UNSTOPPABLE!
              </motion.h3>
              <div className="flex justify-center gap-2 mt-4">
                <Star className="w-8 h-8 text-red-600" fill="currentColor" />
                <Star className="w-8 h-8 text-blue-600" fill="currentColor" />
                <Star className="w-8 h-8 text-red-600" fill="currentColor" />
              </div>
            </div>
            
            {/* Speed lines */}
            <div className="absolute -inset-4 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-black"
                  style={{
                    height: '20px',
                    left: `${12.5 * i}%`,
                    top: '-10px',
                    transform: `rotate(${45 * i}deg)`,
                    transformOrigin: 'bottom'
                  }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}