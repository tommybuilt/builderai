'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Tool, Category } from '@/lib/types/database'
import { slugify, suggestDifficulty, getDifficultyLabel, getDifficultyColor } from '@/lib/utils'

interface Props {
  tool?: Tool
  categories: Category[]
}

interface FormData {
  name: string
  slug: string
  short_description: string
  description: string
  website_url: string
  github_url: string
  docs_url: string
  category_id: string
  license: string
  price: string
  platform: string
  difficulty: number
  gpu_required: boolean
  min_vram_gb: number | null
  is_open_source: boolean
  is_self_hosted: boolean
  is_offline_capable: boolean
  featured: boolean
  tags: string
  status: string
}

export function ToolForm({ tool, categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<FormData>({
    name: tool?.name || '',
    slug: tool?.slug || '',
    short_description: tool?.short_description || '',
    description: tool?.description || '',
    website_url: tool?.website_url || '',
    github_url: tool?.github_url || '',
    docs_url: tool?.docs_url || '',
    category_id: tool?.category_id || '',
    license: tool?.license || '',
    price: tool?.price || 'free',
    platform: tool?.platform || 'local',
    difficulty: tool?.difficulty || 3,
    gpu_required: tool?.gpu_required || false,
    min_vram_gb: tool?.min_vram_gb || null,
    is_open_source: tool?.is_open_source || false,
    is_self_hosted: tool?.is_self_hosted || false,
    is_offline_capable: tool?.is_offline_capable || false,
    featured: tool?.featured || false,
    tags: tool?.tags?.join(', ') || '',
    status: tool?.status || 'published',
  })

  // Auto-calculate suggested difficulty based on tool attributes
  const difficultySuggestion = useMemo(() => {
    return suggestDifficulty({
      platform: formData.platform,
      gpu_required: formData.gpu_required,
      min_vram_gb: formData.min_vram_gb,
      is_self_hosted: formData.is_self_hosted,
      is_offline_capable: formData.is_offline_capable,
      is_open_source: formData.is_open_source,
    })
  }, [formData.platform, formData.gpu_required, formData.min_vram_gb, formData.is_self_hosted, formData.is_offline_capable, formData.is_open_source])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      const tags = formData.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)

      const data = {
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        description: formData.description || null,
        website_url: formData.website_url || null,
        github_url: formData.github_url || null,
        docs_url: formData.docs_url || null,
        category_id: formData.category_id || null,
        license: formData.license || null,
        price: formData.price as any,
        platform: formData.platform as any,
        difficulty: formData.difficulty,
        gpu_required: formData.gpu_required,
        min_vram_gb: formData.gpu_required ? formData.min_vram_gb : null,
        is_open_source: formData.is_open_source,
        is_self_hosted: formData.is_self_hosted,
        is_offline_capable: formData.is_offline_capable,
        featured: formData.featured,
        tags,
        status: formData.status,
      }

      if (tool) {
        const { error: updateError } = await supabase
          .from('tools')
          .update(data)
          .eq('id', tool.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('tools').insert(data)
        if (insertError) throw insertError
      }

      router.push('/admin/tools')
      router.refresh()
    } catch (err) {
      console.error('Save error:', err)
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ 
              ...formData, 
              name: e.target.value,
              slug: tool ? formData.slug : slugify(e.target.value)
            })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Slug <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Short Description <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          maxLength={200}
          value={formData.short_description}
          onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        />
        <p className="text-xs text-zinc-500 mt-1">{formData.short_description.length}/200</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white resize-none"
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Website URL</label>
          <input
            type="url"
            value={formData.website_url}
            onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Docs URL</label>
          <input
            type="url"
            value={formData.docs_url}
            onChange={(e) => setFormData({ ...formData, docs_url: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
        </div>
      </div>

      {/* Classification */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
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
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          >
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          >
            <option value="web">Web</option>
            <option value="local">Local/Desktop</option>
            <option value="api">API</option>
            <option value="hybrid">Hybrid</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Difficulty (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: parseInt(e.target.value) || 3 })}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          />
          <p className={`text-xs mt-1 ${getDifficultyColor(formData.difficulty)}`}>
            {getDifficultyLabel(formData.difficulty)}
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
            {formData.difficulty !== difficultySuggestion.suggested && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, difficulty: difficultySuggestion.suggested })}
                className="px-3 py-1 text-xs bg-violet-600 hover:bg-violet-500 rounded-md text-white transition-colors"
              >
                Apply
              </button>
            )}
            {formData.difficulty === difficultySuggestion.suggested && (
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

      {/* License */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">License</label>
        <input
          type="text"
          value={formData.license}
          onChange={(e) => setFormData({ ...formData, license: e.target.value })}
          placeholder="e.g., MIT, Apache 2.0, GPL-3.0"
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Tags</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="llm, inference, python (comma separated)"
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        />
      </div>

      {/* GPU Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.gpu_required}
            onChange={(e) => setFormData({ ...formData, gpu_required: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-zinc-300">GPU Required</span>
        </label>
        {formData.gpu_required && (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Min VRAM (GB)</label>
            <input
              type="number"
              min={0}
              value={formData.min_vram_gb || ''}
              onChange={(e) => setFormData({ ...formData, min_vram_gb: parseInt(e.target.value) || null })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
            />
          </div>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_open_source}
            onChange={(e) => setFormData({ ...formData, is_open_source: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-zinc-300">Open Source</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_self_hosted}
            onChange={(e) => setFormData({ ...formData, is_self_hosted: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-zinc-300">Self-Hosted</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_offline_capable}
            onChange={(e) => setFormData({ ...formData, is_offline_capable: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-zinc-300">Offline Capable</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-primary-500"
          />
          <span className="text-zinc-300">Featured</span>
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t border-zinc-800">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-zinc-700 
                     rounded-lg font-medium text-white transition-colors"
        >
          {loading ? 'Saving...' : tool ? 'Update Tool' : 'Create Tool'}
        </button>
        <a
          href="/admin/tools"
          className="px-6 py-2.5 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-medium text-white"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
