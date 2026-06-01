'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Server action invoked by EditToolForm.tsx.
//
// Re-validates ownership before applying any change. Allowed fields are
// exactly: description, short_description, website_url, docs_url, tags.
// Anything else in the form data is ignored. Slug, name, status, featured,
// claimed_by_user_id, etc. are NOT editable from this form.

export interface EditActionResult {
  error?: string
}

interface EditableUpdate {
  description: string
  short_description: string
  website_url: string | null
  docs_url: string | null
  tags: string[]
}

function validateUrlOrEmpty(input: string): string | false {
  const trimmed = input.trim()
  if (!trimmed) return ''
  try {
    const u = new URL(trimmed)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false
    return trimmed
  } catch {
    return false
  }
}

export async function updateTool(
  slug: string,
  _prevState: EditActionResult | null,
  formData: FormData,
): Promise<EditActionResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be signed in to edit a tool.' }
  }

  const { data: toolRow, error: toolError } = await supabase
    .from('tools')
    .select('id, slug, claimed_by_user_id')
    .eq('slug', slug)
    .maybeSingle()

  if (toolError || !toolRow) {
    return { error: 'Tool not found.' }
  }

  const tool = toolRow as unknown as {
    id: string
    slug: string
    claimed_by_user_id: string | null
  }

  if (tool.claimed_by_user_id !== user.id) {
    return { error: 'You do not have permission to edit this tool.' }
  }

  const description = (formData.get('description')?.toString() ?? '').slice(0, 4000).trim()
  const short_description = (formData.get('short_description')?.toString() ?? '').slice(0, 200).trim()
  const websiteUrlRaw = formData.get('website_url')?.toString() ?? ''
  const docsUrlRaw = formData.get('docs_url')?.toString() ?? ''
  const tagsRaw = formData.get('tags')?.toString() ?? ''

  if (!description) {
    return { error: 'Description is required.' }
  }
  if (!short_description) {
    return { error: 'Short description is required.' }
  }

  const website = validateUrlOrEmpty(websiteUrlRaw)
  if (website === false) {
    return { error: 'Website URL must be a valid http or https URL.' }
  }
  const docs = validateUrlOrEmpty(docsUrlRaw)
  if (docs === false) {
    return { error: 'Docs URL must be a valid http or https URL.' }
  }

  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 20)

  const update: EditableUpdate = {
    description,
    short_description,
    website_url: website || null,
    docs_url: docs || null,
    tags,
  }

  const { error: updateError } = await supabase
    .from('tools')
    .update(update as never)
    .eq('id', tool.id)

  if (updateError) {
    console.error('[edit-tool] update failed: ' + updateError.message)
    return { error: "Couldn't save. Try again." }
  }

  revalidatePath('/profile')
  revalidatePath('/tool/' + tool.slug)
  redirect('/profile?edit_status=saved')
}
