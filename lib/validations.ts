import { z } from 'zod'

// RSVP Validation Schema
export const rsvpSchema = z.object({
  invitation_id: z.string().uuid('Invalid invitation ID'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  attendance: z.boolean(),
  guest_count: z.number().int().min(1).max(10).default(1),
  message: z.string().max(500, 'Message is too long').optional(),
})

export type RSVPFormValues = z.infer<typeof rsvpSchema>

export type EventType = 'akad' | 'reception' | 'other'

// Guestbook Validation Schema
export const guestbookSchema = z.object({
  invitation_id: z.string().uuid('Invalid invitation ID'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  message: z
    .string()
    .min(5, 'Message must be at least 5 characters')
    .max(500, 'Message must not exceed 500 characters'),
})

export type GuestbookFormValues = z.infer<typeof guestbookSchema>

// Invitation Configuration Validation Schema
export const coupleInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  nickname: z.string().min(1, 'Nickname is required'),
  parents: z.string().default(''),
  photo: z.string().default(''),
})

export const eventDetailsSchema = z.object({
  id: z.string(),
  type: z.enum(['akad', 'reception', 'other']),
  title: z.string().min(1, 'Event title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(1, 'Venue is required'),
  address: z.string().min(1, 'Address is required'),
  mapsLink: z.string().default(''),
})

export const gallerySchema = z.object({
  photos: z.array(z.string()).max(20, 'Maximum 20 photos allowed').default([]),
  videos: z.array(z.string()).max(5, 'Maximum 5 videos allowed').default([]),
})

export const loveStorySchema = z.object({
  title: z.string().default(''),
  content: z.string().default(''),
})

export const musicSchema = z.object({
  url: z.string().default(''),
  autoplay: z.boolean().default(false),
})

export const bankAccountSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  accountName: z.string().min(1, 'Account name is required'),
})

export const giftSchema = z.object({
  enabled: z.boolean().default(false),
  accounts: z.array(bankAccountSchema).max(5, 'Maximum 5 bank accounts allowed').default([]),
})

export const invitationSettingsSchema = z.object({
  showProtocolPopup: z.boolean().default(false),
  enableGuestbook: z.boolean().default(true),
  language: z.enum(['en', 'id']).default('en'),
})

export const invitationConfigSchema = z.object({
  template: z.enum(['simple-modern', 'classic-elegant', 'romantic-feminine']),
  couple: z.object({
    bride: coupleInfoSchema,
    groom: coupleInfoSchema,
  }),
  events: z.array(eventDetailsSchema).min(1, 'At least one event is required').max(5, 'Maximum 5 events allowed'),
  gallery: gallerySchema,
  loveStory: loveStorySchema,
  music: musicSchema,
  gift: giftSchema,
  settings: invitationSettingsSchema,
})

export type InvitationConfigFormValues = z.infer<typeof invitationConfigSchema>

// Invitation Creation Schema
export const createInvitationSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  config_json: invitationConfigSchema,
  is_published: z.boolean().default(false),
})

export type CreateInvitationFormValues = z.infer<typeof createInvitationSchema>

// Authentication Schemas
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type SignInFormValues = z.infer<typeof signInSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>
