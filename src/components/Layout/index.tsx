import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import ScrollArrow from '../backarrow/ScrollArrow'
import Cursor from '../cursor/Cursor'
import ScrollProgress from '../UI/ScrollProgress/ScrollProgress'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

const Expertise    = lazy(() => import('../expertise/Expertise'))
const CaseStudies  = lazy(() => import('../caseStudies/CaseStudies'))
const Experience   = lazy(() => import('../workExperience/Experience'))
const Skills       = lazy(() => import('../Skills/Skills'))
const Writing      = lazy(() => import('../writing/Writing'))
const Testimonials = lazy(() => import('../testimonials/Testimonials'))
const Contact      = lazy(() => import('../contact/Contact'))

const SectionFallback = () => (
  <div className="section-py flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
  </div>
)

const Layout = () => (
  <div className="relative min-h-screen" style={{ background: '#050B18' }}>
    <ParticleBackground density={20} speed={0.3} />
    <ScrollProgress />
    <Cursor />
    <ScrollArrow />
    <Navbar />

    <main>
      {/* Hero via router outlet */}
      <Outlet />

      <Suspense fallback={<SectionFallback />}><Expertise /></Suspense>
      <Suspense fallback={<SectionFallback />}><CaseStudies /></Suspense>
      <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
      <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
      <Suspense fallback={<SectionFallback />}><Writing /></Suspense>
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
    </main>
  </div>
)

export default Layout
