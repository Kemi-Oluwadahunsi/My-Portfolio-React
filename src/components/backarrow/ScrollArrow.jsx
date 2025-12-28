import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"
import "./scrollarrow.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


const ScrollArrow = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 100)
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    const goTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="btn-Scroll"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={goTop}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FontAwesomeIcon icon={faArrowCircleUp} color="white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollArrow