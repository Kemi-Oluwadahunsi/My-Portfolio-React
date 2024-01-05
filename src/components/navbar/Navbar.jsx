import { motion} from 'framer-motion'
import './navbar.scss'
import { useState } from 'react'
import Logo from "/images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHamburger,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
  const [showMobileContent, setShowMobileContent] = useState(false)

  const toggleMobileContent = () => {
    setShowMobileContent(!showMobileContent)
  }

  const closeMobileContent = () => {
    setShowMobileContent(false)
  }
  return (
    <>
      {/* navbar for phone-tab view */}
      <div className="small-screens">
        <motion.div className="navbar">
          <div className="nav">
            <div className="logo">
              <img src={Logo} alt="" />
              <h3>KodeMaven</h3>
            </div>
            <div className="toggleButton">
              <button onClick={toggleMobileContent}>
                {showMobileContent ? (
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: 'none',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHamburger}
                    style={{ width: '30px', height: '30px' }}
                  />
                )}
              </button>
            </div>
          </div>

          <motion.div
            className={`bg ${showMobileContent ? 'visible' : 'hidden'}`}
          >
            <motion.ul className='navigationItems'>
              <li onClick={closeMobileContent}>Home</li>
              <li onClick={closeMobileContent}>Services</li>
              <li onClick={closeMobileContent}>Portfolio</li>
              <li onClick={closeMobileContent}>Contact</li>
            </motion.ul>

            <div className="socialIcons">
              <ul>
                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/oluwakemioluwadahunsi/"
                  >
                    <FontAwesomeIcon icon={faLinkedin} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/kaliceagbabiaka1"
                  >
                    <FontAwesomeIcon icon={faFacebook} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/km_oluwadahunsi"
                  >
                    <FontAwesomeIcon icon={faXTwitter} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://github.com/Kemi-Oluwadahunsi/"
                  >
                    <FontAwesomeIcon icon={faGithub} color="#0c0c1d" />
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Navbar
