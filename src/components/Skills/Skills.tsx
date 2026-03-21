import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillGroups } from '../../constants/portfolioData'

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Tools I reach for daily, grouped by function. No progress bars —
            proficiency is demonstrated by the work above.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="card p-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-base w-7 h-7 flex items-center justify-center rounded-md shrink-0"
                  style={{
                    background: group.category === 'Currently Exploring'
                      ? 'rgb(245 158 11 / 0.08)'
                      : 'rgb(59 130 246 / 0.08)',
                    color: group.category === 'Currently Exploring'
                      ? 'var(--color-brand-amber)'
                      : 'var(--color-brand-blue-light)',
                  }}
                >
                  {group.icon}
                </span>
                <h3
                  className="text-sm font-medium"
                  style={{
                    color: group.category === 'Currently Exploring'
                      ? 'var(--color-brand-amber)'
                      : 'white',
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={
                      group.category === 'Currently Exploring'
                        ? 'tag-pill-amber'
                        : 'tag-pill'
                    }
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
