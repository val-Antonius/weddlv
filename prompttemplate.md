You are an expert Full-Stack Developer specialized in building modern web applications using Next.js 15, TypeScript, Supabase, Tailwind CSS, Framer Motion, Shadcn, and other UI React Library. You will help build a Digital Wedding Invitation SaaS Platform.
Platform Name: weddlv - Digital Wedding Invitation Platform
Purpose: Self-service SaaS platform enabling couples (Hosts) to create, customize, and distribute modern, interactive digital wedding invitations with seamless mobile experience.
Target Users:
- Hosts (Admins): Couples creating wedding invitations
- Guests: Recipients viewing invitations and submitting RSVPs
Recently, I'm done build up phase 0 -2;  set up the foundation for a Next.js, build core authentication and RSVP functionality, and building the invitation creation and customization system that Focus on:
1. Set up a clean, type-safe Next.js project with App Router
2. Configure Supabase with proper RLS policies
3. Establish database schema with proper indexes
4. Install and configure libraries components
5. Build secure authentication system with Supabase Auth
6. Implement route protection with Next.js middleware
7. Create functional RSVP form with Server Actions
8. Build admin dashboard with searchable RSVP table
9. Integrate Resend for email notifications
10. Design flexible JSON schema for invitation configuration
11. Build multi-step invitation editor with form validation
12. Implement dynamic routing with custom slugs
13. Create template system with multiple design options
14. Set up media upload with Supabase Storage

Now, I need you to build and implementating the phase 3: Interactive Features & Guest Experience, that focus on:
**Your Primary Goals:**
1. Build real-time countdown timer
2. Implement background music player with controls
3. Create health protocol popup
4. Integrate Google Maps for venue locations
5. Build guestbook functionality
6. Add personalized guest landing pages
7. Implement digital envelope (gift information)

**Critical Requirements:**
- All interactive elements MUST work on mobile devices
- Use Client Components only for truly interactive parts
- Implement proper cleanup for timers and audio
- Add session storage to prevent popup spam
- Make all links mobile-friendly (tel:, maps:, etc.)

**Countdown Timer Pattern:**
```typescript
'use client'

import { useState, useEffect } from 'react'

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    
    return () => clearInterval(timer) // Cleanup!
  }, [targetDate])
  
  // Handle case when date has passed
  if (timeLeft.total <= 0) {
    return <div>The event has begun! 🎉</div>
  }
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Display days, hours, minutes, seconds */}
    </div>
  )
}
```

**Background Music Player:**
- Implement play/pause toggle
- Show music controls
- Respect browser autoplay policies (require user interaction)
- Add volume control
- Handle audio loading errors gracefully
- Provide visual feedback when playing

**Google Maps Integration:**
```typescript
// Don't use iframe - use direct link approach
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

<a 
  href={mapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="button"
>
  Open in Maps
</a>
```

**Personalized Guest Experience:**
- Accept guest name in URL: `/[slug]/[guestName]` or `/[slug]?to=Name`
- Display personalized greeting on cover
- Pre-fill RSVP form with guest name
- Decode URI components properly
- Handle missing guest name gracefully

**Guestbook Implementation:**
- Allow anonymous message submission
- Display messages in real-time (newest first)
- Implement character limit (500 chars)
- Show submission timestamp
- Add optional moderation in admin panel

**Digital Envelope Features:**
- Display bank account details
- Add "Copy to Clipboard" functionality
- Show multiple payment options (banks, e-wallets)
- Generate QR codes for payment apps (optional)
- Add thank you message

**Mobile-First Checklist:**
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable without zooming (min 16px)
- [ ] Forms are easy to fill on mobile keyboards
- [ ] Buttons are thumb-friendly positioned
- [ ] No horizontal scrolling
- [ ] Fast loading on 3G connections

**Accessibility Checklist:**
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Alt text for all images
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Focus indicators visible


Follow this @/Rule-requirements.md and @/projectStructure.md strictly and ask for clarification if anything is unclear before proceeding with implementation.