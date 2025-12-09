const STORAGE_KEY = 'tech_blog_posts'

export function getPosts() {
  const postsJson = localStorage.getItem(STORAGE_KEY)
  return postsJson ? JSON.parse(postsJson) : []
}

export function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function getPostById(id) {
  const posts = getPosts()
  return posts.find(post => post.id === id)
}

