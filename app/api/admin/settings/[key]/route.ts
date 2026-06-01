import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// PUT - upsert a site_settings row by key (admin only).
// RLS on site_settings restricts INSERT/UPDATE/DELETE to is_admin().
// The log_site_settings_activity trigger writes the activity_log row.
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: { value?: unknown }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Body must be JSON with a "value" field' }, { status: 400 })
    }

    if (!('value' in body)) {
      return NextResponse.json({ error: 'Missing "value" in request body' }, { status: 400 })
    }

    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value: body.value }, { onConflict: 'key' })

    if (error) {
      console.error('Error saving site setting:', error)
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
