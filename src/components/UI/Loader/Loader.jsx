import { ACTIVE_LOADER } from './loaderConfig'
import PropTypes from 'prop-types'
import SignatureLoader from './variants/SignatureLoader'
import BuildLogLoader from './variants/BuildLogLoader'
import LayerStackLoader from './variants/LayerStackLoader'
import './loader.scss'

const LOADERS = {
  signature: SignatureLoader, // KM monogram written in a theme-colored gradient
  buildLog: BuildLogLoader, // terminal printing build steps with a progress bar
  layerStack: LayerStackLoader, // isometric data / api / auth / ui slabs stacking up

  // Prototyped in the loader concepts preview but not wired up yet; port on request:
  // federation: FederationLoader, // coloured page blocks snapping into a layout
  // aurora: AuroraLoader, // flowing light ribbons with a 0-100% counter
}

const Loader = ({ variant = ACTIVE_LOADER }) => {
  const Active = LOADERS[variant]
  return (
    <div className="loader-box" role="status" aria-label="Loading">
      <Active />
    </div>
  )
}

Loader.propTypes = {
  variant: PropTypes.oneOf(Object.keys(LOADERS)),
}

export default Loader
