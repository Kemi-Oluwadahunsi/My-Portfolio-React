import { Link, NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion'
import './sidebar.scss';
import Logo from '/images/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBriefcase,
  faBriefcaseClock,
  faEnvelope,
  faHome,
  faCode,
  faSitemap,
  faCubes,
  faPenNib,
  faCodeBranch,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const navItems = [
  { icon: faHome, to: 'section', className: 'home-link', label: 'Home' },
  { icon: faBriefcase, to: 'services', className: 'services-link', label: 'Expertise' },
  { icon: faCode, to: 'portfolioSection', className: 'portfolio-link', label: 'Work' },
  { icon: faSitemap, to: 'architecture', className: 'architecture-link', label: 'Architecture' },
  { icon: faBriefcaseClock, to: 'experience', className: 'experience-link', label: 'Experience' },
  { icon: faCubes, to: 'skills', className: 'skills-link', label: 'Skills' },
  { icon: faPenNib, to: 'writing', className: 'writing-link', label: 'Writing' },
  { icon: faCodeBranch, to: 'opensource', className: 'opensource-link', label: 'Open Source' },
  { icon: faQuoteLeft, to: 'testimonials', className: 'testimonials-link', label: 'Testimonials' },
  { icon: faEnvelope, to: 'contact', className: 'contact-link', label: 'Contact' },
]

const sidebarSocialLinks = [
  { icon: faLinkedin, href: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/', label: 'LinkedIn' },
  { icon: faFacebook, href: 'https://www.facebook.com/kaliceagbabiaka1', label: 'Facebook' },
  { icon: faXTwitter, href: 'https://twitter.com/km_oluwadahunsi', label: 'Twitter' },
  { icon: faGithub, href: 'https://github.com/Kemi-Oluwadahunsi/', label: 'GitHub' },
  { icon: faWhatsapp, href: import.meta.env.VITE_WHATSAPP_LINK_NG || '#', label: 'WhatsApp' },
]

const Sidebar = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div 
      className="general-sidebar"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="nav-bar">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link className="logo" to="/" aria-label="Home">
            <img src={Logo} alt="KodeMaven Logo" />
            <h3 className="sub-logo">KodeMaven</h3>
          </Link>
        </motion.div>

        <nav>
          {navItems.map((item) => (
            <motion.div
              key={item.to}
              variants={itemVariants}
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ScrollLink
                exact="true"
                activeclassname="active"
                className={item.className}
                to={item.to}
                smooth={true}
                duration={1000}
                containerId="scroll-container"
                aria-label={item.label}
              >
                <FontAwesomeIcon icon={item.icon} color="#bddffa" />
              </ScrollLink>
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <NavLink
              exact="true"
              activeclassname="active"
              className="resume-link"
              target="_blank"
              to="https://drive.google.com/file/d/1tJgWBOmxZ1hlfbFtRdryVnHNSfKuqahr/view?usp=sharing"
              aria-label="Resume"
            >
              <FontAwesomeIcon icon={faBook} color="#bddffa" />
            </NavLink>
          </motion.div>
        </nav>

        <motion.ul variants={itemVariants}>
          {sidebarSocialLinks.map((social, index) => (
            <motion.li
              key={social.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.3, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={social.href}
                aria-label={social.label}
              >
                <FontAwesomeIcon icon={social.icon} color="#bddffa" />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default Sidebar