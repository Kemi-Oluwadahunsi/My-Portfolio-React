import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ChevronDown, ChevronUp, Building2, Package, Rocket } from 'lucide-react'
import { caseStudies, type CaseStudy } from '../../constants/portfolioData'

const CATEGORY_ICONS: Record<CaseStudy['category'], React.ReactNode> = {
  enterprise:    <Building2 size={14} />,
  'open-source': <Package size={14} />,
  product:       <Rocket size={14} />,
  fullstack:     <Rocket size={14} />,
}

const BADGE_STYLES: Record<string, string> = {
  'Flagship Project':        'tag-pill-amber',
  'Cross-Stack Architecture':'tag-pill',
  'Open Source · npm':       'tag-pill',
  'In Progress':             'tag-pill',
}

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card overflow-hidden"
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {study.badge && (
              <span className={BADGE_STYLES[study.badge] ?? 'tag-pill'}>
                {study.badge}
              </span>
            )}
            <span className="flex items-center gap-1 tag-pill opacity-70">
              {CATEGORY_ICONS[study.category]}
              {study.category}
            </span>
          </div>
          <span
            className="text-xs font-mono shrink-0"
            style={{ color: 'var(--color-brand-blue-light)', opacity: 0.7 }}
          >
            {study.period}
          </span>
        </div>

        <h3 className="text-white font-semibold text-lg leading-snug mb-1">
          {study.title}
        </h3>
        {study.company && (
          <p className="text-slate-500 text-sm font-mono mb-3">{study.company}</p>
        )}
        <p className="text-slate-400 text-sm leading-relaxed">{study.summary}</p>
      </div>

      {/* Impact bullets */}
      <div className="px-6 pb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-600 mb-3">Impact</p>
        <ul className="space-y-2">
          {study.impact.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: 'var(--color-brand-blue)' }}
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 border-t border-white/[0.05] pt-4">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-600 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {study.techStack.map((tech) => (
                  <span key={tech} className="tag-pill">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div
        className="px-6 py-3 flex items-center justify-between border-t"
        style={{ borderColor: 'rgb(255 255 255 / 0.05)' }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
          style={{ color: expanded ? 'var(--color-brand-blue-light)' : '#64748b' }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Hide stack' : 'View stack'}
        </button>

        {study.links?.length && (
          <div className="flex items-center gap-3">
            {study.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
                <ExternalLink size={11} />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

const CaseStudies = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="work" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">Case Studies</h2>
          <p className="section-subtitle">
            Real engineering decisions, real outcomes. Each entry reflects production
            work built for scale, not for demos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
