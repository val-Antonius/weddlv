'use client'

import { motion } from 'framer-motion'
import { GreetingsSection } from './monochrome-vintage/greetings-section'
import { CoupleDetailsSection } from './monochrome-vintage/couple-details-section'
import { SaveTheDateSection } from './monochrome-vintage/save-the-date-section'
import { CountdownSection } from './monochrome-vintage/countdown-section'
import { RSVPSection } from './monochrome-vintage/rsvp-section'
import { EntranceCardSection } from './monochrome-vintage/entrance-card-section'
import { PhotoSliderSection } from './monochrome-vintage/photo-slider-section'
import { RegistrySection } from './monochrome-vintage/registry-section'
import { WishesSection } from './monochrome-vintage/wishes-section'
import { ThankYouSection } from './monochrome-vintage/thank-you-section'

interface MonochromeVintageTemplateProps {
  config: {
    couple: {
      bride: { name: string; parents: string; photo?: string }
      groom: { name: string; parents: string; photo?: string }
    }
    events: Array<{
      name: string
      date: string
      time: string
      venue: string
      address: string
    }>
    photos: string[]
    registry: {
      banks: Array<{ name: string; account: string; holder: string }>
    }
    wishes: Array<{ name: string; message: string; date: string }>
  }
}

export function MonochromeVintageTemplate({ config }: MonochromeVintageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-zinc-100 relative">
      {/* Film grain overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-10">
        <div className="absolute inset-0 bg-zinc-900 mix-blend-multiply opacity-5"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-20"
      >
        <GreetingsSection couple={config.couple} />
        <CoupleDetailsSection couple={config.couple} />
        <SaveTheDateSection events={config.events} />
        <CountdownSection weddingDate={config.events[0]?.date} />
        <RSVPSection />
        <EntranceCardSection event={config.events[0]} />
        <PhotoSliderSection photos={config.photos} />
        <RegistrySection registry={config.registry} />
        <WishesSection wishes={config.wishes} />
        <ThankYouSection couple={config.couple} />
      </motion.div>
    </div>
  )
}