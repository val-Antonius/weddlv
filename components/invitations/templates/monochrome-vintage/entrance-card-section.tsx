'use client'

import { motion } from 'framer-motion'
import { Download, Calendar, MapPin, Clock, Award, Frame } from 'lucide-react'
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
    
    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Black border
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 4
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
    
    // Corner decorations
    ctx.fillStyle = '#000000'
    ctx.fillRect(10, 10, 20, 20)
    ctx.fillRect(canvas.width - 30, 10, 20, 20)
    ctx.fillRect(10, canvas.height - 30, 20, 20)
    ctx.fillRect(canvas.width - 30, canvas.height - 30, 20, 20)
    
    // Title
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 32px serif'
    ctx.textAlign = 'center'
    ctx.fillText('WEDDING INVITATION', canvas.width / 2, 80)
    
    // Event details
    ctx.font = '24px serif'
    ctx.fillText(event.name, canvas.width / 2, 150)
    
    ctx.font = '18px serif'
    ctx.fillText(formatDate(event.date), canvas.width / 2, 200)
    ctx.fillText(event.time, canvas.width / 2, 230)
    ctx.fillText(event.venue, canvas.width / 2, 280)
    ctx.fillText(event.address, canvas.width / 2, 310)
    
    // Decorative line
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 100, 350)
    ctx.lineTo(canvas.width / 2 + 100, 350)
    ctx.stroke()
    
    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'vintage-entrance-card.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            ENTRANCE CARD
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Your formal admission to our celebration
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Frame className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Card Preview */}
          <div className="border-4 border-zinc-900 p-8 md:p-12 bg-white drop-shadow-2xl relative overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-zinc-900"></div>
            <div className="absolute top-0 right-0 w-12 h-12 bg-zinc-900"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-zinc-900"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-zinc-900"></div>
            
            {/* Art Deco patterns */}
            <div className="absolute top-16 left-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>
            <div className="absolute top-16 right-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>
            <div className="absolute bottom-16 left-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>
            <div className="absolute bottom-16 right-16 w-8 h-8 border-2 border-zinc-900 rotate-45"></div>

            {/* Award icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 border-2 border-zinc-900 flex items-center justify-center bg-white">
                <Award className="w-8 h-8 text-zinc-900" />
              </div>
            </div>

            {/* Card content */}
            <div className="text-center space-y-6 relative z-10">
              <h3 className="font-cinzel text-3xl md:text-4xl text-zinc-900 tracking-wider">
                WEDDING INVITATION
              </h3>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-24 h-px bg-zinc-900"></div>
                <div className="w-2 h-2 bg-zinc-900 rotate-45"></div>
                <div className="w-24 h-px bg-zinc-900"></div>
              </div>
              
              <h4 className="font-great-vibes text-2xl md:text-3xl text-zinc-900">
                {event.name}
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
                <div className="flex flex-col items-center gap-2 py-4 md:py-0">
                  <Calendar className="w-6 h-6 text-zinc-900" />
                  <div className="text-center">
                    <p className="font-crimson text-sm text-zinc-700 uppercase tracking-wide">Date</p>
                    <p className="font-crimson text-zinc-900">{formatDate(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 py-4 md:py-0">
                  <Clock className="w-6 h-6 text-zinc-900" />
                  <div className="text-center">
                    <p className="font-crimson text-sm text-zinc-700 uppercase tracking-wide">Time</p>
                    <p className="font-crimson text-zinc-900">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 py-4 md:py-0">
                  <MapPin className="w-6 h-6 text-zinc-900" />
                  <div className="text-center">
                    <p className="font-crimson text-sm text-zinc-700 uppercase tracking-wide">Venue</p>
                    <p className="font-crimson text-zinc-900">{event.venue}</p>
                    <p className="font-crimson text-sm text-zinc-600">{event.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-zinc-900">
                <p className="font-great-vibes text-xl text-zinc-900">
                  Present this card for admission
                </p>
              </div>
            </div>
          </div>

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
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 text-lg font-crimson tracking-wider border-2 border-zinc-900 flex items-center gap-3"
              >
                <Download size={24} />
                DOWNLOAD ENTRANCE CARD
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
            <div className="border border-zinc-900 p-6 bg-white inline-block">
              <p className="font-crimson text-zinc-700 max-w-2xl mx-auto">
                Save this distinguished card to your device or print for presentation at the venue entrance.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}