'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'

interface RatingPopupProps {
  toolSlug: string
  toolName: string
  onClose: () => void
}

export function RatingPopup({ toolSlug, toolName, onClose }: RatingPopupProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  // If user is signed in, navigate directly to the tool page with reviews hash
  useEffect(() => {
    if (!loading && user) {
      onClose()
      router.push(`/tool/${toolSlug}#reviews`)
    }
  }, [user, loading, toolSlug, router, onClose])

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  // If user is signed in, we navigate in the useEffect above, show nothing
  if (user) {
    return null
  }

  // Show loading state while checking auth
  if (loading) {
    const loadingContent = (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 max-w-sm w-full shadow-xl">
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
    
    // Use portal to render at document body level
    if (typeof window !== 'undefined') {
      return createPortal(loadingContent, document.body)
    }
    return loadingContent
  }

  // Show login required message if not authenticated
  const modalContent = (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 max-w-sm w-full shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
            Verified ratings only
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Email-verified rating for <span className="font-medium">{toolName}</span> is launching shortly. We are switching to a passwordless rating flow with no account required.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg text-white font-medium transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )

  // Use portal to render at document body level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }
  return modalContent
}
