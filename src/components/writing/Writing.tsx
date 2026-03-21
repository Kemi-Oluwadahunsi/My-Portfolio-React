import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { writingContent, openSourceProjects, futureProjects } from '../../constants/portfolioData'
import { BookOpen, ExternalLink, Github, Package, FlaskConical, Hammer } from 'lucide-react'

const statusStyle: Record<string, string> = {
  published: 'pill-green',
  'in-progress': 'pill-amber',
  'coming-soon': 'bg-slate-500/10 text-slate-400 border border-slate-500/20 inline-flex items-center text-[11px] font-mono px-2.5 py-[3px] rounded-full',
}
const statusLabel: Record<string, string> = {
  published: 'Published',
  'in-progress': 'Writing now',
  'coming-soon': 'Coming soon',
}

const stageIcon: Record<string, React.ReactNode> = {
  research: <FlaskConical size={13} />,
  planning: <Hammer size={13} />,
  building: <Package size={13} />,
}
const stageStyle: Record<string, string> = {
  research: 'pill',
  planning: 'pill-amber',
  building: 'pill-green',
}

const Writing = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="writing" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="eyebrow">Beyond the code</span>
          <h2 className="display-title">Writing, OSS & what's next</h2>
          <p className="section-desc">
            I write to teach what I've learned in production — and build tools I wish
            existed as a developer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mt-14">

          {/* Writing / Education */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={14} className="text-blue-400" />
              <span className="text-sm font-semibold text-white">Writing & Education</span>
            </div>

            {writingContent.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="glass-card p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={statusStyle[item.status]}>{statusLabel[item.status]}</span>
                    {item.type === 'ebook' && <span className="pill-purple">Ebook</span>}
                  </div>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer"
                       className="text-slate-500 hover:text-blue-400 transition-colors shrink-0">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <h3 className="font-display text-[0.95rem] font-bold text-white leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[0.85rem] leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column: OSS + Future */}
          <div className="space-y-4">
            {/* Open Source */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Github size={14} className="text-blue-400" />
                <span className="text-sm font-semibold text-white">Open Source</span>
              </div>

              {openSourceProjects.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-emerald-400" />
                      <span className="text-sm font-bold text-white font-mono">{proj.name}</span>
                    </div>
                    <span className="pill-green">Active</span>
                  </div>

                  <p className="text-slate-500 text-[0.825rem] leading-relaxed mb-3">
                    {proj.description}
                  </p>

                  {proj.stats.components && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-display font-bold gradient-h">{proj.stats.components}+</span>
                      <span className="text-xs text-slate-500">components</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                    {proj.storybook && (
                      <a href={proj.storybook} target="_blank" rel="noreferrer"
                         className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                        Storybook <ExternalLink size={10} />
                      </a>
                    )}
                    <a href={proj.url} target="_blank" rel="noreferrer"
                       className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                      GitHub <ExternalLink size={10} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Future Projects */}
            <div>
              <div className="flex items-center gap-2 mb-4 mt-2">
                <FlaskConical size={14} className="text-blue-400" />
                <span className="text-sm font-semibold text-white">In the lab</span>
              </div>
              {futureProjects.map((fp, i) => (
                <motion.div
                  key={fp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="glass-card p-4 mb-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${stageStyle[fp.stage]} flex items-center gap-1`}>
                      {stageIcon[fp.stage]}
                      {fp.stage.charAt(0).toUpperCase() + fp.stage.slice(1)}
                    </span>
                  </div>
                  <h4 className="font-display text-[0.875rem] font-bold text-white leading-snug mb-1.5">
                    {fp.title}
                  </h4>
                  <p className="text-slate-500 text-[0.8rem] leading-relaxed mb-2">
                    {fp.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {fp.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Writing
