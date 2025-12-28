import { useEffect, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import './BlurOnScroll.scss'
import PropTypes from 'prop-types'

const BlurOnScroll = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 1])

  return (
    <motion.div
      ref={ref}
      className={`blur-on-scroll ${className}`}
      style={{ filter: `blur(${blur}px)`, opacity }}
    >
      {children}
    </motion.div>
  )
}

BlurOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default BlurOnScroll
