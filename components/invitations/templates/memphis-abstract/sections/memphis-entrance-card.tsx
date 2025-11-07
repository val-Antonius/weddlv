'use client'

import { motion } from 'framer-motion'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisEntranceCardProps {
  config: MemphisAbstractConfig
}

export function MemphisEntranceCard({ config }: MemphisEntranceCardProps) {
  return (
    <section id="entrance-card" className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-red-100 via-yellow-100 to-blue-100 py-20 relative overflow-hidden">
      {/* Chaotic Background */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              ['w-3 h-3', 'w-5 h-5', 'w-2 h-8', 'w-8 h-2'][Math.floor(Math.random() * 4)]
            } ${
              ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500', 'bg-lime-500'][Math.floor(Math.random() * 6)]
            } ${
              ['rounded-full', '', 'rotate-45'][Math.floor(Math.random() * 3)]
            } opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, Math.random() * 360],
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-12"
        >
          <div className="text-5xl md:text-6xl font-black mb-4">
            <span className="inline-block transform rotate-3 bg-purple-600 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.yellow.300)]">
              YOUR TICKET
            </span>
          </div>
          <div className="text-2xl font-bold bg-white border-4 border-black px-6 py-3 transform -rotate-2 shadow-[6px_6px_0_theme(colors.pink.400)] inline-block">
            TO THE WILDEST PARTY EVER!
          </div>
        </motion.div>

        {/* Main Ticket */}
        <motion.div
          initial={{ y: 100, opacity: 0, rotate: -10 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white border-8 border-black transform rotate-1 shadow-[20px_20px_0_theme(colors.cyan.400)] relative overflow-hidden">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 p-6 border-b-8 border-black relative">
              <div className="text-4xl font-black text-black mb-2">GEOMETRIC WEDDING BASH</div>
              <div className="text-xl font-bold text-purple-600">ADMIT ONE TO THE CHAOS</div>
              
              {/* Header decorations */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-red-500 rotate-45 border-4 border-black" />
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-lime-500 rounded-full border-4 border-black" />
            </div>

            <div className="grid md:grid-cols-3 gap-0">
              {/* Main Info */}
              <div className="md:col-span-2 p-8 border-r-8 border-dashed border-black">
                <div className="space-y-6">
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-pink-400 border-4 border-black p-4 transform rotate-2 shadow-[6px_6px_0_theme(colors.purple.600)]">
                      <div className="text-lg font-black text-white mb-1">DATE:</div>
                      <div className="text-2xl font-black text-black">
                        {new Date(config.couple.weddingDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="bg-cyan-400 border-4 border-black p-4 transform -rotate-2 shadow-[6px_6px_0_theme(colors.orange.500)]">
                      <div className="text-lg font-black text-black mb-1">TIME:</div>
                      <div className="text-2xl font-black text-white">6:00 PM</div>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="bg-yellow-300 border-4 border-black p-6 transform rotate-1 shadow-[8px_8px_0_theme(colors.red.500)]">
                    <div className="text-xl font-black text-purple-600 mb-2">VENUE:</div>
                    <div className="text-3xl font-black text-black mb-2">{config.content.venue.name}</div>
                    <div className="text-lg font-bold text-gray-700">{config.content.venue.address}</div>
                  </div>

                  {/* Special Instructions */}
                  <div className="bg-lime-500 border-4 border-black p-4 transform -rotate-1 shadow-[6px_6px_0_theme(colors.cyan.400)]">
                    <div className="text-lg font-black text-purple-600 mb-2">DRESS CODE:</div>
                    <div className="text-xl font-bold text-black">BOLD & COLORFUL ENCOURAGED!</div>
                  </div>
                </div>
              </div>

              {/* Ticket Stub */}
              <div className="p-8 bg-gradient-to-b from-purple-100 to-orange-100 relative">
                <div className="text-center">
                  {/* Barcode Placeholder */}
                  <div className="w-full h-20 bg-black mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-white"
                          style={{
                            marginRight: i % 3 === 0 ? '2px' : i % 2 === 0 ? '1px' : '0px'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ticket Number */}
                  <div className="bg-red-500 border-4 border-black p-3 transform rotate-3 shadow-[4px_4px_0_theme(colors.yellow.300)] mb-6">
                    <div className="text-sm font-black text-white mb-1">TICKET #</div>
                    <div className="text-xl font-black text-yellow-300">
                      {Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </div>
                  </div>

                  {/* Couple Names */}
                  <div className="space-y-2">
                    <div className="bg-pink-400 border-2 border-black px-3 py-1 transform -rotate-2 text-sm font-bold">
                      {config.couple.bride}
                    </div>
                    <div className="text-2xl">💕</div>
                    <div className="bg-cyan-400 border-2 border-black px-3 py-1 transform rotate-2 text-sm font-bold">
                      {config.couple.groom}
                    </div>
                  </div>
                </div>

                {/* Stub decorations */}
                <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-300 rotate-45 border-2 border-black" />
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-lime-500 rounded-full border-2 border-black" />
              </div>
            </div>

            {/* Ticket Footer */}
            <div className="bg-gradient-to-r from-orange-500 to-purple-600 p-4 border-t-8 border-black">
              <div className="text-center text-white font-black text-lg">
                SAVE THIS TICKET • BRING TO VENUE • GET READY TO PARTY!
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-cyan-400 rounded-full border-4 border-black" />
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-400 rotate-45 border-4 border-black" />
            <div className="absolute -bottom-3 -left-3 w-4 h-8 bg-yellow-300 skew-x-12 border-4 border-black" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-lime-500 border-4 border-black" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-400 text-black text-xl font-black px-8 py-4 border-6 border-black shadow-[8px_8px_0_theme(colors.purple.600)] hover:shadow-[12px_12px_0_theme(colors.red.500)] transition-all duration-200 transform rotate-2"
            onClick={() => window.print()}
          >
            PRINT TICKET
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white text-xl font-black px-8 py-4 border-6 border-black shadow-[8px_8px_0_theme(colors.yellow.300)] hover:shadow-[12px_12px_0_theme(colors.pink.400)] transition-all duration-200 transform -rotate-2"
            onClick={() => {
              document.getElementById('photo-slider')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            CONTINUE PARTY →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}