'use client'

import { useFeeds } from '@/providers/feeds-provider'
import { FeedSidebar } from '@/components/feed-sidebar'
import { ArticleList } from '@/components/article-list'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AllArticlesPage() {
  const { articles, loading } = useFeeds()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 gap-8 overflow-hidden px-4 py-8">
      <FeedSidebar />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <h2 className="mb-4 shrink-0 text-lg font-medium">All articles</h2>
        <ScrollArea className="flex-1">
          <ArticleList articles={articles} loading={loading} />
        </ScrollArea>
      </main>
    </div>
  )
}
