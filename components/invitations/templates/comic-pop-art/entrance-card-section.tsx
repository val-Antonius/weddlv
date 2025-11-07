'use client'

import { motion } from 'framer-motion'
import { Download, Calendar, MapPin, Clock, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Event {
  name: string
  date: string
  time: string
  venue: string
  address: string
}

interface EntranceCardSectionProps {
  event: Event
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

export function EntranceCardSection({ event }: EntranceCardSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    canvas.width = 800
    canvas.height = 500
    
    // Comic background
    ctx.fillStyle = '#fbbf24'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Black border
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 8
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
    
    // White content area
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60)
    
    // Black inner border
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 4
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)
    
    // Title with comic styling
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 36px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('WEDDING INVITATION', canvas.width / 2, 100)
    
    // Event details
    ctx.font = '28px sans-serif'
    ctx.fillText(event.name.toUpperCase(), canvas.width / 2, 160)
    
    ctx.font = '20px sans-serif'
    ctx.fillText(`📅 ${formatDate(event.date)}`, canvas.width / 2, 210)
    ctx.fillText(`🕐 ${event.time}`, canvas.width / 2, 240)
    ctx.fillText(`📍 ${event.venue}`, canvas.width / 2, 270)
    ctx.fillText(event.address, canvas.width / 2, 300)
    
    // Action text
    ctx.fillStyle = '#dc2626'
    ctx.font = 'bold 24px sans-serif'
    ctx.fillText('PRESENT THIS CARD FOR ENTRY!', canvas.width / 2, 380)
    
    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'comic-entrance-card.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -1, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white border-4 border-black p-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-4" style={comicTextStyle}>
              GET YOUR TICKET!
            </h2>
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              ADMISSION REQUIRED!
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Card Preview */}
          <motion.div 
            className="bg-yellow-400 border-4 border-black p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white border-4 border-black p-8 md:p-12 relative">
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 border-2 border-black"></div>

              {/* Action burst */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Star size={20} />
              </motion.div>

              {/* Card content */}
              <div className="text-center space-y-6">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wider"
                  style={comicTextStyle}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  WEDDING INVITATION
                </motion.h3>
                
                <div className="bg-yellow-400 border-2 border-black p-2 inline-block">
                  <div className="w-16 h-1 bg-black mx-auto"></div>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-bold text-black uppercase" style={comicTextStyle}>
                  {event.name}
                </h4>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-red-600 border-4 border-black flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-black text-sm uppercase">DATE</p>
                      <p className="font-bold text-black">{formatDate(event.date)}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-blue-600 border-4 border-black flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-black text-sm uppercase">TIME</p>
                      <p className="font-bold text-black">{event.time}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-purple-600 border-4 border-black flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-black text-sm uppercase">VENUE</p>
                      <p className="font-bold text-black">{event.venue}</p>
                      <p className="font-bold text-black text-sm">{event.address}</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="pt-6 border-t-4 border-black">
                  <div className="bg-red-600 text-white px-4 py-2 border-4 border-black inline-block font-bold" style={comicTextStyle}>
                    PRESENT THIS CARD FOR ENTRY!
                  </div>
                </div>
              </div>
            </div>

            {/* Action words */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-green-500 text-white px-3 py-1 border-4 border-black font-bold text-sm transform rotate-12"
              style={comicTextStyle}
            >
              WHAM!
            </motion.div>
          </motion.div>

          {/* Download button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleDownload}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 uppercase tracking-wider"
                style={comicTextStyle}
              >
                <Download size={24} />
                DOWNLOAD TICKET!
              </Button>
            </motion.div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8"
          >
            <div className="bg-white border-4 border-black p-6 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-black max-w-2xl mx-auto">
                SAVE THIS SUPER TICKET TO YOUR DEVICE OR PRINT IT OUT! 
                SHOW IT AT THE VENUE FOR HEROIC ENTRY!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}