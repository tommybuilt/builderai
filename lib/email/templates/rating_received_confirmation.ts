// Sent after a magic-link-verified rating posts to the reviews table.

import { renderEmailLayout, escapeHtml, EMAIL_CONSTANTS } from '../layout'

export interface RatingReceivedConfirmationArgs {
  tool_name: string
  /** Public listing URL, e.g. https://builderai.tools/tool/aphrodite-engine */
  tool_url: string
  rating: number
}

export function ratingReceivedConfirmation(args: RatingReceivedConfirmationArgs) {
  const safeName = escapeHtml(args.tool_name)
  const safeToolUrl = escapeHtml(args.tool_url)
  const ratingClamped = Math.max(1, Math.min(5, Math.round(args.rating)))
  const stars = '★'.repeat(ratingClamped) + '☆'.repeat(5 - ratingClamped)
  const subject = 'Your rating on BuilderAI is live'

  const content = `
      <h1>Your rating is posted</h1>
      <p>Thanks for rating <strong>${safeName}</strong>. Your review is now visible on the listing.</p>
      <div class="meta">
        <strong>Tool:</strong> ${safeName}<br>
        <strong>Your rating:</strong> ${stars} (${ratingClamped} of 5)
      </div>
      <p style="margin-top: 18px;">
        <a class="button" href="${safeToolUrl}">View the listing</a>
      </p>
      <h2>Manage your ratings</h2>
      <p>You are signed in for 24 hours. If you want to edit or remove this rating later, visit your profile.</p>
      <p style="margin-top: 14px;">
        <a class="button" href="${EMAIL_CONSTANTS.SITE_URL}/profile">Open your profile</a>
      </p>
  `

  const html = renderEmailLayout({
    content,
    preheader: `Your rating of ${args.tool_name} is now live on BuilderAI.`,
  })

  return { subject, html }
}
