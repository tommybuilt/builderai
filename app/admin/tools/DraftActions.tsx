'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface DraftActionsProps {
  toolId: string
  toolName: string
  status: string
}

export function DraftActions({ toolId, toolName, status }: DraftActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleApprove() {
    if (!confirm(`Approve "${toolName}" and publish it?`)) return
    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('tools')
      .update({ status: 'published' })
      .eq('id', toolId)
    if (error) {
      alert(`Error approving: ${error.message}`)
    }
    setIsLoading(false)
    router.refresh()
  }

  async function handleReject() {
    if (!confirm(`Reject and DELETE "${toolName}"? This cannot be undone.`)) return
    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', toolId)
    if (error) {
      alert(`Error rejecting: ${error.message}`)
    }
    setIsLoading(false)
    router.refresh()
  }

  if (status === 'published') return null

  return (
    <div className="flex gap-2">
      <button
        onClick={handleApprove}
        disabled={isLoading}
        className="text-sm text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={handleReject}
        disabled={isLoading}
        className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  )
}
