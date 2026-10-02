import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { writingData } from '../../constants/portfolioData'
import { EbookShelf } from './EbookShelf'
import { containerVariants } from './writingConfig'
import './writing.scss'

const PAGE_URL = 'https://kemi-oluwadahunsi.vercel.app/ebooks'
const TITLE = 'Ebooks by Kemi Oluwadahunsi'
const DESCRIPTION =
  'Practical ebooks on JavaScript, micro-frontends and coding in the AI era, written from real production experience.'

const EbooksPage = () => {
  const ebooks = writingData.filter((d) => d.type === 'ebook')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: TITLE,
    itemListElement: ebooks.map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Book', name: book.title, description: book.description, author: 'Kemi Oluwadahunsi' },
    })),
  }

  return (
    <main className="ebooks-page">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="writing-container">
        <Link to="/#writing" className="ebooks-back">
          <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
        </Link>

        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Ebooks
        </motion.h1>
        <p className="section-subtitle">
          Practical guides on JavaScript, micro-frontends and coding in the AI era, for developers who want depth
          over fluff.
        </p>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <EbookShelf ebooks={ebooks} previewLimit={false} />
        </motion.div>
      </div>
    </main>
  )
}

export default EbooksPage
