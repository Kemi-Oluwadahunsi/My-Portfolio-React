import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="nf-ambient" aria-hidden="true">
        <div className="nf-ambient-orb nf-ambient-orb--1" />
        <div className="nf-ambient-orb nf-ambient-orb--2" />
        <div className="nf-ambient-orb nf-ambient-orb--3" />
      </div>

      <motion.div
        className="nf-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <motion.div
          className="nf-glitch"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="nf-404" data-text="404">404</span>
        </motion.div>

        <motion.div
          className="nf-icon"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </motion.div>

        <motion.h1
          className="nf-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="nf-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          className="nf-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link to="/" className="nf-btn nf-btn--primary">
            <FontAwesomeIcon icon={faHome} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>

      <div className="nf-grid" aria-hidden="true" />
    </div>
  )
}

export default NotFound
