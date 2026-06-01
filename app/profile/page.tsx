import Link from 'next/link'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ScrollToTopOnFlash } from '@/components'
import { SignOutButton } from './SignOutButton'

// Magic-link-only profile. Server component: gates on session, runs the
// auto-claim handler if ?claim=<tool_id> is in the URL, then renders both
// the restored pre-Phase-C-2 sections (account info, stats, recent
// favorites, quick links) and the new Phase C-2 sections (claimed,
// awaiting claim, ratings).

export const dynamic = 'force-dynamic'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const FLASH: Record<string, { kind: 'green' | 'blue' | 'red'; text: string }> = {
  // claim_status
  success: { kind: 'green', text: 'Tool claimed successfully.' },
  already_yours: { kind: 'blue', text: 'You already own that tool.' },
  // claim_error
  not_found: { kind: 'red', text: "That tool doesn't exist or has been removed." },
  already_claimed: { kind: 'red', text: 'Another user has already claimed that tool.' },
  not_approved: { kind: 'red', text: 'That submission has not been approved yet.' },
  email_mismatch: { kind: 'red', text: 'That tool was submitted under a different email address.' },
  race_or_db: { kind: 'red', text: "Couldn't complete the claim. Try again or contact support." },
  not_owner: { kind: 'red', text: "You don't own that tool." },
  // edit_status
  saved: { kind: 'green', text: 'Changes saved.' },
}

interface ClaimedTool {
  id: string
  slug: string
  name: string
  short_description: string
  claimed_at: string | null
}

interface AwaitingTool {
  id: string
  slug: string
  name: string
  short_description: string
}

interface UserRating {
  id: string
  rating: number
  comment: string | null
  created_at: string
  tool: { slug: string; name: string }
}

interface ProfileMeta {
  display_name: string | null
  created_at: string | null
}

interface FavoriteEntry {
  id: string
  tool: { id: string; name: string; slug: string; short_description: string }
}

async function attemptClaim(claimId: string, userId: string, userEmail: string): Promise<never> {
  const adminClient = createAdminClient()

  const { data: toolRow, error: toolError } = await adminClient
    .from('tools')
    .select('id, claimed_by_user_id, source_submission_id')
    .eq('id', claimId)
    .maybeSingle()

  if (toolError || !toolRow) {
    redirect('/profile?claim_error=not_found')
  }

  const tool = toolRow as unknown as {
    id: string
    claimed_by_user_id: string | null
    source_submission_id: string | null
  }

  if (tool.claimed_by_user_id) {
    if (tool.claimed_by_user_id === userId) {
      redirect('/profile?claim_status=already_yours')
    }
    redirect('/profile?claim_error=already_claimed')
  }

  if (!tool.source_submission_id) {
    redirect('/profile?claim_error=not_approved')
  }

  const { data: submission, error: submissionError } = await adminClient
    .from('submissions')
    .select('submitter_email, status')
    .eq('id', tool.source_submission_id)
    .maybeSingle()

  if (submissionError || !submission) {
    redirect('/profile?claim_error=not_found')
  }

  if (submission.status !== 'approved') {
    redirect('/profile?claim_error=not_approved')
  }

  const submitter = (submission.submitter_email ?? '').trim().toLowerCase()
  const me = (userEmail ?? '').trim().toLowerCase()
  if (!submitter || !me || submitter !== me) {
    const userDomain = me.split('@')[1] ?? 'unknown'
    console.log(`[profile] claim email mismatch domain=${userDomain} tool_id=${claimId}`)
    redirect('/profile?claim_error=email_mismatch')
  }

  const { data: updated, error: updateError } = await adminClient
    .from('tools')
    .update({
      claimed_by_user_id: userId,
      claimed_at: new Date().toISOString(),
    } as never)
    .eq('id', claimId)
    .is('claimed_by_user_id', null)
    .select('id')
    .maybeSingle()

  if (updateError || !updated) {
    console.error(
      `[profile] claim update failed tool_id=${claimId} error=${updateError?.message ?? 'no row'}`,
    )
    redirect('/profile?claim_error=race_or_db')
  }

  console.log(`[profile] claim success tool_id=${claimId} user_id=${userId}`)
  redirect('/profile?claim_status=success')
}

