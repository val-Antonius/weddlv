# weddlv - Digital Wedding Invitation Platform

A modern, self-service SaaS platform enabling couples to create, customize, and distribute beautiful, interactive digital wedding invitations with seamless mobile experience.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Email:** Resend
- **Deployment:** Vercel
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Validation:** Zod
- **Forms:** React Hook Form

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account ([supabase.com](https://supabase.com))
- A Resend account for email ([resend.com](https://resend.com))
- Git installed

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd weddlv
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up Supabase Database

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Navigate to **SQL Editor**
4. Copy the contents of `supabase/schema.sql`
5. Paste and execute in the SQL Editor
6. Verify tables are created:
   - `users`
   - `invitations`
   - `rsvps`
   - `guestbook`

### 5. Set up Supabase Storage (Optional)

1. Navigate to **Storage** in Supabase Dashboard
2. Create a new bucket named `invitation-media`
3. Set it as **Public**
4. Copy and run the storage policy SQL from `supabase/schema.sql`

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
weddlv/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages (future)
│   ├── admin/               # Protected admin dashboard (future)
│   └── [slug]/              # Dynamic invitation pages (future)
├── components/
│   ├── ui/                  # Shadcn/ui base components
│   ├── forms/               # Form components
│   ├── invitations/         # Invitation-specific components
│   │   ├── templates/       # Template designs
│   │   └── sections/        # Reusable sections
│   └── admin/               # Admin dashboard components
├── lib/
│   ├── supabase/            # Supabase client utilities
│   │   ├── server.ts        # Server-side client
│   │   ├── client.ts        # Client-side client
│   │   └── middleware.ts    # Auth middleware helper
│   ├── utils.ts             # Utility functions
│   └── validations.ts       # Zod schemas
├── types/
│   ├── database.ts          # Database type definitions
│   ├── invitation.ts        # Invitation types
│   └── rsvp.ts              # RSVP types
├── supabase/
│   └── schema.sql           # Database schema with RLS
└── middleware.ts            # Next.js middleware
```

## 🧪 Development Workflow

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## 📊 Database Schema

### Tables

- **users**: Admin users linked to Supabase Auth
- **invitations**: Wedding invitation configurations (JSONB)
- **rsvps**: Guest RSVP responses
- **guestbook**: Guest messages

### Row Level Security (RLS)

All tables have RLS enabled with proper policies:

- **users**: Users can only view/update their own data
- **invitations**: Public can view published, owners have full CRUD
- **rsvps**: Anyone can insert, only owners can view/manage
- **guestbook**: Anyone can insert/view, owners can delete

## 🔐 Security

- ✅ TypeScript strict mode enabled
- ✅ Row Level Security on all tables
- ✅ Input validation with Zod
- ✅ Authentication via Supabase Auth
- ✅ HTTP-only cookies for session management
- ✅ Middleware for route protection
- ✅ SQL injection prevention via Supabase query builder

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## 📚 Documentation

- [WARP.md](./WARP.md) - Guide for AI agents working with this codebase
- [ai-agent-prompts.md](./ai-agent-prompts.md) - Comprehensive development guidelines
- [weddlv_master_plan.md](./weddlv_master_plan.md) - Development roadmap

## 🎯 Current Status: Phase 0 Complete

✅ Next.js 16 setup with TypeScript strict mode  
✅ Supabase integration configured  
✅ Database schema with RLS policies  
✅ UI library setup (Shadcn/ui, Framer Motion, Lucide)  
✅ Type definitions and validation schemas  
✅ Project structure established  

### Next Phase: Phase 1 - Core MVP

- Authentication system (login, signup)
- RSVP form functionality
- Admin dashboard
- Email notifications

## 🤝 Contributing

Refer to the development guidelines in `ai-agent-prompts.md` for coding standards and best practices.

## 📝 License

MIT License

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Shadcn for the beautiful UI components
