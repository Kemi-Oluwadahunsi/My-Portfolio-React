import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { testimonials } from '../../constants/portfolioData'
import TiltCard from '../UI/TiltCard/TiltCard'
import './testimonials.scss'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
}

const TestimonialCard = ({ testimonial }) => (
  <motion.div variants={cardVariants}>
    <TiltCard className="testimonial-card" intensity={8}>
      <span className="quote-mark" aria-hidden="true">&quot;</span>
      <blockquote className="testimonial-quote">
        {testimonial.quote}
      </blockquote>
      <div className="testimonial-author">
        <div className="author-avatar">
          <span>{testimonial.initials}</span>
        </div>
        <div className="author-info">
          <strong className="author-name">{testimonial.name}</strong>
          <span className="author-role">{testimonial.role}</span>
          <span className="author-company">{testimonial.company}</span>
        </div>
      </div>
    </TiltCard>
  </motion.div>
)

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="testimonials" ref={ref}>
      <div className="testimonials-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          What Leaders Say
        </motion.h1>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Testimonials
