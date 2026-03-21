import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { ArrowDown, Download, Github, Linkedin, Twitter } from 'lucide-react'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'
import { socialLinks } from '../../constants/portfolioData'

const ROLES = ['Micro Frontend Architect', 'Senior Software Engineer', 'Technical Writer']

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = () => {
  const constraintsRef = useRef(null)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={constraintsRef}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgb(59 130 246 / 0.12), transparent 70%)',
        }}
      />

      <ParticleBackground density={30} speed={0.5} />

      <div className="section-container relative z-10 w-full pt-28 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Mono label */}
          <motion.div variants={item} className="flex items-center gap-3 mb-6">
            <span className="section-label">Available for senior roles & consulting</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white mb-4"
          >
            Oluwakemi
            <br />
            <span className="gradient-text">Oluwadahunsi</span>
          </motion.h1>

          {/* Animated role titles */}
          <motion.div variants={item} className="flex flex-wrap gap-2 mb-6">
            {ROLES.map((role) => (
              <span key={role} className="tag-pill text-sm px-3 py-1.5">
                {role}
              </span>
            ))}
          </motion.div>

          {/* Positioning statement */}
          <motion.p
            variants={item}
            className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
          >
            I design and build{' '}
            <span className="text-white font-medium">enterprise-scale frontend systems</span> —
            specialising in Webpack 5 Module Federation, distributed micro-frontend architecture,
            and full-stack delivery. Currently engineering at{' '}
            <span className="text-white font-medium">Etiqa Insurance, Kuala Lumpur</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-14">
            <ScrollLink to="work" smooth duration={800}>
              <button className="btn-primary">
                View my work
                <ArrowDown size={16} />
              </button>
            </ScrollLink>

            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-1">
            {[
              { icon: Github,   href: socialLinks.github,   label: 'GitHub'   },
              { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
              { icon: Twitter,  href: socialLinks.twitter,  label: 'X / Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}

            <span className="ml-4 text-slate-600 text-sm font-mono">
              Kuala Lumpur, Malaysia
            </span>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
          className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl"
        >
          {[
            { value: '4+',  label: 'Years experience'     },
            { value: '20+', label: 'Production apps'       },
            { value: '1M+', label: 'Users served'          },
            { value: '600+',label: 'Contract staff on MFE' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-semibold text-white mb-0.5 gradient-text">{value}</p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
