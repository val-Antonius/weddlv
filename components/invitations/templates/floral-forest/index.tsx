// Export all components for easy importing
export { FloralForestTemplate } from '../floral-forest-template'
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

// Sample configuration for the Floral-Forest template
export const sampleFloralForestConfig = {
  couple: {
    bride: {
      name: "Sarah Johnson",
      parents: "Mr. & Mrs. Robert Johnson",
      photo: "/images/bride-photo.jpg"
    },
    groom: {
      name: "Michael Chen",
      parents: "Mr. & Mrs. David Chen",
      photo: "/images/groom-photo.jpg"
    }
  },
  events: [
    {
      name: "Holy Matrimony",
      date: "2024-06-15",
      time: "2:00 PM",
      venue: "St. Mary's Cathedral",
      address: "123 Church Street, Downtown"
    },
    {
      name: "Cocktail Hour",
      date: "2024-06-15",
      time: "4:30 PM",
      venue: "Garden Terrace",
      address: "456 Garden Avenue, Uptown"
    },
    {
      name: "Reception Dinner",
      date: "2024-06-15",
      time: "6:00 PM",
      venue: "Grand Ballroom",
      address: "789 Celebration Blvd, City Center"
    }
  ],
  photos: [
    "/images/couple-1.jpg",
    "/images/couple-2.jpg",
    "/images/couple-3.jpg",
    "/images/couple-4.jpg",
    "/images/couple-5.jpg"
  ],
  registry: {
    banks: [
      {
        name: "Chase Bank",
        account: "1234567890",
        holder: "Sarah & Michael Chen"
      },
      {
        name: "Bank of America",
        account: "0987654321",
        holder: "Sarah & Michael Chen"
      },
      {
        name: "Wells Fargo",
        account: "5555666677",
        holder: "Sarah & Michael Chen"
      }
    ]
  },
  wishes: [
    {
      name: "Emily Rodriguez",
      message: "Wishing you both a lifetime of love, laughter, and endless happiness. Your love story is truly inspiring!",
      date: "2024-05-20T10:30:00Z"
    },
    {
      name: "James Wilson",
      message: "Congratulations on finding your perfect match! May your marriage be filled with all the right ingredients: love, laughter, and lots of adventures.",
      date: "2024-05-19T15:45:00Z"
    },
    {
      name: "Lisa Thompson",
      message: "So excited to celebrate this special day with you both. Here's to a beautiful wedding and an even more beautiful marriage!",
      date: "2024-05-18T09:15:00Z"
    }
  ]
}