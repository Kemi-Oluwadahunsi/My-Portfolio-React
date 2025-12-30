import { useEffect, useState } from 'react'
import './PWAUpdate.scss'

const PWAUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true)
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

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show install prompt after 5 seconds if not already installed
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone ||
                         document.referrer.includes('android-app://')
      
      if (!isInstalled) {
        setTimeout(() => {
          setShowInstallPrompt(true)
        }, 5000)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Handle online/offline status
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleUpdate = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        setUpdateAvailable(false)
        window.location.reload()
      }
    }
  }

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false)
      }
      
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setUpdateAvailable(false)
    setShowInstallPrompt(false)
  }

  if (!updateAvailable && !showInstallPrompt && !isOffline) {
    return null
  }

  return (
    <div className="pwa-update-container">
      {updateAvailable && (
        <div className="pwa-update-banner">
          <div className="pwa-update-content">
            <span className="pwa-update-icon">🔄</span>
            <div className="pwa-update-text">
              <strong>Update Available</strong>
              <p>A new version of the app is available.</p>
            </div>
            <div className="pwa-update-actions">
              <button onClick={handleUpdate} className="pwa-update-button">
                Update Now
              </button>
              <button onClick={handleDismiss} className="pwa-dismiss-button">
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      {showInstallPrompt && !updateAvailable && !isOffline && (
        <div className="pwa-install-banner">
          <div className="pwa-install-content">
            <span className="pwa-install-icon">📱</span>
            <div className="pwa-install-text">
              <strong>Install App</strong>
              <p>Install this app on your device for a better experience.</p>
            </div>
            <div className="pwa-install-actions">
              <button onClick={handleInstall} className="pwa-install-button">
                Install
              </button>
              <button onClick={handleDismiss} className="pwa-dismiss-button">
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {isOffline && (
        <div className="pwa-offline-banner">
          <div className="pwa-offline-content">
            <span className="pwa-offline-icon">📡</span>
            <div className="pwa-offline-text">
              <strong>You&apos;re Offline</strong>
              <p>Some features may be limited. Content is cached for offline use.</p>
            </div>
            <button onClick={() => setIsOffline(false)} className="pwa-dismiss-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PWAUpdate

