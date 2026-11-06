import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import useAtmosphere from '../../../hooks/useAtmosphere'

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.8 }) => {
  const { reducedMotion } = useAtmosphere()
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    scale: 0.9,
  }

  return (
    <motion.div
      initial={reducedMotion ? false : initial}
      animate={reducedMotion ? { opacity: 1, y: 0, x: 0, scale: 1 } : undefined}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: false, margin: '0px 0px -15% 0px' }}
      transition={{ duration: reducedMotion ? 0 : duration, delay: reducedMotion ? 0 : delay, ease: [0.215, 0.61, 0.355, 1] }}
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
