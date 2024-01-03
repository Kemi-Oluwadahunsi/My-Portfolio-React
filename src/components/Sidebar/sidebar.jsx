import { Link, NavLink } from 'react-router-dom';
import './sidebar.scss';
import Logo from '/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {


  return (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={Logo} alt="logo" />
            <h3 className='sub-logo'>KodeMaven</h3>
        </Link>

        <nav>
            <NavLink exact="true" activeclassname="active" className='home-link' to="/">
                <FontAwesomeIcon icon={ faHome } color='#0c0c1d' />
            </NavLink>

            <NavLink exact="true" activeclassname="active" className='about-link' to="/about">
                <FontAwesomeIcon icon={ faUser } color='#0c0c1d' />
            </NavLink>

            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={ faEnvelope } color='#0c0c1d' />
            </NavLink>
        </nav>

        <ul>
            <li>
                <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/oluwakemioluwadahunsi/'>
                    <FontAwesomeIcon icon={faLinkedin} color='#0c0c1d'/>
                </a>
            </li>

            <li>
                <a target='_blank' rel='noreferrer' href='https://www.facebook.com/kaliceagbabiaka1'>
                    <FontAwesomeIcon icon={faFacebook} color='#0c0c1d'/>
                </a>
            </li>

            <li>
                <a target='_blank' rel='noreferrer' href='https://twitter.com/km_oluwadahunsi'>
                    <FontAwesomeIcon icon={faXTwitter} color='#0c0c1d'/>
                </a>
            </li>

            <li>
                <a target='_blank' rel='noreferrer' href='http://github.com/Kemi-Oluwadahunsi/'>
                    <FontAwesomeIcon icon={faGithub} color='#0c0c1d'/>
                </a>
            </li>
        </ul>
    </div>
    
  )
}

export default Sidebar