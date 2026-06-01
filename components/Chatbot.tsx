'use client'

import { useState } from 'react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatResponse = {
  answer: string
  sources?: Array<{ url: string; title: string }>
  error?: string
}

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hi! I can answer questions about BuilderAI.tools and the tools listed on the site. What would you like to know?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    setError('')
    setLoading(true)
    const nextMessages: ChatMessage[] = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages(nextMessages)
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-6),
        }),
      })

      const data = (await response.json()) as ChatResponse
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Chat request failed.')
      }

      const assistantMessage = data.answer || 'I do not have enough information to answer that.'
      setMessages((prev) => [...prev, { role: 'assistant' as const, content: assistantMessage }])

      if (data.sources && data.sources.length > 0) {
        const sourcesText =
          'Sources:\n' +
          data.sources
            .map((source) => `- ${source.title}: ${source.url}`)
            .join('\n')
        setMessages((prev) => [...prev, { role: 'assistant' as const, content: sourcesText }])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chat request failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 space-y-4 min-h-[360px]">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={message.role === 'user' ? 'text-right' : 'text-left'}
          >
            <div
              className={
                message.role === 'user'
                  ? 'inline-block max-w-[85%] bg-primary-600 text-white px-4 py-2 rounded-lg'
                  : 'inline-block max-w-[85%] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-lg whitespace-pre-wrap'
              }
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block max-w-[85%] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about tools, categories, or site policies..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold disabled:bg-zinc-400 dark:disabled:bg-zinc-700 transition-colors"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        This chatbot only answers questions about BuilderAI.tools public content.
      </p>
    </div>
  )
}
