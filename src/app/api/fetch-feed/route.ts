import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'
import type { FeedResponse } from '@/lib/rss/types'

const parser = new Parser()

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'url parameter required' }, { status: 400 })
  }

  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }

  try {
    const feed = await parser.parseURL(url)
    const response: FeedResponse = {
      title: feed.title ?? url,
      description: feed.description ?? null,
      items: (feed.items ?? []).map(item => ({
        guid: item.guid ?? item.link ?? item.title ?? crypto.randomUUID(),
        url: item.link ?? null,
        title: item.title ?? null,
        summary: item.contentSnippet ?? item.content ?? null,
        author: item.author ?? null,
        publishedAt: item.pubDate ?? null,
      })),
    }
    return NextResponse.json(response)
  } catch {
    return NextResponse.json({ error: 'failed to fetch or parse feed' }, { status: 500 })
  }
}
