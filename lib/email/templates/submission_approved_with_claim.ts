// Sent to the submitter when an admin approves their tool submission.
//
// Two shapes:
// - With claim_url: includes a "Claim and manage your listing" section that
//   links to the magic-link verifier. Clicking it signs the submitter in and
//   lands them on /profile?claim=<tool_id>.
// - Without claim_url (null/undefined): the email celebrates the listing
//   going live and omits the claim section entirely. The submitter can
//   request a fresh claim link later via the /api/auth/magic-link 'claim'
//   intent if they want to take ownership.

import { renderEmailLayout, escapeHtml, EMAIL_CONSTANTS } from '../layout'

export interface SubmissionApprovedWithClaimArgs {
  tool_name: string
  /** Public listing URL, e.g. https://builderai.tools/tool/aphrodite-engine */
  tool_url: string
  /**
   * Magic-link URL pointing at /auth/confirm. Required for the claim
   * section to render. If `null` or `undefined`, the email omits the
   * claim CTA. generateAuthLink failures at approval time produce this
   * shape; the submitter can request a claim link later.
   */
  claim_url?: string | null
}

export function submissionApprovedWithClaim(args: SubmissionApprovedWithClaimArgs) {
  const safeName = escapeHtml(args.tool_name)
  const safeToolUrl = escapeHtml(args.tool_url)
  const subject = `${args.tool_name} is now live on BuilderAI`

  const claimSection = args.claim_url
    ? (() => {
        const safeClaimUrl = escapeHtml(args.claim_url as string)
        return `
      <h2>Claim and manage your listing</h2>
      <p>Click the link below to claim ownership of this listing. You can edit the description, links, and tags after claiming.</p>
      <p style="margin-top: 14px;">
        <a class="button" href="${safeClaimUrl}">Claim ${safeName}</a>
      </p>
      <p style="font-size: 13px; color: #71717a; margin-top: 16px;">This sign-in link is single-use and expires in 1 hour. No password is needed; click the button and you are signed in. If the button does not work, paste this URL into your browser:</p>
      <p style="font-size: 12px; color: #71717a; word-break: break-all;"><a href="${safeClaimUrl}">${safeClaimUrl}</a></p>
      <p style="margin-top: 22px;">If you did not submit this tool, ignore this email and the listing will remain unclaimed.</p>
        `
      })()
    : `
      <p style="margin-top: 16px;">If you would like to claim and manage this listing, request a sign-in link from the contact form on the site or reply to this email.</p>
    `

  const content = `
      <h1>${safeName} is live</h1>
      <p>Your submission has been approved and is now published in the BuilderAI directory.</p>
      <p style="margin-top: 18px;">
        <a class="button" href="${safeToolUrl}">View the listing</a>
      </p>
      ${claimSection}
  `

  const preheader = args.claim_url
    ? `${args.tool_name} is approved. Click to claim and manage the listing.`
    : `${args.tool_name} is approved and live on BuilderAI.`

  const html = renderEmailLayout({ content, preheader })

  return { subject, html }
}

// Reference exports kept so that EMAIL_CONSTANTS isn't tree-shaken from layout.
export { EMAIL_CONSTANTS }
