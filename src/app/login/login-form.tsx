'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const router = useRouter()

  const [state, action, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const result = await signIn(formData)
      return result ?? null
    },
    null
  )

  useEffect(() => {
    if (state?.success) {
      if (onSuccess) {
        onSuccess()
        router.refresh()
      } else {
        router.refresh()
      }
    }
  }, [state, router, onSuccess])

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required placeholder="••••••••" />
      </div>
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
