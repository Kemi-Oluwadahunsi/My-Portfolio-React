import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import './experience.scss'
import { useState } from 'react'

const experiences = [
  {
    id: 3,
    title: 'Frontend Software Developer',
    company: 'Flit Incorporations (London UK, Remote)',
    startDate: '11/2023',
    endDate: '07/2024',
    details: [
      {
        id: 1,
        detail:
          'Developed and launched 2 full-stack web applications focusing on clean and semantic HTML structure, resulting in a 15% improvement in website accessibility metrics.',
      },

      {
        id: 2,
        detail:
          'Contributed to the adoption of modern development tools, reducing the time required for new feature implementation by 20%.',
      },
    ],
  },

  {
    id: 2,
    title: 'Frontend Software Developer',
    company: 'Gelks Group Inc. | RichForth Limited (Nigeria, Remote)',
    startDate: '05/2024',
    endDate: '09/2024',
    details: [
      {
        id: 1,
        detail:
          'Developed a dynamic, fully responsive, high-converting, and engaging web application for IP addresses purchasing.',
      },

      {
        id: 2,
        detail:
          'Led the development of the support ticket system, allowing for seamless creation, tracking, and updates, reducing response time by 10%.',
      },
    ],
  },

  {
    id: 1,
    title: 'Software Developer',
    company: 'Kodemaven (freelancing)',
    startDate: '01/2022',
    endDate: 'Present',

    details: [
      {
        id: 1,
        detail:
          'Created 7 scalable and flexible single-page applications (SPAs) for brands and businesses, leading to a 15% improvement in user engagement and boosting client satisfaction by 90%.',
      },

      {
        id: 2,
        detail:
          'Collaborated with designers and other developers on 2 open-source projects, promoting a collaborative development environment and enhancing technical expertise.',
      },
    ],
  },
]

const Each = ({ experience }) => {
  const [flipped, setFlipped] = useState(false)
  const handleCardClick = () => {
    if (window.innerWidth < 768) { // Check for mobile and tablet screens
      setFlipped(!flipped)
    }
  }
  return (
    <div
      className={`cards`}
      // onClick={handleCardClick}
    >
      <div className={`card-single ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="card front">
          <div className="expBody">
            <h2 className="expT">{experience.title}</h2>
            <div className="date">
              <span>
                {experience.startDate} - <span>{experience.endDate}</span>
              </span>
            </div>
            <h2 className="company">{experience.company}</h2>
          </div>
        </div>

        <div className="card back">
          <div className="details">
            <div className="detail-title">
              <h4>Job Details</h4>
              <FontAwesomeIcon icon={faArrowDown} />
            </div>

            <div className="description">
              {experience.details.map((data) => (
                <div key={data.id} className="describe">
                  <FontAwesomeIcon icon={faDotCircle} className="dotIcon" />
                  <p>{data.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Experience = () => {
  return (
    <div className="experience">
      <div className="experienceContain">
        <h1>Work Experience</h1>
        <p className="click-card animate__animated animate__heartBeat animate__infinite	infinite animate__slower">
          Click Each card to view Job Details
        </p>

        <div className="card-wrapper">
          {experiences.map((item) => (
            <Each experience={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
