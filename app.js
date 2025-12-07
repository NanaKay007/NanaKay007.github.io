// Blog Post Storage
const STORAGE_KEY = 'tech_blog_posts';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadRecentPosts();
    loadAllPosts();
    setupEditorPreview();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Load content for specific pages
    if (pageName === 'posts') {
        loadAllPosts();
    }
}

// Blog Post Management
function getPosts() {
    const postsJson = localStorage.getItem(STORAGE_KEY);
    return postsJson ? JSON.parse(postsJson) : [];
}

function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function savePost() {
    const title = document.getElementById('post-title').value.trim();
    const category = document.getElementById('post-category').value;
    const tags = document.getElementById('post-tags').value.split(',').map(t => t.trim()).filter(t => t);
    const content = document.getElementById('post-content').value.trim();
    
    if (!title || !content) {
        alert('Please fill in both title and content!');
        return;
    }
    
    const posts = getPosts();
    const newPost = {
        id: generateId(),
        title,
        category,
        tags,
        content,
        date: new Date().toISOString(),
        excerpt: content.substring(0, 150) + (content.length > 150 ? '...' : '')
    };
    
    posts.unshift(newPost); // Add to beginning
    savePosts(posts);
    
    alert('Post published successfully!');
    clearEditor();
    showPage('posts');
    loadAllPosts();
    loadRecentPosts();
}

function clearEditor() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-category').value = 'AI';
    document.getElementById('post-tags').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('preview-content').innerHTML = '';
}

function loadRecentPosts() {
    const posts = getPosts();
    const recentPosts = posts.slice(0, 6); // Show 6 most recent
    const container = document.getElementById('recent-posts-container');
    
    if (recentPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No posts yet. Start writing!</p>';
        return;
    }
    
    container.innerHTML = recentPosts.map(post => createPostCard(post)).join('');
    
    // Add click handlers
    container.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
            const postId = card.getAttribute('data-id');
            viewPost(postId);
        });
    });
}

function loadAllPosts(filterCategory = 'all') {
    const posts = getPosts();
    let filteredPosts = posts;
    
    if (filterCategory !== 'all') {
        filteredPosts = posts.filter(post => post.category === filterCategory);
    }
    
    const container = document.getElementById('posts-container');
    const noPosts = document.getElementById('no-posts');
    
    if (filteredPosts.length === 0) {
        container.style.display = 'none';
        noPosts.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    noPosts.style.display = 'none';
    container.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
    
    // Add click handlers
    container.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
            const postId = card.getAttribute('data-id');
            viewPost(postId);
        });
    });
}

function createPostCard(post) {
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const tagsHtml = post.tags.map(tag => 
        `<span class="post-tag">${escapeHtml(tag)}</span>`
    ).join('');
    
    return `
        <div class="post-card" data-id="${post.id}">
            <div class="post-card-header">
                <span class="post-category">${escapeHtml(post.category)}</span>
                <span class="post-date">${date}</span>
            </div>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
            <div class="post-tags">${tagsHtml}</div>
        </div>
    `;
}

function viewPost(postId) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        alert('Post not found!');
        return;
    }
    
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const tagsHtml = post.tags.map(tag => 
        `<span class="post-tag">${escapeHtml(tag)}</span>`
    ).join('');
    
    const htmlContent = marked.parse(post.content);
    
    const postHtml = `
        <header>
            <h1>${escapeHtml(post.title)}</h1>
            <div class="post-meta">
                <span class="post-category">${escapeHtml(post.category)}</span>
                <span>•</span>
                <span>${date}</span>
            </div>
            <div class="post-tags" style="margin-top: 1rem;">${tagsHtml}</div>
        </header>
        <div class="post-content">${htmlContent}</div>
    `;
    
    document.getElementById('post-view-content').innerHTML = postHtml;
    showPage('post-view');
}

function filterPosts(category) {
    // Show posts page first
    showPage('posts');
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.trim();
        if ((category === 'all' && btnText === 'All') || 
            (category === 'AI' && btnText === 'AI') || 
            (category === 'Robotics' && btnText === 'Robotics')) {
            btn.classList.add('active');
        }
    });
    
    loadAllPosts(category);
}

// Editor Preview
function setupEditorPreview() {
    const contentInput = document.getElementById('post-content');
    const preview = document.getElementById('preview-content');
    
    if (contentInput && preview) {
        contentInput.addEventListener('input', () => {
            const markdown = contentInput.value;
            preview.innerHTML = marked.parse(markdown || '*Start typing to see preview...*');
        });
    }
}

// Utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

