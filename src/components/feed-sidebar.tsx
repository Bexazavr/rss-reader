'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFeeds } from '@/providers/feeds-provider'
import { AddFeedDialog } from './add-feed-dialog'
import { SyncButton } from './sync-button'
import { Button } from '@/components/ui/button'
import { Rss, Trash2 } from 'lucide-react'

export function FeedSidebar() {
  const { feeds, removeFeed } = useFeeds()
  const router = useRouter()

  return (
    <aside className="flex w-52 shrink-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Feeds</span>
        <div className="flex items-center gap-1">
          <SyncButton />
          <AddFeedDialog />
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        <Link
          href="/all"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Rss className="h-3.5 w-3.5 shrink-0" />
          All articles
        </Link>
        {feeds.map(feed => (
          <div key={feed.id} className="group flex items-center gap-1">
            <Link
              href={`/feed/${feed.id}`}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <span className="truncate">{feed.title ?? feed.url}</span>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
              onClick={() => { removeFeed(feed.id); router.push('/all') }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </nav>
    </aside>
  )
}
