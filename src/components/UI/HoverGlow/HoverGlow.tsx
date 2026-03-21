import { useState } from 'react'
import { motion } from 'framer-motion'
import './HoverGlow.scss'
import PropTypes from 'prop-types'

const HoverGlow = ({ children, className = '', color = 'primary' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={`hover-glow glow-${color} ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="glow-spot"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <div className="glow-content">{children}</div>
    </motion.div>
  )
}

HoverGlow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'accent']),
}

export default HoverGlow
