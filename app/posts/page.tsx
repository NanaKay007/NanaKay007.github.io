'use client'

import { useState, useMemo } from 'react'
import { getAllPosts, type BlogPost } from '@/lib/blogPosts'
import PostCard from '@/components/PostCard'

export default function PostsPage() {
  const allPosts = getAllPosts()
  const [filter, setFilter] = useState<'all' | 'AI' | 'Robotics'>('all')

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return allPosts
    return allPosts.filter(post => post.category === filter)
  }, [allPosts, filter])

  return (
    <div id="posts-page" className="page active">
      <div className="page-header">
        <h1>All Blog Posts</h1>
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'AI' ? 'active' : ''}`}
            onClick={() => setFilter('AI')}
          >
            AI
          </button>
          <button 
            className={`filter-btn ${filter === 'Robotics' ? 'active' : ''}`}
            onClick={() => setFilter('Robotics')}
          >
            Robotics
          </button>
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <p>No posts found.</p>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

