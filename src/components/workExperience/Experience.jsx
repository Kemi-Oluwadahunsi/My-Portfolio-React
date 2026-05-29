import './experience.scss'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { workExperience } from '../../constants/portfolioData'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
}

const TimelineCard = ({ experience, index }) => {
  const cardRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateX.set(((e.clientY - centerY) / rect.height) * -6)
    rotateY.set(((e.clientX - centerX) / rect.width) * 6)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
      variants={cardVariants}
    >
      <div className="timeline-dot-wrapper">
        <div className={`timeline-dot ${experience.current ? 'current' : ''}`} />
      </div>

      <motion.div
        ref={cardRef}
        className="timeline-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded((prev) => !prev)
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        aria-label={`${experience.title} at ${experience.company}. Click to ${expanded ? 'collapse' : 'expand'} details.`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <div className="card-meta">
            {experience.current && (
              <span className="current-badge">Current</span>
            )}
            <span className="date-range">
              {experience.startDate} — {experience.endDate}
            </span>
          </div>
          <h3 className="card-title">{experience.title}</h3>
          <p className="card-company">{experience.company}</p>
          {experience.location && (
            <p className="card-location">{experience.location}</p>
          )}
        </div>

        <motion.div
          className="card-body"
          initial={false}
          animate={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <ul className="highlights">
            {experience.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={expanded ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                {highlight}
              </motion.li>
            ))}
          </ul>

          <div className="tags">
            {experience.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </motion.div>

        <span className="expand-hint">
          {expanded ? 'Click to collapse' : 'Click to expand'}
        </span>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div className="experience" ref={ref}>
      <div className="experienceContain">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          4+ years building enterprise-scale web applications
        </motion.p>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="timeline-line" />
          {workExperience.map((item, index) => (
            <TimelineCard experience={item} key={item.id} index={index} />
          ))}
        </motion.div>

        <motion.a
          className="resume-cta"
          href="https://drive.google.com/file/d/1tJgWBOmxZ1hlfbFtRdryVnHNSfKuqahr/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Download Full Resume
        </motion.a>
      </div>
    </div>
  )
}

export default Experience
