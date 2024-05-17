import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './services.scss'

const Services = () => {
    const settings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 500,
      slidesToShow: 3, 
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024, 
          settings: {
            slidesToShow: 2, 
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600, 
          settings: {
            slidesToShow: 1, 
            slidesToScroll: 1,
          },
        },
      ],
    }

  return (
    <div className="services">
      <div className="textContainer">
        <p>
          I focus on helping your brand grow <span>and move forward</span>{' '}
        </p>
      </div>

      <div className="titleContainer">
        <div className="title">
          <h1>
            <b>Unique</b> Ideas
          </h1>
        </div>

        <div className="title">
          <h1>
            <b>For Your</b> Business.
          </h1>
        </div>
      </div>

      <div className="listContainer">
        <Slider {...settings}>
          <div className="box first">
            <h2 className="serviceTitle">Responsive Web Design</h2>
            <div>
              <p>
                I craft visually appealing websites that seamlessly adapt to
                various devices, ensuring a consistent and optimal user
                experience across desktops, tablets, and mobiles.
              </p>
            </div>
          </div>

          <div className="box">
            <h2 className="serviceTitle">Single Page Applications</h2>
            <div>
              <p>
                I develop SPAs that provide a smooth and continuous user
                experience without the need for page reloads, enhancing overall
                application usability.
              </p>
            </div>
          </div>

          <div className="box">
            <h2 className="serviceTitle">Brand Portfolio Websites</h2>
            <div>
              <p>
                Elevate your brand with a captivating online presence. I also
                craft brand portfolio websites that showcase your unique
                identity and achievements, attracts clients and opportunities.
              </p>
            </div>
          </div>

          <div className="box">
            <h2 className="serviceTitle">E-commerce WebApps</h2>
            <div>
              <p>
                Dive into the world of seamless online shopping experiences with
                E-commerce WebApps. I design and develop dynamic interfaces that
                glide effortlessly, ensuring every click feels like a breeze.
              </p>
            </div>
          </div>

          <div className="box">
            <h2 className="serviceTitle">Existing websites upgrade</h2>
            <div>
              <p>
                Revitalize your digital presence with my expertise in upgrading
                and updating existing websites. Add cutting-edge features and
                modern aesthetics to captivate your audience anew.
              </p>
            </div>
          </div>

          <div className="box last">
            <h2 className="serviceTitle">Cross-Functional Collaboration</h2>
            <div>
              <p>
                I collaborate effectively with UX designers, backend developers,
                and other stakeholders to deliver cohesive and well-rounded
                projects, fostering teamwork.
              </p>
            </div>
          </div>

          <div className="box last">
            <h2 className="serviceTitle">Animation and Interactivity</h2>
            <div>
              <p>
                I am proficient in integrating animations and interactive
                elements to enhance user engagement, creating a dynamic and
                visually appealing frontend experience.
              </p>
            </div>
          </div>

          <div className="box last">
            <h2 className="serviceTitle">Landing Pages</h2>
            <div>
              <p>
                Specializes in the creation of custom landing pages meticulously
                crafted to align seamlessly with your unique specifications,
                ensuring a compelling digital presence for your brand or
                product.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Services
