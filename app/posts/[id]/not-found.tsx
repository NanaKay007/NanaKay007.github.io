import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page active">
      <div className="post-view-container">
        <Link href="/posts" className="back-btn">
          ← Back to Posts
        </Link>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link href="/posts" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

