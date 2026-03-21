import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { testimonials } from '../../constants/portfolioData'

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Social Proof</span>
          <h2 className="section-title">From the People I've Worked With</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6 flex flex-col gap-5"
            >
              {/* Quote mark */}
              <span
                className="text-4xl font-serif leading-none"
                style={{ color: 'var(--color-brand-blue)', opacity: 0.4 }}
              >
                "
              </span>

              <p className="text-slate-300 text-sm leading-relaxed -mt-3 flex-1">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'rgb(255 255 255 / 0.06)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{
                    background: 'rgb(59 130 246 / 0.15)',
                    color: 'var(--color-brand-blue-light)',
                    border: '1px solid rgb(59 130 246 / 0.2)',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role} · {t.company}</p>
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
