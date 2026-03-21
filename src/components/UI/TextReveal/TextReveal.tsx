import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { gsap } from 'gsap'
import './TextReveal.scss'
import PropTypes from 'prop-types'

const TextReveal = ({ children, className = '', direction = 'up' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (ref.current && isInView) {
      const text = ref.current
      const words = text.textContent.split(' ')
      text.innerHTML = ''

      words.forEach((word, index) => {
        const span = document.createElement('span')
        span.textContent = word + ' '
        span.style.opacity = '0'
        span.style.transform =
          direction === 'up'
            ? 'translateY(20px)'
            : direction === 'down'
            ? 'translateY(-20px)'
            : 'translateX(20px)'
        text.appendChild(span)

        gsap.to(span, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'power2.out',
        })
      })
    }
  }, [isInView, direction])

  return (
    <div ref={ref} className={`text-reveal ${className}`}>
      {children}
    </div>
  )
}

TextReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down', 'left']),
}

export default TextReveal
