import { useEffect } from 'react'

const PWAUpdate = () => {
  useEffect(() => {
    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Auto-reload when a new service worker takes control
        window.location.reload()
      })

      // Check for updates periodically
      const checkForUpdates = () => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration) {
            registration.update()
          }
        })
      }

      // Check for updates every hour
      const updateInterval = setInterval(checkForUpdates, 60 * 60 * 1000)

      return () => clearInterval(updateInterval)
    }

    // Handle beforeinstallprompt event (store for potential future use)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      // Store the event for potential programmatic install trigger
      window.deferredPrompt = e
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  // No UI - just runs PWA logic in background
  return null
}

export default PWAUpdate