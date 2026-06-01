'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Category } from '@/lib/types/database'

interface Props {
  categories: Category[]
  toolCounts: Record<string, number>
}

export function CategoryList({ categories, toolCounts }: Props) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const startEdit = (cat: Category) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditDescription(cat.description || '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditDescription('')
  }

  const saveEdit = async () => {
    if (!editingId) return
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('categories')
        .update({ name: editName, description: editDescription || null })
        .eq('id', editingId)
      if (error) throw error
      cancelEdit()
      router.refresh()
    } catch (err) {
      console.error('Update error:', err)
      alert('Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Tools in this category will become uncategorized.`)) {
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) throw error
      router.refresh()
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete category')
    } finally {
      setLoading(false)
    }
  }

  if (categories.length === 0) {
    return <p className="text-zinc-500 text-center py-8">No categories yet</p>
  }

  return (
    <div className="space-y-2">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800"
        >
          {editingId === cat.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="px-3 py-1.5 bg-primary-600 hover:bg-primary-500 rounded text-sm text-white"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{cat.name}</h3>
                  <span className="text-xs text-zinc-500">/{cat.slug}</span>
                </div>
                {cat.description && (
                  <p className="text-sm text-zinc-400 mt-1">{cat.description}</p>
                )}
                <p className="text-xs text-zinc-500 mt-2">
                  {toolCounts[cat.id] || 0} tools
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(cat)}
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat.id, cat.name)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
