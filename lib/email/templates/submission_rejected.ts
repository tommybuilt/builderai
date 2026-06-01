// Sent to the submitter when an admin rejects their tool submission.

import { renderEmailLayout, escapeHtml, EMAIL_CONSTANTS } from '../layout'

export interface SubmissionRejectedArgs {
  tool_name: string
  /** Optional admin note from submissions.admin_notes. */
  admin_notes?: string | null
}

export function submissionRejected(args: SubmissionRejectedArgs) {
  const safeName = escapeHtml(args.tool_name)
  const safeNotes = args.admin_notes ? escapeHtml(args.admin_notes) : null
  const subject = `BuilderAI submission update: ${args.tool_name}`

  const content = `
      <h1>Submission update</h1>
      <p>Thanks for submitting <strong>${safeName}</strong> to BuilderAI. After review, we are not able to add this listing to the directory at this time.</p>
      ${safeNotes ? `<h2>Reviewer note</h2><div class="meta">${safeNotes}</div>` : ''}
      <p>If you have a different open-source AI tool to suggest, we would still love to see it.</p>
      <p style="margin-top: 22px;">
        <a class="button" href="${EMAIL_CONSTANTS.SITE_URL}/submit">Submit another tool</a>
      </p>
  `

  const html = renderEmailLayout({
    content,
    preheader: `Update on your BuilderAI submission of ${args.tool_name}.`,
  })

  return { subject, html }
}
