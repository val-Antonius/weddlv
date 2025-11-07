'use client'

import { motion } from 'framer-motion'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelEntranceCardProps {
  config: PixelArcadeConfig
}

export function PixelEntranceCard({ config }: PixelEntranceCardProps) {
  return (
    <section id="entrance-card" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-20 relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-red-500 text-white px-6 py-2 inline-block font-bold text-lg mb-4 border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.red.700)]">
            🎫 ADMISSION TICKET
          </div>
        </motion.div>

        {/* Main Ticket */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
          className="max-w-4xl mx-auto"
        >
          {/* Ticket Design */}
          <div className="bg-gray-800 border-4 border-yellow-300 relative shadow-[12px_12px_0px_0px_theme(colors.yellow.600)]">
            {/* Perforated Edge */}
            <div className="absolute left-1/3 top-0 bottom-0 w-0 border-l-4 border-dashed border-yellow-300" />
            
            <div className="grid md:grid-cols-3">
              {/* Left Section - Event Info */}
              <div className="md:col-span-2 p-8 border-r-4 border-dashed border-yellow-300">
                <div className="text-left">
                  {/* Event Title */}
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4" style={{
                    textShadow: '3px 3px 0px #ff00ff'
                  }}>
                    WEDDING QUEST
                  </div>
                  
                  {/* Subtitle */}
                  <div className="text-xl text-lime-400 font-mono mb-6">
                    FINAL BOSS BATTLE
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4 font-mono">
                    <div className="flex items-center">
                      <span className="text-yellow-300 w-20">DATE:</span>
                      <span className="text-white font-bold">
                        {new Date(config.couple.weddingDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-yellow-300 w-20">TIME:</span>
                      <span className="text-white font-bold">18:00 GMT</span>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="text-yellow-300 w-20">VENUE:</span>
                      <div className="text-white font-bold">
                        <div>{config.content.venue.name}</div>
                        <div className="text-sm text-gray-300 mt-1">
                          {config.content.venue.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="mt-6 bg-black border-2 border-magenta-500 p-4">
                    <div className="text-magenta-500 font-bold font-mono mb-2">
                      SPECIAL INSTRUCTIONS:
                    </div>
                    <div className="text-cyan-400 text-sm font-mono">
                      • DRESS CODE: FORMAL ATTIRE<br/>
                      • BRING THIS TICKET FOR ENTRY<br/>
                      • ARRIVE 30 MINUTES EARLY<br/>
                      • PREPARE FOR EPIC CELEBRATION
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Ticket Stub */}
              <div className="p-8 text-center">
                <div className="transform -rotate-90 md:rotate-0">
                  {/* QR Code Placeholder */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-white border-4 border-black relative">
                    <div className="absolute inset-2 bg-black" style={{
                      backgroundImage: `
                        linear-gradient(90deg, white 50%, transparent 50%),
                        linear-gradient(white 50%, transparent 50%)
                      `,
                      backgroundSize: '4px 4px'
                    }} />
                  </div>

                  {/* Ticket Number */}
                  <div className="text-yellow-300 font-mono font-bold mb-2">
                    TICKET #
                  </div>
                  <div className="text-2xl text-white font-mono font-bold mb-4">
                    {Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </div>

                  {/* Admit One */}
                  <div className="bg-lime-400 text-gray-900 px-4 py-2 font-bold font-mono text-sm border-2 border-white">
                    ADMIT ONE
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="bg-red-500 text-white p-4 border-t-4 border-yellow-300">
              <div className="flex justify-between items-center font-mono font-bold">
                <div>PLAYERS: {config.couple.bride} & {config.couple.groom}</div>
                <div>LEVEL: LEGENDARY</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-indigo-900 border-4 border-cyan-400 p-6 max-w-2xl mx-auto"
        >
          <div className="text-cyan-400 font-bold font-mono mb-4">
            📱 DOWNLOAD INSTRUCTIONS:
          </div>
          <div className="text-white font-mono text-sm space-y-2">
            <div>1. SCREENSHOT THIS TICKET</div>
            <div>2. SAVE TO YOUR DEVICE</div>
            <div>3. PRESENT AT VENUE ENTRANCE</div>
            <div>4. ENJOY THE CELEBRATION!</div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-8 py-4 text-lg font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.green.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.green.700)] transition-all duration-100 font-mono"
            onClick={() => window.print()}
          >
            PRINT TICKET
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-8 py-4 text-lg font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.blue.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.blue.700)] transition-all duration-100 font-mono"
            onClick={() => {
              document.getElementById('photo-slider')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            CONTINUE QUEST
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}