import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import ScrollArrow from '../backarrow/ScrollArrow'
import Cursor from '../cursor/Cursor'
import LoadingSkeleton from '../UI/LoadingSkeleton/LoadingSkeleton'
import ScrollProgress from '../UI/ScrollProgress/ScrollProgress'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

const Expertise = lazy(() => import('../expertise/Expertise'))
const CaseStudies = lazy(() => import('../caseStudies/CaseStudies'))
const Experience = lazy(() => import('../workExperience/Experience'))
const Skills = lazy(() => import('../Skills/Skills'))
const Writing = lazy(() => import('../writing/Writing'))
const Testimonials = lazy(() => import('../testimonials/Testimonials'))
const Contact = lazy(() => import('../contact/Contact'))

const Skeleton = ({ h = '500px' }: { h?: string }) => (
  <LoadingSkeleton width="100%" height={h} />
)

const Layout = () => {
  return (
    <div className="relative bg-[#050B18] min-h-screen">
      <ParticleBackground density={20} speed={0.3} />
      <ScrollProgress />
      <Cursor />
      <ScrollArrow />
      <Navbar />

      <main>
        <Outlet />

        <Suspense fallback={<Skeleton />}><Expertise /></Suspense>
        <Suspense fallback={<Skeleton />}><CaseStudies /></Suspense>
        <Suspense fallback={<Skeleton />}><Experience /></Suspense>
        <Suspense fallback={<Skeleton />}><Skills /></Suspense>
        <Suspense fallback={<Skeleton />}><Writing /></Suspense>
        <Suspense fallback={<Skeleton />}><Testimonials /></Suspense>
        <Suspense fallback={<Skeleton h="400px" />}><Contact /></Suspense>
      </main>
    </div>
  )
}

export default Layout
