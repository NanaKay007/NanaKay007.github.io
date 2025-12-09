function PostCard({ post, onClick }) {
  return (
    <div className="post-card" onClick={onClick}>
      {post.previewImage && (
        <div className="post-card-image">
          <img src={post.previewImage} alt={post.title} />
        </div>
      )}
      <div className="post-card-content">
        <div className="post-card-header">
          <span className="post-category">{post.category}</span>
        </div>
        <h3>{post.title}</h3>
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard

