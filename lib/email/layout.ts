// Base HTML layout for all transactional email templates.
//
// This wraps content in a system-font, max-width 600 body with consistent
// header/footer chrome. Every template renders into this layout so the visual
// identity stays consistent across all six emails.

interface LayoutOptions {
  /** Inner HTML content placed inside the email body. */
  content: string
  /** Optional preheader text that appears in inbox previews. */
  preheader?: string
}

const SITE_URL = 'https://builderai.tools'
const SUPPORT_EMAIL = 'support@tpsworldwidellc.com'

/**
 * Standard "do not reply" footer line. Appended to every transactional email
 * via renderEmailLayout(). Re-export so any caller that builds a layout
 * outside this helper can use the same exact wording.
 */
export const DO_NOT_REPLY_FOOTER =
  `This is an automated message. Replies to this address are not monitored. ` +
  `If you have questions or need support, please contact ` +
  `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.`

/** Escape `&`, `<`, `>`, `"`, `'` so user-provided strings can be safely interpolated into HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function renderEmailLayout(opts: LayoutOptions): string {
  const preheader = opts.preheader
    ? `<div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">${escapeHtml(opts.preheader)}</div>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BuilderAI</title>
<style>
  body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; color: #18181b; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse; }
  a { color: #2563eb; }
  .wrap { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
  .card { background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; }
  .header { padding: 20px 24px; border-bottom: 1px solid #e4e4e7; }
  .brand { font-size: 18px; font-weight: 700; color: #18181b; text-decoration: none; }
  .brand-accent { color: #2563eb; }
  .body { padding: 24px; line-height: 1.6; font-size: 15px; color: #27272a; }
  .body h1 { font-size: 22px; line-height: 1.3; margin: 0 0 16px 0; color: #18181b; }
  .body h2 { font-size: 17px; line-height: 1.35; margin: 24px 0 8px 0; color: #18181b; }
  .body p { margin: 0 0 14px 0; }
  .body ul { margin: 0 0 14px 0; padding-left: 20px; }
  .body code { background: #f4f4f5; padding: 1px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; }
  .button { display: inline-block; padding: 11px 22px; background: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; }
  .button:hover { background: #1d4ed8; }
  .meta { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #52525b; margin: 16px 0; }
  .meta strong { color: #18181b; }
  .footer { padding: 16px 24px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; line-height: 1.5; }
  .footer a { color: #71717a; }
</style>
</head>
<body>
${preheader}
<div class="wrap">
  <div class="card">
    <div class="header">
      <a class="brand" href="${SITE_URL}">Builder<span class="brand-accent">AI</span></a>
    </div>
    <div class="body">
${opts.content}
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px 0;">Sent by BuilderAI, a TPS Worldwide LLC property.</p>
      <p style="margin: 0;">${DO_NOT_REPLY_FOOTER}</p>
    </div>
  </div>
</div>
</body>
</html>`
}

export const EMAIL_CONSTANTS = {
  SITE_URL,
  SUPPORT_EMAIL,
} as const
