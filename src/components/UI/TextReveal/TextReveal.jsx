import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './TextReveal.scss'
import PropTypes from 'prop-types'

const TextReveal = ({ children, className = '', direction = 'up' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const getInitial = () => {
    if (direction === 'up') return { opacity: 0, y: 20 }
    if (direction === 'down') return { opacity: 0, y: -20 }
    return { opacity: 0, x: 20 }
  }

  const initial = getInitial()
  const words = typeof children === 'string' ? children.split(' ') : null

  if (words) {
    return (
      <div ref={ref} className={`text-reveal ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={initial}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`text-reveal ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

TextReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down', 'left']),
}

export default TextReveal
