import './services.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { services } from '../../constants/portfolioData'
import GlassCard from '../UI/GlassCard/GlassCard'
import GlowCard from '../UI/GlowCard/GlowCard'
import { useEffect, useRef, useState } from 'react'

const cardVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  },
}

const listContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const containerRef = useRef(null)
  const [expandedCard, setExpandedCard] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleCard = (id) => {
    if (isMobile) {
      setExpandedCard(expandedCard === id ? null : id)
    }
  }

  return (
    <div className="services" id="services" ref={ref}>
      <div ref={containerRef} className="services-background" />
      <motion.div
        className="textContainer"
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8 }}
      >
        <p>
          Four years shipping enterprise-grade systems{' '}
          <span>across frontend, IAM & full-stack</span>
        </p>
      </motion.div>

      <div className="titleContainer">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1>
            <b>Crafting</b> Solutions
          </h1>
        </motion.div>

        <motion.div
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1>
            <b>That</b> Scale.
          </h1>
        </motion.div>
      </div>

      <motion.div
        className={`listContainer ${isMobile ? 'accordion-mode' : ''}`}
        style={{ perspective: '1200px' }}
        variants={listContainerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            className={`service-card-wrapper ${isMobile && expandedCard === service.id ? 'expanded' : ''}`}
            variants={cardVariants}
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={!isMobile ? { y: -15, scale: 1.03 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => toggleCard(service.id)}
          >
            <GlowCard intensity="medium" className="service-glow-wrapper">
              <GlassCard className={`service-box ${isMobile ? 'accordion-card' : ''}`}>
                <div className="card-accent-bar" />
                <div className="service-header">
                  <h2 className="serviceTitle">{service.title}</h2>
                  {isMobile && (
                    <motion.span
                      className="accordion-arrow"
                      animate={{ rotate: expandedCard === service.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  )}
                </div>

                <AnimatePresence>
                  {(!isMobile || expandedCard === service.id) && (
                    <motion.div
                      className="service-content"
                      initial={isMobile ? { height: 0, opacity: 0 } : false}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={isMobile ? { height: 0, opacity: 0 } : {}}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p>{service.description}</p>
                      {service.tags && (
                        <div className="service-tags">
                          {service.tags.map((tag) => (
                            <span key={tag} className="service-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <motion.div
                        className="service-line"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Services
