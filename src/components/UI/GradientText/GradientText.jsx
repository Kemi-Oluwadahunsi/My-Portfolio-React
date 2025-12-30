import { motion } from 'framer-motion'
import './GradientText.scss'
import PropTypes from 'prop-types'

const GradientText = ({ 
  children, 
  className = '',
  animate = true,
  gradient = 'primary'
}) => {
  return (
    <motion.span
      className={`gradient-text gradient-${gradient} ${className}`}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : {}}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
  gradient: PropTypes.oneOf(['primary', 'accent', 'rainbow']),
}

export default GradientText
