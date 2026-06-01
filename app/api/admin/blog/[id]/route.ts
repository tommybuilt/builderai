import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// DELETE - remove a blog post (admin only). RLS on blog_posts already gates
// this, but we do an explicit auth check for a clean 401 response. The
// log_blog_posts_activity trigger writes the activity_log row.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) {
      console.error('Error deleting blog post:', error)
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
