import { createContext, useContext, useState, useEffect } from 'react'
import { theme, lightTheme } from '../constants/theme'

const ThemeContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const currentTheme = isDark ? theme : lightTheme

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    
    // Update CSS variables
    const root = document.documentElement
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--color-${key}`, value)
      }
    })
    
    // Update body class for theme-specific styles
    document.body.className = isDark ? 'dark-theme' : 'light-theme'
  }, [isDark, currentTheme])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
