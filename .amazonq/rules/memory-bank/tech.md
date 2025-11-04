# Technology Stack - weddlv

## Programming Languages & Versions
- **TypeScript 5.x**: Primary language with strict mode enabled
- **JavaScript**: For configuration files and build scripts
- **SQL**: Database schema and queries via Supabase

## Core Framework & Runtime
- **Next.js 16.0.1**: React framework with App Router
- **React 19.2.0**: UI library with latest features
- **React DOM 19.2.0**: DOM rendering library
- **Node.js 18+**: Runtime environment requirement

## Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **Shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Headless UI primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-select`
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-label`
  - `@radix-ui/react-progress`
  - `@radix-ui/react-slot`
- **Framer Motion 12.23.24**: Animation library
- **Lucide React 0.552.0**: Icon library
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Utility class merging

## Backend & Database
- **Supabase**: Backend-as-a-Service platform
  - `@supabase/supabase-js 2.78.0`: JavaScript client
  - `@supabase/ssr 0.7.0`: Server-side rendering support
- **PostgreSQL**: Database (via Supabase)
- **Row Level Security**: Database-level security policies

## Forms & Validation
- **React Hook Form 7.66.0**: Form state management
- **Zod 4.1.12**: Schema validation library
- **@hookform/resolvers 5.2.2**: Form validation integration

## Email & Communication
- **Resend 6.4.0**: Email service for notifications

## Development Tools
- **ESLint 9**: Code linting with Next.js config
- **TypeScript Compiler**: Type checking and compilation
- **PostCSS**: CSS processing with Tailwind

## Build System & Dependencies
- **npm**: Package manager
- **Next.js Build System**: Optimized production builds
- **Vercel**: Recommended deployment platform

## Development Commands

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type checking only
```

### Environment Setup
```bash
npm install          # Install dependencies
cp .env.example .env.local  # Setup environment variables
```

## Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Email Service
RESEND_API_KEY=your_resend_api_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Configuration Files
- **`package.json`**: Dependencies and scripts
- **`tsconfig.json`**: TypeScript configuration
- **`next.config.ts`**: Next.js configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`postcss.config.mjs`**: PostCSS configuration
- **`eslint.config.mjs`**: ESLint configuration
- **`components.json`**: Shadcn/ui configuration

## Database Schema
- **Location**: `supabase/schema.sql`
- **Tables**: users, invitations, rsvps, guestbook
- **Features**: RLS policies, foreign key constraints, indexes
- **Storage**: Supabase Storage for media files

## Deployment Requirements
- **Node.js 18+**: Runtime requirement
- **Supabase Project**: Database and authentication
- **Resend Account**: Email service
- **Vercel Account**: Deployment platform (recommended)

## Development Prerequisites
- Node.js 18+ installed
- Git for version control
- Supabase account and project
- Resend account for email
- Code editor with TypeScript support