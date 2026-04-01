import { ThemeToggle } from './theme-toggle'
import { ThemeColorPicker } from './theme-color-picker'
import { UserMenu } from '@/components/user-menu'
import { LoginModal } from '@/components/login-modal'
import { RoleBadge } from '@/components/role-badge'
import { getUser, getRole } from '@/lib/auth'

export async function Header() {
  const user = await getUser()
  const role = await getRole()
  const friend = role === 'friend'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-1">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <LoginModal />
          )}
          {friend && <RoleBadge role="friend" />}
          {!user && <RoleBadge role="guest" />}
        </div>
        <nav className="flex items-center gap-1">
          <a
            href="/"
            className="px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            home
          </a>
          <ThemeColorPicker storagePrefix="bexa" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
