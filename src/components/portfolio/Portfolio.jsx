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
      'KCOAT is a trendy clothing and accessories fashion brand for both men and women. This full-stack ecommerce web application, is fully responsive and interactive. Built for the purpose of shopping fashion wears and accessories online.',
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
      '|',
      ' Stripe ',
      '|',
      ' React-Toastify ',
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

  // {
  //   id: 3,
  //   title: 'Pizza Food Ordering WebApp',
  //   img: '/images/Pizza-App.jpg',
  //   description:
  //     'A Fullstack Webapp to order for pizza of different sizes and choose extra sauce options, crafted with the latest in web technology featuring products page, cart, payment features, and more ...',
  //   stacks: [
  //     'HTML ',
  //     '|',
  //     ' Tailwind CSS ',
  //     '|',
  //     ' Nextjs 14 ',
  //     '|',
  //     ' Rest API ',
  //     '|',
  //     ' Express ',
  //     '|',
  //     ' Jquery ',
  //     '|',
  //     ' Axios ',
  //     '|',
  //     ' Emailjs ',
  //   ],
  //   live: 'https://flit-pizza-ordering-web-app-new.vercel.app/',
  //   gitHub: 'https://github.com/Kemi-Oluwadahunsi/Flit-Pizza-ordering-web-app',
  // },

  {
    id: 3,
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
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Quotes-Quest-Fullstack',
  },

  {
    id: 4,
    title: 'Tasty Yumzy Restaurant app',
    img: '/images/tasty-yumzy.png',
    description:
      'A fully responsive Cuisine restaurant Webapp to order for different types of meal. It features a an interesting Landing page, Menu page, online Cart Functionalities with different payment methods, Paypal included, and a beautiful picture gallery page.',
    stacks: ['HTML ', '|', ' CSS ', '|', ' Vanilla Javascript'],
    live: 'https://tasty-yumzy-restaurant-project.vercel.app/',
    gitHub:
      'https://github.com/Kemi-Oluwadahunsi/Tasty-Yumzy-Restaurant-Project',
  },

  {
    id: 5,
    title: 'Blogging API',
    img: '/images/bloggingAPI.png',
    description:
      'This project is a RESTful API for a blogging platform. It allows users to register, login, create, update, delete, and fetch blog posts. Users can also view published blogs and search for blogs by various filters. The API uses JWT for authentication and MongoDB for data storage.',
    stacks: [
      'Node.js ',
      '|',
      ' Express.js ',
      '|',
      ' Vanilla Javascript',
      '|',
      ' MongoDB ',
      '|',
      ' Mongoose ',
      '|',
      ' Bcrypt ',
      '|',
      ' JWT ',
      '|',
      ' JSON Web Tokens ',
      '|',
      ' Jest ',
      '|',
      ' Winston ',
    ],
    live: 'https://blogging-api-tasy.onrender.com',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/intermediate-backend-exam',
  },

  {
    id: 6,
    title: 'Github Repositories Project',
    img: '/images/githubrepo.png',
    description:
      'This project is a web application built with consuming GitHub API. It serves as a platform for managing repositories on GitHub, allowing users to view repository details, create new repositories, and perform various other actions related to repository management.',
    stacks: [
      'React.js ',
      '|',
      ' Tailwind CSS ',
      '|',
      ' Vanilla Javascript',
      '|',
      ' GitHub API',
      '|',
      ' Axios',
      '|',
      ' React-Router-Dom',
      '|',
      ' sweetalert2',
    ],
    live: 'https://github-repositories-portfolio.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Intermediate-frontend-exam',
  },

  {
    id: 8,
    title: 'Login and Signup Fully Authenticated Form',
    img: '/images/login.png',
    description:
      'A fully responsive and interactive login and signup form, built with the latest in web technology, validated with React-hook-form and Authenticated with Firebase.',
    stacks: [
      ' ReactJs ',
      '|',
      ' Tailwind CSS ',
      '|',
      ' React-hook-form ',
      '|',
      ' Firebase ',
      '|',
      ' React-Router-Dom ',
      '|',
      ' React-Toastify ',
    ],
    live: 'https://login-registration-auth-form.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Login-Registration-Auth-Form',
  },

  {
    id: 7,
    title: 'My Portfolio',
    img: '/images/my-portfolio.png',
    description:
      'A fully responsive and interacive website built to showcase both my personal projects and collaboration projects. It is built with the latest web technologies, and is fully responsive.',
    stacks: [
      'HTML ',
      '|',
      ' Sass (SCSS) ',
      '|',
      ' ReactJs ',
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
    id: 9,
    title: 'Countri',
    img: '/images/Countri.png',
    description:
      'Displays Countries information, current weather forecast in a fast and exciting manner.',
    stacks: [
      ' ReactJs ',
      '|',
      'HTML ',
      '|',
      ' Pure CSS ',
      '|',
      ' Axios',
      '|',
      ' Keen Slider',
    ],
    live: 'https://contri-project.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Contri-project',
  },

  {
    id: 10,
    title: "Belleza's Touch Spa",
    img: '/images/belleza-spa.png',
    description:
      'Built to match the modern taste of a beauty spa, featuring different services and appointment booking popup, products purchase pages, a beautiful picture gallery page, and lots more...',
    stacks: ['HTML ', '|', ' CSS ', '|', ' Vanilla Javascript'],
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
