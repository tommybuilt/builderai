import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none
      prose-headings:text-white prose-headings:font-bold
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white
      prose-code:text-primary-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg prose-pre:p-4
      prose-ul:text-zinc-300 prose-ol:text-zinc-300
      prose-li:text-zinc-300 prose-li:mb-1
      prose-blockquote:border-primary-500 prose-blockquote:text-zinc-400
      prose-hr:border-zinc-800
      prose-img:rounded-lg
      prose-table:text-zinc-300
      prose-th:text-white prose-th:border-zinc-700
      prose-td:border-zinc-800
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
