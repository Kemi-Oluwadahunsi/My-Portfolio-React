import { useState } from 'react'
import { motion } from 'framer-motion'
import './RippleButton.scss'
import PropTypes from 'prop-types'

const RippleButton = ({ children, onClick, className = '', ...props }) => {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      x,
      y,
      id: Date.now(),
    }

    setRipples([...ripples, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) onClick(e)
  }

  return (
    <motion.button
      className={`ripple-button ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="ripple"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </motion.button>
  )
}

RippleButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default RippleButton
