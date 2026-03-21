import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { expertiseAreas, type ExpertiseArea } from '../../constants/portfolioData'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const ExpertiseCard = ({ area }: { area: ExpertiseArea }) => (
  <motion.div
    variants={cardVariants}
    className="card p-6 group cursor-default"
  >
    <div className="flex items-start gap-4 mb-4">
      <span
        className="text-2xl shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
        style={{ background: 'rgb(59 130 246 / 0.08)', color: 'var(--color-brand-blue-light)' }}
      >
        {area.icon}
      </span>
      <h3 className="text-white font-medium text-base leading-snug pt-1.5">
        {area.title}
      </h3>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed mb-4">
      {area.description}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {area.tags.map((tag) => (
        <span key={tag} className="tag-pill">{tag}</span>
      ))}
    </div>
  </motion.div>
)

const Expertise = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="expertise" className="section-padding" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">What I do</span>
          <h2 className="section-title">Areas of Expertise</h2>
          <p className="section-subtitle">
            From designing distributed MFE systems to writing deeply technical content,
            here is where I operate at my best.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {expertiseAreas.map((area) => (
            <ExpertiseCard key={area.id} area={area} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Expertise
