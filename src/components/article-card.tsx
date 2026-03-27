import { formatDistanceToNow } from 'date-fns'
import type { Article } from '@/lib/rss/types'

export function ArticleCard({ article }: { article: Article }) {
  const inner = (
    <div className="flex flex-col gap-1.5 rounded-lg border p-4 transition-colors hover:border-foreground/30">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="truncate">{article.feedTitle}</span>
        {article.publishedAt && (
          <>
            <span className="shrink-0">·</span>
            <span className="shrink-0">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </>
        )}
      </div>
      <h3 className="text-sm font-medium leading-snug">{article.title ?? 'Untitled'}</h3>
      {article.summary && (
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
      )}
    </div>
  )

  if (article.url) {
    return (
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  return inner
}
