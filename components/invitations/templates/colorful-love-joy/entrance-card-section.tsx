'use client'

import { motion } from 'framer-motion'
import { Download, Calendar, MapPin, Clock, Gift, Star, Heart } from 'lucide-react'
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
    
    // Rainbow gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#ec4899')
    gradient.addColorStop(0.25, '#a855f7')
    gradient.addColorStop(0.5, '#3b82f6')
    gradient.addColorStop(0.75, '#10b981')
    gradient.addColorStop(1, '#f59e0b')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // White content area
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)
    
    // Title
    ctx.fillStyle = '#ec4899'
    ctx.font = 'bold 36px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🎉 WEDDING INVITATION 🎉', canvas.width / 2, 120)
    
    // Event details
    ctx.fillStyle = '#374151'
    ctx.font = '28px sans-serif'
    ctx.fillText(event.name, canvas.width / 2, 180)
    
    ctx.font = '20px sans-serif'
    ctx.fillText(`📅 ${formatDate(event.date)}`, canvas.width / 2, 220)
    ctx.fillText(`🕐 ${event.time}`, canvas.width / 2, 250)
    ctx.fillText(`📍 ${event.venue}`, canvas.width / 2, 280)
    ctx.fillText(event.address, canvas.width / 2, 310)
    
    // Fun message
    ctx.fillStyle = '#ec4899'
    ctx.font = '24px sans-serif'
    ctx.fillText('Present this colorful card at the venue! 🌈', canvas.width / 2, 380)
    
    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'colorful-entrance-card.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-bl from-orange-200 via-pink-200 to-purple-200">
      <div className="max-w-4xl mx-auto">
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
            Your Entrance Card! 🎫
          </motion.h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Download your colorful entrance card and get ready to party! 🎉
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
          {/* Card Preview */}
          <motion.div 
            className="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 md:p-12 relative overflow-hidden">
              {/* Floating decorations */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 left-4 text-pink-400"
              >
                <Heart size={24} />
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 text-yellow-400"
              >
                <Star size={24} />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-4 left-4 text-purple-400"
              >
                <Gift size={24} />
              </motion.div>

              {/* Card icon */}
              <div className="flex justify-center mb-8">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Gift className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Card content */}
              <div className="text-center space-y-6">
                <motion.h3 
                  className="font-pacifico text-4xl md:text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎉 Wedding Invitation 🎉
                </motion.h3>
                
                <motion.div 
                  className="w-32 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <h4 className="font-quicksand text-2xl md:text-3xl font-bold text-gray-700">
                  {event.name}
                </h4>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-nunito text-sm text-gray-600 font-semibold">Date</p>
                      <p className="font-nunito text-gray-800">{formatDate(event.date)}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-nunito text-sm text-gray-600 font-semibold">Time</p>
                      <p className="font-nunito text-gray-800">{event.time}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-nunito text-sm text-gray-600 font-semibold">Venue</p>
                      <p className="font-nunito text-gray-800">{event.venue}</p>
                      <p className="font-nunito text-sm text-gray-600">{event.address}</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="pt-6">
                  <p className="font-pacifico text-xl text-gray-700">
                    Present this colorful card at the venue! 🌈
                  </p>
                  <motion.div 
                    className="text-3xl mt-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🎊✨🥳
                  </motion.div>
                </div>
              </div>
            </div>
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
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-nunito font-bold rounded-xl shadow-lg flex items-center gap-3"
              >
                <Download size={24} />
                Download Entrance Card 🎫
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-lg">
              <p className="font-nunito text-gray-700 max-w-2xl mx-auto">
                Save this vibrant card to your phone or print it out in full color! 
                Show it at the venue entrance for the most colorful welcome! 🌈✨
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}