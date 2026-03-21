import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, ExternalLink, Linkedin, Clock } from 'lucide-react'
import { writingContent } from '../../constants/portfolioData'

const STATUS_STYLES = {
  'in-progress':  { label: 'Writing now',  className: 'tag-pill-amber' },
  'coming-soon':  { label: 'Coming soon',  className: 'tag-pill' },
  'published':    { label: 'Active',        className: 'tag-pill' },
}

const Writing = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const ebooks = writingContent.filter((w) => w.type === 'ebook')
  const posts  = writingContent.filter((w) => w.type !== 'ebook')

  return (
    <section id="writing" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Writing & Education</span>
          <h2 className="section-title">Teaching What I Build</h2>
          <p className="section-subtitle">
            The Webpack 5 Module Federation space has very few practitioners who write deeply about it.
            I'm changing that.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Ebook series — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="card p-6 h-full"
              style={{
                background: 'linear-gradient(135deg, rgb(59 130 246 / 0.07), var(--color-navy-800))',
                borderColor: 'rgb(59 130 246 / 0.18)',
              }}
            >
              <div className="flex items-start gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgb(59 130 246 / 0.15)' }}
                >
                  <BookOpen size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Micro Frontends with Webpack 5 Module Federation
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Two-book series. Written from real enterprise implementation experience.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {ebooks.map((book, i) => {
                  const status = STATUS_STYLES[book.status]
                  return (
                    <div
                      key={book.id}
                      className="flex items-start gap-4 p-4 rounded-xl"
                      style={{ background: 'rgb(0 0 0 / 0.2)', border: '1px solid rgb(255 255 255 / 0.05)' }}
                    >
                      <span
                        className="mt-0.5 text-xs font-mono font-semibold w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgb(59 130 246 / 0.15)', color: 'var(--color-brand-blue-light)' }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                          <p className="text-white text-sm font-medium">{book.title.split('—')[1]?.trim() ?? book.title}</p>
                          <span className={status.className}>{status.label}</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{book.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgb(255 255 255 / 0.06)' }}>
                <p className="text-slate-500 text-xs mb-3 flex items-center gap-1.5">
                  <Clock size={11} /> Follow for release updates
                </p>
                <a
                  href="https://www.linkedin.com/in/oluwakemioluwadahunsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs px-4 py-2 inline-flex"
                >
                  <Linkedin size={13} />
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* LinkedIn content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="card p-5 flex-1 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Linkedin size={16} className="text-blue-400" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">LinkedIn</span>
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{post.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-auto font-mono"
                  >
                    View profile
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            ))}

            {/* X/Twitter content card */}
            <div className="card p-5">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">X / Twitter</p>
              <p className="text-white text-sm font-medium mb-1.5">@km_oluwadahunsi</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                Technical threads on MFE, TypeScript, architecture decisions, and engineering career.
              </p>
              <a
                href="https://twitter.com/km_oluwadahunsi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-mono"
              >
                Follow on X
                <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Writing
