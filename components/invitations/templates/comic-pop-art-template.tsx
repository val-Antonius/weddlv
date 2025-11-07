'use client'

import { motion } from 'framer-motion'
import { GreetingsSection } from './comic-pop-art/greetings-section'
import { CoupleDetailsSection } from './comic-pop-art/couple-details-section'
import { SaveTheDateSection } from './comic-pop-art/save-the-date-section'
import { CountdownSection } from './comic-pop-art/countdown-section'
import { RSVPSection } from './comic-pop-art/rsvp-section'
import { EntranceCardSection } from './comic-pop-art/entrance-card-section'
import { PhotoSliderSection } from './comic-pop-art/photo-slider-section'
import { RegistrySection } from './comic-pop-art/registry-section'
import { WishesSection } from './comic-pop-art/wishes-section'
import { ThankYouSection } from './comic-pop-art/thank-you-section'

interface ComicPopArtTemplateProps {
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

export function ComicPopArtTemplate({ config }: ComicPopArtTemplateProps) {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Ben-Day dots background pattern */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
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