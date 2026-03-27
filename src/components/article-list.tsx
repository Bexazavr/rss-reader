import { ArticleCard } from './article-card'
import type { Article } from '@/lib/rss/types'

interface Props {
  articles: Article[]
  loading: boolean
}

export function ArticleList({ articles, loading }: Props) {
  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Loading...
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
