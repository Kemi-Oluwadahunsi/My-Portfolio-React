import './LoadingSkeleton.scss'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const LoadingSkeleton = ({ 
  width = '100%', 
  height = '1rem',
  className = '' 
}) => {
  return (
    <div
      className={`skeleton-container ${className}`}
      style={{ width, height }}
      aria-label="Loading..."
    >
      <div className="skeleton-content">
        {/* Animated blob background */}
        <motion.div
          className="skeleton-blob blob-1"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="skeleton-blob blob-2"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            borderRadius: ['30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Code-like elements */}
        <div className="skeleton-code">
          <motion.span
            className="code-bracket"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'{'}
          </motion.span>
          <motion.span
            className="code-dots"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            ...
          </motion.span>
          <motion.span
            className="code-bracket"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            {'}'}
          </motion.span>
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="skeleton-shimmer"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}

LoadingSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
}

export default LoadingSkeleton
