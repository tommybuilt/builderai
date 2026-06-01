'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export interface DbActivity {
  id: string
  table: string
  operation: 'INSERT' | 'UPDATE' | 'DELETE'
  record: Record<string, unknown>
  oldRecord?: Record<string, unknown>
  timestamp: Date
}

interface UseDbNotificationsOptions {
  tables?: string[]
  onActivity?: (activity: DbActivity) => void
  onError?: (error: Error) => void
  enabled?: boolean
  maxHistory?: number
}

const DEFAULT_TABLES = ['tools', 'submissions', 'reviews', 'categories']

export function useDbNotifications(options: UseDbNotificationsOptions = {}) {
  const {
    tables = DEFAULT_TABLES,
    onActivity,
    onError,
    enabled = true,
    maxHistory = 50
  } = options

  const [activities, setActivities] = useState<DbActivity[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<Error | null>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const supabaseRef = useRef(createClient())

  const handleChange = useCallback((
    payload: RealtimePostgresChangesPayload<Record<string, unknown>>
  ) => {
    const activity: DbActivity = {
      id: crypto.randomUUID(),
      table: payload.table,
      operation: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
      record: payload.new as Record<string, unknown> || {},
      oldRecord: payload.old as Record<string, unknown> || undefined,
      timestamp: new Date()
    }

    setActivities(prev => {
      const updated = [activity, ...prev]
      return updated.slice(0, maxHistory)
    })

    onActivity?.(activity)

    // Log to console for monitoring
    console.log(`[DB ${activity.operation}] ${activity.table}:`, {
      id: activity.record?.id,
      timestamp: activity.timestamp.toISOString()
    })
  }, [onActivity, maxHistory])

  const connect = useCallback(() => {
    if (!enabled || channelRef.current) return

    const supabase = supabaseRef.current
    
    try {
      // Create channel for all specified tables
      const channel = supabase.channel('db-notifications')

      // Subscribe to each table
      tables.forEach(table => {
        channel.on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          handleChange
        )
      })

      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
          setConnectionError(null)
          console.log('[Realtime] Connected to database notifications')
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false)
          const error = new Error('Failed to connect to realtime channel')
          setConnectionError(error)
          onError?.(error)
        } else if (status === 'TIMED_OUT') {
          setIsConnected(false)
          const error = new Error('Realtime connection timed out')
          setConnectionError(error)
          onError?.(error)
        }
      })

      channelRef.current = channel
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setConnectionError(err)
      onError?.(err)
    }
  }, [enabled, tables, handleChange, onError])

  const disconnect = useCallback(() => {
    if (channelRef.current) {
      supabaseRef.current.removeChannel(channelRef.current)
      channelRef.current = null
      setIsConnected(false)
      console.log('[Realtime] Disconnected from database notifications')
    }
  }, [])

  const clearHistory = useCallback(() => {
    setActivities([])
  }, [])

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return {
    activities,
    isConnected,
    connectionError,
    clearHistory,
    reconnect: () => {
      disconnect()
      connect()
    }
  }
}

// Hook for subscribing to specific table changes
export function useTableChanges<T extends Record<string, unknown>>(
  table: string,
  options: {
    onInsert?: (record: T) => void
    onUpdate?: (record: T, oldRecord: T) => void
    onDelete?: (oldRecord: T) => void
    enabled?: boolean
  } = {}
) {
  const { onInsert, onUpdate, onDelete, enabled = true } = options

  return useDbNotifications({
    tables: [table],
    enabled,
    onActivity: (activity) => {
      if (activity.table !== table) return

      switch (activity.operation) {
        case 'INSERT':
          onInsert?.(activity.record as T)
          break
        case 'UPDATE':
          onUpdate?.(activity.record as T, activity.oldRecord as T)
          break
        case 'DELETE':
          onDelete?.(activity.oldRecord as T)
          break
      }
    }
  })
}

// Hook for admin activity monitoring
export function useAdminActivityMonitor() {
  const [unreadCount, setUnreadCount] = useState(0)
  
  const { activities, isConnected, clearHistory } = useDbNotifications({
    tables: ['tools', 'submissions', 'reviews'],
    onActivity: () => {
      setUnreadCount(prev => prev + 1)
    }
  })

  const markAsRead = useCallback(() => {
    setUnreadCount(0)
  }, [])

  return {
    activities,
    isConnected,
    unreadCount,
    markAsRead,
    clearHistory
  }
}
