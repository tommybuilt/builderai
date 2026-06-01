import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, ratingReceivedConfirmation } from '@/lib/email'

// GET /api/auth/finalize-rating?token=<pending_id>
//
// Reached after the user clicks the magic link in their rating-confirmation
// email. By this point /auth/confirm has verified the OTP and set the
// session cookies, so the cookie-aware server client can read the user.
//
// Validates the pending_ratings row, confirms the authenticated email
// matches the email that submitted the rating, upserts the review,
// deletes the pending row, sends a confirmation email, and redirects to
// the tool page with ?rating_success=1.
//
// Errors all redirect to /?rating_error=<reason>. The homepage renders
// a flash banner for these codes.

export const dynamic = 'force-dynamic'

const SITE_URL = 'https://builderai.tools'
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function errorRedirect(request: NextRequest, reason: string): NextResponse {
  return NextResponse.redirect(new URL(`/?rating_error=${reason}`, request.url))
}

interface PendingRow {
  id: string
  email: string
  tool_id: string
  rating: number
  comment: string | null
  expires_at: string
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    console.error('[finalize-rating] missing token')
    return errorRedirect(request, 'missing_token')
  }
  if (!UUID_REGEX.test(token)) {
    console.error('[finalize-rating] invalid token format')
    return errorRedirect(request, 'invalid_token')
  }

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error('[finalize-rating] no session despite confirm flow')
    return errorRedirect(request, 'no_session')
  }

  const adminClient = createAdminClient()

  // Opportunistic cleanup of expired pending rows. Fire-and-forget at
  // best-effort; failure here doesn't block the current finalize.
  void (async () => {
    try {
      await (adminClient.from('pending_ratings' as never) as unknown as {
        delete: () => { lt: (col: string, val: string) => Promise<unknown> }
      })
        .delete()
        .lt('expires_at', new Date().toISOString())
    } catch {
      // ignore
    }
  })()

  let pending: PendingRow | null = null
  try {
    const { data, error } = await (
      adminClient.from('pending_ratings' as never) as unknown as {
        select: (cols: string) => {
          eq: (col: string, val: string) => {
            maybeSingle: () => Promise<{ data: PendingRow | null; error: { message: string } | null }>
          }
        }
      }
    )
      .select('id, email, tool_id, rating, comment, expires_at')
      .eq('id', token)
      .maybeSingle()

    if (error) {
      console.error('[finalize-rating] pending lookup failed: ' + error.message)
      return errorRedirect(request, 'expired_or_used')
    }
    pending = data
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[finalize-rating] pending lookup threw: ' + message)
    return errorRedirect(request, 'expired_or_used')
  }

  if (!pending) {
    console.log(`[finalize-rating] pending not found token_prefix=${token.slice(0, 8)}`)
    return errorRedirect(request, 'expired_or_used')
  }

  if (new Date(pending.expires_at).getTime() < Date.now()) {
    console.log(`[finalize-rating] expired pending_id=${pending.id}`)
    void (async () => {
      try {
        await (adminClient.from('pending_ratings' as never) as unknown as {
          delete: () => { eq: (col: string, val: string) => Promise<unknown> }
        })
          .delete()
          .eq('id', pending!.id)
      } catch {
        // ignore
      }
    })()
    return errorRedirect(request, 'expired_or_used')
  }

  const pendingEmail = (pending.email ?? '').trim().toLowerCase()
  const userEmail = (user.email ?? '').trim().toLowerCase()
  if (!pendingEmail || pendingEmail !== userEmail) {
    const userDomain = userEmail.split('@')[1] ?? 'unknown'
    console.log(`[finalize-rating] email mismatch domain=${userDomain}`)
    return errorRedirect(request, 'email_mismatch')
  }

  const { data: toolRow, error: toolError } = await adminClient
    .from('tools')
    .select('id, slug, name')
    .eq('id', pending.tool_id)
    .maybeSingle()

  if (toolError || !toolRow) {
    console.log(`[finalize-rating] tool gone tool_id=${pending.tool_id}`)
    return errorRedirect(request, 'tool_gone')
  }

  const tool = toolRow as unknown as { id: string; slug: string; name: string }

  // The reviews table has no unique constraint on (tool_id, user_id), so we
  // emulate upsert with a lookup-then-insert-or-update. Existing reviews
  // by the same user on the same tool are updated in place.
  const { data: existingReview, error: existingReviewError } = await adminClient
    .from('reviews')
    .select('id')
    .eq('tool_id', pending.tool_id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingReviewError) {
    console.error(
      '[finalize-rating] existing review lookup failed: message=' + existingReviewError.message +
      ' code=' + (existingReviewError as { code?: string }).code +
      ' details=' + (existingReviewError as { details?: string }).details +
      ' hint=' + (existingReviewError as { hint?: string }).hint,
    )
    return errorRedirect(request, 'insert_failed')
  }

  if (existingReview) {
    const { error: updateError } = await adminClient
      .from('reviews')
      .update({ rating: pending.rating, comment: pending.comment })
      .eq('id', existingReview.id)
    if (updateError) {
      console.error(
        '[finalize-rating] review update failed: message=' + updateError.message +
        ' code=' + (updateError as { code?: string }).code +
        ' details=' + (updateError as { details?: string }).details +
        ' hint=' + (updateError as { hint?: string }).hint,
      )
      return errorRedirect(request, 'insert_failed')
    }
  } else {
    const { error: insertError } = await adminClient
      .from('reviews')
      .insert({
        tool_id: pending.tool_id,
        user_id: user.id,
        rating: pending.rating,
        comment: pending.comment,
      })
    if (insertError) {
      console.error(
        '[finalize-rating] review insert failed: message=' + insertError.message +
        ' code=' + (insertError as { code?: string }).code +
        ' details=' + (insertError as { details?: string }).details +
        ' hint=' + (insertError as { hint?: string }).hint,
      )
      return errorRedirect(request, 'insert_failed')
    }
  }

  // Recalculate tool stats. The existing /api/reviews handler does this
  // manually rather than relying on triggers; following the same pattern
  // for consistency.
  try {
    const { data: allReviews } = await adminClient
      .from('reviews')
      .select('rating')
      .eq('tool_id', pending.tool_id)

    if (allReviews && allReviews.length > 0) {
      const sum = allReviews.reduce((acc, r) => acc + (r.rating ?? 0), 0)
      const avg = Math.round((sum / allReviews.length) * 100) / 100
      await adminClient
        .from('tools')
        .update({ rating_avg: avg, rating_count: allReviews.length })
        .eq('id', pending.tool_id)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[finalize-rating] rating recalc failed: ' + message)
    // The review is already saved; recalc is best-effort.
  }

  // Delete the pending row now that the review is committed.
  try {
    await (adminClient.from('pending_ratings' as never) as unknown as {
      delete: () => { eq: (col: string, val: string) => Promise<unknown> }
    })
      .delete()
      .eq('id', pending.id)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[finalize-rating] pending delete failed: ' + message)
    // Non-fatal: row will be cleaned up by the next finalize call's expiry sweep.
  }

  // Send the confirmation email. Awaited because Cloudflare Pages cancels
  // pending promises after response (Phase C-1 hotfix lesson).
  try {
    const { subject, html } = ratingReceivedConfirmation({
      tool_name: tool.name,
      tool_url: `${SITE_URL}/tool/${tool.slug}`,
      rating: pending.rating,
    })
    const result = await sendEmail({ to: user.email ?? pendingEmail, subject, html })
    if (result.error) {
      console.error('[finalize-rating] confirmation email failed: ' + result.error)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[finalize-rating] confirmation email threw: ' + message)
  }

  console.log(`[finalize-rating] success tool_id=${pending.tool_id} user_id=${user.id}`)
  return NextResponse.redirect(
    new URL(`/tool/${tool.slug}?rating_success=1`, request.url),
  )
}
