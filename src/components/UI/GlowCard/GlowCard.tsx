import { motion } from 'framer-motion'
import { useState } from 'react'
import './GlowCard.scss'
import PropTypes from 'prop-types'

const GlowCard = ({ children, className = '', intensity = 'medium' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={`glow-card glow-${intensity} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="glow-effect"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <div className="glow-content">{children}</div>
    </motion.div>
  )
}

GlowCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
}

export default GlowCard
