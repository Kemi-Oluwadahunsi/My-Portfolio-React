import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Package, Layers, FlaskConical } from 'lucide-react'
import {
  openSourceProjects,
  futureProjects,
  socialLinks,
  type FutureProject,
} from '../../constants/portfolioData'

const STAGE_CONFIG: Record<FutureProject['stage'], { label: string; color: string }> = {
  research: { label: 'In Research',  color: 'var(--color-brand-blue-light)' },
  planning: { label: 'Planning',     color: 'var(--color-brand-amber)'      },
  building: { label: 'Building',     color: '#4ade80'                       },
}

const OpenSource = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="opensource" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Open Source & Future Projects</span>
          <h2 className="section-title">Building in Public</h2>
          <p className="section-subtitle">
            Shipped, maintained, and in the pipeline — work that exists beyond any employer.
          </p>
        </motion.div>

        {/* Published projects */}
        <div className="mb-10">
          {openSourceProjects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgb(59 130 246 / 0.1)', color: 'var(--color-brand-blue-light)' }}
                  >
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="text-white font-semibold font-mono">{proj.name}</p>
                    <p className="text-slate-500 text-xs">npm package · TypeScript · React</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tag-pill">Active</span>
                  {proj.stats.components && (
                    <span className="tag-pill-amber">
                      {proj.stats.components}+ components
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">{proj.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {proj.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t" style={{ borderColor: 'rgb(255 255 255 / 0.05)' }}>
                <a href={proj.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  <Github size={14} />
                  GitHub
                </a>
                {proj.storybook && (
                  <a href={proj.storybook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    <Layers size={14} />
                    Storybook
                  </a>
                )}
                {proj.npm && (
                  <a href={proj.npm} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    <ExternalLink size={14} />
                    npm
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="glow-line mb-10" />

        {/* Future projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-white font-medium mb-1 flex items-center gap-2">
            <FlaskConical size={16} style={{ color: 'var(--color-brand-amber)' }} />
            In the pipeline
          </p>
          <p className="text-slate-500 text-sm">Developer tools I'm designing and researching.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futureProjects.map((proj, i) => {
            const stage = STAGE_CONFIG[proj.stage]
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                className="rounded-xl p-5"
                style={{
                  background: 'rgb(10 22 40 / 0.5)',
                  border: '1px solid rgb(255 255 255 / 0.06)',
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-white text-sm font-medium leading-snug">{proj.title}</h3>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: `${stage.color}15`,
                      color: stage.color,
                      border: `1px solid ${stage.color}30`,
                    }}
                  >
                    {stage.label}
                  </span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Github size={15} />
            View GitHub profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default OpenSource
