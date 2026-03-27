'use client'

import { use } from 'react'
import { useFeeds } from '@/providers/feeds-provider'
import { FeedSidebar } from '@/components/feed-sidebar'
import { ArticleList } from '@/components/article-list'

export default function FeedPage({ params }: { params: Promise<{ feedId: string }> }) {
  const { feedId } = use(params)
  const { feeds, articles, loading } = useFeeds()

  const feed = feeds.find(f => f.id === feedId)
  const feedArticles = articles.filter(a => a.feedId === feedId)

  return (
    <div className="mx-auto flex max-w-5xl gap-8 px-4 py-8">
      <FeedSidebar />
      <main className="min-w-0 flex-1">
        <h2 className="mb-4 text-lg font-medium">
          {feed?.title ?? feed?.url ?? 'Feed'}
        </h2>
        <ArticleList articles={feedArticles} loading={loading} />
      </main>
    </div>
  )
}
