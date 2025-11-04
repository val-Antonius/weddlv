## CODING STANDARDS & CONVENTIONS

### TypeScript
- **Strict Mode:** Always enabled (`strict: true` in tsconfig.json)
- **No `any` types:** Use proper typing or `unknown` with type guards
- **Explicit return types:** For all functions and Server Actions
- **Interface over Type:** Prefer `interface` for object shapes

### Next.js 15 Best Practices
- **Server Components by default:** Use Client Components only when needed
- **Server Actions:** For all mutations (create, update, delete)
- **Data Fetching:** Use async/await in Server Components
- **Loading States:** Implement `loading.tsx` and Suspense boundaries
- **Error Handling:** Use `error.tsx` for error boundaries

### File Naming
- **Components:** PascalCase (e.g., `RSVPForm.tsx`)
- **Pages:** lowercase with hyphens (e.g., `page.tsx`, `loading.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Types:** PascalCase (e.g., `InvitationConfig`)

### Component Structure
```typescript
// 1. Imports (grouped: React, Next.js, External, Internal, Types)
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { InvitationConfig } from '@/types/invitation'

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export function ComponentName({ prop }: ComponentProps) {
  // State
  const [state, setState] = useState()
  
  // Hooks
  const router = useRouter()
  
  // Handlers
  const handleClick = () => {}
  
  // Render
  return (
    // JSX
  )
}
```

### Supabase Patterns

#### Server-Side Client
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component - ignore
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Component - ignore
          }
        },
      },
    }
  )
}
```

#### Client-Side Client
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server Actions Pattern
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  // validation schema
})

export async function actionName(formData: FormData) {
  // 1. Validate input
  const validatedData = schema.safeParse({
    field: formData.get('field')
  })
  
  if (!validatedData.success) {
    return { error: 'Validation failed' }
  }
  
  // 2. Get authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }
  
  // 3. Perform database operation
  const { data, error } = await supabase
    .from('table_name')
    .insert(validatedData.data)
    .select()
    .single()
  
  if (error) {
    console.error('Database error:', error)
    return { error: 'Operation failed' }
  }
  
  // 4. Revalidate cache
  revalidatePath('/path')
  
  // 5. Return result
  return { data, success: true }
}
```

## SECURITY REQUIREMENTS

### Critical Security Rules
1. **NEVER expose Supabase service_role key** - Only use anon key in client
2. **Always use RLS policies** - Never bypass with service_role in production
3. **Validate all user input** - Use Zod schemas for validation
4. **Sanitize database queries** - Use Supabase's query builder (prevents SQL injection)
5. **Authenticate Server Actions** - Always check `auth.uid()` for protected operations
6. **HTTPS only** - Enforce secure connections (Vercel does this automatically)
7. **Environment variables** - Never commit `.env.local` to git

### Authentication Flow
- Use Supabase Auth with email/password
- Session management via HTTP-only cookies
- Middleware refreshes tokens automatically
- Protected routes check session before rendering

## PERFORMANCE REQUIREMENTS

### Critical Performance Rules
1. **Image Optimization:**
   - Use Next.js `<Image>` component for all images
   - Configure remote patterns in `next.config.js` for Supabase Storage
   - Implement lazy loading and blur placeholders
   
2. **Code Splitting:**
   - Use dynamic imports for heavy components
   - Keep Client Components minimal
   - Prefer Server Components for static content

3. **Database Optimization:**
   - Create indexes on frequently queried columns
   - Use `select()` to specify only needed columns
   - Implement pagination for large lists

4. **Caching Strategy:**
   - Use Next.js caching with `revalidatePath` and `revalidateTag`
   - Cache static invitation pages with ISR
   - Implement optimistic updates for better UX

### Performance Targets
- Lighthouse Performance Score: > 90
- Time to Interactive: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Largest Contentful Paint: < 2.5 seconds

## UI/UX REQUIREMENTS

### Design Principles
- **Mobile-First:** Design for mobile screens first, then scale up
- **Responsive:** Support all screen sizes (320px to 4K)
- **Accessible:** Follow WCAG 2.1 AA standards
- **Modern:** Clean, minimalist design with smooth animations
- **Fast:** Instant feedback for all user interactions

### Tailwind CSS Usage
- Use Tailwind utility classes for styling
- Create custom theme in `tailwind.config.ts`
- Use Shadcn/ui components for consistent UI
- Implement dark mode support (optional)

### Component Libraries Available
- **Shadcn/ui:** Button, Input, Label, Form, Card, Table, Dialog, Select
- **Lucide React:** Icons library
- **No other UI libraries** - Build custom components if needed

## ERROR HANDLING

### Error Handling Pattern
```typescript
try {
  const result = await someOperation()
  
  if (result.error) {
    // Handle expected errors
    return { error: 'User-friendly message' }
  }
  
  return { success: true, data: result.data }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error)
  return { error: 'An unexpected error occurred' }
}
```

### User-Facing Error Messages
- Be specific but not technical
- Provide actionable solutions
- Never expose internal error details
- Log technical errors to console for debugging

## ENVIRONMENT VARIABLES
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## TESTING REQUIREMENTS

### Manual Testing Checklist
- Test all user flows (signup → create invitation → customize → publish)
- Test RSVP submission (success, duplicate email, validation errors)
- Test authentication (login, logout, session persistence)
- Test RLS policies (unauthorized access attempts)
- Test responsive design on multiple devices
- Test performance with Lighthouse

### Edge Cases to Handle
- Duplicate email in RSVP form
- Invalid slug in URL
- Expired authentication session
- File upload failures
- Network errors during form submission
- Empty states (no invitations, no RSVPs)


## IMPORTANT REMINDERS

### What to ALWAYS do:
✅ Use TypeScript strict mode
✅ Validate all user input with Zod
✅ Implement proper error handling
✅ Add loading states for async operations
✅ Use Server Actions for mutations
✅ Optimize images with Next.js Image
✅ Test RLS policies thoroughly
✅ Implement responsive design
✅ Add proper TypeScript types
✅ Use semantic HTML

### What to NEVER do:
❌ Use `any` type in TypeScript
❌ Expose sensitive data in client code
❌ Bypass RLS with service_role key
❌ Skip input validation
❌ Use inline styles (use Tailwind)
❌ Commit environment variables
❌ Create unprotected API routes
❌ Skip error handling
❌ Use `localStorage` for sensitive data
❌ Ignore performance optimization

---

**You are now ready to start building this platform. Follow this context strictly and ask for clarification if anything is unclear before proceeding with implementation.**