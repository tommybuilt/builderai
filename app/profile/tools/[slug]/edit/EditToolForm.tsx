'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { updateTool, type EditActionResult } from './actions'

interface ToolEditable {
  id: string
  slug: string
  name: string
  description: string | null
  short_description: string
  website_url: string | null
  docs_url: string | null
  tags: string[]
}

interface Props {
  tool: ToolEditable
  hasTagsColumn: boolean
}

export function EditToolForm({ tool, hasTagsColumn }: Props) {
  const action = updateTool.bind(null, tool.slug)
  const [state, formAction, isPending] = useActionState<EditActionResult | null, FormData>(action, null)

  const inputClass =
    'w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
  const labelClass = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2'

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="short_description" className={labelClass}>
          Short description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="short_description"
          name="short_description"
          required
          maxLength={200}
          defaultValue={tool.short_description ?? ''}
          className={inputClass}
        />
        <p className="text-xs text-zinc-500 mt-1">Max 200 characters. Shown in tool listings.</p>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          maxLength={4000}
          rows={10}
          defaultValue={tool.description ?? ''}
          className={`${inputClass} resize-y`}
        />
        <p className="text-xs text-zinc-500 mt-1">Max 4000 characters. Markdown is rendered on the public tool page.</p>
      </div>

      <div>
        <label htmlFor="website_url" className={labelClass}>
          Website URL
        </label>
        <input
          type="url"
          id="website_url"
          name="website_url"
          defaultValue={tool.website_url ?? ''}
          placeholder="https://example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="docs_url" className={labelClass}>
          Docs URL
        </label>
        <input
          type="url"
          id="docs_url"
          name="docs_url"
          defaultValue={tool.docs_url ?? ''}
          placeholder="https://docs.example.com"
          className={inputClass}
        />
      </div>

      {hasTagsColumn && (
        <div>
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={(tool.tags ?? []).join(', ')}
            placeholder="llm, inference, open-source"
            className={inputClass}
          />
          <p className="text-xs text-zinc-500 mt-1">Comma-separated. Up to 20 tags.</p>
        </div>
      )}

      {state?.error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{state.error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-zinc-400 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
        >
          {isPending ? 'Saving...' : 'Save changes'}
        </button>
        <Link
          href="/profile"
          className="px-6 py-2.5 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
