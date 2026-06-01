import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Email notification handler using Resend HTTP API
// This endpoint can be called by Supabase webhooks or directly
// API key loaded from environment variable. Never hardcode secrets.

interface NotificationPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Record<string, unknown>
  old_record?: Record<string, unknown>
  // Optional secret for webhook verification
  secret?: string
}

interface ResendEmailPayload {
  from: string
  to: string | string[]
  subject: string
  html: string
}

// Send email via Resend HTTP API (works on Cloudflare Workers)
async function sendResendEmail(payload: ResendEmailPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: `Resend API error: ${response.status} ${JSON.stringify(errorData)}` }
    }

    const data = await response.json()
    return { success: true, id: data.id }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: NotificationPayload = await request.json()
    
    // Verify webhook secret if configured
    const webhookSecret = process.env.NOTIFICATION_WEBHOOK_SECRET
    if (webhookSecret && payload.secret !== webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    
    // Get admin notification emails
    const { data: adminPrefs } = await supabase
      .from('notification_preferences')
      .select('email')
      .eq('is_admin_notification', true)
    
    const adminEmails = adminPrefs?.map(p => p.email) || []
    
    // Add fallback admin email from env
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
    if (adminEmail && !adminEmails.includes(adminEmail)) {
      adminEmails.push(adminEmail)
    }

    if (adminEmails.length === 0) {
      console.log('No notification recipients configured')
      return NextResponse.json({ message: 'No recipients configured' })
    }

    // Build notification message based on event type
    const notification = buildNotification(payload)
    
    // Send email notifications via Resend
    const emailResults = await sendEmailNotifications(adminEmails, notification)
    
    // Log the notification
    console.log(`[DB Activity] ${payload.type} on ${payload.table}:`, {
      recordId: payload.record?.id,
      timestamp: new Date().toISOString(),
      recipients: adminEmails.length
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Notifications sent',
      recipients: adminEmails.length,
      emailResults
    })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    )
  }
}

function buildNotification(payload: NotificationPayload) {
  const { type, table, record, old_record } = payload
  const timestamp = new Date().toLocaleString()
  
  let subject = ''
  let body = ''
  
  switch (table) {
    case 'tools':
      if (type === 'INSERT') {
        subject = `🔧 New Tool Added: ${record.name}`
        body = `
          <h2>New Tool Added</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Description:</strong> ${record.short_description}</p>
          <p><strong>Website:</strong> ${record.website_url || 'N/A'}</p>
          <p><strong>GitHub:</strong> ${record.github_url || 'N/A'}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
        `
      } else if (type === 'UPDATE') {
        subject = `📝 Tool Updated: ${record.name}`
        body = `
          <h2>Tool Updated</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
          <p><strong>Changes:</strong></p>
          <pre>${JSON.stringify(getChanges(old_record, record), null, 2)}</pre>
        `
      } else {
        subject = `🗑️ Tool Deleted: ${old_record?.name || 'Unknown'}`
        body = `
          <h2>Tool Deleted</h2>
          <p><strong>Name:</strong> ${old_record?.name}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
        `
      }
      break
      
    case 'submissions':
      if (type === 'INSERT') {
        subject = `📬 New Tool Submission: ${record.submitted_name}`
        body = `
          <h2>New Submission Received</h2>
          <p><strong>Name:</strong> ${record.submitted_name}</p>
          <p><strong>Description:</strong> ${record.submitted_description}</p>
          <p><strong>URL:</strong> ${record.submitted_url || 'N/A'}</p>
          <p><strong>GitHub:</strong> ${record.submitted_github_url || 'N/A'}</p>
          <p><strong>Submitter Email:</strong> ${record.submitter_email || 'Anonymous'}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/submissions">Review Submission →</a></p>
        `
      } else if (type === 'UPDATE') {
        subject = `📋 Submission Updated: ${record.submitted_name}`
        body = `
          <h2>Submission Status Changed</h2>
          <p><strong>Name:</strong> ${record.submitted_name}</p>
          <p><strong>Status:</strong> ${old_record?.status} → ${record.status}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
        `
      }
      break
      
    case 'reviews':
      if (type === 'INSERT') {
        subject = `⭐ New Review (${record.rating}/5)`
        body = `
          <h2>New Review Submitted</h2>
          <p><strong>Rating:</strong> ${'★'.repeat(record.rating as number)}${'☆'.repeat(5 - (record.rating as number))}</p>
          <p><strong>Comment:</strong> ${record.comment || 'No comment'}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
        `
      }
      break
      
    case 'categories':
      subject = `📁 Category ${type.toLowerCase()}: ${record?.name || old_record?.name}`
      body = `
        <h2>Category ${type}</h2>
        <p><strong>Name:</strong> ${record?.name || old_record?.name}</p>
        <p><strong>Time:</strong> ${timestamp}</p>
      `
      break
      
    default:
      subject = `🔔 Database Activity: ${type} on ${table}`
      body = `
        <h2>Database Activity</h2>
        <p><strong>Table:</strong> ${table}</p>
        <p><strong>Operation:</strong> ${type}</p>
        <p><strong>Time:</strong> ${timestamp}</p>
        <pre>${JSON.stringify(record, null, 2)}</pre>
      `
  }
  
  return { subject, body }
}

function getChanges(oldRecord: Record<string, unknown> | undefined, newRecord: Record<string, unknown>) {
  if (!oldRecord) return newRecord
  
  const changes: Record<string, { old: unknown; new: unknown }> = {}
  
  for (const key of Object.keys(newRecord)) {
    if (JSON.stringify(oldRecord[key]) !== JSON.stringify(newRecord[key])) {
      changes[key] = {
        old: oldRecord[key],
        new: newRecord[key]
      }
    }
  }
  
  return changes
}

async function sendEmailNotifications(
  emails: string[], 
  notification: { subject: string; body: string }
) {
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.log('Resend API key not configured, skipping email notifications')
    console.log('Would have sent:', { to: emails, subject: notification.subject })
    return { skipped: true, reason: 'RESEND_API_KEY not configured' }
  }
  
  // Resend requires a verified sender domain
  // Use your verified sender email (e.g., noreply@builderai.tools)
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@builderai.tools'
  const results = []
  
  for (const email of emails) {
    const result = await sendResendEmail({
      from: `BuilderAI Notifications <${fromEmail}>`,
      to: email,
      subject: notification.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
            pre { background: #f4f4f5; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 12px; }
            a { color: #3b82f6; }
            strong { color: #1a1a1a; }
          </style>
        </head>
        <body>
          ${notification.body}
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e4e4e7;">
          <p style="font-size: 12px; color: #71717a;">
            This notification was sent from BuilderAI.tools database monitoring.
          </p>
        </body>
        </html>
      `
    })
    
    results.push({ email, ...result })
  }
  
  return results
}

// GET endpoint to check notification status
export async function GET() {
  const hasResendKey = !!process.env.RESEND_API_KEY
  const hasWebhookSecret = !!process.env.NOTIFICATION_WEBHOOK_SECRET
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@builderai.tools'
  
  return NextResponse.json({
    configured: hasResendKey,
    resendConfigured: hasResendKey,
    webhookSecured: hasWebhookSecret,
    adminEmailSet: !!adminEmail,
    fromEmail: fromEmail,
    message: hasResendKey
      ? 'Resend email notifications are configured' 
      : 'Set RESEND_API_KEY to enable email notifications'
  })
}
