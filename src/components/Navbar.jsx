function Navbar({ currentPage, onPageChange }) {
  const handleClick = (e, page) => {
    e.preventDefault()
    onPageChange(page)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo"></h1>
        <ul className="nav-menu">
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'posts' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, 'posts')}
            >
              All Posts
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

