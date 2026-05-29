import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.8 }) => {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    scale: 0.9,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: false, margin: '0px 0px -15% 0px' }}
      transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  )
}

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  delay: PropTypes.number,
  duration: PropTypes.number,
}

export default ScrollReveal
