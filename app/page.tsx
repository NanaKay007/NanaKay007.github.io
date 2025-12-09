import Link from 'next/link'
import { getAllPosts } from '@/lib/blogPosts'
import { getAllWorkExperiences } from '@/lib/workExperience'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 6)
  const workExperiences = getAllWorkExperiences()

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
              <Link
                href="/posts"
                className="btn btn-secondary"
              >
                Read the blog
              </Link>
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
            {workExperiences.map((experience) => (
              <div key={experience.id} className="work-item">
                <div className="work-year">{experience.year}</div>
                <div className="work-content">
                  <h3 className="work-role">{experience.role}</h3>
                  <p className="work-company">{experience.company}</p>
                  <p className="work-desc">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {recentPosts.length > 0 && (
          <div className="recent-posts">
            <div className="section-header">
              <h2>Recent Posts</h2>
            </div>
            <div className="posts-grid">
              {recentPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

