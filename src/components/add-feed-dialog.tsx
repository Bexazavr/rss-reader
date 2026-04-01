'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useFeeds } from '@/providers/feeds-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export function AddFeedDialog() {
  const { addFeed } = useFeeds()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = url.trim()
    try {
      new URL(trimmed)
    } catch {
      setError('Enter a valid URL')
      return
    }
    const id = addFeed(trimmed)
    if (id === null) {
      setError('This feed is already added')
      return
    }
    setUrl('')
    setError(null)
    setOpen(false)
    router.push(`/feed/${id}`)
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="mr-1 h-4 w-4" /> Add feed
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-sm"
        >
          <DialogHeader>
            <DialogTitle>Add RSS feed</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="feed-url">Feed URL</Label>
              <Input
                id="feed-url"
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/feed.xml"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
