import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { writingData, blogLink } from '../../constants/portfolioData'
import './writing.scss'

const statusConfig = {
  'in-progress': { label: 'Writing Now', className: 'amber' },
  'coming-soon': { label: 'Coming Soon', className: 'blue' },
  published: { label: 'Published', className: 'green' },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
}

const WritingCard = ({ item }) => {
  const config = statusConfig[item.status] || statusConfig.published

  return (
    <motion.div className={`writing-card ${item.type}`} variants={cardVariants}>
      <div className="card-top">
        <span className={`status-badge ${config.className}`}>{config.label}</span>
        <span className="card-type">
          {item.type === 'ebook' ? '📖 Ebook' : item.type === 'carousel-series' ? '📱 Carousel Series' : '✍️ Content'}
        </span>
      </div>

      <h3>{item.title}</h3>
      <p>{item.description}</p>

      {item.type === 'carousel-series' && item.totalDays && (
        <div className="day-counter">
          <div className="day-bar">
            <div className="day-fill" style={{ width: '100%' }} />
          </div>
          <span className="day-text">{item.totalDays}/{item.totalDays} days</span>
        </div>
      )}

      <div className="card-tags">
        {item.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          {item.platform ? `View on ${item.platform} →` : 'Learn more →'}
        </a>
      )}
    </motion.div>
  )
}

const Writing = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const ebooks = writingData.filter((d) => d.type === 'ebook')
  const carousels = writingData.filter((d) => d.type === 'carousel-series')
  const posts = writingData.filter((d) => d.type === 'post')

  return (
    <div className="writing" ref={ref}>
      <div className="writing-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Teaching What I Build
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ebooks, LinkedIn carousels, and engineering articles for developers who want depth over fluff
        </motion.p>

        {/* Ebooks */}
        <motion.div
          className="writing-group"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="group-title">Ebook Series</h2>
          <div className="writing-grid ebooks">
            {ebooks.map((item) => (
              <WritingCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Carousel series */}
        <motion.div
          className="writing-group"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="group-title">LinkedIn Teaching Carousels</h2>
          <div className="writing-grid carousels">
            {carousels.map((item) => (
              <WritingCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Posts + Blog CTA */}
        <motion.div
          className="writing-group"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="group-title">Articles & Blog</h2>
          <div className="writing-grid posts">
            {posts.map((item) => (
              <WritingCard key={item.id} item={item} />
            ))}

            {/* Blog CTA card */}
            <motion.div className="writing-card blog-cta" variants={cardVariants}>
              <h3>{blogLink.title}</h3>
              <p>{blogLink.description}</p>
              {blogLink.url && blogLink.url !== '#' && (
                <a
                  href={blogLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link blog-link"
                >
                  Visit Blog →
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Writing
