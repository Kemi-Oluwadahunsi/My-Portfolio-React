import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useTheme from '../../hooks/useTheme'
import './cursor.scss'

const templates = [
  { id: 'halo', name: 'Halo', description: 'A crisp dot with a softly trailing ring.' },
  { id: 'precision', name: 'Precision', description: 'A technical crosshair with a fine center point.' },
  { id: 'orbit', name: 'Orbit', description: 'A diamond frame with two satellite dots.' },
  { id: 'spotlight', name: 'Spotlight', description: 'A soft pool of theme-colored light.' },
  { id: 'brackets', name: 'Code Brackets', description: 'An editor-inspired pair of angle brackets.' },
]
const storageKey = 'portfolio-cursor'
const pointerQuery = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const interactiveSelector = 'a, button, [role="button"], [role="link"], .interactive'
const nativeSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, :disabled, [aria-disabled="true"]'

const Cursor = () => {
  const { theme, modePreference, resolvedMode, themes, setTheme, setMode, resetTheme, resetMode, storageErrors } = useTheme()
  const palette = themes.find(item => item.id === theme)
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
  const [inverseTarget, setInverseTarget] = useState(false)
  const panelRef = useRef(null)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (!isOpen) return
    window.dispatchEvent(new Event('appearance:open'))
    panelRef.current?.querySelector('input:checked')?.focus()
    const dismiss = (event) => {
      if (!switcherRef.current?.contains(event.target)) {
        setIsOpen(false)
        triggerRef.current?.focus({ preventScroll: true })
      }
    }
    const escape = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      setIsOpen(false)
      triggerRef.current?.focus()
    }
    const leavePanel = (event) => {
      if (!switcherRef.current?.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape, true)
    document.addEventListener('focusin', leavePanel)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape, true)
      document.removeEventListener('focusin', leavePanel)
    }
  }, [isOpen])

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
      setInverseTarget(Boolean(target.closest('.theme-inverse')))
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
    }
    const handleUp = () => setIsClicking(false)
    const handleKey = (event) => {
      if (event.key === 'Tab') hideCursor()
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
  }, [isSupported, cursorX, cursorY])

  const selectTemplate = (id) => {
    setTemplate(id)
    setAnnouncement(`Cursor: ${templates.find(item => item.id === id)?.name ?? 'Native'}.`)
    try {
      localStorage.setItem(storageKey, id)
      setStorageError('')
    } catch (error) {
      console.warn('Could not save the cursor preference.', error)
      setStorageError('Your choice works now, but cannot be saved in this browser.')
    }
  }

  const cursorClass = `cursor-design cursor-design--${template}${isHovering ? ' is-hovering' : ''}${isClicking ? ' is-clicking' : ''}`

  return (
    <>
      <div className={`cursor-overlay${isActive ? ' is-visible' : ''}`} aria-hidden="true"
        style={inverseTarget ? { '--color-cursor': 'var(--color-text-inverse)' } : undefined}>
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
        {!isOpen && (
          <div className="appearance-discovery" aria-hidden="true">
            <span>View themes</span>
            <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
              <path d="M60 4C42 4 24 12 8 32M7 17L7 33L24 33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {isOpen && (
          <section className="cursor-switcher-panel" ref={panelRef} id="appearance-options" aria-labelledby="appearance-options-title">
            <header>
              <div>
                <p className="cursor-switcher-eyebrow">Make it yours</p>
                <h2 id="appearance-options-title">Appearance</h2>
              </div>
              <button type="button" className="cursor-switcher-close" aria-label="Close appearance options" onClick={() => {
                setIsOpen(false)
                triggerRef.current?.focus()
              }}>×</button>
            </header>
            <p className="cursor-switcher-hint">One portfolio, your preferred look.</p>
            <fieldset className="appearance-group">
              <legend>Palette</legend>
              <div className="appearance-palettes">
                {themes.map(item => (
                  <label className="appearance-palette" key={item.id}>
                    <input type="radio" name="appearance-palette" value={item.id} checked={theme === item.id}
                      onChange={() => { setTheme(item.id); setAnnouncement(`Palette: ${item.name}.`) }} />
                    <span className="appearance-swatches" aria-hidden="true">
                      {item[resolvedMode].map((color, index) => <span key={index} style={{ backgroundColor: color }} />)}
                    </span>
                    <span className="appearance-palette-name">{item.name}</span>
                    <span className="appearance-selected" aria-hidden="true">{theme === item.id ? 'Selected' : ''}</span>
                  </label>
                ))}
              </div>
              <button type="button" className="appearance-reset" onClick={() => {
                resetTheme(); setAnnouncement('Palette reset to Deep Current. Mode unchanged.')
              }}>Reset palette</button>
            </fieldset>
            <fieldset className="appearance-group">
              <legend>Mode</legend>
              <div className="appearance-modes">
                {[['light', 'Light'], ['dark', 'Dark'], ['system', 'Follow system']].map(([value, label]) => (
                  <label key={value}>
                    <input type="radio" name="appearance-mode" value={value} checked={modePreference === value}
                      onChange={() => { setMode(value); setAnnouncement(`Mode: ${label}.`) }} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <p className="cursor-switcher-hint">Currently {resolvedMode}{modePreference === 'system' ? ' (following your device)' : ''}.</p>
              <button type="button" className="appearance-reset" onClick={() => {
                resetMode(); setAnnouncement('Mode reset to follow system. Palette unchanged.')
              }}>Reset mode</button>
            </fieldset>
            {Object.keys(storageErrors).length > 0 && <p className="cursor-storage-error">
              Your appearance works for this visit, but your {Object.keys(storageErrors).map(key => key === 'theme' ? 'palette' : 'mode').join(' and ')} preference could not be saved or restored.
            </p>}
            <h3 className="appearance-cursor-title">Cursor</h3>
            {!isSupported && <p className="cursor-switcher-hint">Custom cursors require a mouse and motion enabled. Your saved choice is kept; palette and mode are always available.</p>}
            <div className="cursor-template-list" role="group" aria-label="Cursor templates">
              {isSupported && templates.map(({ id, name, description }, index) => (
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
          aria-label={`Appearance: ${palette.name}, ${resolvedMode} mode`}
          aria-expanded={isOpen}
          aria-controls="appearance-options"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke="currentColor" />
            <path d="M10 2a8 8 0 0 0 0 16V2Z" fill="currentColor" />
          </svg>
          <span className="appearance-mobile-label" aria-hidden="true">View themes</span>
          <span className="cursor-switcher-details" aria-hidden="true">
            <span>Appearance <span className="cursor-current-name">/ {palette.name}</span></span>
            <span>{isOpen ? '−' : '+'}</span>
          </span>
        </button>
      </div>
      <p className="appearance-announcement" role="status" aria-atomic="true">{announcement}</p>
    </>
  )
}

export default Cursor
