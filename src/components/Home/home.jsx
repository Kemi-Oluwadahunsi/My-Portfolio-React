import './home.scss'
import Kemi from '/images/creative-Kemi.webp'
import { lazy, Suspense } from 'react'
import AnimatedLetters from '../AnimatedLetters/animated'
import '../AnimatedLetters/animated.scss'
import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import GradientText from '../UI/GradientText/GradientText'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'
import FloatingElements from '../UI/FloatingElements/FloatingElements'
import AnimatedCounter from '../UI/AnimatedCounter/AnimatedCounter'
import MagneticButton from '../UI/MagneticButton/MagneticButton'
import { socialLinks } from '../../constants/portfolioData'

// Lazy load 3D component
const Hero3D = lazy(() => import('../3D/Hero3D'))

const roles = [
  'Micro Frontend Architect',
  'Software Engineer',
  'React · TypeScript · Next.js',
  'Node.js · Webpack 5 MF',
]

const stats = [
  { value: 4, suffix: '+', label: 'Years enterprise experience' },
  { value: 1, suffix: 'M+', label: 'Users on production systems' },
  { value: 20, suffix: '+', label: 'Production apps shipped' },
  { value: 600, suffix: '+', label: 'Staff on live MFE platform' },
]

const Home = () => {
  const letterClass = 'text-animate'
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const nameArray = [
    'e',
    'm',
    'i',
    ' ',
    'O',
    'l',
    'u',
    'w',
    'a',
    'd',
    'a',
    'h',
    'u',
    'n',
    's',
    'i',
  ]
  const jobArray = [
    'S',
    'o',
    'f',
    't',
    'w',
    'a',
    'r',
    'e',
    ' ',
    'E',
    'n',
    'g',
    'i',
    'n',
    'e',
    'e',
    'r',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="container home-page"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ParticleBackground density={30} speed={0.5} />
      <FloatingElements />
      
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div className="text-zone">
        <motion.div
          className="availability-badge"
          variants={itemVariants}
        >
          <span className="pulse-dot" />
          Available for senior roles &amp; consulting
        </motion.div>

        <motion.h1 variants={itemVariants}>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>&apos;m</span>
          <motion.img
            src={Kemi}
            alt="Kemi - Creative introduction letter K"
            className="k-letter"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            loading="eager"
          />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={15}
          />
          <br />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={22}
          />
        </motion.h1>

        <motion.div
          className="role-pills"
          variants={itemVariants}
        >
          {roles.map((role) => (
            <span key={role} className="pill">{role}</span>
          ))}
        </motion.div>

        <motion.p
          className="bio"
          variants={itemVariants}
        >
          I design and build scalable enterprise frontends and distributed
          micro-frontend systems.
        </motion.p>

        <motion.div
          className="buttons"
          variants={itemVariants}
        >
          <ScrollLink to="portfolioSection" smooth={true} duration={500} containerId="scroll-container">
            <MagneticButton className="flat-button primary-magnetic">
              View Featured Work
            </MagneticButton>
          </ScrollLink>

          <a href={socialLinks.resume} target="_blank" rel="noreferrer">
            <MagneticButton className="flat-button outline-magnetic">
              Download Resume
            </MagneticButton>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="imageContainer"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
      >
        <div className="rotating-blob" />
        <img
          className="my-image"
          src="/my-image-2-new.webp"
          alt="Kemi Oluwadahunsi — Software Engineer"
          loading="eager"
        />
      </motion.div>

      <motion.div
        className="stats-grid"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <GradientText gradient="primary" animate={false}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </GradientText>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Home
