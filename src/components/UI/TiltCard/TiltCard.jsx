import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './TiltCard.scss'
import PropTypes from 'prop-types'

const TiltCard = ({ children, className = '', intensity = 15 }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / rect.height) * -intensity
    const rotateYValue = (mouseX / rect.width) * intensity

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02, z: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  intensity: PropTypes.number,
}

export default TiltCard
