import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { writingData, blogLink } from '../../constants/portfolioData'
import { WritingCard, EbookShelf } from './EbookShelf'
import { containerVariants, cardVariants } from './writingConfig'
import './writing.scss'

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
          <EbookShelf ebooks={ebooks} viewAllHref="/ebooks" />
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
