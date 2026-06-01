import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET  /api/admin/bans          → list active bans (admin only)
// POST /api/admin/bans          → create a ban (admin only)
//
// Both delegate to SECURITY DEFINER RPCs (get_active_bans, create_ban)
// defined in 20260514_add_bans.sql, which themselves gate on is_admin().
// We use the cookie-aware server client so auth.uid() resolves to the
// signed-in admin inside the RPC (needed by create_ban to record banned_by).

export const dynamic = 'force-dynamic'

interface CreateBody {
  ban_type?: unknown
  user_id?: unknown
  ip_address?: unknown
  email?: unknown
  reason?: unknown
}

function asString(v: unknown): string | null {
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : null
}

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase.rpc('get_active_bans')
    if (error) {
      console.error('[admin/bans GET] rpc failed: ' + error.message)
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ bans: data ?? [] })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/bans GET] threw: ' + message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: CreateBody
    try {
      body = (await request.json()) as CreateBody
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const banType = asString(body.ban_type)
    if (banType !== 'user' && banType !== 'ip' && banType !== 'email') {
      return NextResponse.json({ error: 'ban_type must be user, ip, or email' }, { status: 400 })
    }

    const userId = asString(body.user_id)
    const ipAddress = asString(body.ip_address)
    const email = asString(body.email)
    const reason = asString(body.reason)

    if (banType === 'user' && !userId) {
      return NextResponse.json({ error: 'user_id required for user ban' }, { status: 400 })
    }
    if (banType === 'ip' && !ipAddress) {
      return NextResponse.json({ error: 'ip_address required for ip ban' }, { status: 400 })
    }
    if (banType === 'email' && !email) {
      return NextResponse.json({ error: 'email required for email ban' }, { status: 400 })
    }

    const { data, error } = await supabase.rpc('create_ban', {
      p_ban_type: banType,
      p_user_id: userId,
      p_ip_address: ipAddress,
      p_email: email,
      p_reason: reason,
    })

    if (error) {
      console.error('[admin/bans POST] rpc failed: ' + error.message)
      // 409 if it's a duplicate active ban (uniq constraint); 400 otherwise.
      const status = error.message?.toLowerCase().includes('duplicate') ? 409 : 400
      return NextResponse.json({ error: error.message }, { status })
    }

    console.log(`[admin/bans POST] created ban_id=${data} type=${banType}`)
    return NextResponse.json({ ban_id: data })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/bans POST] threw: ' + message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
