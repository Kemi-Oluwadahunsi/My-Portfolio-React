// Design System - Theme Configuration
export const theme = {
  colors: {
    // Primary Colors
    primary: '#bce0fb',
    primaryDark: '#8bc5f0',
    primaryLight: '#d4eafc',
    
    // Background Colors
    bgPrimary: '#061829',
    bgSecondary: '#0a1f33',
    bgTertiary: '#0f2a3d',
    
    // Accent Colors
    accent: '#095a9b',
    accentSecondary: '#505064',
    accentTertiary: '#0c4e80',
    
    // Text Colors
    textPrimary: '#ffffff',
    textSecondary: '#bce0fb',
    textTertiary: '#8bc5f0',
    textMuted: '#6b8fa3',
    
    // Semantic Colors
    success: '#4ade80',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    
    // Gradient Colors
    gradientPrimary: 'linear-gradient(135deg, #061829 0%, #095a9b 100%)',
    gradientSecondary: 'linear-gradient(135deg, #061829 0%, #505064 100%)',
    gradientAccent: 'linear-gradient(135deg, #bce0fb 0%, #8bc5f0 100%)',
    
    // Glassmorphism
    glassBg: 'rgba(11, 24, 41, 0.7)',
    glassBorder: 'rgba(188, 224, 251, 0.2)',
  },
  
  // Typography
  fonts: {
    primary: '"DM Sans", sans-serif',
    secondary: '"Helvetica Neue", sans-serif',
    decorative: '"La Belle Aurore", cursive',
    heading: '"Coolvetica", sans-serif',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(188, 224, 251, 0.3)',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  
  // Z-index layers
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
}

// Light theme variant
export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    bgPrimary: '#f8fafc',
    bgSecondary: '#f1f5f9',
    bgTertiary: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#1e293b',
    textTertiary: '#334155',
    textMuted: '#64748b',
    glassBg: 'rgba(255, 255, 255, 0.7)',
    glassBorder: 'rgba(15, 23, 42, 0.1)',
  },
}
