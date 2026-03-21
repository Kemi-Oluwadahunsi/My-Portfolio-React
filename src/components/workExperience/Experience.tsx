import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { workExperience } from '../../constants/portfolioData'

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
          <span className="section-label">Background</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            4+ years building enterprise-grade systems across insurance, fintech,
            e-commerce, and education.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, rgb(59 130 246 / 0.4), rgb(59 130 246 / 0.05))' }}
          />

          <div className="space-y-10">
            {workExperience.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:pl-8"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-1.5 -translate-x-1/2 items-center justify-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full border-2"
                    style={{
                      borderColor: job.current ? 'var(--color-brand-blue)' : 'rgb(51 65 85)',
                      background:  job.current ? 'var(--color-brand-blue)' : 'var(--color-navy-900)',
                    }}
                  />
                </div>

                <div className="card p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-white font-semibold text-base">{job.title}</h3>
                        {job.current && (
                          <span className="tag-pill-amber text-xs">Current</span>
                        )}
                      </div>
                      <p className="text-blue-400 font-mono text-sm">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                        <Calendar size={11} />
                        {job.startDate} — {job.endDate}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <MapPin size={11} />
                        {job.location}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-5">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                        <span
                          className="mt-2 w-1 h-1 rounded-full shrink-0"
                          style={{ background: 'var(--color-brand-blue)' }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://drive.google.com/file/d/1tJgWBOmxZ1hlfbFtRdryVnHNSfKuqahr/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            View full resume
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
