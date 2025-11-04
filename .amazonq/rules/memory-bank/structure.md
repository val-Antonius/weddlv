# Project Structure - weddlv

## Directory Organization

### `/app` - Next.js App Router Pages
- **`(auth)/`**: Authentication pages (login, signup) with route grouping
- **`[slug]/`**: Dynamic invitation pages accessible via custom URLs
- **`admin/`**: Protected admin dashboard with nested routes
  - **`dashboard/`**: Main admin overview page
  - **`invitations/`**: Invitation management with CRUD operations
    - **`[id]/edit/`**: Individual invitation editing interface
    - **`create/`**: New invitation creation wizard
- **`api/`**: API routes for server-side operations
  - **`invitations/check-slug/`**: Slug availability validation
  - **`rsvp/`**: RSVP submission handling

### `/components` - React Components
- **`ui/`**: Shadcn/ui base components (buttons, forms, dialogs, etc.)
- **`forms/`**: Complex form components
  - **`invitation-editor/`**: Multi-step invitation creation wizard
    - **`steps/`**: Individual wizard steps (basic info, couple info, design, events, gallery, settings)
  - **`rsvp-form.tsx`**: Guest RSVP submission form
- **`invitations/`**: Invitation-specific components
  - **`sections/`**: Reusable invitation sections (cover, events, gallery)
  - **`templates/`**: Template design components
- **`admin/`**: Admin dashboard components (lists, tables, skeletons)

### `/lib` - Utility Libraries
- **`supabase/`**: Database client configuration
  - **`client.ts`**: Client-side Supabase client
  - **`server.ts`**: Server-side Supabase client
  - **`middleware.ts`**: Authentication middleware helpers
- **`actions/`**: Server actions for data operations
  - **`invitation-actions.ts`**: CRUD operations for invitations
- **`utils/`**: Utility functions
  - **`slug-generator.ts`**: URL slug generation utilities
- **`validations.ts`**: Zod validation schemas
- **`email.ts`**: Email service integration

### `/types` - TypeScript Definitions
- **`database.ts`**: Supabase database type definitions
- **`invitation.ts`**: Invitation-related type definitions
- **`rsvp.ts`**: RSVP-related type definitions

### `/supabase` - Database Configuration
- **`schema.sql`**: Complete database schema with RLS policies

## Core Components & Relationships

### Data Flow Architecture
1. **Client Components** → **Server Actions** → **Supabase Client** → **Database**
2. **API Routes** → **Supabase Server Client** → **Database**
3. **Middleware** → **Authentication Check** → **Route Protection**

### Component Hierarchy
```
App Layout
├── Authentication Pages (login/signup)
├── Public Invitation Pages [slug]
├── Admin Layout
│   ├── Dashboard
│   └── Invitation Management
│       ├── Invitation List
│       ├── Invitation Editor (Multi-step)
│       └── RSVP Management
└── API Routes
```

### Key Relationships
- **Users** ↔ **Invitations**: One-to-many relationship with ownership
- **Invitations** ↔ **RSVPs**: One-to-many relationship for guest responses
- **Invitations** ↔ **Guestbook**: One-to-many relationship for guest messages
- **Server Actions** ↔ **Database**: Direct integration via Supabase client
- **Forms** ↔ **Validation**: Zod schemas ensure data integrity

## Architectural Patterns

### Next.js App Router Pattern
- Server-side rendering for SEO optimization
- Client components for interactive features
- Server actions for data mutations
- Route groups for logical organization

### Component Architecture
- Atomic design principles with ui components
- Compound components for complex forms
- Skeleton loading states for better UX
- Reusable sections for invitation templates

### Data Management
- Server-side data fetching with Supabase
- Client-side state management with React Hook Form
- Real-time updates via Supabase subscriptions
- Optimistic updates with revalidation

### Security Architecture
- Row Level Security (RLS) at database level
- Authentication middleware for route protection
- Input validation with Zod schemas
- CSRF protection via Next.js built-ins