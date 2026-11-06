import { useMemo, useSyncExternalStore } from 'react'
import { ThemeContext } from './ThemeContext'

const appearance = window.portfolioAppearance
if (!appearance) {
  throw new Error('Appearance bootstrap did not load. Check /theme-bootstrap.js.')
}

export default function ThemeProvider({ children }) {
  const snapshot = useSyncExternalStore(appearance.subscribe, appearance.getSnapshot)
  const value = useMemo(() => ({
    ...snapshot,
    themes: appearance.themes,
    modes: appearance.modes,
    setTheme: appearance.setTheme,
    setMode: appearance.setMode,
    resetTheme: appearance.resetTheme,
    resetMode: appearance.resetMode,
  }), [snapshot])
  const unsaved = Object.keys(snapshot.storageErrors)

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {unsaved.length > 0 && (
        <p className="appearance-storage-status" role="status">
          Your {unsaved.map(key => key === 'theme' ? 'palette' : 'mode').join(' and ')} preference
          {' '}could not be saved or restored. Changes work for this visit but may reset on reload.
        </p>
      )}
    </ThemeContext.Provider>
  )
}
