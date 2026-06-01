# Cloudflare Pages Migration Status

**Last Updated:** February 4, 2026  
**Project:** BuilderAI Tools (https://builderai.tools)  
**Repository:** https://github.com/tommybuilt/builderai

---

## Current Issue (FIXED)

~~The site loads briefly then crashes with missing env vars.~~

**ROOT CAUSE FOUND:** `.env.local` had the OLD rotated Supabase anon key, and the new key was set without the `NEXT_PUBLIC_` prefix. Fixed by cleaning up `.env.local` with correct values.

**Next issue to address:** Google OAuth redirect URLs need updating for the new domain.

---

## What's Been Completed

### 1. Code Migration (DONE)
- [x] Removed `nodemailer` (incompatible with Cloudflare Workers)
- [x] Added Resend HTTP API for email (`app/api/notifications/route.ts`)
- [x] Upgraded Next.js from 14 to 15.5.10 (required for OpenNext)
- [x] Added `@opennextjs/cloudflare` and `wrangler` dependencies
- [x] Fixed API route parameter types for Next.js 15 (`params` is now `Promise`)
- [x] Updated ESLint config for Next.js 15
- [x] Simplified `lib/supabase/client.ts` to use direct `process.env.NEXT_PUBLIC_*` references

### 2. Build Configuration (DONE)
- [x] Created `wrangler.toml` with public env vars in `[vars]`
- [x] Created `open-next.config.ts` for Cloudflare Workers
- [x] Created `public/_routes.json` to serve static assets directly
- [x] Created `scripts/cloudflare-postbuild.mjs` to fix asset paths
- [x] Created `scripts/cloudflare-prepare-env.mjs` to inject env vars for build
- [x] Updated `package.json` build script

### 3. Deployments (DONE)
- [x] Site deploys successfully to Cloudflare Pages
- [x] CSS and static assets load correctly
- [x] Worker compiles without errors

### 4. Git (DONE)
- [x] All changes committed and pushed to GitHub

---

## What's NOT Working

### Client-Side Environment Variables
The `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are NOT being inlined into the client JavaScript bundle during build.

**Symptoms:**
- Homepage loads for a split second (server-rendered HTML)
- Then crashes when React hydrates (client JS runs)
- Console shows: `Missing NEXT_PUBLIC_SUPABASE_URL`

**Root Cause Options:**
1. Build environment doesn't have these vars (`.env.local` missing or not read)
2. Cloudflare Pages Production environment variables not set
3. The `scripts/cloudflare-prepare-env.mjs` script isn't working correctly

---

## What Needs To Be Done

### Step 1: Fix Environment Variables (PRIORITY)

**Option A: Add to Cloudflare Pages Dashboard**
1. Go to Cloudflare Dashboard → Workers & Pages → builderai-tools
2. Settings → Environment Variables → Production
3. Add these as **plain text** (NOT encrypted):
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://zqxqlcjkwftrdwlhlhom.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_UT3NXp1J2u3x6xj9CPKMJg_YM4NlegK`
4. Trigger a new deployment

**Option B: Verify `.env.local` has these vars**
Check that the project's local `.env.local` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://zqxqlcjkwftrdwlhlhom.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_UT3NXp1J2u3x6xj9CPKMJg_YM4NlegK
```

Then rebuild and redeploy:
```powershell
npm run build:cloudflare
npx wrangler pages deploy --project-name builderai-tools --commit-dirty=true
```

### Step 2: Test the Preview URL First

Before testing the custom domain, test the **preview deployment URL** directly:
```
https://107741e5.builderai-tools.pages.dev
```
(or whatever the latest deployment URL is from the deploy output)

If this works → the issue is DNS/custom domain config.
If this fails → the issue is still the build/env vars.

### Step 3: Fix Custom Domain (After App Works)

**In Cloudflare Pages:**
1. Go to Custom Domains tab
2. Add `builderai.tools` and `www.builderai.tools`

**In Namecheap DNS:**
1. Delete old Vercel A/CNAME records
2. Add CNAME: `@` → `builderai-tools.pages.dev`
3. Add CNAME: `www` → `builderai-tools.pages.dev`

### Step 4: Fix Google OAuth (After Domain Works)

**In Google Cloud Console** (https://console.cloud.google.com/apis/credentials):

1. Authorized JavaScript origins:
   - `https://builderai.tools`
   - `https://www.builderai.tools`

2. Authorized redirect URIs:
   - `https://builderai.tools/auth/callback`
   - `https://www.builderai.tools/auth/callback`

**In Supabase Dashboard** (Authentication → URL Configuration):
- Site URL: `https://builderai.tools`
- Redirect URLs: `https://builderai.tools/**`

### Step 5: Add Remaining Secrets to Cloudflare

These need to be added as **encrypted secrets** in Cloudflare Pages:
- `RESEND_API_KEY` - (user has this, didn't share)
- `ADMIN_NOTIFICATION_EMAIL` - (user's private email)
- `NOTIFICATION_WEBHOOK_SECRET` - `22c677de23b94d09afec4e131962f089`

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `wrangler.toml` | Cloudflare Pages config, public env vars |
| `open-next.config.ts` | OpenNext adapter configuration |
| `public/_routes.json` | Static asset routing rules |
| `scripts/cloudflare-postbuild.mjs` | Copies assets to correct locations |
| `scripts/cloudflare-prepare-env.mjs` | Syncs wrangler vars to .env.local |
| `lib/supabase/client.ts` | Browser Supabase client (needs NEXT_PUBLIC_* vars) |
| `lib/supabase/server.ts` | Server Supabase client |
| `app/api/notifications/route.ts` | Email via Resend API |

---

## Useful Commands

```powershell
# Build for Cloudflare
npm run build:cloudflare

# Deploy to Cloudflare Pages
npx wrangler pages deploy --project-name builderai-tools --commit-dirty=true

# Check Cloudflare login
npx wrangler whoami

# View deployment list
npx wrangler pages deployment list --project-name builderai-tools
```

---

## Previous Hosting

- Was on: **Vercel**
- Domain registrar: **Namecheap**
- DNS was: Vercel (needs to be updated to Cloudflare)

---

## Notes

- The user does NOT need `SUPABASE_SERVICE_ROLE_KEY` for production (only for local seeding)
- The Supabase anon key shown above is the NEW rotated public key (safe to expose)
- OpenNext warns about Windows compatibility but it does work
- ESLint shows warnings but doesn't block the build
