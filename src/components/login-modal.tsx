'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoginForm } from '@/app/login/login-form'
import { RegisterModal } from '@/components/register-modal'

export function LoginModal() {
  const [open, setOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        login
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
          </DialogHeader>
          <LoginForm onSuccess={() => setOpen(false)} />
          <p className="text-center text-sm text-muted-foreground">
            No account?{' '}
            <button
              className="underline underline-offset-4 hover:text-foreground"
              onClick={() => { setOpen(false); setRegisterOpen(true) }}
            >
              Register
            </button>
          </p>
        </DialogContent>
      </Dialog>

      <RegisterModal open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  )
}
