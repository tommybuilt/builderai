'use client'

import { useState } from 'react'
import { useAdminActivityMonitor } from '@/lib/hooks/useDbNotifications'

export function ActivityMonitor() {
  const [isOpen, setIsOpen] = useState(false)
  const { activities, isConnected, unreadCount, markAsRead, clearHistory } = useAdminActivityMonitor()

  const handleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      markAsRead()
    }
  }

  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case 'INSERT': return '➕'
      case 'UPDATE': return '✏️'
      case 'DELETE': return '🗑️'
      default: return '📝'
    }
  }

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'INSERT': return 'text-emerald-500'
      case 'UPDATE': return 'text-amber-500'
      case 'DELETE': return 'text-red-500'
      default: return 'text-zinc-500'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Database Activity"
      >
        <svg 
          className="w-5 h-5 text-zinc-600 dark:text-zinc-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        
        {/* Connection indicator */}
        <span 
          className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
            isConnected ? 'bg-emerald-500' : 'bg-red-500'
          }`}
          title={isConnected ? 'Connected' : 'Disconnected'}
        />
        
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg z-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Database Activity
              </h3>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 text-xs ${
                  isConnected ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isConnected ? 'bg-emerald-500' : 'bg-red-500'
                  }`} />
                  {isConnected ? 'Live' : 'Offline'}
                </span>
                {activities.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Activity List */}
            <div className="max-h-72 overflow-y-auto">
              {activities.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-zinc-500">
                  <p>No recent activity</p>
                  <p className="text-xs mt-1">
                    {isConnected ? 'Watching for changes...' : 'Reconnecting...'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {activities.map((activity) => (
                    <li 
                      key={activity.id}
                      className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg" title={activity.operation}>
                          {getOperationIcon(activity.operation)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                            {String(activity.record?.name || 
                             activity.record?.submitted_name || 
                             activity.oldRecord?.name ||
                             `Record ${String(activity.record?.id || '').slice(0, 8)}`)}
                          </p>
                          <p className="text-xs text-zinc-500">
                            <span className={getOperationColor(activity.operation)}>
                              {activity.operation}
                            </span>
                            {' on '}
                            <span className="font-medium">{activity.table}</span>
                          </p>
                        </div>
                        <span className="text-xs text-zinc-400 whitespace-nowrap">
                          {formatTime(activity.timestamp)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-xs text-zinc-500 text-center">
                Monitoring: tools, submissions, reviews
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
