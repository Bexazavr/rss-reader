'use client'

import { use } from 'react'
import { useFeeds } from '@/providers/feeds-provider'
import { FeedSidebar } from '@/components/feed-sidebar'
import { ArticleList } from '@/components/article-list'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function FeedPage({ params }: { params: Promise<{ feedId: string }> }) {
  const { feedId } = use(params)
  const { feeds, articles, loading } = useFeeds()

  const feed = feeds.find(f => f.id === feedId)
  const feedArticles = articles.filter(a => a.feedId === feedId)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 gap-8 overflow-hidden px-4 py-8">
      <FeedSidebar />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <h2 className="mb-4 shrink-0 text-lg font-medium">
          {feed?.title ?? feed?.url ?? 'Feed'}
        </h2>
        <ScrollArea className="flex-1">
          <ArticleList articles={feedArticles} loading={loading} />
        </ScrollArea>
      </main>
    </div>
  )
}
