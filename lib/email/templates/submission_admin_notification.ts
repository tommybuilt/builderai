// Sent to the admin allowlist when a new tool submission arrives.

import { renderEmailLayout, escapeHtml, EMAIL_CONSTANTS } from '../layout'

export interface SubmissionAdminNotificationArgs {
  tool_name: string
  submitter_email: string
  github_url: string | null
  description: string | null
  submission_id: string
}

export function submissionAdminNotification(args: SubmissionAdminNotificationArgs) {
  const subject = `New BuilderAI submission: ${args.tool_name}`

  const safeName = escapeHtml(args.tool_name)
  const safeEmail = escapeHtml(args.submitter_email)
  const safeGithub = args.github_url ? escapeHtml(args.github_url) : null
  const safeDescription = args.description ? escapeHtml(args.description) : null
  const reviewUrl = `${EMAIL_CONSTANTS.SITE_URL}/admin/submissions/${args.submission_id}`

  const content = `
      <h1>New submission to review</h1>
      <p>A new tool submission landed in the queue.</p>
      <div class="meta">
        <strong>Tool:</strong> ${safeName}<br>
        <strong>Submitter:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a>
        ${safeGithub ? `<br><strong>GitHub:</strong> <a href="${safeGithub}">${safeGithub}</a>` : ''}
      </div>
      ${safeDescription ? `<h2>Description</h2><p>${safeDescription}</p>` : ''}
      <p style="margin-top: 22px;">
        <a class="button" href="${reviewUrl}">Review this submission</a>
      </p>
  `

  const html = renderEmailLayout({
    content,
    preheader: `New submission: ${args.tool_name} from ${args.submitter_email}`,
  })

  return { subject, html }
}
