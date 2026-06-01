'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SettingFormProps {
  settingKey: string
  initialValue: unknown
}

export function SettingForm({ settingKey, initialValue }: SettingFormProps) {
  const router = useRouter()
  const [text, setText] = useState(() => JSON.stringify(initialValue, null, 2))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  const handleSave = async () => {
    setError(null)
    setSavedAt(null)

    // Parse client-side first so the user gets immediate feedback on bad JSON.
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      setError('Value is not valid JSON. Wrap strings in double quotes, e.g. "/og-image.png".')
      return
    }

    if (!window.confirm(`Save new value for "${settingKey}"?`)) return

    setBusy(true)
    try {
      const res = await fetch(`/api/admin/settings/${encodeURIComponent(settingKey)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: parsed }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save setting')
      }
      setSavedAt(Date.now())
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save setting')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={Math.min(8, Math.max(2, text.split('\n').length))}
        spellCheck={false}
        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg
                   text-sm font-mono text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs">
          {error && <span className="text-red-400">{error}</span>}
          {savedAt && !error && <span className="text-emerald-400">Saved.</span>}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={busy}
          className="px-4 py-1.5 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-800
                     rounded-lg text-sm font-medium text-white transition-colors disabled:cursor-not-allowed"
        >
          {busy ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
