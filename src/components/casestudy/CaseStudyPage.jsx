import { useParams, Link } from 'react-router-dom'
import './casestudy.scss'

const CaseStudyPage = () => {
  const { id } = useParams()

  return (
    <div className="case-study-page">
      <nav className="case-study-nav">
        <Link to="/" className="back-link">
          &larr; Back to Projects
        </Link>
      </nav>
      <div className="case-study-content">
        <h1>Case Study: {id}</h1>
        <p className="case-study-placeholder">
          Full case study content coming soon.
        </p>
      </div>
    </div>
  )
}

export default CaseStudyPage
