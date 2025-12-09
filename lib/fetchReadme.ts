/**
 * Fetches README content from GitHub raw URL
 * Used for server-side rendering
 */
export async function fetchReadme(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      // Cache for 1 hour, revalidate on demand
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.statusText}`)
    }
    
    return await response.text()
  } catch (error) {
    console.error('Error fetching README:', error)
    throw error
  }
}

/**
 * Extracts excerpt from markdown content (first paragraph)
 */
export function extractExcerpt(markdown: string, maxLength: number = 160): string {
  // Remove markdown syntax and get first paragraph
  const plainText = markdown
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
    .trim()
    .split('\n\n')[0] // Get first paragraph
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).trim() + '...'
}

