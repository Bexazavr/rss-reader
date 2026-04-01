import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  fallback: string
  className?: string
}

export function Avatar({ src, fallback, className }: AvatarProps) {
  return (
    <span className={cn('relative flex h-7 w-7 shrink-0 overflow-hidden rounded-full', className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={fallback} className="aspect-square h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
          {fallback}
        </span>
      )}
    </span>
  )
}
