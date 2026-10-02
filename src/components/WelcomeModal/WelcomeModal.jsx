import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
//
  Briefcase,
  Code,
  Download,
  Rocket,
  Sparkles,
  X,
} from 'lucide-react'
import { socialLinks } from '../../constants/portfolioData'
import './welcomeModal.scss'

const STORAGE_KEY = 'welcome-modal-seen'
const SHOW_DELAY_MS = 3000
const HOME_TIMEZONE = 'Asia/Kuala_Lumpur'
const BOT_PATTERN = /bot|crawl|spider|lighthouse|headless/i

const audiences = [
  {
    icon: Briefcase,
    title: "I'm hiring",
    text: 'Remote roles: see what I have built and where I have done it',
    links: [
      { label: 'Projects', section: 'portfolioSection' },
      { label: 'Experience', section: 'experience' },
    ],
  },
  {
    icon: Rocket,
    title: 'I have a project',
    text: 'Freelance work: see how I can help you',
    action: { section: 'services' },
  },
  {
    icon: Code,
    title: "I'm a developer",
    text: 'Open-source libraries, case studies and ebooks',
    action: { section: 'opensource' },
  },
  {
    icon: Sparkles,
    title: 'Just exploring',
    text: 'Take me to the site',
    action: { close: true },
  },
]

// const latestProjects = [
//   { id: 'kemory', title: 'Kemory', tag: 'Full-stack publishing platform' },
//   { id: 'herbiskea', title: 'Herbiskea', tag: 'AI-powered beauty e-commerce' },
//   { id: 'viskit', title: 'VisKit', tag: '48-chart React library' },
// ]

// const latestWriting = [
//   { title: 'Micro Frontends with Webpack 5', tag: 'Ebook · Book 1' },
//   { title: 'The Augmented Developer', tag: 'Ebook · Coding in the AI era' },
// ]

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit', timeZone }).format(new Date())

const getVisitorContext = () => {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const visitorTime = formatTime(undefined)
  const homeTime = formatTime(HOME_TIMEZONE)
  return { greeting, visitorTime, homeTime, sameTime: visitorTime === homeTime }
}

const WelcomeDialog = ({ onClose }) => {
  const reduced = useReducedMotion()
  const dialogRef = useRef(null)
  const [{ greeting, visitorTime, homeTime, sameTime }] = useState(getVisitorContext)

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
    const scroller = document.getElementById('scroll-container')
    const previousOverflow = scroller?.style.overflow
    if (scroller) scroller.style.overflow = 'hidden'
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
      if (scroller) scroller.style.overflow = previousOverflow ?? ''
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

            <motion.h2
              id="welcome-title"
              className="welcome-greeting"
              aria-label={`${greeting}, welcome!`}
              variants={greetingContainer}
            >
              {[...`${greeting} 👋`].map((char, i) => (
                <motion.span key={i} variants={letter} aria-hidden="true">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p className="welcome-intro" variants={item}>
              I&apos;m Kemi, a software engineer building enterprise micro-frontends and full-stack products.
            </motion.p>
            <motion.p className="welcome-time" variants={item}>
              {sameTime
                ? `It's ${homeTime} for both of us, same time zone.`
                : `${visitorTime} for you · ${homeTime} for me (Kuala Lumpur)`}
            </motion.p>

            <motion.h3 className="welcome-label" variants={item}>
              What brings you here?
            </motion.h3>
            <div className="welcome-audiences">
              {audiences.map(({ icon: Icon, title, text, action, links }) => {
                const body = (
                  <>
                    <span className="icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <span className="copy">
                      <strong>{title}</strong>
                      <span>{text}</span>
                      {links && (
                        <span className="links">
                          {links.map((l) => (
                            <button key={l.section} type="button" onClick={() => goToSection(l.section)}>
                              {l.label} <ArrowUpRight size={13} aria-hidden="true" />
                            </button>
                          ))}
                        </span>
                      )}
                    </span>
                  </>
                )

                // Cards with several destinations can't be a single button.
                return links ? (
                  <motion.div key={title} className="welcome-audience" variants={item}>
                    {body}
                  </motion.div>
                ) : (
                  <motion.button
                    key={title}
                    type="button"
                    className="welcome-audience"
                    variants={item}
                    onClick={() => (action.section ? goToSection(action.section) : onClose())}
                  >
                    {body}
                  </motion.button>
                )
              })}
            </div>

            {/* <motion.h3 className="welcome-label" variants={item}>
              Latest
            </motion.h3>
            <div className="welcome-latest">
              <motion.div variants={item}>
                <h4>Projects</h4>
                <ul>
                  {latestProjects.map((p) => (
                    <li key={p.id}>
                      <Link to={`/case-study/${p.id}`} onClick={onClose}>
                        <span>
                          <strong>{p.title}</strong>
                          <small>{p.tag}</small>
                        </span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={item}>
                <h4>Writing</h4>
                <ul>
                  {latestWriting.map((w) => (
                    <li key={w.title}>
                      <button type="button" onClick={() => goToSection('writing')}>
                        <span>
                          <strong>{w.title}</strong>
                          <small>{w.tag}</small>
                        </span>
                        <BookOpen size={16} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div> */}

            <motion.div className="welcome-footer" variants={item}>
              <a href={socialLinks.resume} target="_blank" rel="noreferrer">
                <Download size={16} aria-hidden="true" /> Download resume
              </a>
              <button type="button" onClick={onClose}>
                Skip
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
