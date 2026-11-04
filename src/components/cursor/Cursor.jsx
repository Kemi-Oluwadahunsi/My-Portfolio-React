import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './cursor.scss'

const templates = [
  { id: 'halo', name: 'Halo', description: 'A crisp dot with a softly trailing ring.' },
  { id: 'precision', name: 'Precision', description: 'A technical crosshair with a fine center point.' },
  { id: 'orbit', name: 'Orbit', description: 'A diamond frame with two satellite dots.' },
  { id: 'spotlight', name: 'Spotlight', description: 'A soft pool of ice-blue light.' },
  { id: 'brackets', name: 'Code Brackets', description: 'An editor-inspired pair of angle brackets.' },
]
const storageKey = 'portfolio-cursor'
const pointerQuery = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const interactiveSelector = 'a, button, [role="button"], [role="link"], .interactive'
const nativeSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, :disabled, [aria-disabled="true"]'

const Cursor = () => {
  const [template, setTemplate] = useState('halo')
  const [storageError, setStorageError] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isNativeTarget, setIsNativeTarget] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef(null)
  const triggerRef = useRef(null)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 30, stiffness: 600, mass: 0.5 }
  const followerX = useSpring(cursorX, springConfig)
  const followerY = useSpring(cursorY, springConfig)
  const isActive = isSupported && template !== 'native' && isVisible && !isNativeTarget

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved === 'native' || templates.some(({ id }) => id === saved)) {
        setTemplate(saved)
      }
    } catch (error) {
      console.warn('Could not read the saved cursor preference.', error)
      setStorageError('Your cursor choice cannot be saved in this browser.')
    }

    const media = window.matchMedia(pointerQuery)
    const updateSupport = () => {
      setIsSupported(media.matches)
      setIsVisible(false)
    }
    updateSupport()
    media.addEventListener('change', updateSupport)
    return () => media.removeEventListener('change', updateSupport)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('custom-cursor-active', isActive)
    return () => document.body.classList.remove('custom-cursor-active')
  }, [isActive])

  useEffect(() => {
    if (!isSupported) return

    const updateTarget = (target) => {
      if (!(target instanceof Element)) return
      setIsHovering(Boolean(target.closest(interactiveSelector)))
      setIsNativeTarget(Boolean(target.closest(nativeSelector)))
    }
    const moveCursor = (event) => {
      if (event.pointerType !== 'mouse') {
        setIsVisible(false)
        return
      }
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setIsVisible(true)
      updateTarget(event.target)
    }
    const hideCursor = () => {
      setIsVisible(false)
      setIsClicking(false)
    }
    const leaveWindow = (event) => {
      if (!event.relatedTarget) hideCursor()
    }
    const handleOver = (event) => updateTarget(event.target)
    const handleDown = (event) => {
      if (event.pointerType === 'mouse') setIsClicking(true)
      if (!switcherRef.current?.contains(event.target)) setIsOpen(false)
    }
    const handleUp = () => setIsClicking(false)
    const handleKey = (event) => {
      if (event.key === 'Tab') hideCursor()
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    window.addEventListener('pointermove', moveCursor)
    window.addEventListener('pointerout', leaveWindow)
    window.addEventListener('blur', hideCursor)
    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', hideCursor)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('pointermove', moveCursor)
      window.removeEventListener('pointerout', leaveWindow)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', hideCursor)
      window.removeEventListener('keydown', handleKey)
    }
  }, [isSupported, isOpen, cursorX, cursorY])

  const selectTemplate = (id) => {
    setTemplate(id)
    try {
      localStorage.setItem(storageKey, id)
      setStorageError('')
    } catch (error) {
      console.warn('Could not save the cursor preference.', error)
      setStorageError('Your choice works now, but cannot be saved in this browser.')
    }
  }

  if (!isSupported) return null

  const selectedName = templates.find(({ id }) => id === template)?.name ?? 'Native'
  const cursorClass = `cursor-design cursor-design--${template}${isHovering ? ' is-hovering' : ''}${isClicking ? ' is-clicking' : ''}`

  return (
    <>
      <div className={`cursor-overlay${isActive ? ' is-visible' : ''}`} aria-hidden="true">
        <motion.div className="cursor-position" style={{ x: followerX, y: followerY }}>
          <span className={cursorClass}>
            <span className="cursor-frame" />
          </span>
        </motion.div>
        <motion.div className="cursor-position" style={{ x: cursorX, y: cursorY }}>
          <span className={`${cursorClass} cursor-tip`} />
        </motion.div>
      </div>

      <div className="cursor-switcher" ref={switcherRef}>
        {isOpen && (
          <section className="cursor-switcher-panel" id="cursor-options" aria-labelledby="cursor-options-title">
            <header>
              <div>
                <p className="cursor-switcher-eyebrow">Make it yours</p>
                <h2 id="cursor-options-title">Choose your cursor</h2>
              </div>
              <button type="button" className="cursor-switcher-close" aria-label="Close cursor options" onClick={() => {
                setIsOpen(false)
                triggerRef.current?.focus()
              }}>×</button>
            </header>
            <p className="cursor-switcher-hint">Pick a style, then move around to try it.</p>
            <div className="cursor-template-list" role="group" aria-label="Cursor templates">
              {templates.map(({ id, name, description }, index) => (
                <button
                  type="button"
                  className="cursor-template"
                  key={id}
                  aria-pressed={template === id}
                  onClick={() => selectTemplate(id)}
                >
                  <span className="cursor-swatch" aria-hidden="true">
                    <span className={`cursor-design cursor-design--${id}`}>
                      <span className="cursor-frame" />
                    </span>
                    <span className={`cursor-design cursor-design--${id} cursor-tip`} />
                  </span>
                  <span className="cursor-template-copy">
                    <strong>{name}</strong>
                    <span>{description}</span>
                  </span>
                  <span className="cursor-template-number" aria-hidden="true">0{index + 1}</span>
                </button>
              ))}
              <button type="button" className="cursor-native-option" aria-pressed={template === 'native'} onClick={() => selectTemplate('native')}>
                Use native cursor
              </button>
            </div>
            {storageError && <p className="cursor-storage-error" role="status">{storageError}</p>}
          </section>
        )}
        <button
          type="button"
          className="cursor-switcher-trigger"
          ref={triggerRef}
          aria-label={`Cursor / ${selectedName}`}
          aria-expanded={isOpen}
          aria-controls="cursor-options"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <path d="M2 1.5v13l3.5-3 2.5 5 2.5-1.3-2.5-4.7H13L2 1.5Z" stroke="currentColor" strokeLinejoin="round" />
          </svg>
          <span className="cursor-switcher-details" aria-hidden="true">
            <span>Cursor <span className="cursor-current-name">/ {selectedName}</span></span>
            <span>{isOpen ? '−' : '+'}</span>
          </span>
        </button>
      </div>
    </>
  )
}

export default Cursor
