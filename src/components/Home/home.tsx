import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'
import { ArrowDown, Download, ExternalLink } from 'lucide-react'
import { socialLinks } from '../../constants/portfolioData'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

const stats = [
  { value: '4+', label: 'Years enterprise experience' },
  { value: '1M+', label: 'Users on production systems' },
  { value: '20+', label: 'Production apps shipped' },
  { value: '600+', label: 'Staff on live MFE platform' },
]

const roles = [
  'Micro Frontend Architect',
  'Senior Software Engineer',
  'React · TypeScript · Next.js',
  'Node.js · Webpack 5 MF',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.12 },
  }),
}

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <ParticleBackground density={28} speed={0.4} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="section-wrap w-full pt-28 pb-20 lg:pt-32 lg:pb-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div>
            {/* Availability badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for senior roles & consulting
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-display text-5xl sm:text-6xl lg:text-[4.2rem] font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-white">Oluwakemi</span>
              <br />
              <span className="gradient-h">Oluwadahunsi</span>
            </motion.h1>

            {/* Role tags */}
            <motion.div
              custom={2} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2 mt-5"
            >
              {roles.map((r) => (
                <span key={r} className="pill">{r}</span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              custom={3} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-slate-400 text-[1.05rem] leading-relaxed mt-6 max-w-lg"
            >
              I design and build scalable enterprise frontends and distributed
              micro-frontend systems. Currently engineering at{' '}
              <span className="text-white font-medium">Etiqa Insurance</span>{' '}
              — shipping the MFE auth platform used by every engineering team in the org.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <ScrollLink to="work" smooth duration={800} offset={-80}>
                <button className="btn-blue">
                  View Featured Work
                  <ArrowDown size={14} />
                </button>
              </ScrollLink>
              <Link to={socialLinks.resume} target="_blank" rel="noreferrer">
                <button className="btn-ghost">
                  <Download size={14} />
                  Download CV
                </button>
              </Link>
            </motion.div>

            {/* Social row */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex items-center gap-4 mt-8 pt-8 border-t border-white/[0.06]"
            >
              <span className="text-xs text-slate-600 font-mono uppercase tracking-widest">Find me</span>
              {[
                { href: socialLinks.linkedin, label: 'LinkedIn' },
                { href: socialLinks.github, label: 'GitHub' },
                { href: socialLinks.twitter, label: 'X / Twitter' },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  {s.label}
                  <ExternalLink size={10} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Image + stats */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            {/* Profile image */}
            <motion.div
              custom={1} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/10 blur-2xl scale-110" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <img
                  src="/my-image-2-new.webp"
                  alt="Kemi Oluwadahunsi — Senior Software Engineer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/30 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-[#0A1628] border border-white/10 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">⬡</span>
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono">Current focus</div>
                    <div className="text-xs text-white font-medium">MFE Architecture</div>
                  </div>
                </div>
              </motion.div>

              {/* Company badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-[#0A1628] border border-white/10 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="text-[10px] text-slate-500 font-mono">Currently at</div>
                <div className="text-xs text-white font-medium">Etiqa Insurance</div>
              </motion.div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-3 w-full max-w-xs lg:max-w-sm"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={4 + i * 0.5}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="glass-card p-4 text-center"
                >
                  <div className="font-display text-2xl font-bold gradient-h">{stat.value}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          custom={8} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-2 mt-16 lg:mt-20"
        >
          <span className="text-xs font-mono text-slate-600 tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-slate-600"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
