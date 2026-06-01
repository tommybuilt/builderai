# BuilderAI.tools

A curated directory of open-source and developer-focused AI tools, for engineers who want to actually ship.

## What it does

BuilderAI.tools catalogs AI tools as structured records, each with license, platform, GPU and VRAM requirements, difficulty, open-source and self-hosted flags, tags, and an aggregate rating, organized by category and surfaced through server-rendered tool and category pages, filters, and search. Anyone can submit a tool through a bot-checked, rate-limited form that lands in a moderation queue, and leave a star rating confirmed by a magic link. Admins moderate tools, submissions, reviews, blog posts, users, and bans from a dedicated panel. The site also ships a blog and a chatbot that answers only from the site's own pages.

## Tech stack

- Next.js 15 (App Router) and React 18, TypeScript, built for Cloudflare with OpenNext and served behind a Pages proxy worker
- Supabase (Postgres plus Auth) as the data and identity layer
- Tailwind CSS with the typography plugin, react-markdown for content, no component library
- Cloudflare Turnstile for bot protection, Cloudflare KV for submission rate limits, Resend for transactional email
- OpenAI (`gpt-4o-mini`) powers the on-site chatbot; a separate cron Worker uses the Anthropic Messages API to draft new directory entries

## Key features

- Structured catalog with a filter panel over license, platform, and the open-source, self-hosted, offline, and GPU flags, backed by Postgres with GIN-indexed tags
- Public anonymous submissions: Turnstile verification, a three-per-IP daily rate limit in KV, a ban check, and an insert into a moderation queue with submitter and admin emails
- Reviews and ratings with a magic-link finalize flow and a time-limited pending-rating record
- An admin panel for tools, categories, submissions, reviews, blog, users with IP history, bans, and a settings store
- A blog backed by Postgres with per-post tags and related-tool cross-links
- A retrieval-grounded chatbot that fetches the live sitemap, selects relevant pages, prompts the model to answer only from that content, and strips any link that is not an on-site URL
- An automated weekly tool-discovery Worker that asks a model for new open-source tools, validates and de-duplicates them, and inserts them as drafts for human review

## Architecture notes

- Rendering is Next.js App Router SSR compiled by OpenNext into a Cloudflare Worker, fronted by a hand-written Pages proxy that rewrites origin headers back to the public host and forces www to apex.
- Correctness is pushed into the database: the schema uses CHECK constraints for email format, rating and difficulty ranges, and ban-target consistency, and access control runs through Postgres functions and row-level policies rather than living only in application code.
- Two AI providers do two different jobs: OpenAI answers user questions in the chatbot under a strict answer-only-from-provided-content prompt, while Anthropic drafts candidate directory entries in a background cron Worker. Discovered tools are never published directly; they land as drafts for review.
- Submissions are defended in depth: Turnstile, a per-IP daily KV rate limit, and a ban check all run before anything is written.

## Live site

https://builderai.tools

## Status

This is a public snapshot of a private working repository, captured at a point in time. It reflects the real code but omits configuration, secrets, and ongoing changes that live in the private repo. The schema file here is a reference snapshot and does not include the row-level policies and database functions, which live in the private repo. Built by tommybuilt: https://tommybuilt.dev
