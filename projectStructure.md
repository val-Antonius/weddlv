wedding-invite-platform/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── actions.ts
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── invitations/
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   └── rsvps/
│   │       └── page.tsx
│   ├── [slug]/
│   │   ├── page.tsx
│   │   └── [guestName]/
│   │       └── page.tsx
│   ├── api/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # Shadcn/ui components
│   ├── forms/
│   │   ├── rsvp-form.tsx
│   │   ├── invitation-editor.tsx
│   │   └── guestbook-form.tsx
│   ├── invitations/
│   │   ├── templates/
│   │   │   ├── simple-modern.tsx
│   │   │   ├── classic-elegant.tsx
│   │   │   └── romantic-feminine.tsx
│   │   └── sections/
│   │       ├── cover-section.tsx
│   │       ├── countdown-section.tsx
│   │       ├── gallery-section.tsx
│   │       ├── rsvp-section.tsx
│   │       └── maps-section.tsx
│   └── admin/
│       ├── rsvp-table.tsx
│       └── invitation-list.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Client-side Supabase
│   │   ├── server.ts        # Server-side Supabase
│   │   └── middleware.ts    # Middleware helper
│   ├── email.ts             # Resend integration
│   ├── utils.ts             # Utility functions
│   └── validations.ts       # Zod schemas
├── types/
│   ├── invitation.ts
│   ├── rsvp.ts
│   └── database.ts
├── public/
│   └── assets/
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json