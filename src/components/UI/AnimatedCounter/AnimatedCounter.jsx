import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import './AnimatedCounter.scss'
import PropTypes from 'prop-types'

const AnimatedCounter = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const startTime = performance.now()
    const durationMs = duration * 1000

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(eased * value)

      if (ref.current) {
        ref.current.textContent = `${prefix}${current}${suffix}`
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration, prefix, suffix])

  return <span ref={ref} className="animated-counter">{prefix}0{suffix}</span>
}

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
}

export default AnimatedCounter