async function fetchClaimed(supabaseUserClient: Awaited<ReturnType<typeof createClient>>, userId: string): Promise<ClaimedTool[]> {
  const { data, error } = await supabaseUserClient
    .from('tools')
    .select('id, slug, name, short_description, claimed_at')
    .eq('claimed_by_user_id', userId)
    .order('claimed_at', { ascending: false, nullsFirst: false })

  if (error) throw error
  return ((data ?? []) as unknown[]).map((row) => row as ClaimedTool)
}

async function fetchAwaiting(adminClient: ReturnType<typeof createAdminClient>, userEmail: string): Promise<AwaitingTool[]> {
  const lowered = (userEmail ?? '').trim().toLowerCase()
  if (!lowered) return []

  const { data: subs, error: subsErr } = await adminClient
    .from('submissions')
    .select('id')
    .eq('status', 'approved')
    .eq('submitter_email', lowered)

  if (subsErr) throw subsErr
  if (!subs || subs.length === 0) return []

  const subIds = subs.map((s) => s.id)
  const { data: tools, error: toolsErr } = await adminClient
    .from('tools')
    .select('id, slug, name, short_description')
    .in('source_submission_id' as never, subIds)
    .is('claimed_by_user_id', null)

  if (toolsErr) throw toolsErr
  return ((tools ?? []) as unknown[]).map((row) => row as AwaitingTool)
}

async function fetchRatings(supabaseUserClient: Awaited<ReturnType<typeof createClient>>, userId: string): Promise<UserRating[]> {
  const { data, error } = await supabaseUserClient
    .from('reviews')
    .select('id, rating, comment, created_at, tools:tool_id(slug, name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return ((data ?? []) as unknown[]).map((raw) => {
    const row = raw as {
      id: string
      rating: number
      comment: string | null
      created_at: string
      tools: { slug: string; name: string } | { slug: string; name: string }[] | null
    }
    const t = Array.isArray(row.tools) ? row.tools[0] : row.tools
    return {
      id: row.id,
      rating: row.rating,
      comment: row.comment,
      created_at: row.created_at,
      tool: { slug: t?.slug ?? '', name: t?.name ?? '' },
    }
  })
}

