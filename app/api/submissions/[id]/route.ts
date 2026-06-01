import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// PATCH /api/submissions/[id]
//
// Only used for the rejection path now. The legacy 'approve' action
// flipped submissions.status to 'approved' WITHOUT inserting the
// corresponding tool, generating the claim invite, or sending the
// approval email. That left submitters with their inbox quiet and the
// directory unaware of the new tool. The full approval workflow lives
// at /api/admin/submissions/[id]/approve and is reached via the detail
// page form (SubmissionReviewForm) which collects the tool fields the
// public listing requires.
//
// 'approve' is rejected here with a 400 so any stale client that still
// posts the old action gets a clear error rather than a silent
// half-finished approval.

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const { action, adminNotes } = await request.json()

    if (action === 'approve') {
      return NextResponse.json(
        {
          error:
            'Use the submission detail page to approve. The full flow inserts the tool, generates the claim invite, and emails the submitter.',
        },
        { status: 400 },
      )
    }

    if (action !== 'reject') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('submissions')
      .update({
        status: 'rejected',
        admin_notes: adminNotes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating submission:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (e) {
    console.error('Error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
