// Sent to the visitor who just submitted a tool through /submit.

import { renderEmailLayout, escapeHtml, EMAIL_CONSTANTS } from '../layout'

export interface SubmissionReceivedArgs {
  tool_name: string
}

export function submissionReceived(args: SubmissionReceivedArgs) {
  const safeName = escapeHtml(args.tool_name)
  const subject = `We received your BuilderAI submission: ${args.tool_name}`

  const content = `
      <h1>Thanks for the submission</h1>
      <p>We received your submission for <strong>${safeName}</strong>. Our team reviews submissions within 48 hours.</p>
      <p>If we approve your tool, you will get a follow-up email with a link that signs you in for 24 hours and lets you claim and edit the listing. If we have questions or need clarification, we will reply to this email thread.</p>
      <p style="margin-top: 22px;">
        <a class="button" href="${EMAIL_CONSTANTS.SITE_URL}/submit">Submit another tool</a>
      </p>
  `

  const html = renderEmailLayout({
    content,
    preheader: `Thanks for submitting ${args.tool_name}. We review within 48 hours.`,
  })

  return { subject, html }
}
