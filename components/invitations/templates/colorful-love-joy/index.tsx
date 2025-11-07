// Export all components for easy importing
export { ColorfulLoveJoyTemplate } from '../colorful-love-joy-template'
export { GreetingsSection } from './greetings-section'
export { CoupleDetailsSection } from './couple-details-section'
export { SaveTheDateSection } from './save-the-date-section'
export { CountdownSection } from './countdown-section'
export { RSVPSection } from './rsvp-section'
export { EntranceCardSection } from './entrance-card-section'
export { PhotoSliderSection } from './photo-slider-section'
export { RegistrySection } from './registry-section'
export { WishesSection } from './wishes-section'
export { ThankYouSection } from './thank-you-section'

// Sample configuration for the Colorful-Love-Joy template
export const sampleColorfulLoveJoyConfig = {
  couple: {
    bride: {
      name: "Luna Rainbow",
      parents: "Mr. & Mrs. Sunshine Bright",
      photo: "/images/bride-colorful.jpg"
    },
    groom: {
      name: "Sky Joyful",
      parents: "Mr. & Mrs. Happy Celebration",
      photo: "/images/groom-colorful.jpg"
    }
  },
  events: [
    {
      name: "Colorful Ceremony",
      date: "2024-07-20",
      time: "4:00 PM",
      venue: "Rainbow Garden Pavilion",
      address: "123 Celebration Avenue, Joy City"
    },
    {
      name: "Party Time Reception",
      date: "2024-07-20",
      time: "6:30 PM",
      venue: "Festival Hall",
      address: "456 Fun Street, Happiness Town"
    },
    {
      name: "Dance & Celebration",
      date: "2024-07-20",
      time: "8:00 PM",
      venue: "Disco Paradise",
      address: "789 Party Boulevard, Celebration City"
    }
  ],
  photos: [
    "/images/colorful-couple-1.jpg",
    "/images/colorful-couple-2.jpg",
    "/images/colorful-couple-3.jpg",
    "/images/colorful-couple-4.jpg",
    "/images/colorful-couple-5.jpg",
    "/images/colorful-couple-6.jpg"
  ],
  registry: {
    banks: [
      {
        name: "Rainbow Bank",
        account: "2024072020240720",
        holder: "Luna & Sky Celebration"
      },
      {
        name: "Joy Financial",
        account: "7777888899990000",
        holder: "Luna & Sky Celebration"
      },
      {
        name: "Happy Savings",
        account: "1111222233334444",
        holder: "Luna & Sky Celebration"
      },
      {
        name: "Colorful Credit Union",
        account: "5555666677778888",
        holder: "Luna & Sky Celebration"
      }
    ]
  },
  wishes: [
    {
      name: "Sparkle Johnson",
      message: "OMG you two are absolutely PERFECT together! 🌈 Your love story is like a beautiful rainbow after the storm - so bright and full of hope! Can't wait to dance the night away at your colorful celebration! 💃✨",
      date: "2024-06-15T10:30:00Z"
    },
    {
      name: "Sunshine Martinez",
      message: "Luna and Sky, you bring so much JOY to everyone around you! 🎉 Your wedding is going to be the most amazing, colorful party ever! Wishing you a lifetime of laughter, adventures, and endless rainbows! 🦄💕",
      date: "2024-06-14T14:45:00Z"
    },
    {
      name: "Happy Thompson",
      message: "I've never seen two people more meant for each other! 💖 Your energy is contagious and your love lights up every room! Here's to a marriage filled with as much color and joy as you both bring to the world! 🎊🌟",
      date: "2024-06-13T16:20:00Z"
    },
    {
      name: "Rainbow Davis",
      message: "You guys are literally living proof that fairy tales exist! ✨ Your love is so pure and beautiful, it makes everyone believe in magic again! Can't wait to celebrate with you both! 🥳💫",
      date: "2024-06-12T11:15:00Z"
    }
  ]
}