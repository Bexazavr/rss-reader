'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { StoredFeed, FeedResponse, Article } from '@/lib/rss/types'

interface FeedsContextValue {
  feeds: StoredFeed[]
  articles: Article[]
  loading: boolean
  addFeed: (url: string) => void
  removeFeed: (id: string) => void
  updateFeedTitle: (id: string, title: string) => void
  sync: () => void
}

const FeedsContext = createContext<FeedsContextValue | null>(null)

const STORAGE_KEY = 'rss-feeds'

export function FeedsProvider({ children }: { children: ReactNode }) {
  const [feeds, setFeeds] = useState<StoredFeed[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFeeds(JSON.parse(raw))
    } catch {}
    setMounted(true)
  }, [])

  const addFeed = (url: string) => {
    const id = crypto.randomUUID()
    setFeeds(prev => {
      const next = [...prev, { id, url, title: null, addedAt: Date.now() }]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const removeFeed = (id: string) => {
    setFeeds(prev => {
      const next = prev.filter(f => f.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
    setArticles(prev => prev.filter(a => a.feedId !== id))
  }

  const updateFeedTitle = useCallback((id: string, title: string) => {
    setFeeds(prev => {
      const next = prev.map(f => (f.id === id ? { ...f, title } : f))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const sync = useCallback(async () => {
    if (feeds.length === 0) {
      setArticles([])
      return
    }
    setLoading(true)

    const results = await Promise.allSettled(
      feeds.map(async feed => {
        const res = await fetch(`/api/fetch-feed?url=${encodeURIComponent(feed.url)}`)
        if (!res.ok) return [] as Article[]
        const data: FeedResponse = await res.json()
        updateFeedTitle(feed.id, data.title)
        return data.items.map(item => ({
          ...item,
          id: `${feed.id}:${item.guid}`,
          feedId: feed.id,
          feedTitle: data.title,
        })) as Article[]
      })
    )

    const all = results
      .filter((r): r is PromiseFulfilledResult<Article[]> => r.status === 'fulfilled')
      .flatMap(r => r.value)

    all.sort((a, b) => {
      if (!a.publishedAt) return 1
      if (!b.publishedAt) return -1
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    setArticles(all)
    setLoading(false)
  }, [feeds, updateFeedTitle])

  // Sync after mount and whenever feeds change
  useEffect(() => {
    if (mounted) sync()
  }, [mounted, sync])

  const value: FeedsContextValue = {
    feeds,
    articles,
    loading,
    addFeed,
    removeFeed,
    updateFeedTitle,
    sync,
  }

  return <FeedsContext.Provider value={value}>{children}</FeedsContext.Provider>
}

export function useFeeds() {
  const ctx = useContext(FeedsContext)
  if (!ctx) throw new Error('useFeeds must be used inside FeedsProvider')
  return ctx
}
