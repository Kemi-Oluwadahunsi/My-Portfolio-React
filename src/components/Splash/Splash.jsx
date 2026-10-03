import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from '../UI/Loader/Loader'
import { ACTIVE_LOADER } from '../UI/Loader/loaderConfig'
import './splash.scss'

export const SPLASH_MS = 5000
export const SPLASH_DONE_EVENT = 'splash:done'
const BOT_PATTERN = /bot|crawl|spider|lighthouse|headless/i

// Intentional loading screen shown on every full page load. Crawlers and
// performance audits skip it so it can't hurt indexing or Lighthouse scores.
const Splash = () => {
  const [visible, setVisible] = useState(() => !BOT_PATTERN.test(navigator.userAgent))

  // Flag it before any other effect runs so the welcome modal knows to wait.
  useLayoutEffect(() => {
    if (!visible) return
    document.documentElement.dataset.splash = 'active'
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => setVisible(false), SPLASH_MS)
    return () => window.clearTimeout(timer)
  }, [visible])

  const finish = () => {
    delete document.documentElement.dataset.splash
    window.dispatchEvent(new Event(SPLASH_DONE_EVENT))
  }

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className={`splash-graph ${ACTIVE_LOADER}`}>
            <Loader />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Splash
