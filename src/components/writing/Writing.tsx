import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, BookOpen, Rss, Clock } from 'lucide-react'
import { writingContent, type Writing as WritingType } from '../../constants/portfolioData'

const STATUS_CONFIG = {
  published:     { label: 'Published',    className: 'tag-pill'        },
  'in-progress': { label: 'In Progress',  className: 'tag-pill-amber'  },
  'coming-soon': { label: 'Coming Soon',  className: 'tag-pill'        },
} as const

const TYPE_ICONS = {
  ebook:   <BookOpen size={16} />,
  post:    <Rss size={16} />,
  article: <Rss size={16} />,
}

const WritingCard = ({ piece, index }: { piece: WritingType; index: number }) => {
  const cfg = STATUS_CONFIG[piece.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 flex flex-col gap-4"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: piece.type === 'ebook' ? 'rgb(59 130 246 / 0.1)' : 'rgb(245 158 11 / 0.1)',
            color: piece.type === 'ebook' ? 'var(--color-brand-blue-light)' : 'var(--color-brand-amber)',
          }}
        >
          {TYPE_ICONS[piece.type]}
        </div>
        <span className={cfg.className}>{cfg.label}</span>
      </div>

      {/* Title + description */}
      <div className="flex-1">
        <h3 className="text-white font-semibold text-sm leading-snug mb-2">
          {piece.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{piece.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {piece.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {/* CTA */}
      {piece.url ? (
        <a
          href={piece.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 mt-auto"
          style={{ color: 'var(--color-brand-blue-light)' }}
        >
          Read on LinkedIn
          <ExternalLink size={11} />
        </a>
      ) : (
        <span
          className="flex items-center gap-1.5 text-xs font-mono mt-auto"
          style={{ color: '#475569' }}
        >
          <Clock size={11} />
          {piece.status === 'in-progress' ? 'Actively writing' : 'Up next'}
        </span>
      )}
    </motion.div>
  )
}

const Writing = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

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
          <h2 className="section-title">Technical Content</h2>
          <p className="section-subtitle">
            Writing a two-book series on Webpack 5 Module Federation from real production
            experience. Also creating regular engineering content on LinkedIn and X.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {writingContent.map((piece, i) => (
            <WritingCard key={piece.id} piece={piece} index={i} />
          ))}
        </div>

        {/* Ebook waitlist banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
          style={{
            background: 'linear-gradient(135deg, rgb(59 130 246 / 0.07), rgb(10 22 40 / 0.8))',
            border: '1px solid rgb(59 130 246 / 0.15)',
          }}
        >
          <div>
            <p className="text-white font-medium text-sm mb-1">
              Get notified when Book 1 launches
            </p>
            <p className="text-slate-400 text-sm">
              The most in-depth practical guide to Webpack 5 Module Federation — written from real enterprise MFE implementation.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/oluwakemioluwadahunsi/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            Join the waitlist
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Writing
