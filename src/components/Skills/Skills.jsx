import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
            <SkillGroup
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

const SkillGroup = ({ group, index, inView }) => {
  const isExploring = group.category === 'Currently Exploring'

  return (
    <motion.div
      className={`skill-group ${isExploring ? 'exploring' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h3 className="group-label">{group.category}</h3>
      <div className="skill-tags">
        {group.skills.map((skill, i) => (
          <motion.span
            key={skill}
            className="skill-tag"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + i * 0.03 + 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default Skills
