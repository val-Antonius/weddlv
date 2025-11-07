'use client'

import { motion } from 'framer-motion'
import { GreetingsSection } from './colorful-love-joy/greetings-section'
import { CoupleDetailsSection } from './colorful-love-joy/couple-details-section'
import { SaveTheDateSection } from './colorful-love-joy/save-the-date-section'
import { CountdownSection } from './colorful-love-joy/countdown-section'
import { RSVPSection } from './colorful-love-joy/rsvp-section'
import { EntranceCardSection } from './colorful-love-joy/entrance-card-section'
import { PhotoSliderSection } from './colorful-love-joy/photo-slider-section'
import { RegistrySection } from './colorful-love-joy/registry-section'
import { WishesSection } from './colorful-love-joy/wishes-section'
import { ThankYouSection } from './colorful-love-joy/thank-you-section'

interface ColorfulLoveJoyTemplateProps {
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

export function ColorfulLoveJoyTemplate({ config }: ColorfulLoveJoyTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300">
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