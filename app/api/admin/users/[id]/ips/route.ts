import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/admin/users/[id]/ips → IP history for a target user (admin only)
//
// Wraps the get_user_ip_history(uuid) RPC. Returns rows like:
//   { ip_address, source, last_seen }
// where source is one of 'sign-in', 'submission', 'review'. Powers the
// "Ban this IP" picker on the user detail page.

export const dynamic = 'force-dynamic'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase.rpc('get_user_ip_history', {
      p_user_id: id,
    })
    if (error) {
      console.error('[admin/users/ips GET] rpc failed: ' + error.message)
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ ips: data ?? [] })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/users/ips GET] threw: ' + message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
