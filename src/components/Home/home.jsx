import './home.scss'
import Kemi from '/images/creative-Kemi.webp'
import { useState, lazy, Suspense } from 'react'
import AnimatedLetters from '../AnimatedLetters/animated'
import '../AnimatedLetters/animated.scss'
import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from '../UI/Button/Button'
import GradientText from '../UI/GradientText/GradientText'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'
import FloatingElements from '../UI/FloatingElements/FloatingElements'

// Lazy load 3D component
const Hero3D = lazy(() => import('../3D/Hero3D'))

const Home = () => {
  const [letterClass] = useState('text-animate')
  const [ref, inView] = useInView({
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
    'W',
    'e',
    'b',
    ' ',
    'D',
    'e',
    'v',
    'e',
    'l',
    'o',
    'p',
    'e',
    'r',
    '.',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="container home-page"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <ParticleBackground density={30} speed={0.5} />
      <FloatingElements />
      
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div className="text-zone">
        <motion.h1 variants={itemVariants}>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>&apos;m</span>
          <motion.img
            src={Kemi}
            alt="introduction"
            className="k-letter"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
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

        <motion.h2 variants={itemVariants}>
          <GradientText gradient="primary" animate={true}>
            Frontend Developer / Code Enthusiast
          </GradientText>
        </motion.h2>

        <motion.div
          className="buttons"
          variants={itemVariants}
          to="services"
        >
          <ScrollLink to="portfolioSection" smooth={true} duration={500}>
            <Button variant="primary" size="lg">
              See my Latest Works
            </Button>
          </ScrollLink>

          <ScrollLink to="contact" smooth={true} duration={500}>
            <Button variant="outline" size="lg">
              CONTACT ME
            </Button>
          </ScrollLink>
        </motion.div>
      </div>

      <motion.div
        className="imageContainer"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          className="my-image"
          src="/my-image3.webp"
          alt="Kemi Oluwadahunsi - Frontend Developer"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  )
}

export default Home
