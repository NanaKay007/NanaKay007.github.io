// Hardcoded blog posts data
// Each post links to a GitHub README that will be fetched and displayed when clicked

export const blogPosts = [
  // Add more blog posts here following this format:
  {
    id: 'unique-id',                    // Unique identifier for the post
    title: 'Post Title',                // Display title
    previewImage: 'https://raw.githubusercontent.com/Argo-Robot/quadrupeds_locomotion/main/images/go2.png',        // Preview image URL (from GitHub raw content)
    githubReadmeUrl: 'https://raw.githubusercontent.com/Argo-Robot/quadrupeds_locomotion/main/README.md',
    category: 'Robotics',               // Category for filtering ('AI' or 'Robotics')
    tags: ['tag1', 'tag2']              // Optional array of tags
  }
  //
  // Example with real GitHub repo:
  // {
  //   id: 'my-project',
  //   title: 'My Awesome Project',
  //   previewImage: 'https://raw.githubusercontent.com/username/repo/main/assets/preview.png',
  //   githubReadmeUrl: 'https://raw.githubusercontent.com/username/repo/main/README.md',
  //   category: 'AI',
  //   tags: ['deep-learning', 'pytorch']
  // }
]

