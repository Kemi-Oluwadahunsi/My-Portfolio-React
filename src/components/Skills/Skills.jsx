import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import GradientText from '../UI/GradientText/GradientText'
import {
  Lock,
 } from 'lucide-react'
import { FaReact, FaJs, FaHtml5, FaCss3, FaSass, FaNodeJs, FaGit, FaStripe, FaEnvelope, FaBolt } from 'react-icons/fa'
import { SiTailwindcss, SiFramer, SiThreedotjs, SiExpress, SiRedux, SiReactrouter, SiAxios, SiSocketdotio, SiTypescript, SiMongodb } from 'react-icons/si'
import { RiFirebaseFill } from "react-icons/ri";
import './Skills.scss'

const skills = [
  { name: 'React.js', icon: FaReact, color: '#61dafb' },
  { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'HTML', icon: FaHtml5, color: '#e34c26' },
  { name: 'CSS', icon: FaCss3, color: '#1572b6' },
  { name: 'Sass/SCSS', icon: FaSass, color: '#cc6699' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055ff' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#00d9ff' },
  { name: 'GSAP', icon: FaBolt, color: '#88ce02' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'Firebase', icon: RiFirebaseFill, color: '#ffca28' },
  { name: 'Git/GitHub', icon: FaGit, color: '#f05032' },
  { name: 'Redux Toolkit', icon: SiRedux, color: '#764abc' },
  { name: 'React Router', icon: SiReactrouter, color: '#ca4245' },
  { name: 'Axios', icon: SiAxios, color: '#5a29e4' },
  { name: 'Socket.io', icon: SiSocketdotio, color: '#ffffff' },
  { name: 'JWT', icon: Lock, color: '#d63aff' },
  { name: 'Stripe', icon: FaStripe, color: '#635bff' },
  { name: 'EmailJS', icon: FaEnvelope, color: '#ff6b6b' },
]

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="skills-section" id="skills" ref={ref}>
      <div className="skills-container">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText gradient="primary" animate={true}>
            Skills & Technologies
          </GradientText>
        </motion.h1>

        <motion.p
          className="skills-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Technologies I work with to bring ideas to life
        </motion.p>

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const SkillCard = ({ skill, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const IconComponent = skill.icon

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      className="skill-card-wrapper"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.8 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="skill-card"
        animate={
          inView && !isHovered
            ? {
                y: [0, -8, 0],
                rotateX: [0, 3, -2, 2, 0],
                rotateY: [0, 2, -2, 1, 0],
                rotateZ: [0, 1, -1, 0],
                scale: 1,
              }
            : isHovered
            ? {
                rotateX: (mousePosition.y - 90) / 15,
                rotateY: (mousePosition.x - 90) / 15,
                scale: 1.05,
                y: -5,
              }
            : {}
        }
        transition={
          isHovered
            ? {
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }
            : {
                duration: 3.5 + (index % 3) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.12,
              }
        }
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="skill-card-inner"
          animate={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(11, 24, 41, 0.95), rgba(15, 42, 61, 0.95))'
              : 'linear-gradient(135deg, rgba(11, 24, 41, 0.85), rgba(15, 42, 61, 0.85))',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="skill-icon-container"
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotateZ: isHovered ? 5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <IconComponent
              className="skill-icon"
              size={48}
              style={{ color: skill.color }}
            />
          </motion.div>
          <motion.h3
            className="skill-name"
            animate={{
              y: isHovered ? -5 : 0,
              color: isHovered ? '#bce0fb' : '#ffffff',
            }}
            transition={{ duration: 0.3 }}
          >
            {skill.name}
          </motion.h3>

          {/* Neomorphism glow effect */}
          <motion.div
            className="skill-glow"
            animate={{
              opacity: isHovered ? 0.6 : 0,
              scale: isHovered ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Skills
