'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { useState } from 'react'

// Profile-page sign-out button. The Header dropdown also has one (via
// useAuth().signOut()), but the profile page wants a prominent control
// near the page chrome, and the post-signout redirect to home should be
// explicit and predictable.
export function SignOutButton() {
  const { signOut } = useAuth()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    if (pending) return
    setPending(true)
    try {
      await signOut()
    } catch {
      // Ignore: signOut errors are not user-actionable. We still redirect
      // home so the page state matches the user's expectation.
    }
    router.push('/')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Signing out...' : 'Sign out'}
    </button>
  )
}
