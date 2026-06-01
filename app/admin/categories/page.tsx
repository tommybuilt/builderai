import { createClient } from '@/lib/supabase/server'
import { CategoryForm } from './CategoryForm'
import { CategoryList } from './CategoryList'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  // Get tool counts per category
  const { data: toolCounts } = await supabase
    .from('tools')
    .select('category_id')
  
  const countMap: Record<string, number> = {}
  toolCounts?.forEach((t) => {
    if (t.category_id) {
      countMap[t.category_id] = (countMap[t.category_id] || 0) + 1
    }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <p className="text-zinc-400 mt-1">Manage tool categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Add Category</h2>
            <CategoryForm />
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              All Categories ({categories?.length || 0})
            </h2>
            <CategoryList categories={categories || []} toolCounts={countMap} />
          </div>
        </div>
      </div>
    </div>
  )
}
