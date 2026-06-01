import { createClient } from '@/lib/supabase/server'
import { ToolForm } from '../ToolForm'

export const dynamic = 'force-dynamic'

export default async function NewToolPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <a href="/admin/tools" className="text-sm text-zinc-400 hover:text-white">
          ← Back to Tools
        </a>
      </div>

      <h1 className="text-2xl font-bold text-white mb-8">Add New Tool</h1>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <ToolForm categories={categories || []} />
      </div>
    </div>
  )
}
