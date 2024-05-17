import { motion} from 'framer-motion'
import './navbar.scss'
import { useEffect, useState } from 'react'
import Logo from "/images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'


const Navbar = () => {
  const [showMobileContent, setShowMobileContent] = useState(false)

  const toggleMobileContent = () => {
    setShowMobileContent(!showMobileContent)
  }

  const closeMobileContent = () => {
    setShowMobileContent(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.small-screens')
      if (navbar && !navbar.contains(event.target)) {
        closeMobileContent()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []) 


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
                    className='tog'
                    // style={{
                    //   width: '30px',
                    //   height: '30px',
                    //   border: 'none',
                    // }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    className='tog'
                    // style={{ width: '30px', height: '30px' }}
                  />
                )}
              </button>
            </div>
          </div>

          <motion.div
            className={`bg ${showMobileContent ? 'visible' : 'hidden'}`}
          >
            <motion.ul className="navigationItems">
              <ScrollLink className="navLinks" to="section">
                <li onClick={closeMobileContent}>Home</li>
              </ScrollLink>

              <ScrollLink className="navLinks" to="experience">
                <li onClick={closeMobileContent}>Experience</li>
              </ScrollLink>

              <ScrollLink className="navLinks" to="services">
                <li onClick={closeMobileContent}>Services</li>
              </ScrollLink>

              <ScrollLink className="navLinks" to="portfolio">
                <li onClick={closeMobileContent}>Portfolio</li>
              </ScrollLink>

              <ScrollLink className="navLinks" to="contact">
                <li onClick={closeMobileContent}>Contact</li>
              </ScrollLink>

              <Link
                to="https://drive.google.com/file/d/1H15Xq0YCk0CEVPFh9Vn9lBdExp5zx5_p/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="resume navLinks"
              >
                <li onClick={closeMobileContent}>Resume</li>
              </Link>
            </motion.ul>

            <div className="socialIcons">
              <ul>
                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/oluwakemioluwadahunsi/"
                  >
                    <FontAwesomeIcon icon={faLinkedin} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noopenener noreferrer"
                    href="https://www.facebook.com/kaliceagbabiaka1"
                  >
                    <FontAwesomeIcon icon={faFacebook} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/km_oluwadahunsi"
                  >
                    <FontAwesomeIcon icon={faXTwitter} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Kemi-Oluwadahunsi/"
                  >
                    <FontAwesomeIcon icon={faGithub} color="#0c0c1d" />
                  </a>
                </li>

                <li onClick={closeMobileContent}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/+2348146433203"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} color="#0c0c1d" />
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
