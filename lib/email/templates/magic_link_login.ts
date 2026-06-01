// Sent for three sign-in intents: admin sign-in, rating verification, and
// tool claim continuation. Subject and body adjust based on the variant.

import { renderEmailLayout, escapeHtml } from '../layout'

export type MagicLinkVariant = 'admin' | 'rating' | 'claim'

export interface MagicLinkLoginArgs {
  variant: MagicLinkVariant
  magic_link_url: string
  /** Required when variant is 'claim' or 'rating' (used in the body copy). */
  tool_name?: string
}

interface VariantCopy {
  subject: string
  preheader: string
  heading: string
  intro: string
  cta: string
  followup: string
}

function variantCopy(args: MagicLinkLoginArgs): VariantCopy {
  const toolName = args.tool_name ? escapeHtml(args.tool_name) : null

  switch (args.variant) {
    case 'admin':
      return {
        subject: 'Sign in to BuilderAI Admin',
        preheader: 'Single-use sign-in link for the BuilderAI admin panel.',
        heading: 'Sign in to BuilderAI',
        intro: 'Click the button below to sign in. The link is single-use and expires in 1 hour.',
        cta: 'Sign in',
        followup: 'After signing in you will land in the admin panel.',
      }
    case 'rating':
      return {
        subject: 'Confirm your rating on BuilderAI',
        preheader: toolName ? `Confirm your rating of ${toolName}.` : 'Confirm your rating on BuilderAI.',
        heading: 'Confirm your rating',
        intro: toolName
          ? `Click the button below to confirm and post your rating of <strong>${toolName}</strong>.`
          : 'Click the button below to confirm and post your rating.',
        cta: 'Confirm rating',
        followup:
          'The link is single-use and expires in 24 hours. After clicking, your rating posts and you will be signed in so you can edit or remove it from your profile later.',
      }
    case 'claim':
      return {
        subject: toolName ? `Claim and manage ${args.tool_name}` : 'Claim your tool listing on BuilderAI',
        preheader: toolName
          ? `Claim and manage your ${toolName} listing on BuilderAI.`
          : 'Claim your tool listing on BuilderAI.',
        heading: toolName ? `Claim ${toolName}` : 'Claim your listing',
        intro: toolName
          ? `Click the button below to claim ownership of <strong>${toolName}</strong>. After claiming, you can edit the description, links, and tags.`
          : 'Click the button below to claim ownership of your tool listing.',
        cta: 'Claim listing',
        followup:
          'The link is single-use and expires in 24 hours. No password is needed.',
      }
  }
}

export function magicLinkLogin(args: MagicLinkLoginArgs) {
  const safeUrl = escapeHtml(args.magic_link_url)
  const copy = variantCopy(args)

  const content = `
      <h1>${copy.heading}</h1>
      <p>${copy.intro}</p>
      <p style="margin-top: 22px;">
        <a class="button" href="${safeUrl}">${copy.cta}</a>
      </p>
      <p style="font-size: 13px; color: #71717a; margin-top: 18px;">${copy.followup}</p>
      <p style="font-size: 12px; color: #71717a; margin-top: 18px;">If the button does not work, paste this URL into your browser:</p>
      <p style="font-size: 12px; color: #71717a; word-break: break-all;"><a href="${safeUrl}">${safeUrl}</a></p>
      <p style="margin-top: 22px;">If you did not request this link, you can safely ignore this email. No action will be taken.</p>
  `

  const html = renderEmailLayout({ content, preheader: copy.preheader })

  return { subject: copy.subject, html }
}
