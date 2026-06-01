'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

interface BanRow {
  id: string
  ban_type: 'user' | 'ip' | 'email'
  user_id: string | null
  user_email: string | null
  ip_address: string | null
  email: string | null
  reason: string | null
  banned_at: string
  banned_by: string | null
  banned_by_email: string | null
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function typeColor(t: string) {
  if (t === 'user') return 'bg-red-500/20 text-red-300 border-red-500/40'
  if (t === 'ip') return 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  return 'bg-violet-500/20 text-violet-300 border-violet-500/40'
}

function target(b: BanRow): string {
  if (b.ban_type === 'user') return b.user_email || b.user_id || '(unknown user)'
  if (b.ban_type === 'ip') return b.ip_address || '(unknown ip)'
  return b.email || '(unknown email)'
}

export default function AdminBansPage() {
  const [bans, setBans] = useState<BanRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [revoking, setRevoking] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/bans', { cache: 'no-store' })
      const data = (await res.json().catch(() => ({}))) as { bans?: BanRow[]; error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load bans')
      }
      setBans(data.bans ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bans')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleRevoke = async (ban: BanRow) => {
    const ok = window.confirm(`Revoke ban on ${target(ban)}?`)
    if (!ok) return
    setRevoking(ban.id)
    try {
      const res = await fetch(`/api/admin/bans/${ban.id}`, { method: 'DELETE' })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Failed to revoke')
      }
      setBans((prev) => prev.filter((b) => b.id !== ban.id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to revoke')
    } finally {
      setRevoking(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bans</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Active user, IP, and email bans. Revoke restores public visibility for that target.
          </p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-lg text-white transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!error && !loading && bans.length === 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400">No active bans.</p>
        </div>
      )}

      {bans.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/50 border-b border-zinc-800">
              <tr className="text-left text-zinc-400">
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Target</th>
                <th className="px-4 py-3 font-medium">Reason</th>
                <th className="px-4 py-3 font-medium">Banned by</th>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {bans.map((b) => (
                <tr key={b.id} className="text-zinc-200">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${typeColor(b.ban_type)}`}>
                      {b.ban_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {b.ban_type === 'user' && b.user_id ? (
                      <Link
                        href={`/admin/users/${b.user_id}`}
                        className="text-primary-400 hover:underline"
                      >
                        {target(b)}
                      </Link>
                    ) : (
                      <span className="font-mono text-xs">{target(b)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 max-w-xs truncate" title={b.reason || ''}>
                    {b.reason || <span className="text-zinc-600">(none)</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">
                    {b.banned_by_email || <span className="text-zinc-600">(unknown)</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">{formatDate(b.banned_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleRevoke(b)}
                      disabled={revoking === b.id}
                      className="px-3 py-1 text-xs font-medium bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-md text-white transition-colors"
                    >
                      {revoking === b.id ? 'Revoking...' : 'Revoke'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
