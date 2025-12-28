import './LoadingSkeleton.scss'
import PropTypes from 'prop-types'

const LoadingSkeleton = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '0.25rem',
  className = '' 
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      aria-label="Loading..."
    />
  )
}

LoadingSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
}

export default LoadingSkeleton
