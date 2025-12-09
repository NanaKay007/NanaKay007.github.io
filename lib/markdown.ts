import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'

// Configure marked to use KaTeX for math rendering
marked.use(markedKatex({
  throwOnError: false,
  errorColor: '#cc0000',
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false }
  ]
}))

// Configure marked with GitHub Flavored Markdown (includes autolinking URLs)
marked.setOptions({
  gfm: true,
  breaks: true
})

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown)
}

