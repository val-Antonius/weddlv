'use client'

import { motion } from 'framer-motion'
import { Download, Calendar, MapPin, Clock, Ticket } from 'lucide-react'
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
    // Create a canvas element to generate the entrance card
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    canvas.width = 800
    canvas.height = 500
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#ecfdf5')
    gradient.addColorStop(1, '#fef3c7')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add text content
    ctx.fillStyle = '#065f46'
    ctx.font = 'bold 32px serif'
    ctx.textAlign = 'center'
    ctx.fillText('Wedding Invitation', canvas.width / 2, 80)
    
    ctx.font = '24px sans-serif'
    ctx.fillText(event.name, canvas.width / 2, 150)
    
    ctx.font = '18px sans-serif'
    ctx.fillText(formatDate(event.date), canvas.width / 2, 200)
    ctx.fillText(event.time, canvas.width / 2, 230)
    ctx.fillText(event.venue, canvas.width / 2, 280)
    ctx.fillText(event.address, canvas.width / 2, 310)
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'wedding-entrance-card.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-emerald-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Your Digital Entrance Card
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Download your personalized entrance card with all the event details
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Card Preview */}
          <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-200/30 border-2 border-emerald-200 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-200 opacity-20 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-200 opacity-20 rounded-tl-full"></div>
            
            {/* Ticket icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-300">
                <Ticket className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            {/* Card content */}
            <div className="text-center space-y-6">
              <h3 className="font-playfair text-3xl md:text-4xl text-emerald-800">
                Wedding Invitation
              </h3>
              
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full"></div>
              
              <h4 className="font-playfair text-2xl md:text-3xl text-emerald-700">
                {event.name}
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                  <div className="text-center">
                    <p className="font-inter text-sm text-emerald-600 uppercase tracking-wide">Date</p>
                    <p className="font-inter text-emerald-800">{formatDate(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <div className="text-center">
                    <p className="font-inter text-sm text-emerald-600 uppercase tracking-wide">Time</p>
                    <p className="font-inter text-emerald-800">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  <div className="text-center">
                    <p className="font-inter text-sm text-emerald-600 uppercase tracking-wide">Venue</p>
                    <p className="font-inter text-emerald-800">{event.venue}</p>
                    <p className="font-inter text-sm text-emerald-600">{event.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <p className="font-dancing text-xl text-emerald-700">
                  Present this card at the venue
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
                className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white px-8 py-4 text-lg font-inter rounded-2xl shadow-lg flex items-center gap-3"
              >
                <Download size={24} />
                Download Entrance Card
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
            <p className="font-inter text-emerald-600 max-w-2xl mx-auto">
              Save this card to your phone or print it out. Present it at the venue entrance for a smooth check-in experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}