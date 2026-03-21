import { motion } from 'framer-motion'
import './AnimatedBorder.scss'
import PropTypes from 'prop-types'

const AnimatedBorder = ({ children, className = '', color = 'primary' }) => {
  return (
    <motion.div
      className={`animated-border border-${color} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="border-top"
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="border-right"
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="border-bottom"
        animate={{
          backgroundPosition: ['100% 0%', '0% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="border-left"
        animate={{
          backgroundPosition: ['0% 100%', '0% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="border-content">{children}</div>
    </motion.div>
  )
}

AnimatedBorder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'accent']),
}

export default AnimatedBorder
