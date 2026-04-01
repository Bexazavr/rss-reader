import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type Role = 'owner' | 'friend' | 'guest'

export async function getUser() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch {
    return null
  }
}

export async function getRole(): Promise<Role> {
  const user = await getUser()
  if (!user) return 'guest'
  return (user.app_metadata?.role as Role) ?? 'guest'
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) redirect('/')
  return user
}
