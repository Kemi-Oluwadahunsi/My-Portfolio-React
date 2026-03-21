import { useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { socialLinks } from '../../constants/portfolioData'
import { Github, Linkedin, Twitter, Menu, X, FileText } from 'lucide-react'

const navItems = [
  { to: 'home', label: 'Home' },
  { to: 'expertise', label: 'Expertise' },
  { to: 'work', label: 'Work' },
  { to: 'experience', label: 'Experience' },
  { to: 'skills', label: 'Skills' },
  { to: 'writing', label: 'Writing' },
  { to: 'contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop nav */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`section-wrap flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-[#050B18]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : ''
          }`}
        >
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold font-display">
              K
            </span>
            <span className="font-display font-semibold text-white text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Kemi O.
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth
                duration={800}
                offset={-80}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer font-medium"
                activeClass="!text-white !bg-white/5"
                spy
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>

          {/* Right: socials + resume */}
          <div className="flex items-center gap-3">
            <a href={socialLinks.github} target="_blank" rel="noreferrer"
               className="text-slate-500 hover:text-white transition-colors duration-200">
              <Github size={16} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"
               className="text-slate-500 hover:text-white transition-colors duration-200">
              <Linkedin size={16} />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer"
               className="text-slate-500 hover:text-white transition-colors duration-200">
              <Twitter size={16} />
            </a>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <Link
              to={socialLinks.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-xs !px-3 !py-1.5"
            >
              <FileText size={13} />
              Resume
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold font-display">
              K
            </span>
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300"
            aria-label="Open menu"
          >
            <Menu size={16} />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 bg-[#050B18]/97 backdrop-blur-2xl z-50 flex flex-col"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold font-display">K</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-5 mt-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ScrollLink
                      to={item.to}
                      smooth
                      duration={800}
                      offset={-80}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all font-medium cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span className="text-slate-600 text-xs">→</span>
                    </ScrollLink>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center gap-4 px-9 mt-auto mb-12">
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={18} /></a>
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={18} /></a>
                <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter size={18} /></a>
                <div className="ml-auto">
                  <Link to={socialLinks.resume} target="_blank" rel="noreferrer"
                    className="btn-ghost text-sm" onClick={() => setMobileOpen(false)}>
                    <FileText size={14} /> Resume
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Navbar
