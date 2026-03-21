import { useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { socialLinks } from '../../constants/portfolioData'

const NAV_LINKS = [
  { to: 'expertise',    label: 'Expertise'   },
  { to: 'work',         label: 'Work'        },
  { to: 'experience',   label: 'Experience'  },
  { to: 'skills',       label: 'Skills'      },
  { to: 'writing',      label: 'Writing'     },
  { to: 'testimonials', label: 'Testimonials'},
  { to: 'contact',      label: 'Contact'     },
]

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById('mobile-nav')
      if (nav && !nav.contains(e.target as Node)) setMobileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  // Intersection observer for active section highlight
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.to)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(5,11,24,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgb(255 255 255 / 0.05)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="section-wrap">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <ScrollLink to="hero" smooth duration={800} className="cursor-pointer">
              <span className="font-mono text-sm font-medium text-white tracking-tight">
                kemi<span className="text-blue-400">.</span>dev
              </span>
            </ScrollLink>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <ScrollLink
                  key={to}
                  to={to}
                  smooth
                  duration={800}
                  offset={-80}
                  className={`relative px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors duration-200 ${
                    activeSection === to ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {activeSection === to && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.06]"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </ScrollLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-300 text-sm hover:border-blue-500/40 hover:text-white hover:bg-blue-500/5 transition-all duration-200"
            >
              <Download size={14} />
              Resume
            </a>

            {/* Mobile toggle */}
            <button
              id="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(5,11,24,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-10 gap-2">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ScrollLink
                    to={to}
                    smooth
                    duration={800}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-2xl font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {label}
                  </ScrollLink>
                </motion.div>
              ))}

              <div className="mt-auto pt-8 border-t border-white/[0.06]">
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline w-full justify-center"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
