// Public surface of the email module.
//
// Import the helpers and templates from one place:
//   import { sendEmail, notifyAdmins, magicLinkLogin } from '@/lib/email'
//
// Heavier templates can also be deep-imported from '@/lib/email/templates/<name>'
// if a caller wants to avoid pulling all six into their bundle.

export { sendEmail, notifyAdmins, getAdminEmails, _resetAdminEmailsCacheForTesting } from './send'
export type { SendEmailArgs, SendEmailResult } from './send'
export { renderEmailLayout, escapeHtml, EMAIL_CONSTANTS, DO_NOT_REPLY_FOOTER } from './layout'

export { submissionReceived } from './templates/submission_received'
export type { SubmissionReceivedArgs } from './templates/submission_received'

export { submissionAdminNotification } from './templates/submission_admin_notification'
export type { SubmissionAdminNotificationArgs } from './templates/submission_admin_notification'

export { submissionApprovedWithClaim } from './templates/submission_approved_with_claim'
export type { SubmissionApprovedWithClaimArgs } from './templates/submission_approved_with_claim'

export { submissionRejected } from './templates/submission_rejected'
export type { SubmissionRejectedArgs } from './templates/submission_rejected'

export { magicLinkLogin } from './templates/magic_link_login'
export type { MagicLinkLoginArgs, MagicLinkVariant } from './templates/magic_link_login'

export { ratingReceivedConfirmation } from './templates/rating_received_confirmation'
export type { RatingReceivedConfirmationArgs } from './templates/rating_received_confirmation'
