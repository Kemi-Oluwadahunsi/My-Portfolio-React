import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import EbookModal from './EbookModal'
import { statusConfig, cardVariants } from './writingConfig'
import './writing.scss'

export const WritingCard = ({ item }) => {
  const config = statusConfig[item.status] || statusConfig.published

  return (
    <motion.div className={`writing-card ${item.type}`} variants={cardVariants}>
      <div className="card-top">
        <span className={`status-badge ${config.className}`}>{config.label}</span>
        <span className="card-type">
          {item.type === 'ebook' ? '📖 Ebook' : item.type === 'carousel-series' ? '📱 Carousel Series' : '✍️ Content'}
        </span>
      </div>

      <h3 className='ebook-title'>{item.title}</h3>
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

      {item.salesLinks && <SalesLinks links={item.salesLinks} />}
    </motion.div>
  )
}

const isAvailable = (item) => item.status === 'Done' || item.status === 'published'

const useIsMobile = () => {
  const query = '(max-width: 480px)'
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

const SalesLinks = ({ links }) => (
  <div className="sales-links">
    {links.map((link) => (
      <a
        key={link.platform}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`card-link sales-btn ${link.url === '#' ? 'disabled' : ''}`}
      >
        Get on {link.platform} →
      </a>
    ))}
  </div>
)

const EbookRow = ({ item, onOpen }) => {
  const config = statusConfig[item.status] || statusConfig.published

  return (
    <motion.div className="ebook-row" variants={cardVariants}>
      <div className="ebook-row-head">
        <span className="ebook-row-icon" aria-hidden="true">
          <BookOpen size={18} />
        </span>
        <span className="ebook-row-main">
          <strong>{item.title}</strong>
          <span className="ebook-row-meta">
            <span className={`status-badge ${config.className}`}>{config.label}</span>
            {item.series && <span className="ebook-row-series">{item.series}</span>}
          </span>
        </span>
      </div>

      <div className="ebook-row-actions">
        {item.salesLinks?.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`ebook-cta ${link.url === '#' ? 'disabled' : ''}`}
          >
            Get on {link.platform} →
          </a>
        ))}
        <button type="button" className="ebook-details-toggle" onClick={() => onOpen(item)} aria-haspopup="dialog">
          Read more
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  )
}

export const EbookShelf = ({ ebooks, previewLimit = true, viewAllHref }) => {
  const isMobile = useIsMobile()
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState(null)

  const seriesNames = [...new Set(ebooks.map((e) => e.series).filter(Boolean))]
  const chips = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'available', label: 'Available', test: isAvailable },
    { key: 'soon', label: 'Coming soon', test: (e) => !isAvailable(e) },
    ...seriesNames.map((name) => ({ key: `series:${name}`, label: name, test: (e) => e.series === name })),
  ].map((chip) => ({ ...chip, count: ebooks.filter(chip.test).length }))

  const activeChip = chips.find((c) => c.key === filter) || chips[0]
  const matches = ebooks.filter(activeChip.test)

  // The featured book only leads the unfiltered view, so a filter never hides its own results.
  const featured =
    filter === 'all' ? ebooks.find((e) => e.featured) || [...ebooks].reverse().find(isAvailable) : null
  const rows = matches.filter((e) => e !== featured)

  const limit = previewLimit ? (isMobile ? 4 : 6) : rows.length
  const shown = showAll ? rows : rows.slice(0, limit)
  const hidden = rows.length - shown.length

  const selectFilter = (key) => {
    setFilter(key)
    setShowAll(false)
  }

  return (
    <>
      <div className="ebook-filters" role="group" aria-label="Filter ebooks">
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className={`ebook-chip ${chip.key === activeChip.key ? 'active' : ''}`}
            aria-pressed={chip.key === activeChip.key}
            onClick={() => selectFilter(chip.key)}
          >
            {chip.label} <span>{chip.count}</span>
          </button>
        ))}
      </div>

      {featured && (
        <div className="ebook-featured">
          <WritingCard item={featured} />
        </div>
      )}

      <div className="ebook-list">
        {shown.map((item) => (
          <EbookRow key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>

      {rows.length > limit &&
        (viewAllHref ? (
          <Link to={viewAllHref} className="ebook-more">
            View all {ebooks.length} books →
          </Link>
        ) : (
          <button type="button" className="ebook-more" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show fewer' : `View all ${matches.length} books (${hidden} more)`}
          </button>
        ))}

      <AnimatePresence>
        {selected && <EbookModal key={selected.id} item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

