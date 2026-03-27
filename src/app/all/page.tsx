'use client'

import { useFeeds } from '@/providers/feeds-provider'
import { FeedSidebar } from '@/components/feed-sidebar'
import { ArticleList } from '@/components/article-list'

export default function AllArticlesPage() {
  const { articles, loading } = useFeeds()

  return (
    <div className="mx-auto flex w-full max-w-5xl gap-8 px-4 py-8">
      <FeedSidebar />
      <main className="min-w-0 flex-1">
        <h2 className="mb-4 text-lg font-medium">All articles</h2>
        <ArticleList articles={articles} loading={loading} />
      </main>
    </div>
  )
}
