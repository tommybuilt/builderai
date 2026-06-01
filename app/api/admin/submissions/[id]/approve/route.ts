import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAuthLink } from '@/lib/auth/magic-link'
import { sendEmail, submissionApprovedWithClaim } from '@/lib/email'

// POST /api/admin/submissions/[id]/approve
//
// Server-side approval handler. Replaces the previous client-side flow that
// did Supabase inserts directly via the browser anon-key client. Server-side
// is required because:
//   1. We need to set source_submission_id on the new tools row, linking it
//      back to the submission so the claim-by-email flow can find it later.
//   2. We need to call admin.generateLink (service-role only) to mint the
//      claim URL embedded in the approval email.
//   3. We need to send the approval email via Resend (server-only secret).
//
// The route gates itself on the admin allowlist independently of the global
// middleware, since /api/admin/* paths are not gated by lib/supabase/middleware.ts
// (only /admin/* is).

export const dynamic = 'force-dynamic'

const SITE_URL = 'https://builderai.tools'

interface ApproveBody {
  toolData?: {
    name?: string
    slug?: string
    short_description?: string
    description?: string | null
    website_url?: string | null
    github_url?: string | null
    category_id?: string | null
    price?: string
    platform?: string
    difficulty?: number
    is_open_source?: boolean
    is_self_hosted?: boolean
    is_offline_capable?: boolean
    gpu_required?: boolean
    tags?: string[]
  }
  adminNotes?: string | null
}

async function isAdminEmail(
  supabase: Awaited<ReturnType<typeof createClient>>,
  email: string | null | undefined,
): Promise<boolean> {
  if (!email) return false
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'admin_emails')
    .maybeSingle()
  if (!data?.value || !Array.isArray(data.value)) return false
  return (data.value as unknown[]).some(
    (entry) => typeof entry === 'string' && entry.toLowerCase() === email.toLowerCase(),
  )
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  if (!(await isAdminEmail(supabase, user.email))) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  let body: ApproveBody
  try {
    body = (await request.json()) as ApproveBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const td = body.toolData
  if (!td || !td.name || !td.slug || !td.short_description) {
    return NextResponse.json({ error: 'Missing required tool fields' }, { status: 400 })
  }

  const { data: submission, error: submissionError } = await supabase
    .from('submissions')
    .select('id, submitted_name, submitter_email, status')
    .eq('id', id)
    .single()

  if (submissionError || !submission) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }

  if (submission.status !== 'pending') {
    return NextResponse.json({ error: 'Submission has already been reviewed' }, { status: 400 })
  }

  // Insert the new tool with source_submission_id linkage. Cast through
  // unknown because the local Database type for `tools` predates these
  // columns; the canonical column shape is in supabase/schema.sql.
  const toolInsertPayload = {
    name: td.name,
    slug: td.slug,
    short_description: td.short_description,
    description: td.description ?? null,
    website_url: td.website_url ?? null,
    github_url: td.github_url ?? null,
    category_id: td.category_id ?? null,
    price: td.price ?? 'unknown',
    platform: td.platform ?? 'unknown',
    difficulty: typeof td.difficulty === 'number' ? td.difficulty : 3,
    is_open_source: !!td.is_open_source,
    is_self_hosted: !!td.is_self_hosted,
    is_offline_capable: !!td.is_offline_capable,
    gpu_required: !!td.gpu_required,
    tags: Array.isArray(td.tags) ? td.tags : [],
    source_submission_id: submission.id,
  }

  const { data: insertedTool, error: toolError } = await supabase
    .from('tools')
    .insert(toolInsertPayload as never)
    .select('id, slug')
    .single()

  if (toolError || !insertedTool) {
    console.error('[approve] tool insert failed: ' + (toolError?.message ?? 'unknown'))
    return NextResponse.json(
      { error: toolError?.message ?? 'Failed to create tool' },
      { status: 500 },
    )
  }

  const { error: updateError } = await supabase
    .from('submissions')
    .update({
      status: 'approved',
      admin_notes: body.adminNotes || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', submission.id)

  if (updateError) {
    // The tool exists but the submission status did not update. This is
    // recoverable: an admin can re-trigger the status change manually.
    // Continue with the email send so the submitter still gets notified.
    console.error('[approve] submission update failed: ' + updateError.message)
  }

  // Mint the magic-link claim URL. Failures here are non-fatal: we still
  // send the approval email, just without the claim button. The submitter
  // can request a fresh claim link later via the /api/auth/magic-link
  // claim intent.
  let claimUrl: string | null = null
  try {
    // invite (not magiclink) so submitters without an auth.users record can claim
    const result = await generateAuthLink({
      email: submission.submitter_email,
      linkType: 'invite',
      redirectPath: `/profile?claim=${insertedTool.id}`,
    })
    claimUrl = result.url
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[approve] generateAuthLink failed: ' + message)
  }

  const { subject, html } = submissionApprovedWithClaim({
    tool_name: submission.submitted_name,
    tool_url: `${SITE_URL}/tool/${insertedTool.slug}`,
    claim_url: claimUrl,
  })

  // AWAIT the email send. Cloudflare Pages Functions cancels pending
  // promises after the response returns; the previous fire-and-forget
  // chain was silently dropping every approval email. The approval has
  // already committed at this point; an email failure here does not
  // unwind that, but it is logged and the response shape is unchanged.
  const emailDomain = submission.submitter_email.split('@')[1] ?? 'unknown'
  try {
    const r = await sendEmail({ to: submission.submitter_email, subject, html })
    if (r.error) {
      console.error('[approve] email failed: ' + r.error)
    } else {
      console.log(
        `[approve] email sent submission_id=${submission.id} domain=${emailDomain} resend_id=${r.id ?? 'unknown'}`,
      )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[approve] email threw: ' + message)
  }

  return NextResponse.json({
    success: true,
    tool: { id: insertedTool.id, slug: insertedTool.slug },
  })
}
