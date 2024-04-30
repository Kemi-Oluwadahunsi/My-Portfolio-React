import './portfolio.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const items = [
  {
    id: 1,
    title: 'KCOAT Ecommerce App',
    img: '/images/kcoat.png',
    description:
      'KCOAT is a trendy clothing and accessories fashion brand for both men and women. This ecommerce app is a fully responsive and interactive website built for the purpose of shopping fashion wears and accessories online.',
    stacks: [
      'HTML ',
      '|',
      ' Tailwind CSS',
      '|',
      ' React.js ',
      '|',
      ' Javascript ',
      '|',
      ' Axios ',
      '|',
      ' Emailjs ',
      '|',
      ' React-Router-Dom ',
      '|',
      ' React-Carousel ',
      '|',
      ' MySQL ',
      '|',
      ' NodeJs ',
      '|',
      ' ExpressJs ',
    ],
    live: 'https://kcoat.netlify.app',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/KCOAT-Project',
  },

  {
    id: 2,
    title: 'Astonish Designs Fashion App',
    img: '/images/astonish-finished.png',
    description:
      'A brand portfolio for Astonish Designs, a fashion and tailoring brand. This portfolio showcases about the brand, a catalogue of the brand designs, contact information, testimonials from clients, and services rendered.',
    stacks: [
      'HTML ',
      '|',
      ' Sass(CSS) ',
      '|',
      ' React.js ',
      '|',
      ' Javascript ',
      '|',
      ' framer-motion ',
      '|',
      ' Emailjs ',
    ],
    live: 'https://astonish-designs.com.ng',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Astonish-Designs',
  },

  {
    id: 3,
    title: 'Pizza Food Ordering WebApp',
    img: '/images/Pizza-App.jpg',
    description:
      'A Fullstack Webapp to order for pizza of different sizes and choose extra sauce options, crafted with the latest in web technology featuring products page, cart, payment features, and more ...',
    stacks: [
      'HTML ',
      '|',
      ' Tailwind CSS ',
      '|',
      ' Nextjs 14 ',
      '|',
      ' Rest API ',
      '|',
      ' Express ',
      '|',
      ' Jquery ',
      '|',
      ' Axios ',
      '|',
      ' Emailjs ',
    ],
    live: 'https://flit-pizza-ordering-web-app-new.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Flit-Pizza-ordering-web-app',
  },

  {
    id: 4,
    title: 'Quotes-Quest App',
    img: '/images/quotes-quest.png',
    description:
      'Look up Motivational quotes, retrieve based on keyword or author and  create custom designs on shirts or share on social media.',
    stacks: [
      'HTML ',
      '|',
      ' Tailwind CSS ',
      '|',
      ' React ',
      '|',
      ' Firebase ',
      '|',
      ' Node ',
      '|',
      ' Chakra-Ui ',
      '|',
      ' Framer-Motion ',
      '|',
      ' Express ',
      '|',
      ' Emailjs ',
    ],
    live: 'https://quotes-quest.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Quotes-Quest-Fullstack.git',
  },

  {
    id: 5,
    title: 'My Portfolio',
    img: '/images/my-portfolio.png',
    description:
      'A fully responsive and interacive website built by my team, which is basically for the purpose of combating maternal mortality rate among teens and adult pregnant women.',
    stacks: [
      'HTML ',
      '|',
      ' Sass (SCSS) ',
      '|',
      ' React ',
      '|',
      ' Animate.css ',
      '|',
      ' Framer-Motion ',
      '|',
      ' Loaders.css ',
      '|',
      ' Emailjs ',
    ],
    live: 'https://kodemaven-portfolio.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/My-Portfolio-React',
  },

  {
    id: 6,
    title: 'Countri',
    img: '/images/Countri.png',
    description:
      'Countries information, current weather forecast in a fast and exciting manner.',
    stacks: ['HTML ', '|', ' Pure CSS ', '|', ' Vanilla Javascript'],
    live: 'https://contri-project.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Contri-project.git',
  },

  {
    id: 7,
    title: 'Tasty Yumzy Restaurant app',
    img: '/images/tasty-yumzy.png',
    description:
      'A fully responsive Cuisine restaurant Webapp to order for different types of food. It features a Menu page, an order page, food gallery, and more ...',
    stacks: ['HTML ', '|', ' CSS ', '|', ' Vanilla Javascript'],
    live: 'https://tasty-yumzy-restaurant-project.vercel.app/',
    gitHub:
      'https://github.com/Kemi-Oluwadahunsi/Tasty-Yumzy-Restaurant-Project.git',
  },

  {
    id: 8,
    title: "Belleza's Touch Spa",
    img: '/images/belleza-spa.png',
    description:
      'Built to match the modern taste of a beauty spa, featuring different services and appointment booking popup, products purchase pages, a beautiful picture gallery page, and lots more...',
    stacks: ['HTML ', '|', ' CSS ', '|', ' Vaniila Javascript'],
    live: 'https://belleza-touch-spa.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/BellezaTouchSpa',
  },
]

const Single = ({ item }) => {
  return (
    <section id="portfolioSection">
      <div className="all">
        <div className="wrapper">
          <div className="imageContain">
            <img src={item.img} alt="WebsiteImage" />
          </div>
          <div className="text">
            <h2> {item.title} </h2>
            <p> {item.description} </p>
            <span className="stacks">{item.stacks} </span>

            <div className="links">
              <Link
                className="link"
                to={item.live}
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faDisplay} color="#bce0fb" />
                <span>Live View</span>
              </Link>

              <Link
                className="link"
                to={item.gitHub}
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} color="#bce0fb" />
                <span>View Codes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Single.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stacks: PropTypes.arrayOf(PropTypes.string).isRequired,
    live: PropTypes.string.isRequired,
    gitHub: PropTypes.string.isRequired,
  }).isRequired,
}

const Portfolio = () => {
  return (
    <div className="portfolio">
      <div className="progress">
        <h1>Featured Works</h1>
        <div className="progressBar"></div>
      </div>

      <div>
        {items.map((item) => (
          <Single item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Portfolio
