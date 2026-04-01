import { ThemeToggle } from './theme-toggle'
import { ThemeColorPicker } from './theme-color-picker'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <span className="text-sm font-semibold tracking-tight">rss reader</span>
        <div className="flex items-center gap-1">
          <ThemeColorPicker storagePrefix="rss" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
