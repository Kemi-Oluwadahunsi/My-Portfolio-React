import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'
import GradientText from '../UI/GradientText/GradientText'
import { skillGroups } from '../../constants/portfolioData'
import './Skills.scss'

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="skills-section" id="skills" ref={ref}>
      <div className="skills-container">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText gradient="primary" animate={true}>
            Stack & Tooling
          </GradientText>
        </motion.h1>

        <motion.p
          className="skills-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tools I use daily and the ones I&apos;m actively exploring.
        </motion.p>

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {skillGroups.map((group, index) => (
            <SkillGroupCard
              key={group.category}
              group={group}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const SkillGroupCard = ({ group, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const ticking = useRef(false)
  const isExploring = group.category === 'Currently Exploring'

  const handleMouseMove = (e) => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (rect) {
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          setMousePosition({ x, y })
        }
        ticking.current = false
      })
      ticking.current = true
    }
  }

  return (
    <motion.div
      className="skill-card-wrapper"
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="skill-card"
        animate={
          isHovered
            ? {
                rotateX: (mousePosition.y - 150) / 25,
                rotateY: (mousePosition.x - 150) / 25,
                scale: 1.02,
                y: -4,
              }
            : { rotateX: 0, rotateY: 0, scale: 1, y: 0 }
        }
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`skill-card-inner ${isExploring ? 'exploring' : ''}`}>
          {/* Mouse-tracking glow */}
          <motion.div
            className="skill-glow"
            animate={{
              opacity: isHovered ? 0.5 : 0,
              scale: isHovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              background: isExploring
                ? 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(63, 171, 241, 0.25) 0%, transparent 70%)',
            }}
          />

          {/* Accent bar */}
          <div className={`card-accent-bar ${isExploring ? 'amber' : ''}`} />

          {/* Category header */}
          <h3 className={`group-category ${isExploring ? 'amber' : ''}`}>
            {group.category}
          </h3>

          {/* Skill pills */}
          <div className="skill-pills">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className={`skill-pill ${isExploring ? 'amber' : ''}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Skills
