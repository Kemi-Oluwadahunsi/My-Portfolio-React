import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillGroups } from '../../constants/portfolioData'

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Technical skills</span>
          <h2 className="section-title">Stack & Tooling</h2>
          <p className="section-subtitle">
            No progress bars. No guesswork. Just the tools I use daily and the ones I'm actively exploring.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card p-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-base w-7 h-7 flex items-center justify-center rounded-md"
                  style={{ background: 'rgb(59 130 246 / 0.1)', color: 'var(--color-brand-blue-light)' }}
                >
                  {group.icon}
                </span>
                <h3
                  className="font-mono text-xs font-medium uppercase tracking-widest"
                  style={{ color: group.category === 'Currently Exploring' ? 'var(--color-brand-amber)' : 'var(--color-brand-blue-light)' }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={group.category === 'Currently Exploring' ? 'tag-pill-amber' : 'tag-pill'}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
