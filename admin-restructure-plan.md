# Admin Flow Restructure Implementation Plan

## Overview
Restructure admin section to eliminate confusing aggregated dashboard and provide clear, invitation-specific management interface.

## Current Problems
- `/admin/dashboard` shows mixed stats from all invitations
- No way to view individual invitation statistics
- Confusing user flow with aggregated data
- Can't manage specific invitation RSVPs separately

## New Structure

### Route Changes
```
REMOVE:
/admin/dashboard → Delete aggregated dashboard
/admin/rsvps → Remove global RSVP page

MODIFY:
/admin → Redirect to /admin/invitations
/admin/invitations → Enhanced as main landing page

ADD:
/admin/invitations/[id] → Individual invitation dashboard
/admin/invitations/[id]/rsvps → Individual RSVP management
```

### File Structure Changes
```
app/admin/
├── layout.tsx (keep)
├── page.tsx (NEW - redirect to invitations)
├── dashboard/ (DELETE entire folder)
├── rsvps/ (DELETE entire folder)
└── invitations/
    ├── page.tsx (MODIFY - enhanced main page)
    ├── create/
    │   └── page.tsx (keep)
    └── [id]/
        ├── page.tsx (NEW - individual dashboard)
        ├── edit/
        │   └── page.tsx (keep)
        └── rsvps/
            └── page.tsx (NEW - individual RSVP management)
```

## Implementation Steps

### Phase 1: Create New Routes

#### 1.1 Admin Root Redirect
**File**: `app/admin/page.tsx`
```typescript
import { redirect } from 'next/navigation'

export default function AdminPage() {
  redirect('/admin/invitations')
}
```

#### 1.2 Individual Invitation Dashboard
**File**: `app/admin/invitations/[id]/page.tsx`
- Fetch single invitation data
- Show invitation-specific stats
- Display RSVPs for this invitation only
- Quick actions (Edit, View Public, Manage RSVPs)

#### 1.3 Individual RSVP Management
**File**: `app/admin/invitations/[id]/rsvps/page.tsx`
- Detailed RSVP table for single invitation
- Export functionality
- Guest management tools

### Phase 2: Enhance Invitation List

#### 2.1 Enhanced Main Page
**File**: `app/admin/invitations/page.tsx`
- Card-based layout instead of simple table
- Show quick stats per invitation
- Better visual hierarchy
- Quick action buttons

#### 2.2 New Components
**Files**: 
- `components/admin/invitation-card.tsx` - Individual invitation card
- `components/admin/invitation-dashboard.tsx` - Single invitation dashboard
- `components/admin/invitation-rsvp-table.tsx` - Single invitation RSVP table

### Phase 3: Update Navigation

#### 3.1 Breadcrumb System
- Add breadcrumb navigation
- Clear context of current invitation
- Easy navigation between levels

#### 3.2 Update Links
- Remove dashboard links from existing components
- Update navigation in `DashboardClient` component
- Fix all internal links

### Phase 4: Clean Up

#### 4.1 Remove Old Files
- Delete `app/admin/dashboard/`
- Delete `app/admin/rsvps/`
- Remove unused components

#### 4.2 Update Components
- Modify `RSVPTable` to work with single invitation
- Update `DashboardClient` or remove if not needed
- Clean up unused imports

## New User Flow

### First Time User
1. Login → `/admin/invitations` (empty state)
2. Click "Create First Invitation"
3. Complete wizard → Return to invitation list
4. Click invitation card → Individual dashboard

### Returning User
1. Login → `/admin/invitations` (list of invitations)
2. Click invitation card → Individual dashboard with stats
3. From dashboard → Edit, View Public, or Manage RSVPs

### Navigation Hierarchy
```
Invitations List (/admin/invitations)
├── Create New (/admin/invitations/create)
└── Individual Invitation (/admin/invitations/[id])
    ├── Dashboard (stats, quick actions)
    ├── Edit (/admin/invitations/[id]/edit)
    └── RSVPs (/admin/invitations/[id]/rsvps)
```

## Component Architecture

### Invitation Card Component
```typescript
interface InvitationCardProps {
  invitation: Invitation
  rsvpStats: {
    total: number
    attending: number
    pending: number
  }
}
```

### Individual Dashboard Component
```typescript
interface InvitationDashboardProps {
  invitation: Invitation
  rsvps: RSVP[]
  stats: InvitationStats
}
```

## Data Fetching Strategy

### Invitation List Page
- Fetch all user invitations with RSVP counts
- Use aggregated queries for performance
- Show summary stats per invitation

### Individual Dashboard
- Fetch single invitation with full details
- Fetch all RSVPs for this invitation
- Calculate detailed statistics

### Individual RSVP Page
- Fetch single invitation context
- Fetch all RSVPs with guest details
- Provide filtering and sorting

## Benefits of New Structure

### User Experience
- **Clear Context**: Always know which invitation you're managing
- **Actionable Data**: Stats tied to specific invitation
- **Logical Flow**: Natural progression from list to details
- **No Confusion**: No mixed data from multiple invitations

### Technical Benefits
- **Better Performance**: Load only needed data
- **Cleaner Code**: Single responsibility per page
- **Easier Maintenance**: Clear separation of concerns
- **Scalable**: Works with 1 or 100 invitations

## Migration Considerations

### Existing Links
- Update any hardcoded `/admin/dashboard` links
- Redirect old URLs to new structure
- Update navigation components

### Component Reuse
- Adapt existing `RSVPTable` for single invitation use
- Reuse `InvitationEditor` as-is
- Create new card-based components

### Database Queries
- Optimize for single invitation queries
- Add proper indexes if needed
- Consider caching for frequently accessed data

## Testing Strategy

### Manual Testing
1. Test empty state (no invitations)
2. Test single invitation flow
3. Test multiple invitations
4. Test all navigation paths
5. Verify RSVP management works per invitation

### Edge Cases
- Handle invitation not found
- Handle unauthorized access
- Handle deleted invitations
- Test with large RSVP lists

## Timeline Estimate

- **Phase 1**: 2-3 hours (new routes)
- **Phase 2**: 3-4 hours (enhanced components)
- **Phase 3**: 1-2 hours (navigation updates)
- **Phase 4**: 1 hour (cleanup)

**Total**: 7-10 hours of development time

## Success Criteria

✅ Admin lands on invitation list, not aggregated dashboard  
✅ Can view individual invitation statistics  
✅ Can manage RSVPs per invitation separately  
✅ Clear navigation between invitation list and details  
✅ No confusing mixed data from multiple invitations  
✅ All existing functionality preserved  
✅ Better user experience with logical flow