# Phase 1 Testing Guide - weddlv Platform

## 🎯 Phase 1 Implementation Complete

The core authentication and RSVP functionality has been implemented successfully. Here's what's been built:

### ✅ Completed Features

1. **Authentication System**
   - Secure login/signup pages with form validation
   - Supabase Auth integration
   - Session management with middleware protection
   - Sign out functionality

2. **RSVP Functionality**
   - Complete RSVP form with validation
   - Server Actions for data submission
   - Email notifications (host & guest)
   - Duplicate email prevention
   - Guest count tracking

3. **Admin Dashboard**
   - RSVP management table with search/filter
   - Statistics and analytics
   - CSV export functionality
   - Invitation management
   - User authentication check

4. **Security & Performance**
   - Row Level Security (RLS) policies
   - Input validation with Zod
   - Proper error handling
   - Loading states
   - Type safety with TypeScript

## 🧪 Testing Checklist

### 1. Authentication Testing
- [ ] Can access `/login` page
- [ ] Can access `/signup` page  
- [ ] Can create new account (check email verification)
- [ ] Can log in with valid credentials
- [ ] Cannot access `/admin` without authentication (redirects to login)
- [ ] Can log out successfully
- [ ] Session persists across page refreshes

### 2. RSVP Testing
- [ ] Can access published invitation via `/{slug}`
- [ ] RSVP form displays correctly
- [ ] Form validation works (required fields, email format)
- [ ] Can submit RSVP successfully
- [ ] Duplicate email submission shows error
- [ ] Guest receives confirmation email
- [ ] Admin receives notification email

### 3. Admin Dashboard Testing
- [ ] Can access `/admin/dashboard` when authenticated
- [ ] RSVP table shows user's data only
- [ ] Search and filter functions work
- [ ] Statistics display correctly
- [ ] CSV export downloads correctly
- [ ] Navigation between pages works

### 4. RLS Policy Testing
- [ ] Anonymous users can view published invitations
- [ ] Anonymous users cannot view unpublished invitations
- [ ] Users can only see their own RSVPs
- [ ] Users cannot access other users' data
- [ ] RSVP insertion works for anonymous users

## 🚀 Quick Start Testing

### 1. Environment Setup
```bash
# Copy environment file
cp .env.example .env.local

# Edit with your credentials:
# - NEXT_PUBLIC_SUPABASE_URL=your_project_url
# - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key  
# - RESEND_API_KEY=your_resend_key
# - NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Setup
1. Go to Supabase Dashboard
2. Run the SQL from `supabase/schema.sql`
3. Enable Row Level Security on all tables
4. Set up Resend for email (optional)

### 3. Start Development
```bash
npm run dev
```

### 4. Test User Flow
1. **Sign Up**: Visit `/signup` → Create account → Verify email
2. **Sign In**: Visit `/login` → Enter credentials → Access dashboard
3. **Create Invitation**: Visit admin → Create wedding invitation
4. **Test RSVP**: Visit invitation page → Submit RSVP form
5. **Check Dashboard**: Return to admin → View RSVP data

## 🔧 Development Notes

### Authentication Flow
- Uses Supabase Auth with email/password
- Sessions managed via HTTP-only cookies
- Middleware protects admin routes automatically
- Automatic token refresh

### RSVP Process
1. Guest fills form → Client validation
2. Form submitted to `/api/rsvp` → Server validation
3. Data inserted to database → Email notifications sent
4. Success response → Form reset with confirmation

### Security Features
- All inputs validated with Zod schemas
- SQL injection prevented via Supabase query builder
- RLS policies ensure data isolation
- No sensitive data exposed to client

### Email Integration
- Uses Resend for transactional emails
- Host notifications for new RSVPs
- Guest confirmations after submission
- Graceful fallback if email fails

## 📊 Database Schema

Key tables with RLS enabled:
- `users` - Admin user profiles
- `invitations` - Wedding invitation data
- `rsvps` - Guest responses
- `guestbook` - Guest messages

All tables have proper indexes and constraints for performance.

## 🎨 UI Components

Using Shadcn/ui components:
- Forms with proper validation states
- Tables with sorting and filtering
- Cards for content organization
- Responsive design with Tailwind CSS

## 🔄 Next Steps (Phase 2)

After completing Phase 1 testing:
1. Invitation builder/editor
2. Template system
3. Media upload (Supabase Storage)
4. Advanced customization options
5. Guestbook functionality
6. Payment integration (optional)

---

**Happy Testing! 🎉**

If you encounter any issues:
1. Check browser console for errors
2. Verify environment variables
3. Confirm Supabase RLS policies
4. Check network requests in dev tools
