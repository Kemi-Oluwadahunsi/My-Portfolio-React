import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Utility hook that returns a ref and whether the element is in view.
 * Drop-in replacement for the old GSAP-based useGSAP hook.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px', ...options })
  return { ref, isInView }
}

export default useScrollReveal
