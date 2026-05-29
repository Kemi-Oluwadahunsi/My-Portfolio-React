import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { openSourceData, socialLinks } from '../../constants/portfolioData'
import ShimmerEffect from '../UI/ShimmerEffect/ShimmerEffect'
import './opensource.scss'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
}

const stageConfig = {
  active: { label: 'Active', className: 'green' },
  research: { label: 'Research', className: 'amber' },
  planning: { label: 'Planning', className: 'blue' },
  building: { label: 'Building', className: 'amber' },
}

const OpenSource = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="opensource" ref={ref}>
      <div className="opensource-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Open Source & Beyond
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Side projects, published packages, and the developer tools I&apos;m building next
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Published projects */}
          {openSourceData.published.map((project) => (
            <motion.div className="published-card" key={project.id} variants={cardVariants}>
              <div className="published-header">
                <span className={`status-badge ${stageConfig[project.status]?.className || 'green'}`}>
                  {stageConfig[project.status]?.label || 'Active'}
                </span>
                <h3>{project.name}</h3>
              </div>
              <p>{project.description}</p>

              <div className="stat-row">
                <span className="stat">{project.stats.components} components</span>
              </div>

              <div className="published-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <div className="published-links">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </a>
                <a href={project.links.npm} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faNpm} /> npm
                </a>
                <a href={project.links.storybook} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faBook} /> Storybook
                </a>
              </div>
            </motion.div>
          ))}

          {/* Pipeline */}
          <h2 className="group-title">In the Pipeline</h2>
          <div className="pipeline-grid">
            {openSourceData.pipeline.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <ShimmerEffect className="pipeline-card">
                  <div className="pipeline-header">
                    <span className={`status-badge ${stageConfig[project.status]?.className || 'blue'}`}>
                      {stageConfig[project.status]?.label || project.status}
                    </span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="pipeline-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </ShimmerEffect>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div className="github-cta" variants={cardVariants}>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>github.com/Kemi-Oluwadahunsi</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default OpenSource
