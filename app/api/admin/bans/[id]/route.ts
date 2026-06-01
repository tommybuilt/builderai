import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// DELETE /api/admin/bans/[id] → revoke an active ban (admin only)
//
// Delegates to revoke_ban() SECURITY DEFINER RPC which records the revoking
// admin's user_id via auth.uid() and triggers a tool-rating recompute so
// previously-hidden reviews from the unbanned target count again.

export const dynamic = 'force-dynamic'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ error: 'Invalid ban id' }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase.rpc('revoke_ban', { p_ban_id: id })
    if (error) {
      console.error('[admin/bans DELETE] rpc failed: ' + error.message)
      const status = error.message?.toLowerCase().includes('not found') ? 404 : 400
      return NextResponse.json({ error: error.message }, { status })
    }

    console.log(`[admin/bans DELETE] revoked ban_id=${id}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/bans DELETE] threw: ' + message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
