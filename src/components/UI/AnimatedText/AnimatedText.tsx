import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './AnimatedText.scss'
import PropTypes from 'prop-types'

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  variant = 'fade',
  size = 'normal'
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: variant === 'fade' ? 20 : 0,
      rotateX: variant === '3d' ? -90 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`animated-text animated-text-${size} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="animated-word"
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  variant: PropTypes.oneOf(['fade', '3d']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
}

export default AnimatedText
