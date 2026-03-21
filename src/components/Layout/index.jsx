import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/sidebar'
import './index.scss'
import Cursor from '../cursor/Cursor'
import Navbar from '../navbar/Navbar'
import ScrollArrow from '../backarrow/ScrollArrow'
import LoadingSkeleton from '../UI/LoadingSkeleton/LoadingSkeleton'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

// Lazy load heavy components with actual code splitting
const Parallax = lazy(() => import('../parallax/Parallax'))
const Services = lazy(() => import('../services/Services'))
const Portfolio = lazy(() => import('../portfolio/Portfolio'))
const Contact = lazy(() => import('../contact/Contact'))
const Experience = lazy(() => import('../workExperience/Experience'))
const Skills = lazy(() => import('../Skills/Skills'))
const Background3D = lazy(() => import('../3D/Background3D'))


const Layout = () => {
  return (
    <div className="main-layout">
      <ParticleBackground density={25} speed={0.4} />
      <Cursor />
      <ScrollArrow />
      <Navbar />
      <Sidebar />
      <main className="App" id="main-content" role="main" aria-label="Main content">
        <div className="page">
          <span className="tags top-tags" aria-hidden="true">&lt;body&gt;</span>

          <Outlet />

          <span className="tags bottom-tags" aria-hidden="true">
            &lt;/body&gt;
            <br />
          </span>
        </div>
      </main>

      <section id="firstParallaxSection" aria-label="Services section">
        <Suspense fallback={<LoadingSkeleton width="100%" height="400px" />}>
          <Parallax type="services" />
        </Suspense>
      </section>

      <section className="servicesSection" aria-label="Services">
        <Suspense fallback={<LoadingSkeleton width="100%" height="600px" />}>
          <Background3D intensity={0.2} />
          <Services />
        </Suspense>
      </section>

      <section className="skillsSection" id="skills" aria-label="Skills">
        <Suspense fallback={<LoadingSkeleton width="100%" height="600px" />}>
          <Background3D intensity={0.15} />
          <Skills />
        </Suspense>
      </section>

      <section className="experienceSection" id="experience" aria-label="Work Experience">
        <Suspense fallback={<LoadingSkeleton width="100%" height="500px" />}>
          <Background3D intensity={0.2} />
          <Experience />
        </Suspense>
      </section>

      <section className="secondParallaxSection" aria-label="Portfolio section">
        <Suspense fallback={<LoadingSkeleton width="100%" height="400px" />}>
          <Parallax type="portfolio" />
        </Suspense>
      </section>

      <section className="portfolioSection" id="portfolioSection" aria-label="Portfolio">
        <Suspense fallback={<LoadingSkeleton width="100%" height="800px" />}>
          <Portfolio />
        </Suspense>
      </section>

      <section className="contactSection" id="contact" aria-label="Contact">
        <Suspense fallback={<LoadingSkeleton width="100%" height="600px" />}>
          <Contact />
        </Suspense>
      </section>
    </div>
  )
}

export default Layout
