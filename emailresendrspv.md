# Email & RSVP Configuration Guide - weddlv

## Overview
This document explains the email notification system for RSVP submissions, the challenges encountered during development, and the solutions implemented for both development and production phases.

## Issues Encountered

### 1. Resend Free Tier Limitations
**Problem**: Resend's free tier only allows sending emails to your own verified email address during development.
- **Error**: `You can only send testing emails to your own email address (mailto:thonybo6661@gmail.com)`
- **Impact**: Cannot test email notifications with real guest email addresses in development

### 2. Vercel Domain Restrictions
**Problem**: Resend doesn't allow free public domains like `vercel.app` for email sending.
- **Error**: `We don't allow free public domains. Please use a domain you own instead.`
- **Impact**: Cannot send emails from production deployment on Vercel's free domain

### 3. Row Level Security (RLS) Policy Issues
**Problem**: RSVP API route couldn't insert data due to RLS policies blocking unauthenticated requests.
- **Error**: `new row violates row-level security policy for table "rsvps"`
- **Impact**: RSVP submissions were failing completely

## Development Phase Solutions

### 1. Disabled Email Notifications
**Implementation**: Added conditional email sending based on environment variable
```typescript
// In app/api/rsvp/route.ts
const emailEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true'

if (emailEnabled && process.env.RESEND_API_KEY) {
  // Send emails
} else {
  console.log('RSVP submitted successfully - Email notifications disabled')
}
```

### 2. Fixed Resend Client Initialization
**Problem**: Resend client was being instantiated at module load without checking API key availability
**Solution**: Created conditional client initialization
```typescript
// In lib/email.ts
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}
```

### 3. Implemented Service Role Client
**Problem**: API routes using anon key were blocked by RLS policies
**Solution**: Created service client that bypasses RLS for API operations
```typescript
// In lib/supabase/service.ts
export function createServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

## Current Development Configuration

### Environment Variables (.env.local)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kulhzprwujsudkajanzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration (DISABLED in development)
ENABLE_EMAIL_NOTIFICATIONS=false
# RESEND_API_KEY=re_LUEri7JP_EB91qeC3kpJdKTbnny6LsoZp (commented out)

# Application Configuration
NEXT_PUBLIC_APP_URL=https://weddlv.vercel.app
```

### Vercel Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ENABLE_EMAIL_NOTIFICATIONS=false`
- `NEXT_PUBLIC_APP_URL=https://weddlv.vercel.app`

### Current Functionality
✅ **RSVP Submissions**: Working on both localhost and Vercel  
✅ **Database Storage**: RSVPs are saved successfully  
✅ **Admin Dashboard**: RSVP data appears in admin panel  
❌ **Email Notifications**: Disabled during development  

## Production Phase Implementation

### Prerequisites for Email Functionality

#### 1. Custom Domain Setup
**Required**: Purchase and configure a custom domain you own
- Examples: `yourdomain.com`, `yourwedding.com`, `weddlv.com`
- Cannot use free domains like `vercel.app`, `netlify.app`, etc.

#### 2. Domain Verification with Resend
1. Go to [Resend Domains](https://resend.com/domains/add)
2. Add your custom domain
3. Configure DNS records as instructed by Resend
4. Wait for domain verification (usually takes a few minutes)

#### 3. Update Email Configuration
**File**: `lib/email.ts`
```typescript
// Update the 'from' field in both email functions
from: 'noreply@yourdomain.com', // Replace with your verified domain
```

### Production Environment Variables
```env
# Supabase Configuration (same as development)
NEXT_PUBLIC_SUPABASE_URL=https://kulhzprwujsudkajanzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration (ENABLED in production)
RESEND_API_KEY=re_YourProductionAPIKey
ENABLE_EMAIL_NOTIFICATIONS=true

# Application Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Production Deployment Steps

#### 1. Domain Setup
1. Purchase custom domain from registrar (GoDaddy, Namecheap, etc.)
2. Configure domain to point to Vercel
3. Add custom domain in Vercel project settings
4. Wait for SSL certificate provisioning

#### 2. Resend Configuration
1. Add domain to Resend dashboard
2. Configure DNS records (MX, TXT, CNAME)
3. Verify domain ownership
4. Test email sending from Resend dashboard

#### 3. Code Updates
1. Update `from` field in `lib/email.ts` to use your domain
2. Test email templates and content
3. Verify email deliverability

#### 4. Environment Variables
1. Add all production environment variables to Vercel
2. Set `ENABLE_EMAIL_NOTIFICATIONS=true`
3. Add valid `RESEND_API_KEY`
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

#### 5. Testing
1. Deploy to production
2. Test RSVP submission with real email addresses
3. Verify both guest confirmation and host notification emails
4. Check email deliverability and spam folders

## Email Templates

### Host Notification Email
- **Subject**: `New RSVP: [Guest Name] - [Attending/Not Attending]`
- **Content**: Guest information, RSVP status, guest count, message
- **Recipient**: Invitation owner's email

### Guest Confirmation Email
- **Subject**: `RSVP Confirmation - [Wedding Title]`
- **Content**: RSVP confirmation, event details, contact information
- **Recipient**: Guest's email address

## Troubleshooting

### Common Issues

#### Email Not Sending
1. Check `ENABLE_EMAIL_NOTIFICATIONS=true`
2. Verify `RESEND_API_KEY` is valid
3. Confirm domain is verified in Resend
4. Check Resend dashboard for error logs

#### Domain Verification Failed
1. Double-check DNS records
2. Wait for DNS propagation (up to 24 hours)
3. Use DNS checker tools to verify records
4. Contact Resend support if issues persist

#### Emails Going to Spam
1. Configure SPF, DKIM, and DMARC records
2. Use professional email content
3. Test with different email providers
4. Monitor sender reputation

### Development Testing
For testing email functionality during development:
1. Use your own verified email address
2. Set `ENABLE_EMAIL_NOTIFICATIONS=true` temporarily
3. Add valid `RESEND_API_KEY`
4. Test with localhost only

## Security Considerations

### Service Role Key
- **Purpose**: Bypasses RLS for API operations
- **Security**: Keep secret, never expose in client-side code
- **Usage**: Only in server-side API routes
- **Rotation**: Rotate periodically for security

### Email Security
- **Domain Verification**: Prevents email spoofing
- **API Key Protection**: Store securely in environment variables
- **Rate Limiting**: Consider implementing to prevent abuse
- **Content Validation**: Sanitize user input in email templates

## Future Enhancements

### Potential Improvements
1. **Email Templates**: Rich HTML templates with better styling
2. **Email Scheduling**: Send reminder emails before events
3. **Bulk Operations**: Send updates to all guests
4. **Analytics**: Track email open rates and engagement
5. **Internationalization**: Multi-language email support

### Alternative Email Providers
If Resend doesn't meet requirements:
- **SendGrid**: Enterprise-grade email service
- **Mailgun**: Developer-focused email API
- **Amazon SES**: AWS email service
- **Postmark**: Transactional email specialist

## Summary

The current implementation prioritizes core RSVP functionality over email notifications during development. This approach ensures:
- ✅ Reliable RSVP data collection
- ✅ Smooth development workflow
- ✅ No blocking issues for testing
- ✅ Easy transition to production with emails

For production deployment, email functionality can be enabled by configuring a custom domain with Resend and updating the appropriate environment variables.