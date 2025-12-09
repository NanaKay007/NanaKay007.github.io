import { useMemo } from 'react'
import PostCard from './PostCard'

function HomePage({ posts, onPostClick, onPageChange }) {
  const recentPosts = useMemo(() => {
    return posts.slice(0, 6)
  }, [posts])

  return (
    <div id="home-page" className="page active">
      <div className="hero">
        <div className="hero-layout">
          <div className="hero-content">
            <h1>Hi, I'm Nana</h1>
            <p className="hero-subtitle">Software Engineer</p>
            <p className="hero-description">
              I explore intelligent systems, applied machine learning, robotics integration,
              and the craft of explaining complex ideas clearly. This space is where I document
              experiments, share lessons learned, and publish hands-on guides.
            </p>
            <div className="hero-buttons">
              <a
                href="https://linkedin.com/in/anikuabenana"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Connect on LinkedIn
              </a>
              <button
                className="btn btn-secondary"
                onClick={() => onPageChange('posts')}
              >
                Read the blog
              </button>
            </div>
          </div>
          <div className="hero-photo">
            <div className="photo-frame">
              <img src="/IMG_9532.jpeg" alt="Nana - Profile photo" />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="work-section">
          <div className="section-header">
            <h2>Work Experience</h2>
          </div>
          <div className="work-timeline">
            <div className="work-item">
              <div className="work-year">Present</div>
              <div className="work-content">
                <h3 className="work-role">AI & Robotics Engineering</h3>
                <p className="work-desc">
                  Building intelligent systems that pair computer vision, control, and machine
                  learning to solve real-world automation problems.
                </p>
              </div>
            </div>
            <div className="work-item">
              <div className="work-year">Ongoing</div>
              <div className="work-content">
                <h3 className="work-role">Technical Writing & Enablement</h3>
                <p className="work-desc">
                  Translating complex AI/Robotics concepts into clear guides, documenting
                  architectures, and creating learning resources for practitioners.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-posts">
          {
            recentPosts.length > 0 &&
            <>
              <div className="section-header">
                <h2>Recent Posts</h2>
              </div>
              <div className="posts-grid">
                {recentPosts.map(post => (
                  <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage

