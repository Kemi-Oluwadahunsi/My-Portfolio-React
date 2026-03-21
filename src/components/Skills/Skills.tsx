import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillGroups } from '../../constants/portfolioData'

const pillVariant: Record<string, string> = {
  'Frontend Core': 'pill',
  'Architecture & Tooling': 'pill-amber',
  'Backend & Databases': 'pill-green',
  'Security & Auth': 'pill-purple',
  'Testing & Quality': 'pill',
  'Currently Exploring': 'bg-slate-500/10 text-slate-400 border border-slate-500/20 inline-flex items-center text-[11px] font-mono px-2.5 py-[3px] rounded-full',
}

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="skills" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="eyebrow">Tech stack</span>
          <h2 className="display-title">Skills & tools</h2>
          <p className="section-desc">
            The full stack of technologies I work with daily — from shell app design
            to database layer, auth systems to developer tooling.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass-card p-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/15 flex items-center justify-center text-blue-400 text-sm font-mono">
                  {group.icon}
                </span>
                <span className="font-display text-sm font-bold text-white">{group.category}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={pillVariant[group.category] ?? 'pill'}
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
