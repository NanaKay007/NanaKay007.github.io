import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { getPosts, savePosts, generateId } from '../utils/storage'

function EditorPage({ onPostSaved, onPageChange }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('AI')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    const html = marked.parse(content || '*Start typing to see preview...*')
    setPreview(html)
  }, [content])

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content!')
      return
    }

    const posts = getPosts()
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t)
    
    const newPost = {
      id: generateId(),
      title: title.trim(),
      category,
      tags: tagArray,
      content: content.trim(),
      date: new Date().toISOString(),
      excerpt: content.substring(0, 150) + (content.length > 150 ? '...' : '')
    }

    posts.unshift(newPost)
    savePosts(posts)
    
    alert('Post published successfully!')
    handleClear()
    onPostSaved()
  }

  const handleClear = () => {
    setTitle('')
    setCategory('AI')
    setTags('')
    setContent('')
  }

  return (
    <div id="editor-page" className="page">
      <div className="editor-container">
        <div className="editor-header">
          <h1>Write New Post</h1>
          <div className="editor-actions">
            <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
            <button className="btn btn-primary" onClick={handleSave}>Publish</button>
          </div>
        </div>
        <div className="editor-form">
          <div className="form-group">
            <label htmlFor="post-title">Title</label>
            <input 
              type="text" 
              id="post-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..." 
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-category">Category</label>
            <select 
              id="post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="AI">Artificial Intelligence</option>
              <option value="Robotics">Robotics</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="post-tags">Tags (comma-separated)</label>
            <input 
              type="text" 
              id="post-tags" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., machine learning, neural networks, automation" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-content">Content (Markdown supported)</label>
            <div className="editor-wrapper">
              <textarea 
                id="post-content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post here... Markdown is supported!"
              />
              <div className="editor-preview">
                <h4>Preview</h4>
                <div id="preview-content" dangerouslySetInnerHTML={{ __html: preview }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPage

