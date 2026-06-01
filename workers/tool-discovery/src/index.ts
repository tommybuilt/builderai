interface Env {
  SUPABASE_URL: string
  SUPABASE_SERVICE_KEY: string
  ANTHROPIC_API_KEY: string
  WORKER_AUTH_KEY: string
}

interface DiscoveredTool {
  name: string
  slug: string
  short_description: string
  description: string
  website_url: string
  github_url: string
  category_slug: string
  license: string | null
  price: string
  platform: string
  difficulty: number
  gpu_required: boolean
  min_vram_gb: number | null
  is_open_source: boolean
  is_self_hosted: boolean
  is_offline_capable: boolean
  tags: string[]
}

interface CategoryRow {
  id: string
  slug: string
  name: string
}

async function supabaseQuery(env: Env, path: string, options: RequestInit = {}) {
  const url = `${env.SUPABASE_URL}/rest/v1/${path}`
  const headers: Record<string, string> = {
    'apikey': env.SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
    ...(options.headers as Record<string, string> || {}),
  }
  return fetch(url, { ...options, headers })
}

async function getExistingSlugs(env: Env): Promise<Set<string>> {
  const res = await supabaseQuery(env, 'tools?select=slug')
  if (!res.ok) throw new Error(`Failed to fetch existing slugs: ${res.status}`)
  const tools: { slug: string }[] = await res.json()
  return new Set(tools.map(t => t.slug))
}

async function getCategories(env: Env): Promise<CategoryRow[]> {
  const res = await supabaseQuery(env, 'categories?select=id,slug,name')
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
  return res.json()
}

async function discoverTools(env: Env): Promise<{ inserted: number; errors: string[] }> {
  const [existingSlugs, categories] = await Promise.all([
    getExistingSlugs(env),
    getCategories(env),
  ])

  const categoryList = categories.map(c => `- ${c.slug}: ${c.name}`).join('\n')
  const slugSample = Array.from(existingSlugs).slice(0, 80).join(', ')

  const prompt = `You are a research assistant finding real open-source AI developer tools.

EXISTING CATEGORIES:
${categoryList}

EXISTING TOOL SLUGS (sample — avoid duplicates):
${slugSample}

Find 20-30 NEW real open-source AI developer tools that are NOT in the existing slugs above.

RULES:
1. Every tool MUST be a REAL project with a real GitHub repo or Hugging Face page.
2. NO SaaS products, paid platforms, or proprietary tools. Open-source only.
3. Each tool must have a unique kebab-case slug.
4. Descriptions: 2-4 sentences, technical, not marketing copy. State what it does, who made it, license, hardware if relevant.
5. category_slug MUST be one of the existing categories listed above.
6. price must be "free" for open-source tools.
7. platform: "local", "web", "api", or "hybrid".
8. difficulty: 1-5 integer.
9. tags: array of 3-6 lowercase kebab-case strings.

Return ONLY a JSON array of objects with these exact fields:
name, slug, short_description, description, website_url, github_url, category_slug, license, price, platform, difficulty, gpu_required, min_vram_gb, is_open_source, is_self_hosted, is_offline_capable, tags

Return raw JSON only, no markdown fences or explanation.`

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text()
    throw new Error(`Anthropic API error ${anthropicRes.status}: ${errText}`)
  }

  const anthropicData: any = await anthropicRes.json()
  const responseText = anthropicData.content?.[0]?.text || ''

  let tools: DiscoveredTool[]
  try {
    tools = JSON.parse(responseText)
  } catch {
    // Try extracting JSON from response
    const match = responseText.match(/\[[\s\S]*\]/)
    if (!match) throw new Error('Failed to parse tool list from Claude response')
    tools = JSON.parse(match[0])
  }

  if (!Array.isArray(tools) || tools.length === 0) {
    throw new Error('No tools returned from Claude')
  }

  const categoryMap = new Map(categories.map(c => [c.slug, c.id]))
  const errors: string[] = []
  let inserted = 0

  for (const tool of tools) {
    // Validate
    if (!tool.name || !tool.slug || !tool.short_description || !tool.github_url) {
      errors.push(`Skipped ${tool.name || 'unknown'}: missing required fields`)
      continue
    }

    if (existingSlugs.has(tool.slug)) {
      errors.push(`Skipped ${tool.slug}: already exists`)
      continue
    }

    const categoryId = categoryMap.get(tool.category_slug)
    if (!categoryId) {
      errors.push(`Skipped ${tool.slug}: invalid category_slug "${tool.category_slug}"`)
      continue
    }

    // Validate slug format
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.slug)) {
      errors.push(`Skipped ${tool.slug}: invalid slug format`)
      continue
    }

    const row = {
      name: tool.name,
      slug: tool.slug,
      short_description: tool.short_description.slice(0, 200),
      description: tool.description,
      website_url: tool.website_url || tool.github_url,
      github_url: tool.github_url,
      category_id: categoryId,
      license: tool.license || null,
      price: tool.price || 'free',
      platform: tool.platform || 'local',
      difficulty: Math.min(5, Math.max(1, tool.difficulty || 3)),
      gpu_required: tool.gpu_required || false,
      min_vram_gb: tool.min_vram_gb || null,
      is_open_source: true,
      is_self_hosted: tool.is_self_hosted || false,
      is_offline_capable: tool.is_offline_capable || false,
      tags: tool.tags || [],
      featured: false,
      status: 'draft',
    }

    const insertRes = await supabaseQuery(env, 'tools', {
      method: 'POST',
      headers: { 'Prefer': 'return=minimal,resolution=ignore-duplicates' },
      body: JSON.stringify(row),
    })

    if (insertRes.ok || insertRes.status === 201) {
      inserted++
      existingSlugs.add(tool.slug)
    } else {
      const errText = await insertRes.text()
      errors.push(`Failed to insert ${tool.slug}: ${insertRes.status} ${errText}`)
    }
  }

  return { inserted, errors }
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(
      discoverTools(env)
        .then(result => {
          console.log(`Tool discovery completed: ${result.inserted} inserted, ${result.errors.length} errors`)
          if (result.errors.length > 0) {
            console.log('Errors:', result.errors.join('\n'))
          }
        })
        .catch(err => {
          console.error('Tool discovery failed:', err)
        })
    )
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/run' && request.method === 'POST') {
      const authKey = request.headers.get('X-Auth-Key')
      if (!authKey || authKey !== env.WORKER_AUTH_KEY) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      try {
        const result = await discoverTools(env)
        return new Response(JSON.stringify(result, null, 2), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    return new Response(JSON.stringify({ status: 'ok', endpoints: ['POST /run'] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
