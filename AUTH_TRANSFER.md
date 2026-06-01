# Auth Transfer Guide (BuilderAI.tools)

Use this checklist to copy the current Supabase auth setup into another project.

## 1) Copy these files

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `middleware.ts`
- `components/AuthProvider.tsx`
- `components/AuthModal.tsx`
- `app/login/LoginForm.tsx`
- `app/signup/SignupForm.tsx`
- `app/forgot-password/ForgotPasswordForm.tsx`
- `app/reset-password/ResetPasswordForm.tsx`
- `app/auth/callback/route.ts`
- `app/reset-password/page.tsx`
- `app/forgot-password/page.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`

If your other project has different routes, adjust paths accordingly.

## 2) Update imports (if needed)

Search and update any `@/` imports to match the other project structure.

## 3) Required env vars

Add these to the other project’s `.env` (and hosting env vars):

```
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=YOUR_SITE_URL
```

Optional (if you use email notifications via Resend):

```
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
ADMIN_NOTIFICATION_EMAIL=you@example.com
NOTIFICATION_WEBHOOK_SECRET=some_random_string
```

## 4) Supabase dashboard settings (critical)

Authentication → URL Configuration:

- **Site URL**: `https://yourdomain.com`
- **Redirect URLs** (add both www and non-www):
  - `https://yourdomain.com/auth/callback`
  - `https://yourdomain.com/reset-password`
  - `https://www.yourdomain.com/reset-password`

If you use OAuth, make sure Google/GitHub redirect URLs are set too.

## 5) Expected behavior

- Reset links always land on `/reset-password`
- User can reset password, then is signed out and redirected to `/login`
- `/reset-password` never redirects away while recovering

## 6) Notes

- Supabase recovery links **always sign the user in**. We mask auth state on `/reset-password`
  and sign out after password update.
- Do not rely on URL hash tokens; Supabase can use PKCE `?code=...` flows.

