import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { testimonials } from '../../constants/portfolioData'
import { Quote } from 'lucide-react'

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="testimonials" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <span className="eyebrow justify-center">Social proof</span>
          <h2 className="display-title">What engineering leaders say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="glass-card p-7 relative"
            >
              <Quote size={20} className="text-blue-500/30 mb-4" />
              <p className="text-slate-300 text-[1rem] leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-300 font-mono">{t.initials}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
