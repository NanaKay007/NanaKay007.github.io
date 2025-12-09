# Nana's Tech Blog

A lightweight React-based Single Page Application for writing and publishing technical blog posts on AI and Robotics.

## Features

- Clean, minimal black and white design
- Split-screen layout with fixed photo panel
- Blog post editor with Markdown support and live preview
- LocalStorage-based post persistence
- Category filtering (AI, Robotics)
- Responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.jsx
│   │   ├── HomePage.jsx
│   │   ├── PostsPage.jsx
│   │   ├── EditorPage.jsx
│   │   ├── PostViewPage.jsx
│   │   ├── PostCard.jsx
│   │   └── Footer.jsx
│   ├── utils/           # Utility functions
│   │   └── storage.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── styles.css           # Global styles
├── index.html           # HTML template
├── package.json
└── vite.config.js      # Vite configuration
```

## Technologies

- React 18
- Vite
- Marked (for Markdown parsing)
- LocalStorage (for data persistence)
