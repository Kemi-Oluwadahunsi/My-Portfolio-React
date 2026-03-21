import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { caseStudies, type CaseStudy } from '../../constants/portfolioData'
import { ExternalLink, ChevronDown, ChevronUp, Building2, Package, Layers } from 'lucide-react'

const categoryIcon = {
  enterprise: Building2,
  'open-source': Package,
  product: Layers,
  fullstack: Layers,
}

const categoryColor: Record<string, string> = {
  enterprise: 'pill-amber',
  'open-source': 'pill-green',
  product: 'pill-purple',
  fullstack: 'pill',
}

const badgeStyle: Record<string, string> = {
  'Flagship Project': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Cross-Stack Architecture': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Open Source · npm': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const CaseStudyCard = ({ cs, index }: { cs: CaseStudy; index: number }) => {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })
  const Icon = categoryIcon[cs.category] ?? Layers

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="glass-card overflow-hidden"
    >
      {/* Card header */}
      <div className="p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
              <Icon size={16} />
            </div>
            {cs.badge && (
              <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${badgeStyle[cs.badge] ?? 'bg-blue-500/10 text-blue-300 border-blue-500/20'}`}>
                {cs.badge}
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-600 shrink-0 mt-1">{cs.period}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-white leading-snug mb-1">
          {cs.title}
        </h3>
        {cs.company && (
          <p className="text-xs font-mono text-blue-400 mb-3">{cs.company}</p>
        )}
        <p className="text-slate-400 text-[0.925rem] leading-relaxed">{cs.summary}</p>

        {/* Impact bullets */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Impact & outcomes</p>
                <ul className="space-y-2">
                  {cs.impact.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
                      <span className="text-sm text-slate-300 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card footer */}
      <div className="px-6 lg:px-7 pb-5 flex items-center justify-between gap-4">
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {cs.techStack.slice(0, expanded ? cs.techStack.length : 5).map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
          {!expanded && cs.techStack.length > 5 && (
            <span className="pill">+{cs.techStack.length - 5} more</span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {cs.links?.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition-colors"
            >
              {link.label}
              <ExternalLink size={11} />
            </a>
          ))}
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
          >
            {expanded ? (
              <><ChevronUp size={14} /> Less</>
            ) : (
              <><ChevronDown size={14} /> Details</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const CaseStudies = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const featured = caseStudies.filter((c) => c.featured)
  const rest = caseStudies.filter((c) => !c.featured)

  return (
    <section id="work" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="eyebrow">Featured work</span>
          <h2 className="display-title">Case studies</h2>
          <p className="section-desc">
            Deep dives into the systems I've designed and shipped — from org-wide
            authentication platforms to cross-framework MFE integrations. Expand any
            card for the full impact breakdown.
          </p>
        </motion.div>

        {/* Featured case studies */}
        <div className="grid lg:grid-cols-2 gap-4 mt-14">
          {featured.map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mt-10 mb-6"
            >
              <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">Other projects</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-4">
              {rest.map((cs, i) => (
                <CaseStudyCard key={cs.id} cs={cs} index={i + featured.length} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default CaseStudies
