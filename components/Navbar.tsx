'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  // Add/remove class on body for homepage split screen effect
  useEffect(() => {
    if (isHomepage) {
      document.body.classList.add('homepage-active')
    } else {
      document.body.classList.remove('homepage-active')
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('homepage-active')
    }
  }, [isHomepage])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo"></h1>
        <ul className="nav-menu">
          <li>
            <Link 
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/posts"
              className={`nav-link ${pathname === '/posts' ? 'active' : ''}`}
            >
              All Posts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

