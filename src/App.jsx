import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import PostsPage from './components/PostsPage'
import PostViewPage from './components/PostViewPage'
import Footer from './components/Footer'
import { blogPosts } from './data/blogPosts'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedPostId, setSelectedPostId] = useState(null)
  const posts = blogPosts // Use hardcoded blog posts

  // Add/remove class on body for homepage split screen effect
  useEffect(() => {
    if (currentPage === 'home') {
      document.body.classList.add('homepage-active')
    } else {
      document.body.classList.remove('homepage-active')
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('homepage-active')
    }
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedPostId(null)
  }

  const handlePostClick = (postId) => {
    setSelectedPostId(postId)
    setCurrentPage('post-view')
  }

  return (
    <>
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      
      {currentPage === 'home' && (
        <HomePage posts={posts} onPostClick={handlePostClick} onPageChange={handlePageChange} />
      )}
      
      {currentPage === 'posts' && (
        <PostsPage posts={posts} onPostClick={handlePostClick} onPageChange={handlePageChange} />
      )}
      
      {currentPage === 'post-view' && selectedPostId && (
        <PostViewPage postId={selectedPostId} onPageChange={handlePageChange} />
      )}
      
      <Footer />
    </>
  )
}

export default App

