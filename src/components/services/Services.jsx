
import './services.scss'
import { motion } from 'framer-motion'



const Services = () => {

  return (
    <motion.div
      className="services"
    >
      <motion.div
        className="textContainer"
      >
        <p>
          I focus on helping your brand grow <span>and move forward</span>{' '}
        </p>
      </motion.div>

      <motion.div
        className="titleContainer"
      >
        <div className="title">
          <img src="/images/ladies-sitting.jpg" alt="serviceImage" />
          <h1>
            <motion.b>Unique</motion.b> Ideas
          </h1>
        </div>

        <div className="title">
          <h1>
            <motion.b>For Your</motion.b>{' '}
            Business.
          </h1>
        </div>
      </motion.div>
      <motion.div
        className="listContainer"
      >
        <div className="box first">
          <h2 className="serviceTitle">Responsive Web Design</h2>
          <div>
            <p>
              I craft visually appealing websites that seamlessly adapt to
              various devices, ensuring a consistent and optimal user experience
              across desktops, tablets, and mobiles.
            </p>
          </div>
        </div>

        <div className="box">
          <h2 className="serviceTitle">Single Page Applications (SPAs)</h2>
          <div>
            <p>
              I develop SPAs that provide a smooth and continuous user
              experience without the need for page reloads, enhancing overall
              application usability.
            </p>
          </div>
        </div>

        <div className="box last">
          <h2 className="serviceTitle">Cross-Functional Collaboration</h2>
          <div>
            <p>
            I collaborate effectively with UX designers, backend developers, and
            other stakeholders to deliver cohesive and well-rounded projects,
            fostering teamwork.
          </p>
          </div>
        </div>

        <div className="box last">
          <h2 className="serviceTitle">Animation and Interactivity</h2>
          <div>
            <p>
            I am proficient in integrating animations and interactive elements
            to enhance user engagement, creating a dynamic and visually
            appealing frontend experience.
          </p>
          </div>
        </div>

        <div className="box last">
          <h2 className="serviceTitle">Landing Pages</h2>
          <div>
            <p>
            Specializes in the creation of custom landing pages meticulously
            crafted to align seamlessly with your unique specifications,
            ensuring a compelling digital presence for your brand
            or product.
          </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Services