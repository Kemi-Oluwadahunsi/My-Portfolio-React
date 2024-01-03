import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import './index.scss';
import Parallax from '../parallax/Parallax';
import Services from '../services/Services';
import Portfolio from '../portfolio/Portfolio';
import Contact from '../contact/Contact';
import Cursor from '../cursor/Cursor';

const Layout = () => {
  return (
    <div >
      <Cursor />
      <section className='App'>
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

      <section>
        <Parallax type="services"/>
      </section>

      <section>
        <Services />
      </section>

      <section>
        <Parallax type="portfolio"  />
      </section>

      <section>
        <Portfolio id="portfolioHeight"/>
      </section>

      <section id='contact'>
        <Contact />
      </section>


    </div>
  )
}

export default Layout