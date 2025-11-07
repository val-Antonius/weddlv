# Wedding Invitation Templates

## Floral-Forest Theme

A complete React wedding invitation template with natural, organic, romantic woodland atmosphere.

### Features

- **10 Complete Sections**: All required sections implemented with rich animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Fully typed components with proper interfaces
- **Framer Motion**: Smooth animations and transitions
- **Interactive Elements**: Live countdown, photo slider, RSVP form, etc.

### Color Palette

- **Primary**: emerald-800, emerald-600, green-700
- **Secondary**: amber-100, stone-50, rose-300
- **Accent**: yellow-600, amber-500

### Typography

- **Headings**: font-playfair (serif)
- **Body**: font-inter (sans-serif)
- **Script**: font-dancing (cursive)

### Sections Included

1. **Greetings Section** - Welcome message with couple photos
2. **Couple Details** - Individual profiles with parent names
3. **Save the Date** - Color-coded event cards
4. **Countdown Timer** - Live countdown with animated numbers
5. **RSVP Form** - Complete form with validation
6. **Entrance Card** - Downloadable digital ticket
7. **Photo Slider** - Automated carousel with quotes
8. **Registry Section** - Bank details with copy functionality
9. **Wishes Section** - Testimonials with submission form
10. **Thank You** - Heartfelt closing message

### Usage

```tsx
import { FloralForestTemplate } from '@/components/invitations/templates/floral-forest'

const config = {
  couple: {
    bride: { name: "Sarah", parents: "Mr. & Mrs. Johnson", photo: "/bride.jpg" },
    groom: { name: "Michael", parents: "Mr. & Mrs. Chen", photo: "/groom.jpg" }
  },
  events: [
    {
      name: "Holy Matrimony",
      date: "2024-06-15",
      time: "2:00 PM",
      venue: "St. Mary's Cathedral",
      address: "123 Church Street"
    }
  ],
  photos: ["/photo1.jpg", "/photo2.jpg"],
  registry: {
    banks: [
      { name: "Chase Bank", account: "1234567890", holder: "Sarah & Michael" }
    ]
  },
  wishes: []
}

export default function WeddingInvitation() {
  return <FloralForestTemplate config={config} />
}
```

### Demo

Visit `/demo/floral-forest` to see the template in action.

### Customization

Each section is a separate component that can be customized independently:

- Modify colors by updating Tailwind classes
- Adjust animations by changing Framer Motion props
- Add new sections by following the existing pattern
- Customize typography by updating font classes

### Performance

- Uses Next.js Image component for optimized images
- Lazy loading implemented for heavy components
- Proper cleanup for timers and event listeners
- Responsive images with proper aspect ratios