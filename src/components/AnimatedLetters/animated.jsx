import '../Layout/index.scss'
import PropTypes from 'prop-types'

const AnimatedLetters = ({ letterClass, strArray, idx }) => {
  AnimatedLetters.propTypes = {
    letterClass: PropTypes.string.isRequired,
    strArray: PropTypes.array.isRequired,
    idx: PropTypes.number.isRequired,
  }

  return (
    <span>
      {strArray.map((char, i) => (
        <span key={char + i} className={`${letterClass} _${i + idx}`}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default AnimatedLetters
