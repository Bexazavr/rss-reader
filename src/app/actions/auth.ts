'use server'

import { createClient } from '@/lib/supabase/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  const meta = data.user.app_metadata
  const isActive = meta?.role === 'owner' || meta?.role === 'friend'
  if (!isActive) {
    await supabase.auth.signOut()
    return { error: 'Your account is pending activation by the admin.' }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (password.length < 8) return { error: 'Password must be at least 8 characters' }

  const admin = getSupabaseAdmin()
  const defaultName = email.split('@')[0]

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { active: false },
    user_metadata: { username: defaultName, full_name: defaultName },
  })

  if (error) return { error: error.message }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
