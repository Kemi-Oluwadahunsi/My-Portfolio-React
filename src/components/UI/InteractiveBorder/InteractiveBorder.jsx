import { motion } from 'framer-motion'
import './InteractiveBorder.scss'
import PropTypes from 'prop-types'

const InteractiveBorder = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`interactive-border ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="border-gradient"
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: 360 },
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <div className="border-content">{children}</div>
    </motion.div>
  )
}

InteractiveBorder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default InteractiveBorder
