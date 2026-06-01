import { NextResponse } from 'next/server'
import {
  getPageContent,
  getSitemapEntries,
  isRateLimited,
  rankContextByQuery,
  sanitizeLinks,
  selectCandidateUrls,
} from '@/lib/chatbot'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatRequest = {
  message: string
  history?: ChatMessage[]
}

const SUPPORT_EMAIL = 'support@tpsworldwidellc.com'
const SITE_ORIGIN = 'https://builderai.tools'

function getClientIp(request: Request) {
  const cf = request.headers.get('cf-connecting-ip')
  if (cf) return cf
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return 'unknown'
}

function buildSystemPrompt() {
  return [
    'You are the BuilderAI.tools chatbot.',
    'Answer ONLY using the provided BuilderAI.tools page content.',
    'If the answer is not in the content, say you do not have enough information and suggest visiting the site or emailing support.',
    `Support email: ${SUPPORT_EMAIL}`,
    'Scope: AI tools listed on the site, categories, how the directory works, submission process, site policies/disclosures.',
    'Do NOT answer unrelated questions or provide legal/medical/financial advice.',
    'Do NOT invent tools, features, pricing, or policies.',
    'Be professional, concise, developer-friendly, and not salesy.',
    'Use short paragraphs or bullets when helpful.',
    'Include relevant internal links from the allowed list.',
    'Do NOT link to external domains unless they appear in the provided content.',
  ].join('\n')
}

function buildUserPrompt(
  question: string,
  context: Array<{ url: string; title: string; excerpt: string }>
) {
  const sources = context
    .map(
      (item, index) =>
        `Source ${index + 1}:\nTitle: ${item.title}\nURL: ${item.url}\nContent: ${item.excerpt}`
    )
    .join('\n\n')

  return [
    `Question: ${question}`,
    '',
    'Allowed URLs:',
    context.map((item) => item.url).join('\n'),
    '',
    'Content:',
    sources,
  ].join('\n')
}

async function callModel(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.CHATBOT_API_KEY
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY or CHATBOT_API_KEY')
  }

  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
  const model = process.env.OPENAI_MODEL || process.env.CHATBOT_MODEL || 'gpt-4o-mini'

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Model request failed: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as {
    choices: Array<{ message: { content: string } }>
  }

  return data.choices?.[0]?.message?.content?.trim() || ''
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again shortly.' },
      { status: 429 }
    )
  }

  let payload: ChatRequest
  try {
    payload = (await request.json()) as ChatRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const message = payload.message?.trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  try {
    const sitemapEntries = await getSitemapEntries()
    const candidateUrls = selectCandidateUrls(message, sitemapEntries)

    const pages = await Promise.all(
      candidateUrls.map(async (url) => {
        const content = await getPageContent(url)
        return { url, title: content.title, text: content.text }
      })
    )

    const context = rankContextByQuery(message, pages)
    if (context.length === 0) {
      return NextResponse.json({
        answer:
          'I do not have enough information in BuilderAI.tools content to answer that. You can explore the site at https://builderai.tools or contact support@tpsworldwidellc.com.',
        sources: [],
      })
    }

    const systemPrompt = buildSystemPrompt()
    const userPrompt = buildUserPrompt(message, context)
    const history = Array.isArray(payload.history) ? payload.history.slice(-6) : []

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.map((item) => ({ role: item.role, content: item.content })),
      { role: 'user' as const, content: userPrompt },
    ]

    const rawAnswer = await callModel(messages)
    const allowedUrls = context.map((item) => item.url)
    const answer = sanitizeLinks(rawAnswer, allowedUrls)

    return NextResponse.json({
      answer,
      sources: context.map((item) => ({ url: item.url, title: item.title })),
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected error. Please try again later.'
    return NextResponse.json(
      {
        error: 'Chatbot failed to process the request.',
        detail: message,
        fallback: `You can explore ${SITE_ORIGIN} or email ${SUPPORT_EMAIL}.`,
      },
      { status: 500 }
    )
  }
}
