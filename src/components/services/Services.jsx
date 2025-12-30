import './services.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { services } from '../../constants/portfolioData'
import GlassCard from '../UI/GlassCard/GlassCard'
import GlowCard from '../UI/GlowCard/GlowCard'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const containerRef = useRef(null)
  const [expandedCard, setExpandedCard] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (titleRef.current && inView) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )
    }
  }, [inView])

  useEffect(() => {
    if (cardsRef.current && inView) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [inView])

  const toggleCard = (id) => {
    if (isMobile) {
      setExpandedCard(expandedCard === id ? null : id)
    }
  }

  return (
    <div className="services" ref={ref}>
      <div ref={containerRef} className="services-background" />
      <motion.div
        className="textContainer"
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8 }}
      >
        <p>
          I focus on helping your brand grow <span>and move forward</span>
        </p>
      </motion.div>

      <div className="titleContainer" ref={titleRef}>
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>
            <b>Unique</b> Ideas
          </h2>
        </motion.div>

        <motion.div
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2>
            <b>For Your</b> Business.
          </h2>
        </motion.div>
      </div>

      <div className={`listContainer ${isMobile ? 'accordion-mode' : ''}`} ref={cardsRef}>
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`service-card-wrapper ${isMobile && expandedCard === service.id ? 'expanded' : ''}`}
            whileHover={!isMobile ? { y: -15, scale: 1.03 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => toggleCard(service.id)}
          >
            <GlowCard intensity="medium" className="service-glow-wrapper">
              <GlassCard className={`service-box ${isMobile ? 'accordion-card' : ''}`}>
                <div className="service-header">
                  <div className="service-icon">
                    <motion.div
                      className="icon-circle"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>
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
      </div>
    </div>
  )
}

export default Services
