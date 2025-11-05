'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { signInSchema, signUpSchema } from '@/lib/validations'
import type { SignInFormValues, SignUpFormValues } from '@/lib/validations'

export async function signIn(formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid email or password' }
  }

  const { email, password } = validatedFields.data

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Sign in error:', error)
      return { error: 'Invalid email or password' }
    }

    revalidatePath('/admin')
    return { success: true, message: 'Successfully signed in' }
  } catch (error) {
    console.error('Unexpected sign in error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signUp(formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return { error: 'Please check your input and try again' }
  }

  const { email, password } = validatedFields.data

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    })

    if (error) {
      console.error('Sign up error:', error)
      if (error.message.includes('User already registered')) {
        return { error: 'An account with this email already exists' }
      }
      return { error: 'Failed to create account' }
    }

    revalidatePath('/login')
    return { 
      success: true, 
      message: 'Account created successfully! Please check your email to verify your account.' 
    }
  } catch (error) {
    console.error('Unexpected sign up error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Sign out error:', error)
      return { error: 'Failed to sign out' }
    }

    revalidatePath('/')
    return { success: true, message: 'Successfully signed out' }
  } catch (error) {
    console.error('Unexpected sign out error:', error)
    return { error: 'An unexpected error occurred' }
  }
}
