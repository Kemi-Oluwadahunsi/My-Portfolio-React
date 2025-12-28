import { motion } from 'framer-motion'
import './Button.scss'
import PropTypes from 'prop-types'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = `btn btn-${variant} btn-${size} ${className}`.trim()

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -2,
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      <span className="btn-content">{children}</span>
      <span className="btn-shine"></span>
      <motion.span
        className="btn-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default Button
