import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faExternalLinkAlt,
  faCode,
  faCircle,
  faCheck,
  faLightbulb,
  faLayerGroup,
  faChartLine,
  faClock,
  faBolt,
  faRocket,
  faImages,
  faExpand,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import AnimatedCounter from '../UI/AnimatedCounter/AnimatedCounter'
import { caseStudies } from '../../constants/caseStudiesData'
import './casestudy.scss'

// ─── Animation Variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] } },
}

// ─── Animated Section Wrapper ───
const Section = ({ children, className = '', id = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
    >
      {children}
    </motion.section>
  )
}

// ─── Side Nav Dot ───
const SideNavDot = ({ label, target, active }) => (
  <button
    className={`side-nav-dot ${active ? 'active' : ''}`}
    onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}
    aria-label={`Jump to ${label}`}
  >
    <span className="dot-indicator" />
    <span className="dot-label">{label}</span>
  </button>
)

// ─── Impact Card ───
const ImpactCard = ({ metric, value, description }) => {
  const isNumeric = /^\d+/.test(value)
  const numericValue = parseInt(value, 10)
  const suffix = value.replace(/^\d+/, '')

  return (
    <motion.div className="impact-card" variants={scaleIn}>
      <div className="impact-value">
        {isNumeric ? (
          <AnimatedCounter value={numericValue} suffix={suffix} duration={2} />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div className="impact-metric">{metric}</div>
      <p className="impact-desc">{description}</p>
    </motion.div>
  )
}

// ─── Timeline Item ───
const TimelineItem = ({ phase, duration, description, index }) => (
  <motion.div className="timeline-item" variants={fadeUp}>
    <div className="timeline-marker">
      <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
      <div className="timeline-line" />
    </div>
    <div className="timeline-content">
      <div className="timeline-header">
        <h3>{phase}</h3>
        <span className="timeline-duration">
          <FontAwesomeIcon icon={faClock} /> {duration}
        </span>
      </div>
      <p>{description}</p>
    </div>
  </motion.div>
)

// ─── Gallery Section with Lightbox ───
const GallerySection = ({ gallery }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
  const nextImage = () => setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <>
      <motion.section
        ref={ref}
        id="gallery"
        className="cs-section cs-gallery"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faImages} />
          <span>04</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>Visual Walkthrough</motion.h2>
        <motion.p className="cs-section-desc" variants={fadeUp}>
          Key screens and interfaces that bring the platform to life.
        </motion.p>
        <motion.div className="cs-gallery-grid" variants={stagger}>
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              className="gallery-item"
              variants={scaleIn}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              aria-label={`View: ${item.caption}`}
            >
              <div className="gallery-image">
                <img src={item.image} alt={item.caption} loading="lazy" />
                <div className="gallery-overlay">
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </div>
              <p className="gallery-caption">{item.caption}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="cs-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lb-close" onClick={closeLightbox} aria-label="Close lightbox">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button className="lb-prev" onClick={(e) => { e.stopPropagation(); prevImage() }} aria-label="Previous image">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <motion.div
              className="lb-content"
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={gallery[lightboxIndex].image} alt={gallery[lightboxIndex].caption} />
              <p className="lb-caption">{gallery[lightboxIndex].caption}</p>
              <span className="lb-counter">{lightboxIndex + 1} / {gallery.length}</span>
            </motion.div>
            <button className="lb-next" onClick={(e) => { e.stopPropagation(); nextImage() }} aria-label="Next image">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const CaseStudyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const study = caseStudies[id]

  // Scroll to top and manage focus on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    if (pageRef.current) {
      pageRef.current.focus({ preventScroll: true })
    }
  }, [id])

  if (!study) {
    return (
      <div className="case-study-page case-study-not-found">
        <nav className="case-study-nav">
          <Link to="/" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
          </Link>
        </nav>
        <div className="not-found-content">
          <h1>Case Study Not Found</h1>
          <p>The case study &quot;{id}&quot; doesn&apos;t exist yet.</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            Return Home
          </button>
        </div>
      </div>
    )
  }

  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'approach', label: 'Approach' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'impact', label: 'Impact' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'learnings', label: 'Learnings' },
  ]

  return (
    <MotionConfig reducedMotion="user">
    <div className="case-study-page" ref={pageRef} tabIndex={-1} style={{ outline: 'none' }}>
      {/* ─── Dynamic SEO ─── */}
      <Helmet>
        <title>{study.title} — Case Study | Kemi Oluwadahunsi</title>
        <meta name="description" content={study.summary} />
        <meta property="og:title" content={`${study.title} — Case Study`} />
        <meta property="og:description" content={study.summary} />
        <meta property="og:image" content={study.heroImage} />
        <meta property="og:url" content={`https://kemi-oluwadahunsi.vercel.app/case-study/${study.id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${study.title} — Case Study`} />
        <meta name="twitter:description" content={study.summary} />
        <meta name="twitter:image" content={study.heroImage} />
        <link rel="canonical" href={`https://kemi-oluwadahunsi.vercel.app/case-study/${study.id}`} />
      </Helmet>

      {/* ─── Ambient Background ─── */}
      <div className="cs-ambient" aria-hidden="true">
        <div className="cs-ambient-orb cs-ambient-orb--1" />
        <div className="cs-ambient-orb cs-ambient-orb--2" />
      </div>

      {/* ─── Side Navigation ─── */}
      <nav className="cs-side-nav" aria-label="Case study sections">
        {sections.map((s) => (
          <SideNavDot key={s.id} label={s.label} target={s.id} />
        ))}
      </nav>

      {/* ─── Top Navigation ─── */}
      <motion.nav
        className="case-study-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Portfolio</span>
        </Link>
        <div className="cs-nav-links">
          {study.links.live && (
            <a href={study.links.live} target="_blank" rel="noopener noreferrer" className="cs-external-link">
              <FontAwesomeIcon icon={faExternalLinkAlt} /> Live
            </a>
          )}
          {study.links.github && (
            <a href={study.links.github} target="_blank" rel="noopener noreferrer" className="cs-external-link">
              <FontAwesomeIcon icon={faGithub} /> Source
            </a>
          )}
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <Section className="cs-hero" id="hero">
        <motion.span className="cs-badge" variants={fadeUp}>{study.badge}</motion.span>
        <motion.h1 className="cs-title" variants={fadeUp}>{study.title}</motion.h1>
        <motion.div className="cs-meta" variants={fadeUp}>
          <span>{study.company}</span>
          <span className="cs-meta-divider">·</span>
          <span>{study.period}</span>
        </motion.div>
        <motion.p className="cs-summary" variants={fadeUp}>{study.summary}</motion.p>
        <motion.div className="cs-hero-image" variants={scaleIn}>
          <img src={study.heroImage} alt={`${study.title} preview`} loading="eager" />
          <div className="cs-hero-image-glow" aria-hidden="true" />
        </motion.div>
      </Section>

      {/* ─── The Challenge ─── */}
      <Section className="cs-section cs-challenge" id="challenge">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faBolt} />
          <span>01</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>{study.problem.title}</motion.h2>
        <motion.p className="cs-section-desc" variants={fadeUp}>
          {study.problem.description}
        </motion.p>
        <motion.div className="cs-pain-points" variants={stagger}>
          {study.problem.painPoints.map((point, i) => (
            <motion.div key={i} className="pain-point" variants={fadeUp}>
              <div className="pain-point-icon">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <p>{point}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ─── The Approach ─── */}
      <Section className="cs-section cs-approach" id="approach">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faCode} />
          <span>02</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>{study.solution.title}</motion.h2>
        <motion.p className="cs-section-desc" variants={fadeUp}>
          {study.solution.description}
        </motion.p>
        <motion.div className="cs-decisions" variants={stagger}>
          {study.solution.keyDecisions.map((kd, i) => (
            <motion.div key={i} className="decision-card" variants={fadeUp}>
              <div className="decision-header">
                <FontAwesomeIcon icon={faCheck} />
                <h3>{kd.decision}</h3>
              </div>
              <p>{kd.rationale}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ─── Key Features ─── */}
      <Section className="cs-section cs-features" id="features">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>03</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>Key Features</motion.h2>
        <motion.div className="cs-feature-grid" variants={stagger}>
          {study.features.map((feat, i) => (
            <motion.div key={i} className="feature-card" variants={fadeUp}>
              {feat.image && (
                <div className="feature-image">
                  <img src={feat.image} alt={feat.title} loading="lazy" />
                </div>
              )}
              <div className="feature-body">
                <span className="feature-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ─── Screenshot Gallery ─── */}
      {study.gallery && study.gallery.length > 0 && (
        <GallerySection gallery={study.gallery} />
      )}

      {/* ─── Impact Metrics ─── */}
      <Section className="cs-section cs-impact" id="impact">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faChartLine} />
          <span>05</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>Measurable Impact</motion.h2>
        <motion.div className="cs-impact-grid" variants={stagger}>
          {study.impact.map((item, i) => (
            <ImpactCard key={i} {...item} />
          ))}
        </motion.div>
      </Section>

      {/* ─── Tech Stack ─── */}
      <Section className="cs-section cs-tech" id="tech">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faCode} />
          <span>06</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>Tech Stack</motion.h2>
        <motion.div className="cs-tech-groups" variants={stagger}>
          {Object.entries(study.techStack).map(([layer, techs]) => (
            <motion.div key={layer} className="tech-group" variants={fadeUp}>
              <h3 className="tech-layer">{layer}</h3>
              <div className="tech-pills">
                {techs.map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ─── Timeline ─── */}
      <Section className="cs-section cs-timeline" id="timeline">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faRocket} />
          <span>07</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>Development Timeline</motion.h2>
        <motion.div className="cs-timeline-items" variants={stagger}>
          {study.timeline.map((item, i) => (
            <TimelineItem key={i} {...item} index={i} />
          ))}
        </motion.div>
      </Section>

      {/* ─── Key Learnings ─── */}
      <Section className="cs-section cs-learnings" id="learnings">
        <motion.div className="cs-section-label" variants={fadeUp}>
          <FontAwesomeIcon icon={faLightbulb} />
          <span>08</span>
        </motion.div>
        <motion.h2 variants={fadeUp}>Key Learnings</motion.h2>
        <motion.div className="cs-learning-list" variants={stagger}>
          {study.learnings.map((learning, i) => (
            <motion.div key={i} className="learning-card" variants={fadeUp}>
              <span className="learning-index">{String(i + 1).padStart(2, '0')}</span>
              <p>{learning}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ─── Footer CTA ─── */}
      <motion.div
        className="cs-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="cs-footer-links">
          {study.links.live && (
            <a href={study.links.live} target="_blank" rel="noopener noreferrer" className="cs-cta-btn cs-cta-primary">
              <FontAwesomeIcon icon={faExternalLinkAlt} /> View Live Site
            </a>
          )}
          {study.links.github && (
            <a href={study.links.github} target="_blank" rel="noopener noreferrer" className="cs-cta-btn cs-cta-secondary">
              <FontAwesomeIcon icon={faGithub} /> View Source Code
            </a>
          )}
        </div>
        <Link to="/" className="cs-back-home">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to All Projects
        </Link>
      </motion.div>
    </div>
    </MotionConfig>
  )
}

export default CaseStudyPage
