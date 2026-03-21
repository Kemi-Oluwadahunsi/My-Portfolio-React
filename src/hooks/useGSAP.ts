import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = (animationFn, dependencies = []) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current && animationFn) {
      const ctx = gsap.context(() => {
        animationFn(elementRef.current)
      })

      return () => ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return elementRef
}

export default useGSAP
