import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { workExperience, type WorkExperience } from '../../constants/portfolioData'
import { ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react'

const ExperienceCard = ({ exp, index }: { exp: WorkExperience; index: number }) => {
  const [expanded, setExpanded] = useState(index === 0)
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 border-2 transition-colors duration-300 ${exp.current ? 'bg-blue-500 border-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-slate-700 border-slate-600'}`} />
        {index < workExperience.length - 1 && (
          <div className="w-px flex-1 bg-white/[0.06] mt-2 min-h-[2rem]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div
          className="glass-card p-5 cursor-pointer group"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-display text-[1rem] font-bold text-white">{exp.title}</h3>
                {exp.current && (
                  <span className="pill-green text-[10px]">Current</span>
                )}
              </div>
              <p className="text-blue-400 text-sm font-medium">{exp.company}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Calendar size={10} />
                  {exp.startDate} — {exp.endDate}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <MapPin size={10} />
                  {exp.location}
                </span>
              </div>
            </div>
            <button className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-0.5">
              {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2.5 pt-4 border-t border-white/[0.05]">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
                      <span className="text-[0.875rem] text-slate-400 leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/[0.05]">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="pill">{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="eyebrow">Experience</span>
            <h2 className="display-title">Where I've built</h2>
            <p className="section-desc mt-4">
              Four years across enterprise insurance, fintech, e-commerce, and
              education — shipping systems that scale.
            </p>

            <div className="mt-8 p-4 glass-card">
              <div className="text-xs font-mono text-slate-500 mb-3">At a glance</div>
              <div className="space-y-2">
                {[
                  { label: '4+ years', sub: 'professional experience' },
                  { label: '3 countries', sub: 'Malaysia · Germany · Nigeria' },
                  { label: '1M+ users', sub: 'on production systems' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white font-display">{s.label}</span>
                    <span className="text-xs text-slate-500">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div>
            {workExperience.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
