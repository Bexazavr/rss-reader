export interface StoredFeed {
  id: string
  url: string
  title: string | null
  addedAt: number
}

export interface FeedItem {
  guid: string
  url: string | null
  title: string | null
  summary: string | null
  author: string | null
  publishedAt: string | null
}

export interface FeedResponse {
  title: string
  description: string | null
  items: FeedItem[]
}

export interface Article extends FeedItem {
  id: string        // `${feedId}:${guid}`
  feedId: string
  feedTitle: string
}
