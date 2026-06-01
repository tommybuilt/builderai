'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteBlogPostButtonProps {
  id: string
  title: string
}

export function DeleteBlogPostButton({ id, title }: DeleteBlogPostButtonProps) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${title}"? This action cannot be undone.`)) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to delete post')
      }
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete post')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="inline-flex items-center gap-3">
      {error && (
        <span className="text-xs text-red-400 max-w-[180px] truncate" title={error}>
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={busy}
        className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400
                   border border-red-600/30 rounded-lg text-xs font-medium
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {busy ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
