import { motion } from 'framer-motion'
import './GlassCard.scss'
import PropTypes from 'prop-types'

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(188, 224, 251, 0.2)'
      } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
}

export default GlassCard
