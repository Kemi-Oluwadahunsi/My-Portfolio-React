import './services.scss'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { services } from '../../constants/portfolioData'
import GlassCard from '../UI/GlassCard/GlassCard'
import GlowCard from '../UI/GlowCard/GlowCard'
import { useEffect, useRef } from 'react'
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
          <h1>
            <b>Unique</b> Ideas
          </h1>
        </motion.div>

        <motion.div
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1>
            <b>For Your</b> Business.
          </h1>
        </motion.div>
      </div>

      <div className="listContainer" ref={cardsRef}>
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="service-card-wrapper"
            whileHover={{ y: -15, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <GlowCard intensity="medium" className="service-glow-wrapper">
              <GlassCard className="service-box">
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
              <p>{service.description}</p>
              <motion.div
                className="service-line"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              />
              </GlassCard>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services
