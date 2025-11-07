// Export all components for easy importing
export { MonochromeVintageTemplate } from '../monochrome-vintage-template'
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

// Sample configuration for the Monochrome-Vintage template
export const sampleMonochromeVintageConfig = {
  couple: {
    bride: {
      name: "Elizabeth Grace",
      parents: "Mr. & Mrs. William Ashford",
      photo: "/images/bride-vintage.jpg"
    },
    groom: {
      name: "Alexander James",
      parents: "Mr. & Mrs. Charles Montgomery",
      photo: "/images/groom-vintage.jpg"
    }
  },
  events: [
    {
      name: "Holy Matrimony",
      date: "2024-09-21",
      time: "3:00 PM",
      venue: "Cathedral of St. Augustine",
      address: "1920 Heritage Boulevard, Old Town"
    },
    {
      name: "Cocktail Reception",
      date: "2024-09-21",
      time: "5:30 PM",
      venue: "The Grand Ballroom",
      address: "Historic Plaza Hotel, Downtown"
    },
    {
      name: "Wedding Dinner",
      date: "2024-09-21",
      time: "7:00 PM",
      venue: "Crystal Pavilion",
      address: "Elegant Manor Estate, Uptown"
    }
  ],
  photos: [
    "/images/vintage-couple-1.jpg",
    "/images/vintage-couple-2.jpg",
    "/images/vintage-couple-3.jpg",
    "/images/vintage-couple-4.jpg",
    "/images/vintage-couple-5.jpg",
    "/images/vintage-couple-6.jpg"
  ],
  registry: {
    banks: [
      {
        name: "First National Bank",
        account: "1920192019201920",
        holder: "Elizabeth & Alexander Montgomery"
      },
      {
        name: "Heritage Trust Bank",
        account: "2024202420242024",
        holder: "Elizabeth & Alexander Montgomery"
      },
      {
        name: "Classic Savings Bank",
        account: "1234567890123456",
        holder: "Elizabeth & Alexander Montgomery"
      }
    ]
  },
  wishes: [
    {
      name: "Margaret Sinclair",
      message: "What a distinguished couple you make! May your marriage be filled with timeless elegance, endless joy, and the kind of love that grows more beautiful with each passing year.",
      date: "2024-08-15T14:30:00Z"
    },
    {
      name: "Charles Wellington",
      message: "Congratulations on this momentous occasion. Your love story reminds us of the golden age of romance. Wishing you both a lifetime of happiness and prosperity.",
      date: "2024-08-14T16:45:00Z"
    },
    {
      name: "Victoria Pemberton",
      message: "Such a beautiful celebration of love! May your union be blessed with all the grace and sophistication that you both embody. Here's to your happily ever after.",
      date: "2024-08-13T11:20:00Z"
    }
  ]
}