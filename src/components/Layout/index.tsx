import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import ScrollArrow from '../backarrow/ScrollArrow'
import Cursor from '../cursor/Cursor'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

// Lazy load all sections
const Expertise     = lazy(() => import('../expertise/Expertise'))
const CaseStudies   = lazy(() => import('../casestudies/CaseStudies'))
const Architecture  = lazy(() => import('../architecture/Architecture'))
const Experience    = lazy(() => import('../workExperience/Experience'))
const Skills        = lazy(() => import('../Skills/Skills'))
const Writing       = lazy(() => import('../writing/Writing'))
const OpenSource    = lazy(() => import('../opensource/OpenSource'))
const Testimonials  = lazy(() => import('../testimonials/Testimonials'))
const Contact       = lazy(() => import('../contact/Contact'))

const SectionFallback = () => (
  <div className="section-padding flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
  </div>
)

const Layout = () => (
  <div className="relative" style={{ background: 'var(--color-navy-900)' }}>
    <ParticleBackground density={20} speed={0.3} />
    <Cursor />
    <ScrollArrow />
    <Navbar />

    <main id="main-content">
      {/* Hero */}
      <Outlet />

      {/* Sections */}
      <Suspense fallback={<SectionFallback />}>
        <Expertise />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <CaseStudies />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <Architecture />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <Writing />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <OpenSource />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>

      <div className="glow-line section-container" />

      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </main>

    {/* Footer */}
    <footer
      className="section-container py-8 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderTop: '1px solid rgb(255 255 255 / 0.06)' }}
    >
      <p className="text-slate-600 text-xs font-mono">
        © 2026 Oluwakemi Oluwadahunsi
      </p>
      <p className="text-slate-600 text-xs font-mono">
        Built with React · TypeScript · Tailwind CSS v4
      </p>
    </footer>
  </div>
)

export default Layout
