# BuilderAI.tools Agent Notes

Project-specific reminders and gotchas for any agent (Claude, Cursor, etc.) working in this repo. Update this file when you discover a load-bearing convention or a foot-gun worth flagging.

## Deploy

- **Cloudflare Pages project name:** `builderai-tools`
- **Canonical domain:** `https://builderai.tools` (no www)
- **Primary deploy path:** `npx wrangler@latest pages deploy .open-next --project-name=builderai-tools --commit-dirty=true` after `npm run build:cloudflare`. Run from repo root.
- **GitHub Actions** (`.github/workflows/deploy.yml`) is the backup, not the primary path. It auto-fires on push to `main` but the wrangler-direct path is faster and avoids the build-env vs Pages-env split that bit us with `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- **Build-time vs runtime env vars:** `NEXT_PUBLIC_*` values must be present at the moment `next build` runs to be inlined into the client bundle. Cloudflare Pages env vars do NOT reach the GH Actions build environment. Either: put them in `wrangler.toml [vars]` (committed; only OK for genuinely public values) or pass them into the GH Actions build step via `secrets.<NAME>`. Runtime-only secrets (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) live only in the Pages dashboard.

## Postgres function pattern (CRITICAL)

When creating or modifying a SQL function with `SECURITY DEFINER`:
- Put `SECURITY DEFINER` and `SET search_path = public` **before** `AS $$`.
- **Do not** add a trailing `SET search_path = ...` after `$$ LANGUAGE plpgsql`. The trailing form silently overrides the earlier `SET` and can leave the search_path empty (`''`), which makes unqualified table references fail with "function/relation does not exist".
- Verified working in production: `get_all_users` and `is_admin`, both redefined after earlier search-path issues.
- The canonical final shape of every table is in `supabase/schema.sql`. Operational migration history is kept in the private development repository.

### Redefining a function that has policy or trigger dependencies

Use `CREATE OR REPLACE FUNCTION` rather than `DROP FUNCTION ... ; CREATE FUNCTION ...`. As long as the return type and argument list are unchanged, `CREATE OR REPLACE` swaps the body in place without disturbing dependents. RLS policies and triggers reference the function by name and keep working through the swap.

`DROP FUNCTION` requires `CASCADE` when anything depends on it, and `CASCADE` will tear down every dependent policy and trigger. We learned this the hard way on `is_admin` (~20 RLS policies depend on it; the v1 migration's `DROP FUNCTION IF EXISTS is_admin()` rolled back the whole transaction, so the v2 migration switched to plain `CREATE OR REPLACE`).

## Admin gate

After `20260508_redefine_is_admin_for_email_allowlist_v2.sql`, `is_admin()` reads from `site_settings.admin_emails` (JSONB array of strings). It compares against `auth.jwt() ->> 'email'`. To add an admin: append the email to the array via `/admin/settings`. To remove an admin: remove from the array.

The middleware (`lib/supabase/middleware.ts`) also has its own admin gate that currently reads `profiles.role`. Phase B replaces that with the same email allowlist; until then both gates need to agree (admin must be both `profiles.role = 'admin'` AND in `admin_emails`).

## Email

- **Send helper:** `lib/email/send.ts` exposes `sendEmail()` and `notifyAdmins()`. Uses Resend's HTTP API directly via `fetch` (no `resend` npm package; works on every runtime).
- **Templates:** `lib/email/templates/*.ts`, each exports a function returning `{ subject, html }`.
- **Layout:** `lib/email/layout.ts` is the shared HTML wrapper. Always use `escapeHtml()` for any user-provided string interpolated into the body.
- **From address:** `RESEND_FROM_EMAIL` env var. Default in `wrangler.toml` is `noreply@builderai.tools` but Tommy may prefer something on `tpsworldwidellc.com` once the domain is verified in Resend.
- **No emojis in subject lines** for transactional email. The legacy `app/api/notifications/route.ts` uses emojis; do not copy that pattern.

## Anonymous submissions + rate limit

- `/api/submit` is the public endpoint. Validates Turnstile, rate-limits 3/IP/day via `RATE_LIMIT_KV` (Cloudflare KV namespace `BUILDERAI_RATE_LIMIT`, id `a91387dc07ec47348e6f435608e06016`).
- **Do not** set `runtime = 'edge'` on this route. OpenNext for Cloudflare in this project does not bundle edge-runtime route handlers separately; force-dynamic Node handler works and `getCloudflareContext()` reaches the KV binding fine.

## Reviews / pending_ratings

The existing `reviews` table column is **`comment`** (not `body`). When the Phase D `pending_ratings` migration lands, use `comment` to match the schema. The original Phase D spec text used `body`; do not copy that.

## Style

- **No em dashes anywhere** (in code, comments, copy, SQL). Use commas, periods, semicolons, or regular hyphen-minus.
- **Dollar-quote** any SQL string field that might contain apostrophes or single quotes. Use unique tags (e.g. `$bp_body$`) when the field could contain `$$`.