async function fetchProfileMeta(
  supabaseUserClient: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<ProfileMeta | null> {
  const { data, error } = await supabaseUserClient
    .from('profiles')
    .select('display_name, created_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  const row = data as unknown as { display_name: string | null; created_at: string | null }
  return { display_name: row.display_name ?? null, created_at: row.created_at ?? null }
}

async function fetchSubmissionsCount(
  adminClient: ReturnType<typeof createAdminClient>,
  userEmail: string,
): Promise<number> {
  // Counts approved submissions matched by submitter_email rather than
  // submitter_user_id, because the post-Phase-5 anonymous submission flow
  // sets submitter_user_id to null on every insert. Email-based counting
  // is what the user actually expects to see in the "Tools submitted"
  // tile: how many of their approved tools are live on the site.
  //
  // ilike is case-insensitive. submitter_email is lowercased on insert
  // by /api/submit, but legacy data may have mixed case; ilike covers
  // both. We escape '%' and '_' so unusual email local-parts are matched
  // literally rather than as ilike wildcards. The '__never__' fallback
  // returns 0 instead of matching everything if the user somehow has no
  // email on file.
  const lowered = (userEmail ?? '').trim().toLowerCase()
  const safe = lowered ? lowered.replace(/[%_]/g, '\\$&') : '__never__'

  const { count, error } = await adminClient
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')
    .ilike('submitter_email', safe)

  if (error) throw error
  return count ?? 0
}

async function fetchFavoritesCount(
  supabaseUserClient: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<number> {
  const result = await (
    supabaseUserClient.from('user_favorites' as never) as unknown as {
      select: (cols: string, opts: { count: 'exact'; head: true }) => {
        eq: (col: string, val: string) => Promise<{ count: number | null; error: { message: string } | null }>
      }
    }
  )
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (result.error) throw new Error(result.error.message)
  return result.count ?? 0
}

async function fetchRecentFavorites(
  supabaseUserClient: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<FavoriteEntry[]> {
  const result = await (
    supabaseUserClient.from('user_favorites' as never) as unknown as {
      select: (cols: string) => {
        eq: (col: string, val: string) => {
          order: (col: string, opts: { ascending: boolean }) => {
            limit: (n: number) => Promise<{ data: unknown[] | null; error: { message: string } | null }>
          }
        }
      }
    }
  )
    .select('id, tool:tools(id, name, slug, short_description)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5)

  if (result.error) throw new Error(result.error.message)
  return ((result.data ?? []) as unknown[])
    .map((raw) => {
      const r = raw as { id: string; tool: unknown }
      const tArr = Array.isArray(r.tool) ? r.tool[0] : r.tool
      const t = tArr as { id?: string; name?: string; slug?: string; short_description?: string } | null
      if (!t || !t.id || !t.slug) return null
      return {
        id: r.id,
        tool: {
          id: t.id,
          name: t.name ?? '',
          slug: t.slug,
          short_description: t.short_description ?? '',
        },
      } as FavoriteEntry
    })
    .filter((f): f is FavoriteEntry => f !== null)
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const params = await searchParams

  const claimId = typeof params.claim === 'string' ? params.claim : null
  const claimStatus = typeof params.claim_status === 'string' ? params.claim_status : null
  const claimError = typeof params.claim_error === 'string' ? params.claim_error : null
  const editStatus = typeof params.edit_status === 'string' ? params.edit_status : null

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect('/?auth_required=profile')
  }

  if (claimId && UUID_REGEX.test(claimId)) {
    await attemptClaim(claimId, user.id, user.email ?? '')
  }

  let banner: { kind: 'green' | 'blue' | 'red'; text: string } | null = null
  if (claimStatus && FLASH[claimStatus]) {
    banner = FLASH[claimStatus]
  } else if (claimError && FLASH[claimError]) {
    banner = FLASH[claimError]
  } else if (editStatus && FLASH[editStatus]) {
    banner = FLASH[editStatus]
  }

  const adminClient = createAdminClient()

  const [
    claimedRes,
    awaitingRes,
    ratingsRes,
    profileMetaRes,
    submissionsCountRes,
    favoritesCountRes,
    recentFavoritesRes,
  ] = await Promise.allSettled([
    fetchClaimed(supabase, user.id),
    fetchAwaiting(adminClient, user.email ?? ''),
    fetchRatings(supabase, user.id),
    fetchProfileMeta(supabase, user.id),
    fetchSubmissionsCount(adminClient, user.email ?? ''),
    fetchFavoritesCount(supabase, user.id),
    fetchRecentFavorites(supabase, user.id),
  ])

  const profileMeta: ProfileMeta | null =
    profileMetaRes.status === 'fulfilled' ? profileMetaRes.value : null

  const displayName =
    profileMeta?.display_name ||
    (user.user_metadata as { display_name?: string } | null)?.display_name ||
    user.email?.split('@')[0] ||
    'User'

  const memberSince =
    profileMeta?.created_at &&
    new Date(profileMeta.created_at).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

  const submissionsCount =
    submissionsCountRes.status === 'fulfilled' ? submissionsCountRes.value : 0
  const favoritesCount =
    favoritesCountRes.status === 'fulfilled' ? favoritesCountRes.value : 0
  const recentFavorites: FavoriteEntry[] =
    recentFavoritesRes.status === 'fulfilled' ? recentFavoritesRes.value : []

  const greeting = user.email ?? 'there'

  return (
    <div className="min-h-screen py-12">
      <Suspense fallback={null}>
        <ScrollToTopOnFlash />
      </Suspense>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your profile</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Welcome back, {greeting}.</p>
          </div>
          <SignOutButton />
        </div>

        {banner && <FlashBanner kind={banner.kind} text={banner.text} />}

        {/* Restored pre-C-2 sections start here */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account info
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Username</label>
                <p className="text-zinc-900 dark:text-white font-medium">{displayName}</p>
              </div>
              <div>
                <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Email</label>
                <p className="text-zinc-900 dark:text-white font-medium">{user.email ?? ''}</p>
              </div>
              <div>
                <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Member since</label>
                <p className="text-zinc-900 dark:text-white font-medium">{memberSince || 'Unknown'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Your stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{submissionsCount}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Tools submitted</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{favoritesCount}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Saved favorites</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Recent favorites
          </h2>
          {recentFavoritesRes.status === 'rejected' ? (
            <SectionError />
          ) : recentFavorites.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              No favorites yet. Browse tools and click the heart to add favorites.
            </p>
          ) : (
            <div className="space-y-2">
              {recentFavorites.map((fav) => (
                <Link
                  key={fav.id}
                  href={`/tool/${fav.tool.slug}`}
                  className="block p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <p className="font-medium text-zinc-900 dark:text-white text-sm">{fav.tool.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{fav.tool.short_description}</p>
                </Link>
              ))}
              <Link
                href="/tools?filter=favorites"
                className="block text-center text-sm text-primary-600 dark:text-primary-400 hover:underline mt-3"
              >
                View all favorites →
              </Link>
            </div>
          )}
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/tools?filter=favorites"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            View favorites
          </Link>
          <Link
            href="/tools?filter=hidden"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            View hidden tools
          </Link>
        </div>

        {/* Phase C-2 sections start here */}
        <SectionCard title="Tools you've claimed">
          {claimedRes.status === 'rejected' ? (
            <SectionError />
          ) : claimedRes.value.length === 0 ? (
            <ClaimedEmpty hasAwaiting={awaitingRes.status === 'fulfilled' && awaitingRes.value.length > 0} />
          ) : (
            <ul className="space-y-3">
              {claimedRes.value.map((t) => (
                <li
                  key={t.id}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/tool/${t.slug}`}
                        className="font-medium text-zinc-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {t.name}
                      </Link>
                      {t.short_description && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{t.short_description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Link
                        href={`/profile/tools/${t.slug}/edit`}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/tool/${t.slug}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {awaitingRes.status === 'fulfilled' && awaitingRes.value.length > 0 && (
          <SectionCard title="Tools awaiting your claim">
            <ul className="space-y-3">
              {awaitingRes.value.map((t) => (
                <li
                  key={t.id}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-zinc-900 dark:text-white">{t.name}</p>
                      {t.short_description && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{t.short_description}</p>
                      )}
                    </div>
                    <Link
                      href={`/profile?claim=${t.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors flex-shrink-0"
                    >
                      Claim this listing
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}
        {awaitingRes.status === 'rejected' && (
          <SectionCard title="Tools awaiting your claim">
            <SectionError />
          </SectionCard>
        )}

        <SectionCard title="Your ratings">
          {ratingsRes.status === 'rejected' ? (
            <SectionError />
          ) : ratingsRes.value.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">You haven't rated any tools yet.</p>
          ) : (
            <ul className="space-y-3">
              {ratingsRes.value.map((r) => (
                <li
                  key={r.id}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/tool/${r.tool.slug}`}
                        className="font-medium text-zinc-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {r.tool.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <Stars value={r.rating} />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      {r.comment && (
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 whitespace-pre-wrap">{r.comment}</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        type="button"
                        disabled
                        title="Coming soon (Phase D)"
                        className="px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 rounded-md cursor-not-allowed"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled
                        title="Coming soon (Phase D)"
                        className="px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 rounded-md cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">{title}</h2>
      {children}
    </section>
  )
}

function SectionError() {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      Couldn't load this section. Refresh the page to try again.
    </p>
  )
}

function ClaimedEmpty({ hasAwaiting }: { hasAwaiting: boolean }) {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      You haven't claimed any tools yet.{' '}
      {hasAwaiting ? (
        <span>Check the section below for tools waiting on your claim.</span>
      ) : (
        <Link href="/submit" className="text-primary-600 dark:text-primary-400 hover:underline">
          Submit a tool to get started.
        </Link>
      )}
    </p>
  )
}

function FlashBanner({ kind, text }: { kind: 'green' | 'blue' | 'red'; text: string }) {
  const styles =
    kind === 'green'
      ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300'
      : kind === 'blue'
        ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300'
        : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300'
  return (
    <div className={`mb-6 px-4 py-3 rounded-lg border ${styles}`}>
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}

function Stars({ value }: { value: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(value)))
  return (
    <div className="flex items-center" aria-label={`${safe} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= safe ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.075 9.1c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
        </svg>
      ))}
    </div>
  )
}
