'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Props {
  toolId: string
  toolName: string
}

export function DeleteToolButton({ toolId, toolName }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('tools').delete().eq('id', toolId)
      if (error) throw error
      router.push('/admin/tools')
      router.refresh()
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete tool')
    } finally {
      setLoading(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400">Delete {toolName}?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded text-sm text-white"
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 
                 rounded-lg text-sm text-red-400 transition-colors"
    >
      Delete Tool
    </button>
  )
}
