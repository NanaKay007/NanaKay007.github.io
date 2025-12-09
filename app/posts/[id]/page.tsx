import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostById, getAllPosts } from '@/lib/blogPosts'
import { fetchReadme, extractExcerpt } from '@/lib/fetchReadme'
import { renderMarkdown } from '@/lib/markdown'

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate static params for all posts (for static generation)
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = getPostById(id)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Fetch README to extract excerpt for description
  let description = post.title
  try {
    const readme = await fetchReadme(post.githubReadmeUrl)
    description = extractExcerpt(readme)
  } catch (error) {
    // Fallback to title if fetch fails
    console.error('Error fetching README for metadata:', error)
  }

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [
        {
          url: post.previewImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: new Date().toISOString(), // You can add date to blogPosts if needed
      authors: ['Nana'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.previewImage],
    },
    keywords: [...post.tags, post.category],
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = getPostById(id)

  if (!post) {
    notFound()
  }

  // Fetch README content on the server
  let readmeContent = ''
  let htmlContent = ''
  let error: string | null = null

  try {
    readmeContent = await fetchReadme(post.githubReadmeUrl)
    htmlContent = renderMarkdown(readmeContent)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch README content'
    console.error('Error fetching README:', err)
  }

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.previewImage,
    datePublished: new Date().toISOString(), // Add actual date to blogPosts if needed
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Nana',
    },
    publisher: {
      '@type': 'Person',
      name: 'Nana',
    },
    description: extractExcerpt(readmeContent || ''),
    articleSection: post.category,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div id="post-view-page" className="page active">
        <div className="post-view-container">
          <Link href="/posts" className="back-btn">
            ← Back to Posts
          </Link>
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
            {error ? (
              <div style={{ padding: '2rem', color: 'var(--error-color, #d32f2f)' }}>
                <p>Error loading README: {error}</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  URL: <a href={post.githubReadmeUrl} target="_blank" rel="noopener noreferrer">{post.githubReadmeUrl}</a>
                </p>
              </div>
            ) : htmlContent ? (
              <div className="post-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading README content...</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}

