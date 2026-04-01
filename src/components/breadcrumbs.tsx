import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbEntry {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="inline-flex items-center gap-1">
          <a href="/" className="transition-colors hover:text-foreground">home</a>
        </li>
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">{item.label}</Link>
            ) : (
              <span className="font-normal text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
