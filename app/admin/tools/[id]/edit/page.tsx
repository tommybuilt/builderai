import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ToolForm } from '../../ToolForm'
import { DeleteToolButton } from './DeleteToolButton'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditToolPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: tool }, { data: categories }] = await Promise.all([
    supabase.from('tools').select('*').eq('id', id).single(),
    supabase.from('categories').select('*').order('name'),
  ])

  if (!tool) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <a href="/admin/tools" className="text-sm text-zinc-400 hover:text-white">
          ← Back to Tools
        </a>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Tool: {tool.name}</h1>
        <DeleteToolButton toolId={tool.id} toolName={tool.name} />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <ToolForm tool={tool} categories={categories || []} />
      </div>
    </div>
  )
}
