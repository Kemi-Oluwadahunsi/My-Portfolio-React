import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PropTypes from 'prop-types'

if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.8 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (ref.current) {
      const element = ref.current
      const from = {
        opacity: 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
        x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        scale: 0.9,
      }

      const to = {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
      }

      gsap.fromTo(
        element,
        from,
        {
          ...to,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [direction, delay, duration])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  delay: PropTypes.number,
  duration: PropTypes.number,
}

export default ScrollReveal
