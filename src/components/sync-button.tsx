'use client'

import { useFeeds } from '@/providers/feeds-provider'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export function SyncButton() {
  const { sync, loading } = useFeeds()

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={loading}
      onClick={() => sync()}
    >
      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
    </Button>
  )
}
