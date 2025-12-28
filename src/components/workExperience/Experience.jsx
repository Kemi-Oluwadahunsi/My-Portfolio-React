import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faDotCircle, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import './experience.scss'
import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { workExperience } from '../../constants/portfolioData'
import GlassCard from '../UI/GlassCard/GlassCard'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const experiences = workExperience

const Each = ({ experience }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateXValue = (mouseY / rect.height) * -10
    const rotateYValue = (mouseX / rect.width) * 10
    
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="experience-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05, z: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <GlassCard className="experience-card">
        <motion.div
          className="card-front"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="card-content">
            <div className="card-icon">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <h2 className="expT">{experience.title}</h2>
            <div className="date">
              <span>
                {experience.startDate} - <span>{experience.endDate}</span>
              </span>
            </div>
            <h3 className="company">{experience.company}</h3>
            <motion.div
              className="flip-hint"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span>Hover to see details</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="card-back"
          animate={{ rotateY: isHovered ? 0 : -180 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="card-content">
            <div className="detail-title">
              <h4>Job Details</h4>
              <FontAwesomeIcon icon={faArrowDown} />
            </div>

            <div className="description">
              {experience.details.map((data) => (
                <motion.div
                  key={data.id}
                  className="describe"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: data.id * 0.1 }}
                >
                  <FontAwesomeIcon icon={faDotCircle} className="dotIcon" />
                  <p>{data.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </motion.div>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && inView) {
      const cards = containerRef.current.children
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [inView])

  return (
    <div className="experience" ref={ref}>
      <div className="experienceContain">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h1>
        <motion.p
          className="click-card"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hover over each card to view Job Details
        </motion.p>

        <div className="card-wrapper" ref={containerRef}>
          {experiences.map((item) => (
            <Each experience={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
