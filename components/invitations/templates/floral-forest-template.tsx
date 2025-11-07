'use client'

import { motion } from 'framer-motion'
import { GreetingsSection } from './floral-forest/greetings-section'
import { CoupleDetailsSection } from './floral-forest/couple-details-section'
import { SaveTheDateSection } from './floral-forest/save-the-date-section'
import { CountdownSection } from './floral-forest/countdown-section'
import { RSVPSection } from './floral-forest/rsvp-section'
import { EntranceCardSection } from './floral-forest/entrance-card-section'
import { PhotoSliderSection } from './floral-forest/photo-slider-section'
import { RegistrySection } from './floral-forest/registry-section'
import { WishesSection } from './floral-forest/wishes-section'
import { ThankYouSection } from './floral-forest/thank-you-section'

interface FloralForestTemplateProps {
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

export function FloralForestTemplate({ config }: FloralForestTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
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