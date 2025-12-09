import { useEffect, useState } from 'react'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.min.css'
import { blogPosts } from '../data/blogPosts'

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

function PostViewPage({ postId, onPageChange }) {
  const [post, setPost] = useState(null)
  const [readmeContent, setReadmeContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Find the post by ID
    const foundPost = blogPosts.find(p => p.id === postId)
    setPost(foundPost)

    if (foundPost && foundPost.githubReadmeUrl) {
      // Fetch the GitHub README content
      setLoading(true)
      setError(null)
      
      fetch(foundPost.githubReadmeUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch README: ${response.statusText}`)
          }
          return response.text()
        })
        .then(markdown => {
          setReadmeContent(markdown)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching README:', err)
          setError(err.message)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [postId])

  if (!post) {
    return (
      <div id="post-view-page" className="page active">
        <div className="post-view-container">
          <button className="back-btn" onClick={() => onPageChange('posts')}>
            ← Back to Posts
          </button>
          <p>Post not found!</p>
        </div>
      </div>
    )
  }

  let htmlContent = ''
  if (readmeContent) {
    htmlContent = marked.parse(readmeContent)
  }

  return (
    <div id="post-view-page" className="page active">
      <div className="post-view-container">
        <button className="back-btn" onClick={() => onPageChange('posts')}>
          ← Back to Posts
        </button>
        <article className="post-article">
          <header>
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-category">{post.category}</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="post-tags" style={{ display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className="post-tag">{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading README content...</p>
            </div>
          )}
          {error && (
            <div style={{ padding: '2rem', color: 'var(--error-color, #d32f2f)' }}>
              <p>Error loading README: {error}</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                URL: <a href={post.githubReadmeUrl} target="_blank" rel="noopener noreferrer">{post.githubReadmeUrl}</a>
              </p>
            </div>
          )}
          {!loading && !error && htmlContent && (
            <div className="post-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </article>
      </div>
    </div>
  )
}

export default PostViewPage

