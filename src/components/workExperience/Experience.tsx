import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { workExperience, socialLinks } from '../../constants/portfolioData'

const ExperienceItem = ({
  exp,
  index,
  isLast,
}: {
  exp: (typeof workExperience)[number]
  index: number
  isLast: boolean
}) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-1.5 shrink-0 ring-2 ring-offset-2 ring-offset-[#050B18]"
          style={{
            background: exp.current ? 'var(--color-brand-blue)' : '#1e293b',
            ringColor: exp.current ? 'var(--color-brand-blue)' : '#334155',
            boxShadow: exp.current ? '0 0 8px var(--color-brand-blue)' : 'none',
          }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: 'rgb(255 255 255 / 0.07)', minHeight: '2rem' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-1">
          <h3 className="text-white font-semibold text-base leading-snug">{exp.title}</h3>
          {exp.current && (
            <span className="tag-pill-amber text-2xs">Current</span>
          )}
        </div>

        <p className="text-slate-300 text-sm font-medium mb-1">{exp.company}</p>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-slate-500 text-xs font-mono">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {exp.startDate} — {exp.endDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {exp.location}
          </span>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
              <span
                className="mt-2 w-1 h-1 rounded-full shrink-0"
                style={{ background: 'var(--color-brand-blue)' }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Career</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            4+ years building across enterprise insurance, fintech, e-commerce,
            and international remote teams.
          </p>
        </motion.div>

        <div className="max-w-3xl">
          {workExperience.map((exp, i) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === workExperience.length - 1}
            />
          ))}
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-2"
        >
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            View full résumé
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
