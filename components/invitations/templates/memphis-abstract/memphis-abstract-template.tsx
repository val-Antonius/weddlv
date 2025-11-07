'use client'

import { motion } from 'framer-motion'
import { MemphisGreetings } from './sections/memphis-greetings'
import { MemphisCoupleDetails } from './sections/memphis-couple-details'
import { MemphisSaveTheDate } from './sections/memphis-save-the-date'
import { MemphisCountdown } from './sections/memphis-countdown'
import { MemphisRSVP } from './sections/memphis-rsvp'
import { MemphisEntranceCard } from './sections/memphis-entrance-card'
import { MemphisPhotoSlider } from './sections/memphis-photo-slider'
import { MemphisRegistry } from './sections/memphis-registry'
import { MemphisWishes } from './sections/memphis-wishes'
import { MemphisThankYou } from './sections/memphis-thank-you'

export interface MemphisAbstractConfig {
  couple: {
    bride: string
    groom: string
    weddingDate: string
    venue: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  content: {
    greeting: string
    saveTheDate: string
    rsvpDeadline: string
    venue: {
      name: string
      address: string
      mapUrl: string
    }
    registry: {
      message: string
      links: Array<{ name: string; url: string }>
    }
    photos: string[]
  }
}

const defaultConfig: MemphisAbstractConfig = {
  couple: {
    bride: "ALEX",
    groom: "JORDAN",
    weddingDate: "2024-12-31",
    venue: "DESIGN STUDIO"
  },
  colors: {
    primary: "pink-400",
    secondary: "yellow-300", 
    accent: "cyan-400"
  },
  content: {
    greeting: "BOLD LOVE STORY",
    saveTheDate: "GEOMETRIC CELEBRATION",
    rsvpDeadline: "2024-12-01",
    venue: {
      name: "MODERN ART GALLERY",
      address: "123 Abstract Avenue, Design District",
      mapUrl: "#"
    },
    registry: {
      message: "HELP US BUILD OUR COLORFUL FUTURE",
      links: [
        { name: "AMAZON", url: "#" },
        { name: "TARGET", url: "#" }
      ]
    },
    photos: []
  }
}

interface MemphisAbstractTemplateProps {
  config?: Partial<MemphisAbstractConfig>
}

export function MemphisAbstractTemplate({ config }: MemphisAbstractTemplateProps) {
  const finalConfig = { ...defaultConfig, ...config }

  return (
    <div className="min-h-screen bg-white text-black font-sans relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 ${
              ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500'][Math.floor(Math.random() * 5)]
            } ${
              ['rounded-full', '', 'rotate-45'][Math.floor(Math.random() * 3)]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20"
      >
        <MemphisGreetings config={finalConfig} />
        <MemphisCoupleDetails config={finalConfig} />
        <MemphisSaveTheDate config={finalConfig} />
        <MemphisCountdown config={finalConfig} />
        <MemphisRSVP config={finalConfig} />
        <MemphisEntranceCard config={finalConfig} />
        <MemphisPhotoSlider config={finalConfig} />
        <MemphisRegistry config={finalConfig} />
        <MemphisWishes config={finalConfig} />
        <MemphisThankYou config={finalConfig} />
      </motion.div>
    </div>
  )
}