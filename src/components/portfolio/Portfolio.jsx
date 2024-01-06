import './portfolio.scss'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const items = [
    {
        id:1,
        title:"Pizza Food Ordering WebApp",
        img:"/images/Pizza-App.jpg",
        description: "A Fullstack Webapp to order for pizza of different sizes and choose extra sauce options, crafted with the latest in web technology featuring products page, cart, payment features, and more ...",
        stacks: ["HTML ", "|", " Tailwind CSS " , "|", " Nextjs 14 ", "|", " Rest API ", "|", " Express ", "|", " Jquery ", "|", " Axios ", "|", " Emailjs "]
    },

    {
        id:2,
        title:"Motivational Quotes App",
        img:"/images/Motiva.png",
        description: "Look up Motivational quotes, retrieve based on keyword or author and  create custom designs on shirts or share on social media.",
        stacks: ["HTML ", "|", " Tailwind CSS ", "|", " React ", "|", " Firebase ", "|", " Node ", "|", " Chakra-Ui ", "|", " Framer-Motion ", "|", " Express ", "|", " Emailjs "]
    },

    {
        id:3,
        title:"My Portfolio",
        img:"/images/my-portfolio.png",
        description: "A fully responsive and interacive website built by my team, which is basically for the purpose of combating maternal mortality rate among teens and adult pregnant women .",
        stacks: ["HTML ", "|", " Sass (SCSS) ", "|", " React ", "|", " Animate.css ", "|", " Framer-Motion ", "|", " Loaders.css ", "|", " Emailjs "]
    },

    {
        id:4,
        title:"Tasty Yumzy Restaurant app",
        img:"/images/tasty-yumzy.png",
        description: "A fully responsive Cuisine restaurant Webapp to order for different types of food. It features a Menu page, an order page, food gallery, and more ...",
        stacks: ["HTML ", "|", " Pure CSS ", "|", " Vanilla Javascript"]
    },

    {
        id:5,
        title:"Belleza's Touch Spa",
        img:"/images/belleza-spa.png",
        description: "Built to match the modern taste of a beauty spa, featuring different services and appointment booking popup, products purchase pages, a beautiful picture gallery page, and lots more...",
        stacks: ["HTML ", "|", " Pure CSS ", "|", " Vaniila Javascript"]
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
                <Link className="link">
                  <FontAwesomeIcon icon={faDisplay} color="#bce0fb" />
                  <span>Live View</span>
                </Link>

                <Link className="link">
                  <FontAwesomeIcon icon={faGithub} color="#bce0fb" />
                  <span>View Codes</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
};

Single.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        stacks: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

const Portfolio = () => {

  return (
    <div className="portfolio">
        <div className="progress">
            <h1>Featured Works</h1>
             <div className="progressBar" ></div>
        </div>


        <div>
        {items.map((item) => (
            <Single item={item} key={item.id}/>
        ))}
        </div>
    </div>
  );
};



export default Portfolio