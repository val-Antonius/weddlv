'use client'

import { motion } from 'framer-motion'
import { PixelGreetings } from './sections/pixel-greetings'
import { PixelCoupleDetails } from './sections/pixel-couple-details'
import { PixelSaveTheDate } from './sections/pixel-save-the-date'
import { PixelCountdown } from './sections/pixel-countdown'
import { PixelRSVP } from './sections/pixel-rsvp'
import { PixelEntranceCard } from './sections/pixel-entrance-card'
import { PixelPhotoSlider } from './sections/pixel-photo-slider'
import { PixelRegistry } from './sections/pixel-registry'
import { PixelWishes } from './sections/pixel-wishes'
import { PixelThankYou } from './sections/pixel-thank-you'

export interface PixelArcadeConfig {
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

const defaultConfig: PixelArcadeConfig = {
  couple: {
    bride: "PLAYER 1",
    groom: "PLAYER 2",
    weddingDate: "2024-12-31",
    venue: "GAME ARENA"
  },
  colors: {
    primary: "cyan-400",
    secondary: "magenta-500", 
    accent: "lime-400"
  },
  content: {
    greeting: "PRESS START TO BEGIN",
    saveTheDate: "SAVE THE DATE",
    rsvpDeadline: "2024-12-01",
    venue: {
      name: "WEDDING ARENA",
      address: "123 Pixel Street, 8-Bit City",
      mapUrl: "#"
    },
    registry: {
      message: "POWER-UP OUR ADVENTURE",
      links: [
        { name: "AMAZON", url: "#" },
        { name: "TARGET", url: "#" }
      ]
    },
    photos: []
  }
}

interface PixelArcadeTemplateProps {
  config?: Partial<PixelArcadeConfig>
}

export function PixelArcadeTemplate({ config }: PixelArcadeTemplateProps) {
  const finalConfig = { ...defaultConfig, ...config }

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 font-mono relative overflow-hidden">
      {/* CRT Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="w-full h-full opacity-10" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffff 2px, #00ffff 4px)'
        }} />
      </div>

      {/* CRT Screen Glow */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="w-full h-full bg-cyan-400/5 rounded-3xl blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "linear" }}
        className="relative z-10"
      >
        <PixelGreetings config={finalConfig} />
        <PixelCoupleDetails config={finalConfig} />
        <PixelSaveTheDate config={finalConfig} />
        <PixelCountdown config={finalConfig} />
        <PixelRSVP config={finalConfig} />
        <PixelEntranceCard config={finalConfig} />
        <PixelPhotoSlider config={finalConfig} />
        <PixelRegistry config={finalConfig} />
        <PixelWishes config={finalConfig} />
        <PixelThankYou config={finalConfig} />
      </motion.div>
    </div>
  )
}