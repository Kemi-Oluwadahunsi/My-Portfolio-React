import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Package, ExternalLink, BookOpen, FlaskConical } from 'lucide-react'
import { openSourceProjects, futureProjects } from '../../constants/portfolioData'

const STAGE_STYLES = {
  research: { label: 'In research', color: 'tag-pill' },
  planning: { label: 'Planning',    color: 'tag-pill-amber' },
  building: { label: 'Building',    color: 'tag-pill-amber' },
}

const OpenSource = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="opensource" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Open source & future work</span>
          <h2 className="section-title">Beyond the Day Job</h2>
          <p className="section-subtitle">
            Published packages, community contributions, and the developer tools I'm building next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Published OSS */}
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Package size={12} /> Published
            </p>
            <div className="space-y-4">
              {openSourceProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgb(59 130 246 / 0.1)' }}
                      >
                        <Package size={16} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-mono font-medium text-sm">{project.name}</h3>
                        <span
                          className="text-xs"
                          style={{ color: project.status === 'active' ? '#4ade80' : 'var(--color-brand-amber)' }}
                        >
                          ● {project.status === 'active' ? 'Active' : 'In progress'}
                        </span>
                      </div>
                    </div>
                    {project.stats.components && (
                      <div className="text-right shrink-0">
                        <p className="text-white font-semibold text-lg leading-none">{project.stats.components}+</p>
                        <p className="text-slate-500 text-xs">components</p>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>

                  <div
                    className="flex flex-wrap items-center gap-4 pt-3"
                    style={{ borderTop: '1px solid rgb(255 255 255 / 0.05)' }}
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                      <Github size={13} /> GitHub
                    </a>
                    {project.storybook && (
                      <a href={project.storybook} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                        <BookOpen size={13} /> Storybook
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {project.npm && (
                      <a href={project.npm} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                        <Package size={13} /> npm
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Future projects */}
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FlaskConical size={12} /> In the pipeline
            </p>
            <div className="space-y-4">
              {futureProjects.map((project, index) => {
                const stage = STAGE_STYLES[project.stage]
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="card p-5"
                    style={{ opacity: 0.85 }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-white font-medium text-sm leading-snug">{project.title}</h3>
                      <span className={`${stage.color} shrink-0`}>{stage.label}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}

              {/* GitHub CTA card */}
              <motion.a
                href="https://github.com/Kemi-Oluwadahunsi"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="card p-5 flex items-center justify-between group hover:no-underline"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgb(255 255 255 / 0.05)' }}>
                    <Github size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">github.com/Kemi-Oluwadahunsi</p>
                    <p className="text-slate-500 text-xs">View all repositories</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpenSource
