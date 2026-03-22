import './portfolio.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { portfolioItems } from '../../constants/portfolioData'
import GlowCard from '../UI/GlowCard/GlowCard'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'frontend', label: 'Frontend' },
]

const Single = ({ item, index }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const cardRef = useRef(null)
  const navigate = useNavigate()

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -5)
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="portfolio-item"
    >
      <GlowCard intensity="medium" className="portfolio-glow-wrapper">
        <motion.div
          ref={cardRef}
          className="wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.03, z: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="category-badge">{item.category}</div>

          <motion.div
            className="imageContain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.img}
              alt={`${item.title} project screenshot`}
              loading="lazy"
            />
          </motion.div>

          <div className="text">
            <h2>{item.title}</h2>
            <p>{item.description}</p>

            <div className="stacks">
              {item.stacks.map((tech, i) => (
                <span key={i} className="stack-pill">{tech}</span>
              ))}
            </div>

            <div className="links">
              <a
                className="link interactive"
                href={item.live}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={`View live ${item.title} project`}
              >
                <FontAwesomeIcon icon={faDisplay} />
                <span>Live Demo</span>
              </a>

              <a
                className="link interactive"
                href={item.gitHub}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={`View ${item.title} source code on GitHub`}
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>Source</span>
              </a>

              {item.hasCaseStudy && (
                <button
                  className="link case-study-link interactive"
                  onClick={() => navigate(`/case-study/${item.caseStudyId}`)}
                  aria-label={`Read ${item.title} case study`}
                >
                  <span>Case Study</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </GlowCard>
    </motion.div>
  )
}

Single.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

const CarouselCard = ({ item }) => {
  const navigate = useNavigate()

  return (
    <div className="carousel-card">
      <div className="category-badge">{item.category}</div>
      <div className="carousel-image">
        <img src={item.img} alt={item.title} loading="lazy" />
      </div>
      <div className="carousel-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="carousel-stacks">
          {item.stacks.map((tech, i) => (
            <span key={i} className="stack-pill">{tech}</span>
          ))}
        </div>
        <div className="carousel-links">
          <a href={item.live} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDisplay} /> Live
          </a>
          <a href={item.gitHub} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> Code
          </a>
          {item.hasCaseStudy && (
            <button onClick={() => navigate(`/case-study/${item.caseStudyId}`)}>
              Case Study <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

CarouselCard.propTypes = {
  item: PropTypes.object.isRequired,
}

const Portfolio = () => {
  const { ref } = useInView({ threshold: 0.1, triggerOnce: true })
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 900)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  const handleScroll = () => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.offsetWidth * 0.85
    setActiveIndex(Math.round(carouselRef.current.scrollLeft / cardWidth))
  }

  const scrollToCard = (index) => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.offsetWidth * 0.85
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    setActiveIndex(index)
  }

  return (
    <div className="portfolio" ref={ref}>
      <motion.div
        className="progress"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Featured Work</h1>
      </motion.div>

      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-tab ${activeFilter === cat.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isSmallScreen ? (
        <div className="carousel-container">
          <div className="carousel-track" ref={carouselRef} onScroll={handleScroll}>
            {filteredItems.map((item) => (
              <CarouselCard key={item.id} item={item} />
            ))}
          </div>
          <div className="carousel-dots">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                className={`dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          <p className="swipe-hint">Swipe to explore</p>
        </div>
      ) : (
        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <Single item={item} key={item.id} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default Portfolio
