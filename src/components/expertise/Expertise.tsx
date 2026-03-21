import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { expertiseAreas } from '../../constants/portfolioData'

const Expertise = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="expertise" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="eyebrow">What I do</span>
          <h2 className="display-title">Areas of expertise</h2>
          <p className="section-desc">
            Four years shipping enterprise-grade systems across frontend architecture,
            IAM engineering, and full-stack development — with a focus on building
            things that teams can own and scale.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {expertiseAreas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 text-lg mb-5 font-mono">
                {area.icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-[1.05rem] font-bold text-white mb-2 leading-snug">
                {area.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {area.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {area.tags.map((tag) => (
                  <span key={tag} className="pill">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Expertise
