import { ArticleCard } from './article-card'
import type { Article } from '@/lib/rss/types'

interface Props {
  articles: Article[]
  loading: boolean
}

function ArticleSkeleton() {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border p-4">
      <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      <div className="h-3 w-full animate-pulse rounded bg-muted" />
    </div>
  )
}

export function ArticleList({ articles, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => <ArticleSkeleton key={i} />)}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        No articles. Add a feed to get started.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
