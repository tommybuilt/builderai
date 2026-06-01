'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Submission, Category } from '@/lib/types/database'
import { slugify, suggestDifficulty, getDifficultyLabel, getDifficultyColor } from '@/lib/utils'

interface Props {
  submission: Submission
  categories: Category[]
}

export function SubmissionReviewForm({ submission, categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [adminNotes, setAdminNotes] = useState('')

  // Form state for approval
  const [toolData, setToolData] = useState({
    name: submission.submitted_name,
    slug: slugify(submission.submitted_name),
    short_description: submission.submitted_description?.slice(0, 200) || '',
    description: submission.submitted_description || '',
    website_url: submission.submitted_url || '',
    github_url: submission.submitted_github_url || '',
    category_id: '',
    price: 'free' as string,
    platform: 'local' as string,
    difficulty: 3,
    is_open_source: !!submission.submitted_github_url,
    is_self_hosted: false,
    is_offline_capable: false,
    gpu_required: false,
    min_vram_gb: null as number | null,
    tags: submission.submitted_tags || [],
  })

  // Auto-calculate suggested difficulty based on tool attributes
  const difficultySuggestion = useMemo(() => {
    return suggestDifficulty({
      platform: toolData.platform,
      gpu_required: toolData.gpu_required,
      min_vram_gb: toolData.min_vram_gb,
      is_self_hosted: toolData.is_self_hosted,
      is_offline_capable: toolData.is_offline_capable,
      is_open_source: toolData.is_open_source,
    })
  }, [toolData.platform, toolData.gpu_required, toolData.min_vram_gb, toolData.is_self_hosted, toolData.is_offline_capable, toolData.is_open_source])

  const handleApprove = async () => {
    setError('')
    setLoading(true)

    try {
      // Server route handles tool insert (with source_submission_id linkage),
      // submission status update, magic-link claim URL generation, and the
      // approval email send. See app/api/admin/submissions/[id]/approve/route.ts.
      const res = await fetch(`/api/admin/submissions/${submission.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolData: {
            name: toolData.name,
            slug: toolData.slug,
            short_description: toolData.short_description,
            description: toolData.description,
            website_url: toolData.website_url || null,
            github_url: toolData.github_url || null,
            category_id: toolData.category_id || null,
            price: toolData.price,
            platform: toolData.platform,
            difficulty: toolData.difficulty,
            is_open_source: toolData.is_open_source,
            is_self_hosted: toolData.is_self_hosted,
            is_offline_capable: toolData.is_offline_capable,
            gpu_required: toolData.gpu_required,
            tags: toolData.tags,
          },
          adminNotes: adminNotes || null,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean
        error?: string
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to approve')
      }

      router.push('/admin/submissions')
      router.refresh()
    } catch (err) {
      console.error('Approval error:', err)
      setError(err instanceof Error ? err.message : 'Failed to approve')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase
        .from('submissions')
        .update({
          status: 'rejected',
          admin_notes: adminNotes || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', submission.id)

      if (updateError) throw updateError

      router.push('/admin/submissions')
      router.refresh()
    } catch (err) {
      console.error('Rejection error:', err)
      setError(err instanceof Error ? err.message : 'Failed to reject')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tool Details for Approval */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
          <input
            type="text"
            value={toolData.name}
            onChange={(e) => setToolData({ ...toolData, name: e.target.value, slug: slugify(e.target.value) })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Slug</label>
          <input
            type="text"
            value={toolData.slug}
            onChange={(e) => setToolData({ ...toolData, slug: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Short Description</label>
        <input
          type="text"
          value={toolData.short_description}
          onChange={(e) => setToolData({ ...toolData, short_description: e.target.value })}
          maxLength={200}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
          <select
            value={toolData.category_id}
            onChange={(e) => setToolData({ ...toolData, category_id: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Price</label>
          <select
            value={toolData.price}
            onChange={(e) => setToolData({ ...toolData, price: e.target.value as any })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          >
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Platform</label>
          <select
            value={toolData.platform}
            onChange={(e) => setToolData({ ...toolData, platform: e.target.value as any })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          >
            <option value="web">Web</option>
            <option value="local">Local/Desktop</option>
            <option value="api">API</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Difficulty (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={toolData.difficulty}
            onChange={(e) => setToolData({ ...toolData, difficulty: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
          <p className={`text-xs mt-1 ${getDifficultyColor(toolData.difficulty)}`}>
            {getDifficultyLabel(toolData.difficulty)}
          </p>
        </div>
      </div>

      {/* AI Suggested Difficulty */}
      <div className="p-4 bg-violet-900/20 border border-violet-700/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-violet-300">AI Suggested Difficulty</span>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${getDifficultyColor(difficultySuggestion.suggested)}`}>
              {difficultySuggestion.suggested} - {getDifficultyLabel(difficultySuggestion.suggested)}
            </span>
            {toolData.difficulty !== difficultySuggestion.suggested && (
              <button
                type="button"
                onClick={() => setToolData({ ...toolData, difficulty: difficultySuggestion.suggested })}
                className="px-3 py-1 text-xs bg-violet-600 hover:bg-violet-500 rounded-md text-white transition-colors"
              >
                Apply
              </button>
            )}
            {toolData.difficulty === difficultySuggestion.suggested && (
              <span className="px-3 py-1 text-xs bg-green-600/30 text-green-400 rounded-md">
                ✓ Applied
              </span>
            )}
          </div>
        </div>
        <div className="text-xs text-zinc-400 space-y-1">
          {difficultySuggestion.reasons.map((reason, i) => (
            <div key={i}>• {reason}</div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={toolData.is_open_source}
            onChange={(e) => setToolData({ ...toolData, is_open_source: e.target.checked })}
            className="rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-sm text-zinc-300">Open Source</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={toolData.is_self_hosted}
            onChange={(e) => setToolData({ ...toolData, is_self_hosted: e.target.checked })}
            className="rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-sm text-zinc-300">Self-Hosted</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={toolData.is_offline_capable}
            onChange={(e) => setToolData({ ...toolData, is_offline_capable: e.target.checked })}
            className="rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-sm text-zinc-300">Offline Capable</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={toolData.gpu_required}
            onChange={(e) => setToolData({ ...toolData, gpu_required: e.target.checked })}
            className="rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-sm text-zinc-300">GPU Required</span>
        </label>
      </div>

      {/* Admin Notes */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Admin Notes</label>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Internal notes about this submission..."
          rows={3}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white resize-none"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-zinc-800">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 
                     rounded-lg font-medium text-white transition-colors"
        >
          {loading ? 'Processing...' : 'Approve & Create Tool'}
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 
                     rounded-lg font-medium text-white transition-colors"
        >
          {loading ? 'Processing...' : 'Reject'}
        </button>
      </div>
    </div>
  )
}
