import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DeleteBlogPostButton } from './DeleteBlogPostButton'

export const dynamic = 'force-dynamic'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminBlogPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, author_name, published_at, is_published')
    .order('published_at', { ascending: false })

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <p className="text-red-400">Failed to load blog posts: {error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-zinc-400 mt-1">
            {posts?.length || 0} post{(posts?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500">No posts yet</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-white font-medium hover:text-primary-400 transition-colors"
                        target="_blank"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-zinc-500 mt-0.5 font-mono">{post.slug}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-zinc-400">{post.author_name}</td>
                    <td className="px-6 py-3 text-sm text-zinc-400">{formatDate(post.published_at)}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          post.is_published
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
                        }`}
                      >
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <DeleteBlogPostButton id={post.id} title={post.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
