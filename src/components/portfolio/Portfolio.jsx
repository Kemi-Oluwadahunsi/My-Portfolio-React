import './portfolio.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { portfolioItems } from '../../constants/portfolioData'
import GlowCard from '../UI/GlowCard/GlowCard'
import { useState, useRef } from 'react'

const Single = ({ item, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateXValue = (mouseY / rect.height) * -5
    const rotateYValue = (mouseX / rect.width) * 5
    
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <motion.section
      id="portfolioSection"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <div className="all">
        <GlowCard intensity="medium" className="portfolio-glow-wrapper">
          <motion.div
            ref={cardRef}
            className="wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.03, z: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="imageContain"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={item.img}
                alt={`${item.title} project screenshot`}
                loading="lazy"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="image-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="text">
              <motion.h2
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.h2>
              <p>{item.description}</p>
              <motion.div
                className="stacks"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.stacks}
              </motion.div>

              <motion.div 
                className="links"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.15, x: 5 }} 
                  whileTap={{ scale: 0.9 }}
                  className="link-wrapper"
                >
                  <Link
                    className="link interactive"
                    to={item.live}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={`View live ${item.title} project`}
                  >
                    <FontAwesomeIcon icon={faDisplay} color="#bce0fb" />
                    <span>Live View</span>
                  </Link>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.15, x: 5 }} 
                  whileTap={{ scale: 0.9 }}
                  className="link-wrapper"
                >
                  <Link
                    className="link interactive"
                    to={item.gitHub}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={`View ${item.title} source code on GitHub`}
                  >
                    <FontAwesomeIcon icon={faGithub} color="#bce0fb" />
                    <span>View Codes</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </GlowCard>
      </div>
    </motion.section>
  )
}

Single.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stacks: PropTypes.arrayOf(PropTypes.string).isRequired,
    live: PropTypes.string.isRequired,
    gitHub: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

const Portfolio = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div className="portfolio" ref={ref}>
      <motion.div
        className="progress"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Featured Works</h1>
        <div className="progressBar"></div>
      </motion.div>

      <div>
        {portfolioItems.map((item, index) => (
          <Single item={item} key={item.id} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Portfolio
