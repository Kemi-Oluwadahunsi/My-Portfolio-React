import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlowCard from '../UI/GlowCard/GlowCard'
import GradientText from '../UI/GradientText/GradientText'
import './Skills.scss'

if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const skills = [
  { name: 'React.js', level: 95, icon: '⚛️' },
  { name: 'JavaScript', level: 90, icon: '🟨' },
  { name: 'TypeScript', level: 85, icon: '📘' },
  { name: 'HTML/CSS', level: 95, icon: '🎨' },
  { name: 'Sass/SCSS', level: 90, icon: '💅' },
  { name: 'Tailwind CSS', level: 92, icon: '🌊' },
  { name: 'Framer Motion', level: 90, icon: '✨' },
  { name: 'Three.js', level: 75, icon: '🎭' },
  { name: 'GSAP', level: 80, icon: '🎬' },
  { name: 'Node.js', level: 80, icon: '🟢' },
  { name: 'Git/Github', level: 95, icon: '🔀' },
  { name: 'UI/UX Design', level: 70, icon: '🎯' },
]

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && inView) {
      const bars = containerRef.current.querySelectorAll('.skill-bar-fill')
      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width')
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${width}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }
  }, [inView])

  return (
    <section className="skills-section" id='skills' ref={ref}>
      <div className="skills-container">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText gradient="primary" animate={true}>
            Skills & Technologies
          </GradientText>
        </motion.h1>

        <motion.p
          className="skills-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Technologies I work with to bring ideas to life
        </motion.p>

        <div className="skills-grid" ref={containerRef}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item-wrapper"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlowCard intensity="low" className="skill-glow">
                <motion.div
                  className="skill-item"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  data-width={skill.level}
                  style={{
                    background: `linear-gradient(90deg, var(--color-primary, #bce0fb), var(--color-primaryDark, #8bc5f0))`,
                  }}
                />
              </div>
                </motion.div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
