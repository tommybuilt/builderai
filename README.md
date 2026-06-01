# BuilderAI.tools

A curated directory of open-source and developer-focused AI tools, for engineers
who want to actually ship.

> Curated portfolio snapshot. This is a public snapshot of a real project built
> and operated by TPS Worldwide LLC. Active development happens in a private
> repository.

## Overview

BuilderAI.tools catalogs hundreds of AI projects across categories like
text-to-speech, computer vision, vector databases, AI agents, LLM inference,
and code assistants. Each tool gets a profile page with structured metadata
(license, platform, GPU requirements, pricing model), public reviews and
ratings, related tools, and a long-form description. The site adds a blog of
practical AI-engineering explainers, an anonymous submission flow with
Turnstile and per-IP rate limiting, and an admin panel for moderation.

## Features

- **Browsable catalog**: tools indexed by category and tag, with filters for
  open-source, self-hosted, offline-capable, GPU-required, and license.
- **Reviews and ratings**: anonymous and authenticated review flow with a
  magic-link finalize step, anti-spam checks, and a `pending_ratings` table
  with 24-hour expiry.
- **Public submissions**: `/api/submit` accepts new tool suggestions with
  Cloudflare Turnstile validation and 3-per-IP-per-day rate limiting via a
  Cloudflare KV namespace.
- **Admin panel** (`/admin`): tool, category, submission, review, blog, user,
  and ban management, plus a site-settings JSONB store for things like the
  admin-email allowlist.
- **Blog**: server-rendered articles backed by Supabase, with related-tool
  cross-links and per-post tags.
- **Email**: Resend HTTP API integration for submission acknowledgements,
  approval emails, and admin notifications.

## Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Radix UI primitives
- **Auth and data**: Supabase (Postgres + Auth)
- **Hosting**: Cloudflare Pages via OpenNext, plus a sibling Cloudflare Worker
  for SSR
- **Email**: Resend, called directly over HTTPS for runtime portability
- **Bot protection**: Cloudflare Turnstile
- **Storage**: Cloudflare KV for rate-limit counters

## Architecture notes

- **Database design**: 13 production tables documented in
  [`supabase/schema.sql`](./supabase/schema.sql). The schema enforces correctness
  at the database layer (CHECK constraints for email format, rating range,
  ban-type-matches-target column, lowercase emails) rather than relying on
  application code.
- **Admin gate**: `is_admin()` reads an email allowlist from a JSONB
  `site_settings` row. The middleware layer applies a second `profiles.role`
  check so the gate is enforced both in the API and at the request edge.
- **Build pattern**: OpenNext for Cloudflare compiles the Next.js app into a
  Worker SSR bundle plus a static-asset bundle served by Pages. `wrangler.toml`
  pins the public-by-design env vars (Supabase publishable key, Turnstile
  site key) at the public visibility boundary.
- **SECURITY DEFINER convention**: every Postgres trigger function declares
  `SET search_path = public` before `AS $$`, with schema-qualified table
  references in the body, to avoid an empty-search-path foot-gun documented
  in [`CLAUDE.md`](./CLAUDE.md).
- **Seed data**: open-source tool catalog and blog content live in
  `supabase/seed-tools-batch-*.sql` and `supabase/seed-blog.sql` for
  reproducibility.

## License

MIT. See [LICENSE](LICENSE).
