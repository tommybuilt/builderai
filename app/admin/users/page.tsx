'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User {
  user_id: string
  email: string
  display_name: string | null
  role: string
  created_at: string
  last_sign_in_at: string | null
  // tools_submitted is now computed live by the get_all_users RPC via a
  // COUNT against submissions where status = 'approved'.
  tools_submitted: number
  tools_rated: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch users')
      }
      
      setUsers(data.users || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (userId: string, newRole: string) => {
    try {
      setUpdating(userId)
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update role')
      }
      
      // Update local state
      setUsers(users.map(u => 
        u.user_id === userId ? { ...u, role: newRole } : u
      ))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update role')
    } finally {
      setUpdating(null)
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={fetchUsers}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-zinc-400 mt-1">{users.length} registered user{users.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Last Sign In</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {users.map((user) => (
                <tr key={user.user_id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <Link href={`/admin/users/${user.user_id}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                        {user.email}
                      </Link>
                      <p className="text-zinc-500 text-sm">
                        {user.display_name || 'No display name'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {formatDate(user.last_sign_in_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm space-y-0.5">
                      <p className="text-zinc-400">
                        <span className="text-zinc-500">Submitted:</span> {user.tools_submitted}
                      </p>
                      <p className="text-zinc-400">
                        <span className="text-zinc-500">Rated:</span> {user.tools_rated}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/admin/users/${user.user_id}`}
                        className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        View
                      </Link>
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.user_id, e.target.value)}
                        disabled={updating === user.user_id}
                        className={`px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm 
                                    text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-500
                                    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                                    ${updating === user.user_id ? 'animate-pulse' : ''}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}
