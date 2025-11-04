import { createClient } from '@/lib/supabase/server'
import type { CoupleInfo } from '@/types/invitation'

const RESERVED_WORDS = [
  'admin', 'api', 'auth', 'www', 'mail', 'email', 'support', 'help',
  'login', 'logout', 'signup', 'register', 'dashboard', 'settings',
  'profile', 'account', 'user', 'users', 'guest', 'guests', 'rsvp',
  'invitation', 'invitations', 'wedding', 'marriage', 'ceremony',
  'reception', 'party', 'event', 'events', 'gallery', 'photos',
  'videos', 'about', 'contact', 'privacy', 'terms', 'legal',
  'copyright', 'license', 'sitemap', 'robots', 'favicon', 'assets',
  'static', 'public', 'private', 'secure', 'cdn', 'app', 'application'
]

function generateRandomString(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function cleanSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

function isReserved(slug: string): boolean {
  return RESERVED_WORDS.includes(slug.toLowerCase())
}

function generateBaseSlug(bride: CoupleInfo, groom: CoupleInfo): string {
  const brideName = cleanSlug(bride.nickname || bride.fullName)
  const groomName = cleanSlug(groom.nickname || groom.fullName)
  
  // Try different combinations
  const combinations = [
    `${brideName}-${groomName}`,
    `${groomName}-${brideName}`,
    `${brideName}-and-${groomName}`,
    `${groomName}-and-${brideName}`,
  ]

  // Return the first valid combination
  for (const combo of combinations) {
    if (combo.length >= 3 && combo.length <= 50 && !isReserved(combo)) {
      return combo
    }
  }

  // Fallback to just one name if combinations are too long
  const fallback = brideName.length <= groomName.length ? brideName : groomName
  return fallback.length >= 3 ? fallback : 'wedding'
}

async function isSlugAvailable(slug: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('invitations')
    .select('slug')
    .eq('slug', slug)
    .single()

  return error?.code === 'PGRST116' // Not found error code
}

export async function generateSlug(
  bride: CoupleInfo,
  groom: CoupleInfo,
  customSlug?: string
): Promise<string> {
  let baseSlug: string

  if (customSlug) {
    baseSlug = cleanSlug(customSlug)
    
    // Validate custom slug
    if (baseSlug.length < 3 || baseSlug.length > 50) {
      throw new Error('Slug must be between 3 and 50 characters')
    }
    
    if (isReserved(baseSlug)) {
      throw new Error('This slug is reserved and cannot be used')
    }
    
    if (!/^[a-z0-9-]+$/.test(baseSlug)) {
      throw new Error('Slug can only contain lowercase letters, numbers, and hyphens')
    }
  } else {
    baseSlug = generateBaseSlug(bride, groom)
  }

  // Check if base slug is available
  if (await isSlugAvailable(baseSlug)) {
    return baseSlug
  }

  // If not available, append random string
  let attempt = 1
  let finalSlug = `${baseSlug}-${generateRandomString()}`
  
  while (attempt < 10) {
    if (await isSlugAvailable(finalSlug)) {
      return finalSlug
    }
    
    finalSlug = `${baseSlug}-${generateRandomString()}`
    attempt++
  }

  // If all attempts fail, generate a completely random slug
  return `wedding-${generateRandomString(8)}`
}

export function validateSlug(slug: string): { isValid: boolean; error?: string } {
  if (slug.length < 3) {
    return { isValid: false, error: 'Slug must be at least 3 characters' }
  }
  
  if (slug.length > 50) {
    return { isValid: false, error: 'Slug must be 50 characters or less' }
  }
  
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { isValid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }
  
  if (isReserved(slug)) {
    return { isValid: false, error: 'This slug is reserved and cannot be used' }
  }
  
  return { isValid: true }
}
