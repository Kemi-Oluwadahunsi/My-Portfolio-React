import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, X } from 'lucide-react'
import { lockScroll } from '../../hooks/lockScroll'
import { socialLinks } from '../../constants/portfolioData'
import './welcomeModal.scss'

const STORAGE_KEY = 'welcome-modal-seen'
const SHOW_DELAY_MS = 3000
const HOME_TIMEZONE = 'Asia/Kuala_Lumpur'
const BOT_PATTERN = /bot|crawl|spider|lighthouse|headless/i

const prompts = [
  {
    lead: 'Hiring?',
    links: [
      { label: 'See my projects', section: 'portfolioSection' },
      { label: 'my experience', section: 'experience' },
    ],
  },
  { lead: 'Have a project?', links: [{ label: 'See how I can help', section: 'services' }] },
  { lead: 'Developer?', links: [{ label: 'Open-source, case studies and ebooks', section: 'opensource' }] },
]

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit', timeZone }).format(new Date())

const getVisitorContext = () => {
  const visitorTime = formatTime(undefined)
  const homeTime = formatTime(HOME_TIMEZONE)
  return { visitorTime, homeTime, sameTime: visitorTime === homeTime }
}

const WELCOME_TEXT = "Hi! Welcome to my corner of the web 💻"

const WelcomeDialog = ({ onClose }) => {
  const reduced = useReducedMotion()
  const dialogRef = useRef(null)
  const [{ visitorTime, homeTime, sameTime }] = useState(getVisitorContext)

  const goToSection = useCallback(
    (id) => {
      onClose()
      window.setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        250,
      )
    },
    [onClose],
  )

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const unlockScroll = lockScroll()
    dialogRef.current?.querySelector('.welcome-close')?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const nodes = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: reduced ? 0 : 0.3 } },
  }
  const item = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } },
  }
  const greetingContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.035 } },
  }
  const letter = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className="welcome-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="welcome-close" onClick={onClose} aria-label="Close welcome message">
          <X size={18} />
        </button>

        <div className="welcome-scroll">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.p className="welcome-badge" variants={item}>
              <span className="pulse-dot" aria-hidden="true" />
              Open to remote roles &amp; freelance projects
            </motion.p>

            <motion.h3
              id="welcome-title"
              className="welcome-greeting"
              aria-label="Hi, this is Kemi. Glad you're here"
              variants={greetingContainer}
            >
              {[...WELCOME_TEXT].map((char, i) => (
                <motion.span key={i} variants={letter} aria-hidden="true">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h3>

            <motion.p className="welcome-intro" variants={item}>
              I&apos;m a software engineer, mentor, and technical author with 5 years of experience building web applications and AI-powered solutions.
            </motion.p>
            <motion.p className="welcome-time" variants={item}>
              {sameTime
                ? `It's ${homeTime} for both of us, same time zone.`
                : `${visitorTime} for you · ${homeTime} for me (Kuala Lumpur)`}
            </motion.p>

            <motion.ul className="welcome-prompts" variants={item}>
              {prompts.map(({ lead, links }) => (
                <li key={lead}>
                  <span>{lead}</span>
                  {links.map((l, i) => (
                    <span key={l.section}>
                      {i > 0 && ' · '}
                      <button type="button" onClick={() => goToSection(l.section)}>
                        {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </li>
              ))}
            </motion.ul>

            <motion.div className="welcome-footer" variants={item}>
              <a href={socialLinks.resume} target="_blank" rel="noreferrer">
                <Download size={16} aria-hidden="true" /> Download resume
              </a>
              <button type="button" onClick={onClose}>
                Just exploring
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const WelcomeModal = () => {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    // Skip deep links, repeat visits in the same session, and crawlers.
    if (window.location.hash || sessionStorage.getItem(STORAGE_KEY) || BOT_PATTERN.test(navigator.userAgent)) return

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setOpen(true)
    }, SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  return createPortal(<AnimatePresence>{open && <WelcomeDialog onClose={close} />}</AnimatePresence>, document.body)
}

export default WelcomeModal
