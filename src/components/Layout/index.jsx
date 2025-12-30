import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/sidebar'
import './index.scss'
import Parallax from '../parallax/Parallax'
import Services from '../services/Services'
import Portfolio from '../portfolio/Portfolio'
import Contact from '../contact/Contact'
import Cursor from '../cursor/Cursor'
import Navbar from '../navbar/Navbar'
import ScrollArrow from '../backarrow/ScrollArrow'
import Experience from '../workExperience/Experience'
import LoadingSkeleton from '../UI/LoadingSkeleton/LoadingSkeleton'
import Skills from '../Skills/Skills'
import Background3D from '../3D/Background3D'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'
import PWAUpdate from '../UI/PWAUpdate/PWAUpdate'

// Lazy load heavy components
const ParallaxLazy = lazy(() => Promise.resolve({ default: Parallax }))
const ServicesLazy = lazy(() => Promise.resolve({ default: Services }))
const PortfolioLazy = lazy(() => Promise.resolve({ default: Portfolio }))
const ContactLazy = lazy(() => Promise.resolve({ default: Contact }))
const ExperienceLazy = lazy(() => Promise.resolve({ default: Experience }))
const SkillsLazy = lazy(() => Promise.resolve({ default: Skills }))
const Background3DLazy = lazy(() => Promise.resolve({ default: Background3D }))


const Layout = () => {
  return (
    <div className="main-layout">
      <PWAUpdate />
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
          <ParallaxLazy type="services" />
        </Suspense>
      </section>

      <section className="servicesSection" aria-label="Services">
        <Suspense fallback={<LoadingSkeleton width="100%" height="600px" />}>
          <Background3DLazy intensity={0.2} />
          <ServicesLazy />
        </Suspense>
      </section>

      <section className="skillsSection" id="skills" aria-label="Skills">
        <Suspense fallback={<LoadingSkeleton width="100%" height="600px" />}>
          <Background3DLazy intensity={0.15} />
          <SkillsLazy />
        </Suspense>
      </section>

      <section className="experienceSection" id="experience" aria-label="Work Experience">
        <Suspense fallback={<LoadingSkeleton width="100%" height="500px" />}>
          <Background3DLazy intensity={0.2} />
          <ExperienceLazy />
        </Suspense>
      </section>

      <section className="secondParallaxSection" aria-label="Portfolio section">
        <Suspense fallback={<LoadingSkeleton width="100%" height="400px" />}>
          <ParallaxLazy type="portfolio" />
        </Suspense>
      </section>

      <section className="portfolioSection" id="portfolioSection" aria-label="Portfolio">
        <Suspense fallback={<LoadingSkeleton width="100%" height="800px" />}>
          <PortfolioLazy />
        </Suspense>
      </section>

      <section className="contactSection" id="contact" aria-label="Contact">
        <Suspense fallback={<LoadingSkeleton width="100%" height="600px" />}>
          <ContactLazy />
        </Suspense>
      </section>
    </div>
  )
}

export default Layout
