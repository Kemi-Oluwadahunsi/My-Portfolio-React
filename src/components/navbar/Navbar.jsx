
import './navbar.scss'
import { useEffect, useRef, useState } from 'react'
import useTheme from '../../hooks/useTheme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'


const Navbar = () => {
  const { theme, resolvedMode } = useTheme()
  const logo = `/images/logo-${theme}-${resolvedMode}.svg`
  const activeSection = useActiveSection()
  const [showMobileContent, setShowMobileContent] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)


  const toggleMobileContent = () => {
    setShowMobileContent(!showMobileContent)
  }

  const closeMobileContent = () => {
    setShowMobileContent(false)
  }

  useEffect(() => {
    if (!showMobileContent) return
    const menu = menuRef.current
    const toggle = toggleRef.current
    menu?.querySelector('a[href]')?.focus({ preventScroll: true })
    const escape = (event) => {
      if (event.key === 'Escape') setShowMobileContent(false)
    }
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('keydown', escape)
      if (menu?.contains(document.activeElement)) toggle?.focus({ preventScroll: true })
    }
  }, [showMobileContent])

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.small-screens')
      if (navbar && !navbar.contains(event.target)) {
        closeMobileContent()
      }
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) 


  return (
    <>
      {/* navbar for phone-tab view */}
      <motion.div 
        className="small-screens"
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={`navbar ${scrolled ? 'scrolled' : ''}`}
          initial={{ backdropFilter: 'blur(0px)' }}
          animate={{ 
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="nav">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={logo} alt="Kemi-Oluwadahunsi Logo" />
              <h3>KeMi</h3>
            </motion.div>
            <motion.div className="toggleButton">
              <motion.button 
                ref={toggleRef}
                onClick={toggleMobileContent}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={showMobileContent ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={showMobileContent}
                aria-controls="mobile-navigation"
              >
                <AnimatePresence mode="wait">
                  {showMobileContent ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FontAwesomeIcon icon={faTimes} className="tog" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FontAwesomeIcon icon={faBars} className="tog" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          <AnimatePresence>
            {showMobileContent && (
              <motion.div
                className="bg visible"
                ref={menuRef}
                id="mobile-navigation"
                role="dialog"
                aria-label="Mobile navigation menu"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <motion.ul 
                  className="navigationItems"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    { to: 'main-content', label: 'Home' },
                    { to: 'services', label: 'Expertise' },
                    { to: 'portfolioSection', label: 'Work' },
                    { to: 'architecture', label: 'Architecture' },
                    { to: 'experience', label: 'Experience' },
                    { to: 'skills', label: 'Skills' },
                    { to: 'writing', label: 'Writing' },
                    { to: 'opensource', label: 'Open Source' },
                    { to: 'testimonials', label: 'Testimonials' },
                    { to: 'contact', label: 'Contact' },
                  ].map((item, index) => (
                    <motion.li
                      key={item.to}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ScrollLink
                        href={`#${item.to}`}
                        className={`navLinks ${activeSection === item.to ? 'active' : ''}`}
                        to={item.to}
                        smooth={true}
                        duration={1000}
                        containerId="scroll-container"
                        offset={-100}
                        onClick={closeMobileContent}
                      >
                        {item.label}
                      </ScrollLink>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      to="https://drive.google.com/file/d/1x6Kyp2tTblYB1oo3lFowbdgkmKCQtpo5/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      className="resume navLinks"
                      onClick={closeMobileContent}
                    >
                      Resume
                    </Link>
                  </motion.li>
                </motion.ul>

                <motion.div 
                  className="socialIcons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <ul>
                    {[
                      { icon: faLinkedin, href: import.meta.env.VITE_LINKEDIN_URL || '#', label: 'LinkedIn' },
                      { icon: faFacebook, href: import.meta.env.VITE_FACEBOOK_URL || '#', label: 'Facebook' },
                      { icon: faXTwitter, href: import.meta.env.VITE_TWITTER_URL || '#', label: 'Twitter' },
                      { icon: faGithub, href: import.meta.env.VITE_GITHUB_URL || '#', label: 'GitHub' },
                      { icon: faWhatsapp, href: import.meta.env.VITE_WHATSAPP_LINK || '#', label: 'WhatsApp' },
                    ].map((social, index) => (
                      <motion.li
                        key={social.href}
                        onClick={closeMobileContent}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={social.href}
                          aria-label={social.label}
                        >
                          <FontAwesomeIcon icon={social.icon} />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Navbar
