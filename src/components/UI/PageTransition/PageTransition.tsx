import { motion, AnimatePresence } from 'framer-motion'
import './PageTransition.scss'
import PropTypes from 'prop-types'

const PageTransition = ({ children, pathname }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="page-transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string,
}

export default PageTransition
