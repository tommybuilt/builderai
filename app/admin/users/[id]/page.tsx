'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserDetails {
  user: {
    user_id: string
    email: string
    display_name: string | null
    role: string
    created_at: string
    last_sign_in_at: string | null
  }
  submissions: Array<{
    id: string
    name: string
    url: string | null
    status: string
    created_at: string
    reviewed_at: string | null
  }>
  reviews: Array<{
    id: string
    tool_id: string
    tool_name: string
    tool_slug: string
    rating: number
    comment: string | null
    created_at: string
  }>
  favorites: Array<{
    id: string
    tool_id: string
    tool_name: string
    tool_slug: string
    created_at: string
  }>
  hidden_tools: Array<{
    id: string
    tool_id: string
    tool_name: string
    tool_slug: string
    created_at: string
  }>
}

interface IpRow {
  ip_address: string
  source: string
  last_seen: string
}

type BanType = 'user' | 'ip' | 'email'

interface BanBody {
  ban_type: BanType
  user_id?: string
  ip_address?: string
  email?: string
  reason: string | null
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const [data, setData] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ips, setIps] = useState<IpRow[]>([])
  const [ipsLoading, setIpsLoading] = useState(false)
  const [ipsError, setIpsError] = useState<string | null>(null)
  const [banning, setBanning] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/admin/users/${userId}`)
        const result = await res.json()

        if (!res.ok) {
          throw new Error(result.error || 'Failed to fetch user details')
        }

        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user details')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserDetails()
    }
  }, [userId])

  const fetchIps = useCallback(async () => {
    if (!userId) return
    setIpsLoading(true)
    setIpsError(null)
    try {
      const res = await fetch(`/api/admin/users/${userId}/ips`, { cache: 'no-store' })
      const result = (await res.json().catch(() => ({}))) as { ips?: IpRow[]; error?: string }
      if (!res.ok) {
        throw new Error(result.error || 'Failed to load IP history')
      }
      setIps(result.ips ?? [])
    } catch (err) {
      setIpsError(err instanceof Error ? err.message : 'Failed to load IP history')
    } finally {
      setIpsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchIps()
  }, [fetchIps])

  const submitBan = async (body: BanBody, key: string, label: string) => {
    setBanning(key)
    try {
      const res = await fetch('/api/admin/bans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const result = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        const msg = result.error || `Failed to ban ${label}`
        if (res.status === 409) {
          alert(`${label} is already actively banned.`)
        } else {
          alert(msg)
        }
        return
      }
      alert(`Ban created for ${label}.`)
      router.push('/admin/bans')
    } catch (err) {
      alert(err instanceof Error ? err.message : `Failed to ban ${label}`)
    } finally {
      setBanning(null)
    }
  }

  const handleBanUser = () => {
    if (!data) return
    const ok = window.confirm(`Ban user ${data.user.email}? Their reviews will be hidden and they will be signed out.`)
    if (!ok) return
    const reason = window.prompt('Reason (optional):', '') || null
    submitBan(
      { ban_type: 'user', user_id: data.user.user_id, reason },
      `user-${data.user.user_id}`,
      `user ${data.user.email}`,
    )
  }

  const handleBanEmail = () => {
    if (!data) return
    const ok = window.confirm(`Ban email ${data.user.email}? New signups from this address will be blocked.`)
    if (!ok) return
    const reason = window.prompt('Reason (optional):', '') || null
    submitBan(
      { ban_type: 'email', email: data.user.email, reason },
      `email-${data.user.email}`,
      `email ${data.user.email}`,
    )
  }

  const handleBanIp = (ip: string) => {
    const ok = window.confirm(`Ban IP ${ip}? All traffic from this address will be blocked.`)
    if (!ok) return
    const reason = window.prompt('Reason (optional):', '') || null
    submitBan(
      { ban_type: 'ip', ip_address: ip, reason },
      `ip-${ip}`,
      `IP ${ip}`,
    )
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">{error || 'User not found'}</p>
        <Link 
          href="/admin/users"
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white transition-colors inline-block"
        >
          Back to Users
        </Link>
      </div>
    )
  }

  const { user, submissions, reviews, favorites, hidden_tools } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/users"
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{user.email}</h1>
          <p className="text-zinc-400">{user.display_name || 'No display name'}</p>
        </div>
        <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${
          user.role === 'admin' 
            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
            : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
        }`}>
          {user.role}
        </span>
      </div>

      {/* User Info Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Account Info</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-zinc-500 text-sm">Joined</p>
            <p className="text-white">{formatDate(user.created_at)}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Last Sign In</p>
            <p className="text-white">{formatDate(user.last_sign_in_at)}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">User ID</p>
            <p className="text-white font-mono text-xs truncate" title={user.user_id}>{user.user_id}</p>
          </div>
        </div>
      </div>

      {/* Moderation */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Moderation</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Bans hide this account&apos;s reviews and block their access. Manage active bans on the{' '}
              <Link href="/admin/bans" className="text-primary-400 hover:underline">Bans page</Link>.
            </p>
          </div>
          {user.role === 'admin' && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Admin account
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            type="button"
            onClick={handleBanUser}
            disabled={banning !== null || user.role === 'admin'}
            className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
            title={user.role === 'admin' ? 'Admins cannot be banned' : 'Ban this user account'}
          >
            {banning === `user-${user.user_id}` ? 'Banning...' : 'Ban user'}
          </button>
          <button
            type="button"
            onClick={handleBanEmail}
            disabled={banning !== null}
            className="px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg text-white transition-colors"
            title="Block this email address from signing up again"
          >
            {banning === `email-${user.email}` ? 'Banning...' : 'Ban email'}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-zinc-300">IP history</h3>
            <button
              type="button"
              onClick={fetchIps}
              disabled={ipsLoading}
              className="text-xs text-zinc-400 hover:text-white disabled:opacity-50 transition-colors"
            >
              {ipsLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          {ipsError && (
            <p className="text-red-400 text-xs mb-2">{ipsError}</p>
          )}
          {!ipsError && !ipsLoading && ips.length === 0 && (
            <p className="text-zinc-500 text-sm">No IPs recorded for this user yet.</p>
          )}
          {ips.length > 0 && (
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900/50 border-b border-zinc-800 text-left text-zinc-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">IP address</th>
                    <th className="px-3 py-2 font-medium">Source</th>
                    <th className="px-3 py-2 font-medium">Last seen</th>
                    <th className="px-3 py-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {ips.map((row) => (
                    <tr key={`${row.ip_address}-${row.source}`} className="text-zinc-200">
                      <td className="px-3 py-2 font-mono text-xs">{row.ip_address}</td>
                      <td className="px-3 py-2 text-zinc-400 text-xs">{row.source}</td>
                      <td className="px-3 py-2 text-zinc-400 text-xs">{formatDate(row.last_seen)}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => handleBanIp(row.ip_address)}
                          disabled={banning !== null}
                          className="px-3 py-1 text-xs font-medium bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-md text-white transition-colors"
                        >
                          {banning === `ip-${row.ip_address}` ? 'Banning...' : 'Ban IP'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-primary-400">{submissions.length}</p>
          <p className="text-zinc-400 text-sm">Submissions</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">{reviews.length}</p>
          <p className="text-zinc-400 text-sm">Reviews</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-pink-400">{favorites.length}</p>
          <p className="text-zinc-400 text-sm">Favorites</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-zinc-400">{hidden_tools.length}</p>
          <p className="text-zinc-400 text-sm">Hidden</p>
        </div>
      </div>

      {/* Submissions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Submissions ({submissions.length})</h2>
        </div>
        {submissions.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {submissions.map((sub) => (
              <div key={sub.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{sub.name}</p>
                  {sub.url && (
                    <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 text-sm hover:underline">
                      {sub.url}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(sub.status)}`}>
                    {sub.status}
                  </span>
                  <span className="text-zinc-500 text-sm">{formatDate(sub.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-center text-zinc-500">No submissions yet</p>
        )}
      </div>

      {/* Reviews */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Reviews ({reviews.length})</h2>
        </div>
        {reviews.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <Link href={`/tool/${review.tool_slug}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                    {review.tool_name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-zinc-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-zinc-500 text-sm">{formatDate(review.created_at)}</span>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-zinc-400 text-sm">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-center text-zinc-500">No reviews yet</p>
        )}
      </div>

      {/* Favorites */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Favorites ({favorites.length})</h2>
        </div>
        {favorites.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {favorites.map((fav) => (
              <div key={fav.id} className="px-6 py-4 flex items-center justify-between">
                <Link href={`/tool/${fav.tool_slug}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                  {fav.tool_name}
                </Link>
                <span className="text-zinc-500 text-sm">{formatDate(fav.created_at)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-center text-zinc-500">No favorites yet</p>
        )}
      </div>

      {/* Hidden Tools */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Hidden Tools ({hidden_tools.length})</h2>
        </div>
        {hidden_tools.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {hidden_tools.map((hidden) => (
              <div key={hidden.id} className="px-6 py-4 flex items-center justify-between">
                <Link href={`/tool/${hidden.tool_slug}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                  {hidden.tool_name}
                </Link>
                <span className="text-zinc-500 text-sm">{formatDate(hidden.created_at)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-center text-zinc-500">No hidden tools</p>
        )}
      </div>
    </div>
  )
}
