import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'
import { Menu, X, Download } from 'lucide-react'
import { socialLinks } from '../../constants/portfolioData'

const NAV_ITEMS = [
  { to: 'expertise',    label: 'Expertise'     },
  { to: 'work',         label: 'Work'          },
  { to: 'architecture', label: 'Architecture'  },
  { to: 'experience',   label: 'Experience'    },
  { to: 'skills',       label: 'Skills'        },
  { to: 'writing',      label: 'Writing'       },
  { to: 'contact',      label: 'Contact'       },
]

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById('mobile-nav-panel')
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgb(5 11 24 / 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgb(255 255 255 / 0.06)' : '1px solid transparent',
        }}
      >
        <div className="section-container h-16 flex items-center justify-between">
          {/* Logo */}
          <ScrollLink
            to="hero"
            smooth
            duration={600}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, var(--color-brand-blue-dark), var(--color-brand-blue))',
                color: '#fff',
              }}
            >
              K
            </div>
            <span className="text-white font-medium text-sm hidden sm:block group-hover:text-blue-300 transition-colors">
              Kemi Oluwadahunsi
            </span>
          </ScrollLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth
                duration={700}
                offset={-72}
                spy
                onSetActive={() => setActiveSection(item.to)}
                className="px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors duration-200"
                style={{
                  color: activeSection === item.to ? '#fff' : '#64748b',
                  background: activeSection === item.to ? 'rgb(255 255 255 / 0.06)' : 'transparent',
                }}
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden sm:inline-flex text-xs px-4 py-2"
            >
              <Download size={13} />
              Resume
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-panel"
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-50 flex flex-col"
            style={{
              background: 'var(--color-navy-800)',
              borderLeft: '1px solid rgb(255 255 255 / 0.08)',
            }}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgb(255 255 255 / 0.06)' }}>
              <span className="text-white font-medium text-sm">Navigation</span>
              <button onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ScrollLink
                    to={item.to}
                    smooth
                    duration={700}
                    offset={-72}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </ScrollLink>
                </motion.div>
              ))}
            </nav>

            <div className="p-5 border-t" style={{ borderColor: 'rgb(255 255 255 / 0.06)' }}>
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-sm"
                onClick={() => setMenuOpen(false)}
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgb(0 0 0 / 0.5)' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
