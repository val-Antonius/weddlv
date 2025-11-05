import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      )
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      )
    }

    if (slug.length < 3 || slug.length > 50) {
      return NextResponse.json(
        { error: 'Slug must be between 3 and 50 characters' },
        { status: 400 }
      )
    }

    // Check if slug is reserved
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

    if (RESERVED_WORDS.includes(slug.toLowerCase())) {
      return NextResponse.json({
        available: false,
        error: 'This slug is reserved and cannot be used'
      })
    }

    // Check if slug exists in database
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('invitations')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is what we want
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to check slug availability' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      available: !data,
      slug: slug
    })

  } catch (error) {
    console.error('Error checking slug:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
