import { motion } from 'framer-motion'
import './ShimmerEffect.scss'
import PropTypes from 'prop-types'

const ShimmerEffect = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`shimmer-container ${className}`}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="shimmer"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="shimmer-content">{children}</div>
    </motion.div>
  )
}

ShimmerEffect.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default ShimmerEffect
