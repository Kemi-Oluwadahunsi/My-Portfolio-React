import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import './index.scss';
import Parallax from '../parallax/Parallax';
import Services from '../services/Services';
import Portfolio from '../portfolio/Portfolio';
import Contact from '../contact/Contact';
import Cursor from '../cursor/Cursor';
import Navbar from '../navbar/Navbar';
import ScrollArrow from '../backarrow/ScrollArrow';

const Layout = () => {
  return (
    <div>
      <Cursor />
      <ScrollArrow />
      <Navbar />
      <section className="App" id="section">
        <Sidebar />

        <div className="page">
          <span className="tags top-tags ">&lt;body&gt;</span>

          <Outlet />

          <span className="tags bottom-tags ">
            &lt;/body&gt;
            <br />
            <span className="bottom-tag-html ">&lt;html&gt;</span>
          </span>
        </div>
      </section>

      <section id="firstParallaxSection">
        <Parallax type="services" />
      </section>

      <section className="servicesSection">
        <Services />
      </section>

      <section className="secondParallaxSection">
        <Parallax type="portfolio" />
      </section>

      <section className="portfolioSection" id="portfolioSection">
        <Portfolio />
      </section>

      <section className="contactSection " id="contact">
        <Contact />
      </section>
    </div>
  )
}

export default Layout