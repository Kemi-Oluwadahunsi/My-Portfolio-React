import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { architectureData } from '../../constants/portfolioData'
import './architecture.scss'

const Architecture = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="architecture" ref={ref}>
      <div className="architecture-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {architectureData.title}
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {architectureData.subtitle}
        </motion.p>

        {/* MFE Diagram */}
        <motion.div
          className="mfe-diagram"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="diagram-label">{architectureData.diagramLabel}</p>

          <div className="diagram-grid">
            {/* Shell */}
            <div className="diagram-node shell">
              <span className="node-label">{architectureData.nodes.shell.label}</span>
            </div>

            {/* Arrow down */}
            <div className="diagram-arrow">▼</div>

            {/* IDP */}
            <div className="diagram-node idp">
              <span className="node-label">{architectureData.nodes.idp.label}</span>
              <span className="node-detail">{architectureData.nodes.idp.detail}</span>
            </div>

            {/* Arrow down */}
            <div className="diagram-arrow">▼</div>

            {/* Remotes row */}
            <div className="remotes-row">
              {architectureData.nodes.remotes.map((remote, i) => (
                <div className="diagram-node remote" key={i}>
                  <span className="node-label">{remote.label}</span>
                  <span className="node-detail">{remote.detail}</span>
                </div>
              ))}
            </div>

            {/* Shared deps */}
            <div className="shared-row">
              <span className="shared-label">Shared:</span>
              {architectureData.nodes.shared.map((dep, i) => (
                <span className="shared-pill" key={i}>{dep}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Code snippet */}
        <motion.div
          className="code-block"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="code-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="code-title">webpack.config.ts</span>
          </div>
          <pre>
            <code>{architectureData.codeSnippet}</code>
          </pre>
        </motion.div>

        {/* Ebook CTA */}
        <motion.div
          className="ebook-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <h3>{architectureData.ebookCta.heading}</h3>
          <p>{architectureData.ebookCta.description}</p>
          <div className="ebook-tags">
            {architectureData.ebookCta.tags.map((tag, i) => (
              <span
                className={`ebook-tag ${tag.includes('progress') ? 'amber' : 'blue'}`}
                key={i}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={architectureData.ebookCta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            Follow for updates →
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Architecture
