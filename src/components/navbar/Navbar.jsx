
import './navbar.scss'
import { useEffect, useState } from 'react'
import Logo from "/images/logo.webp"
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


const Navbar = () => {
  const [showMobileContent, setShowMobileContent] = useState(false)
  const [scrolled, setScrolled] = useState(false)


  const toggleMobileContent = () => {
    setShowMobileContent(!showMobileContent)
  }

  const closeMobileContent = () => {
    setShowMobileContent(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.small-screens')
      if (navbar && !navbar.contains(event.target)) {
        closeMobileContent()
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll)

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
            backgroundColor: scrolled ? 'rgba(6, 24, 41, 0.8)' : 'transparent'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="nav">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={Logo} alt="KodeMaven Logo" />
              <h3>KodeMaven</h3>
            </motion.div>
            <motion.div className="toggleButton">
              <motion.button 
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
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <motion.ul 
                  className="navigationItems"
                  role="menubar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    { to: 'section', label: 'Home' },
                    { to: 'services', label: 'Services' },
                    { to: 'skills', label: 'Skills' },
                    { to: 'experience', label: 'Experience' },
                    { to: 'portfolio', label: 'Portfolio' },
                    { to: 'contact', label: 'Contact' },
                  ].map((item, index) => (
                    <motion.li
                      key={item.to}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ScrollLink
                        className="navLinks"
                        to={item.to}
                        smooth={true}
                        duration={1000}
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
                      to="https://drive.google.com/file/d/16UtRHmT24i8D7G7tWkT76RmITayqOQ8i/view?usp=drive_link"
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
                      { icon: faLinkedin, href: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/', label: 'LinkedIn' },
                      { icon: faFacebook, href: 'https://www.facebook.com/kaliceagbabiaka1', label: 'Facebook' },
                      { icon: faXTwitter, href: 'https://twitter.com/km_oluwadahunsi', label: 'Twitter' },
                      { icon: faGithub, href: 'https://github.com/Kemi-Oluwadahunsi/', label: 'GitHub' },
                      { icon: faWhatsapp, href: 'https://wa.me/+2348146433203', label: 'WhatsApp' },
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
                          <FontAwesomeIcon icon={social.icon} color="#0c0c1d" />
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
