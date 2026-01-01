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
  const [ref] = useInView({
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

        <motion.h2 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <GradientText gradient="primary" animate={true}>
            Frontend Engineer / Enterprise Solutions
          </GradientText>
        </motion.h2>

        <motion.div
          className="buttons"
          variants={itemVariants}
          to="services"
        >
          <ScrollLink to="portfolioSection" smooth={true} duration={500}>
            <Button variant="primary" size="lg" className='flat-button'>
              See my Latest Works
            </Button>
          </ScrollLink>

          <ScrollLink to="contact" smooth={true} duration={500}>
            <Button variant="outline" size="lg" className='flat-button'>
              CONTACT ME
            </Button>
          </ScrollLink>
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
          alt="Kemi Oluwadahunsi - Software Engineer"
          loading="eager"
        />
      </motion.div>
    </motion.div>
  )
}

export default Home
