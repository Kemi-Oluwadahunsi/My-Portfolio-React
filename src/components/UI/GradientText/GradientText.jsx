import './GradientText.scss'
import PropTypes from 'prop-types'

const GradientText = ({ 
  children, 
  className = '',
  gradient = 'primary'
}) => {
  return (
    <span
      className={`gradient-text gradient-${gradient} ${className}`}
    >
      {children}
    </span>
  )
}

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
  gradient: PropTypes.oneOf(['primary', 'accent', 'rainbow']),
}

export default GradientText
