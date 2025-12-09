// Hardcoded blog posts data
// Each post links to a GitHub README that will be fetched and displayed

export interface BlogPost {
  id: string
  title: string
  previewImage: string
  githubReadmeUrl: string
  category: 'AI' | 'Robotics'
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  // Add more blog posts here following this format:
  // {
  //   id: 'quadrupeds_locomotion',                    // Unique identifier for the post
  //   title: 'Quadrupeds Locomotion',                // Display title
  //   previewImage: 'https://raw.githubusercontent.com/Argo-Robot/quadrupeds_locomotion/main/images/go2.png',        // Preview image URL (from GitHub raw content)
  //   githubReadmeUrl: 'https://raw.githubusercontent.com/Argo-Robot/quadrupeds_locomotion/main/README.md',
  //   category: 'Robotics',               // Category for filtering ('AI' or 'Robotics')
  //   tags: []              // Optional array of tags
  // }
]

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
}

export function getPostsByCategory(category: 'AI' | 'Robotics' | 'all'): BlogPost[] {
  if (category === 'all') return blogPosts
  return blogPosts.filter(post => post.category === category)
}

