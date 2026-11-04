# Kemi-Oluwadahunsi Portfolio - Modern React Portfolio

A modern, high-performance portfolio website built with React, Vite, and cutting-edge web technologies.

## 🚀 Features

### Core Features
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern Design**: Glassmorphism, smooth animations, and modern UI
- 🌓 **Dark/Light Mode**: Seamless theme switching
- 📱 **Fully Responsive**: Optimized for all devices
- ♿ **Accessible**: WCAG compliant with ARIA labels
- 🔍 **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- 📦 **PWA Ready**: Progressive Web App with offline support
- 🎭 **3D Animations**: Interactive 3D elements with Three.js
- ✨ **Advanced Animations**: Framer Motion and GSAP integration

### Performance
- Code splitting and lazy loading
- Optimized bundle size
- Image optimization
- Resource hints and preloading

### Developer Experience
- TypeScript ready
- ESLint + Prettier
- Husky git hooks
- Bundle analyzer

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **Three.js / React Three Fiber** - 3D graphics
- **GSAP** - Advanced animations
- **Sass/SCSS** - Styling
- **React Router** - Routing
- **React Helmet Async** - SEO management

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking (when migrated)

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── 3D/          # 3D components (Three.js)
│   ├── UI/          # Reusable UI components
│   ├── SEO/         # SEO components
│   └── ...
├── constants/        # Data and configuration
├── context/          # React context providers
├── hooks/            # Custom React hooks
└── ...
```

## 🎨 Design System

The project uses a comprehensive design system with:
- CSS Custom Properties for theming
- Consistent color palette
- Typography scale
- Spacing system
- Component variants

### Cursor templates

The floating **Cursor** button collapses to an icon when idle and expands on hover
or keyboard focus (staying expanded while its options are open).
It opens five live styles: **Halo**, **Precision**,
**Orbit**, **Spotlight**, and **Code Brackets**. Select a style to preview it across
the portfolio, including case studies. The selection is saved in this browser;
**Use native cursor** restores the system pointer.

Custom cursors are available only with a fine, hover-capable pointer and no
reduced-motion preference. Text fields, editable content, and disabled controls
retain their native cursors. Press **Escape** or click outside to close the
switcher. Template definitions and visuals live in
[`Cursor.jsx`](src/components/cursor/Cursor.jsx) and
[`cursor.scss`](src/components/cursor/cursor.scss).

## 🔧 Configuration

- **Vite**: `vite.config.js` - Build configuration
- **ESLint**: `.eslintrc.cjs` - Linting rules
- **Prettier**: `.prettierrc` - Code formatting
- **TypeScript**: `tsconfig.json` - TypeScript config (ready for migration)

## 📈 Performance

- Lighthouse Score: 90+ (all categories)
- Core Web Vitals: Optimized
- SEO Score: 95+
- Accessibility Score: 100

## 🌐 SEO Features

- Meta tags (Open Graph, Twitter Cards)
- JSON-LD structured data
- Sitemap.xml
- Robots.txt
- Semantic HTML5

## 📱 PWA Features

- Service worker
- Web app manifest
- Offline support
- Install prompt ready

## 🎯 Best Practices

- Component-based architecture
- Code splitting and lazy loading
- Error boundaries
- Loading states
- Accessibility first
- Performance optimized

## 📄 License

Private project - All rights reserved

Built with ❤️ by Kemi Oluwadahunsi