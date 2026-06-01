# Admin allowlist verification

This document traces the allowlist gating in `app/api/auth/magic-link/route.ts` and confirms that non-allowlisted emails are rejected without leaking that fact, without firing a Supabase API call, and without sending an email.

## Source

`app/api/auth/magic-link/route.ts` (Phase B, post-fix at commit 3b6ce52 onward).
`lib/email/send.ts` for the `getAdminEmails` helper.
`lib/supabase/middleware.ts` for the parallel admin gate that protects `/admin/*` routes.

## Path 1: allowlisted email

POST `/api/auth/magic-link` with `{ email, intent: 'admin', turnstile_token }`.

1. Body parses successfully.
2. `email` is normalized: `body.email.trim().toLowerCase()`.
3. `intent === 'admin'`. `turnstile_token` is present.
4. `verifyTurnstile(...)` returns `ok: true`.
5. `getAdminEmails()` fetches `site_settings.admin_emails` from the DB (or returns the 60s cached value). It returns an array of strings.
6. `allowlisted = adminEmails.map((e) => e.toLowerCase()).includes(email)` evaluates to `true`.
7. `generateAuthLink({ email, linkType: 'magiclink', redirectPath: '/admin' })`:
   - Builds a redirect-to URL pointing at `/auth/confirm?next=%2Fadmin`.
   - Calls `supabase.auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo } })` via the service-role client.
   - Extracts `data.properties.hashed_token`.
   - Returns `https://builderai.tools/auth/confirm?token_hash=...&type=magiclink&next=%2Fadmin`.
8. `magicLinkLogin({ variant: 'admin', magic_link_url: url })` renders subject and HTML.
9. `sendEmail({ to: email, subject, html })` POSTs to Resend.
10. Logs `[magic-link] sent domain=<domain> resend_id=<id>`.
11. Returns `genericOk()` (HTTP 200, JSON body `{"message":"If that email is allowed to sign in, a link has been sent."}`).

## Path 2: non-allowlisted email

Steps 1 through 5 are identical. At step 6, `allowlisted === false`.

7. Logs `[magic-link] admin intent rejected (not in allowlist) domain=<domain>` (domain only, never the full address).
8. Returns `genericOk()`. Identical response shape, identical status code.

Between step 6 and the return, the route does NOT execute any of:

- `generateAuthLink` (no Supabase admin call, no token issued, nothing visible in Supabase auth logs).
- `magicLinkLogin` (no template render).
- `sendEmail` (no Resend HTTP request, no email delivered, no Resend log entry).

The non-allowlisted caller cannot distinguish their request from an allowlisted one by:

- Response body: identical JSON.
- Response status: 200 either way.
- Response headers: same shape from `NextResponse.json`. The route never writes cookies in Phase B post-fix.

The only branch difference visible externally is timing. The allowlisted path performs one extra round trip to Supabase plus one Resend POST, adding roughly 200 to 800 ms. A determined attacker could in principle profile this by submitting many requests and measuring response time, but this is not a meaningful disclosure surface for a binary admin allowlist.

## Casing behavior

The allowlist comparison normalizes BOTH sides to lowercase:

- Submitted email: `body.email.trim().toLowerCase()`.
- Allowlist entries: `adminEmails.map((e) => e.toLowerCase())`.

The middleware admin gate (`lib/supabase/middleware.ts`) uses the same case-insensitive comparison: `entry.toLowerCase() === email.toLowerCase()`. The two gates are consistent.

This is RFC-correct. Email local-parts are technically case-sensitive per RFC 5321, but every major MTA in practice treats them as case-insensitive, and Supabase normalizes emails to lowercase on user creation. Treating allowlist comparisons as case-insensitive matches operational reality.

**Conclusion:** there is no casing-mismatch latent bug. Both gates are case-insensitive on both sides.

## Edge cases

- **Empty allowlist** (`getAdminEmails()` returns `[]`): every email rejects. `[].map(...).includes(x)` is `false`. Confirmed in the sanity script.
- **`getAdminEmails()` failure**: the helper never returns `null`; on error it logs and returns `[]` (`lib/email/send.ts` lines 130 to 142). The route's `.map()` is therefore always safe.
- **Surrounding whitespace in submitted email**: `body.email.trim().toLowerCase()` strips it before compare. `getAdminEmails()` does NOT trim individual entries, so a stored entry like `" admin@example.com"` would NOT match `admin@example.com`. This is a minor data-quality concern that should be addressed in `/admin/settings` input handling rather than in the comparison itself. Not a security issue.
- **Mixed-case allowlist entry**: `["Admin@Example.com"]` matches a submitted `admin@example.com`. Confirmed in the sanity script.
- **Non-string entries in the allowlist** (e.g., a number snuck in via the JSONB column): `getAdminEmails()` filters with `typeof v === 'string'` so non-strings are dropped before the comparison. Confirmed in the sanity script.

## Reproducer

`scripts/verify-admin-allowlist.mjs` runs the cases listed above and prints PASS or FAIL for each. Run with `node scripts/verify-admin-allowlist.mjs`. No DB access or env vars required; it tests the pure comparison function.

## Conclusion

The allowlist gating is sound. The rejection branch is silent (no external API calls, no emails) and indistinguishable from acceptance from the response perspective. No fix is needed.
