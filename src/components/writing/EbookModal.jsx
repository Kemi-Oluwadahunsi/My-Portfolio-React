import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { lockScroll } from '../../hooks/lockScroll'
import { statusConfig } from './writingConfig'
import './writing.scss'

const EbookModal = ({ item, onClose }) => {
  const reduced = useReducedMotion()
  const dialogRef = useRef(null)
  const config = statusConfig[item.status] || statusConfig.published

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const unlockScroll = lockScroll()
    dialogRef.current?.querySelector('.ebook-modal-close')?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const nodes = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="ebook-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="ebook-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ebook-modal-title"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="ebook-modal-close" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>

        <div className="ebook-modal-meta">
          <span className={`status-badge ${config.className}`}>{config.label}</span>
          {item.series && <span className="ebook-row-series">{item.series}</span>}
        </div>

        <h3 id="ebook-modal-title">{item.title}</h3>
        <p>{item.description}</p>

        <div className="card-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {item.salesLinks && (
          <div className="ebook-modal-actions">
            {item.salesLinks.map((link) => (
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
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default EbookModal
