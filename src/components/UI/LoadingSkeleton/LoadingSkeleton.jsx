import './LoadingSkeleton.scss'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'
import { IN_APP_LOADER } from '../Loader/loaderConfig'

// Route and lazy-section placeholder; independent of the opening splash.
const LoadingSkeleton = ({ width = '100%', height = '1rem', className = '' }) => (
  <div className={`skeleton-container ${className}`} style={{ width, height }}>
    <Loader variant={IN_APP_LOADER} />
  </div>
)

LoadingSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
}

export default LoadingSkeleton
