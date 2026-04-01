'use client'

import { useActionState } from 'react'
import { signUp } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RegisterForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [state, action, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const result = await signUp(formData)
      return result ?? null
    },
    null
  )

  if (state?.success) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">Account created!</p>
        <p className="text-sm text-muted-foreground">
          Your account is pending activation. You'll be able to log in once an admin activates your account.
        </p>
      </div>
    )
  }

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
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  )
}
