import './LoadingSkeleton.scss'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'

// Placeholder used while lazy sections load; shows the active site loader at the requested size.
const LoadingSkeleton = ({ width = '100%', height = '1rem', className = '' }) => (
  <div className={`skeleton-container ${className}`} style={{ width, height }}>
    <Loader />
  </div>
)

LoadingSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
}

export default LoadingSkeleton
