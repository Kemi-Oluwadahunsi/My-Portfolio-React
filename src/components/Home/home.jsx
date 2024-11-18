import './home.scss'
import Kemi from '/images/creative-Kemi.webp'
import { useState } from 'react'
import AnimatedLetters from '../AnimatedLetters/animated'
import '../AnimatedLetters/animated.scss'
import { Link as ScrollLink } from 'react-scroll'

const Home = () => {
  const [letterClass] = useState('text-animate')
  const nameArray = [
    'e',
    'm',
    'i',
    ' ',
    'O',
    'l',
    'u',
    'w',
    'a',
    'd',
    'a',
    'h',
    'u',
    'n',
    's',
    'i',
  ]
  const jobArray = [
    'W',
    'e',
    'b',
    ' ',
    'D',
    'e',
    'v',
    'e',
    'l',
    'o',
    'p',
    'e',
    'r',
    '.',
  ]

  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>&apos;m</span>
          <img src={Kemi} alt="introduction" className="k-letter" />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={15}
          />
          <br />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={22}
          />
        </h1>

        <h2>Frontend Developer / Code Enthusiast</h2>

        <div className="buttons" to="services">
          <ScrollLink to="portfolioSection" smooth={true} duration={500}>
            <button className="flat-button">See my Latest Works</button>
          </ScrollLink>

          <ScrollLink to="contact" smooth={true} duration={500}>
            <button className="flat-button">CONTACT ME</button>
          </ScrollLink>
        </div>
      </div>

      <div className="imageContainer">
        <img
          className="my-image"
          src="/my-image3.webp"
          alt="Kemi"
          loading="lazyLoading"
        />
      </div>
    </div>
  )
}

export default Home
