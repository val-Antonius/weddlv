// Export all components for easy importing
export { ComicPopArtTemplate } from '../comic-pop-art-template'
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

// Sample configuration for the Comic/Pop-Art template
export const sampleComicPopArtConfig = {
  couple: {
    bride: {
      name: "SUPER SARAH",
      parents: "Captain & Mrs. Amazing Power",
      photo: "/images/bride-comic.jpg"
    },
    groom: {
      name: "MIGHTY MIKE",
      parents: "Mr. & Mrs. Thunder Hero",
      photo: "/images/groom-comic.jpg"
    }
  },
  events: [
    {
      name: "EPIC CEREMONY",
      date: "2024-08-10",
      time: "3:00 PM",
      venue: "Hero Headquarters Hall",
      address: "123 Comic Book Lane, Super City"
    },
    {
      name: "POWER RECEPTION",
      date: "2024-08-10",
      time: "5:30 PM",
      venue: "Action Arena",
      address: "456 Adventure Avenue, Hero Town"
    },
    {
      name: "VICTORY DANCE",
      date: "2024-08-10",
      time: "8:00 PM",
      venue: "Celebration Central",
      address: "789 Party Plaza, Fun City"
    }
  ],
  photos: [
    "/images/comic-couple-1.jpg",
    "/images/comic-couple-2.jpg",
    "/images/comic-couple-3.jpg",
    "/images/comic-couple-4.jpg",
    "/images/comic-couple-5.jpg",
    "/images/comic-couple-6.jpg"
  ],
  registry: {
    banks: [
      {
        name: "Hero Bank",
        account: "2024081020240810",
        holder: "Super Sarah & Mighty Mike"
      },
      {
        name: "Power Financial",
        account: "1111222233334444",
        holder: "Super Sarah & Mighty Mike"
      },
      {
        name: "Action Credit Union",
        account: "5555666677778888",
        holder: "Super Sarah & Mighty Mike"
      },
      {
        name: "Comic Savings Bank",
        account: "9999000011112222",
        holder: "Super Sarah & Mighty Mike"
      }
    ]
  },
  wishes: [
    {
      name: "Captain Thunder",
      message: "WOW! You two are the ultimate power couple! 💥 Your love story is more epic than any comic book I've ever read! Can't wait to see you save the day together forever! BOOM! 🦸‍♂️⚡",
      date: "2024-07-15T09:30:00Z"
    },
    {
      name: "Wonder Lightning",
      message: "AMAZING! Your super powers combined make you absolutely UNSTOPPABLE! 🌟 This wedding is going to be the most INCREDIBLE celebration ever! ZAP! Ready to party with the best heroes! 🎉💫",
      date: "2024-07-14T14:20:00Z"
    },
    {
      name: "Blast Master",
      message: "FANTASTIC! You guys are proof that true love conquers all! 💖 Your heroic hearts beating as one is the greatest superpower of all! WHAM! Here's to your epic adventure together! 🚀✨",
      date: "2024-07-13T16:45:00Z"
    },
    {
      name: "Spark Dynamo",
      message: "INCREDIBLE! Watching your love story unfold has been better than any action movie! 🎬 You're both such amazing heroes and together you're INVINCIBLE! POW! Let's celebrate! 🎊⭐",
      date: "2024-07-12T11:10:00Z"
    }
  ]
}