import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/sidebar'
import './index.scss'
import Cursor from '../cursor/Cursor'
import Navbar from '../navbar/Navbar'
import ScrollArrow from '../backarrow/ScrollArrow'
import LoadingSkeleton from '../UI/LoadingSkeleton/LoadingSkeleton'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'
import ScrollReveal from '../UI/ScrollReveal/ScrollReveal'

// Lazy load heavy components with actual code splitting
const Services = lazy(() => import('../services/Services'))
const Portfolio = lazy(() => import('../portfolio/Portfolio'))
const Contact = lazy(() => import('../contact/Contact'))
const Experience = lazy(() => import('../workExperience/Experience'))
const Skills = lazy(() => import('../Skills/Skills'))
const Architecture = lazy(() => import('../architecture/Architecture'))
const Writing = lazy(() => import('../writing/Writing'))
const OpenSource = lazy(() => import('../opensource/OpenSource'))
const Testimonials = lazy(() => import('../testimonials/Testimonials'))

const GlowDivider = () => <div className="glow-divider" aria-hidden="true" />

const SectionFallback = ({ height = '600px' }) => (
  <LoadingSkeleton width="100%" height={height} />
)

const Layout = () => {
  return (
    <div className="main-layout">
      <ParticleBackground density={25} speed={0.4} />
      <Cursor />
      <ScrollArrow />
      <Navbar />
      <Sidebar />

      <div className="scroll-container" id="scroll-container">
        <main className="App snap-section" id="main-content" role="main" aria-label="Main content">
          <div className="page">
            <span className="tags top-tags" aria-hidden="true">&lt;body&gt;</span>

            <Outlet />

            <span className="tags bottom-tags" aria-hidden="true">
              &lt;/body&gt;
              <br />
            </span>
          </div>
        </main>

        <GlowDivider />

        <section className="servicesSection snap-section" id="services" aria-label="Areas of Expertise">
          <ScrollReveal direction="up">
            <Suspense fallback={<SectionFallback />}>
              <Services />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="portfolioSection snap-section" id="portfolioSection" aria-label="Featured Work">
          <ScrollReveal direction="up" delay={0.1}>
            <Suspense fallback={<SectionFallback height="800px" />}>
              <Portfolio />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="architectureSection snap-section" id="architecture" aria-label="Architecture Deep-Dive">
          <ScrollReveal direction="left" delay={0.1}>
            <Suspense fallback={<SectionFallback />}>
              <Architecture />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="experienceSection snap-section" id="experience" aria-label="Work Experience">
          <ScrollReveal direction="right" delay={0.1}>
            <Suspense fallback={<SectionFallback height="500px" />}>
              <Experience />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="skillsSection snap-section" id="skills" aria-label="Stack & Tooling">
          <ScrollReveal direction="up">
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="writingSection snap-section" id="writing" aria-label="Teaching & Writing">
          <ScrollReveal direction="left">
            <Suspense fallback={<SectionFallback />}>
              <Writing />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="opensourceSection snap-section" id="opensource" aria-label="Open Source">
          <ScrollReveal direction="right">
            <Suspense fallback={<SectionFallback />}>
              <OpenSource />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="testimonialsSection snap-section" id="testimonials" aria-label="Testimonials">
          <ScrollReveal direction="up" delay={0.1}>
            <Suspense fallback={<SectionFallback height="400px" />}>
              <Testimonials />
            </Suspense>
          </ScrollReveal>
        </section>

        <GlowDivider />

        <section className="contactSection snap-section" id="contact" aria-label="Contact">
          <ScrollReveal direction="up">
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </ScrollReveal>
        </section>

        <footer className="site-footer" role="contentinfo">
          <p>&copy; 2026 Oluwakemi Oluwadahunsi</p>
          <p>All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default Layout
