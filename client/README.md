# Openverse - Blog Platform

A modern, feature-rich blogging platform built with React, TypeScript, and Vite. Share your thoughts with the world in style.

## Features

- **Write & Publish**: Create and publish beautiful blog posts with rich text editor support
- **Authentication**: Secure user authentication with JWT tokens
- **User Profiles**: Customize your profile and share your author page
- **Blog Discovery**: Browse and discover blogs from other authors
- **Author Insights**: View all posts from a specific author
- **Responsive Design**: Seamless experience on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Fast Performance**: Optimized with Vite for instant page loads
- **Dark Theme**: Eye-friendly dark mode throughout the platform

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Recoil
- **Routing**: React Router
- **API**: Axios
- **UI Components**: Custom-built components
- **Animations**: CSS transitions and keyframe animations

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend API URL
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📂 Project Structure

```
src/
├── assets/
│   ├── components/       # Reusable UI components
│   │   ├── appbar.tsx
│   │   ├── avatar.tsx
│   │   ├── blogCard.tsx
│   │   ├── oneBlogCard.tsx
│   │   └── oneBlogSideCard.tsx
│   └── images/          # Static assets
├── pages/               # Page components
│   ├── blogs.tsx        # Blog feed
│   ├── myBlogs.tsx      # User's published blogs
│   ├── oneBlog.tsx      # Single blog view
│   ├── write.tsx        # Blog editor
│   ├── signin.tsx       # Login page
│   ├── signup.tsx       # Registration page
│   └── updateProfile.tsx # Profile editing
├── state/               # Recoil atoms
│   └── atoms.tsx
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🎯 Key Components

### BlogCard

Displays a blog post in compact form with metadata (author, date, read time).

### OneBlogCard

Full blog post view with rich content rendering, reading progress bar, and author information.

### OneBlogSideCard

Sidebar component showing related posts from the same author with smooth scrolling.

### Appbar

Navigation bar with branding, write button (mobile icon), and user menu.

### Avatar

User avatar with author initial and dropdown menu (sign out, my blogs, profile).

## 🔑 Configuration

Create `.env.local` with:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Design Features

- **Color Scheme**: Green accent on dark background
- **Typography**: Modern sans-serif with serif headings
- **Animations**: Smooth fade-in, hover effects, and scroll tracking
- **Spacing**: Consistent padding and margins using Tailwind utilities
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔄 API Integration

The frontend communicates with a REST API backend. Key endpoints:

- `GET /api/v1/blog/` - Fetch blogs
- `GET /api/v1/blog/myblogs` - User's blogs (authenticated)
- `POST /api/v1/blog/create` - Create blog (authenticated)
- `DELETE /api/v1/blog/delete` - Delete blog (authenticated)
- `GET /api/v1/auth/signin` - User login
- `GET /api/v1/auth/signup` - User registration
- `GET /api/v1/user/load` - Get user profile

## 📝 Development Guidelines

### Component Pattern

```tsx
interface ComponentProps {
  // Define props
}

export default function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

### Styling

Use Tailwind CSS classes. Custom animations are defined in `tailwind.config.js`.

### State Management

Use Recoil atoms for global state in `src/state/atoms.tsx`.

## 🐛 Known Issues & Fixes

- Title line clamping uses custom CSS for cross-browser compatibility
- Dropdown menu uses ref-based click detection for proper closure
- Side card uses sticky positioning with max-height for independent scrolling

## 🚀 Performance

- Lazy loading for blog content
- Intersection Observer for blog card animations
- Optimized images with proper sizing
- Code splitting via Vite

## 📄 License

This project is part of the Openverse blogging platform.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue on the repository or contact the development team.

---

**Built with ❤️ for writers and readers everywhere.**
