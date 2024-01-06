import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"
import "./scrollarrow.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"


const ScrollArrow = () => {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      })
    }, []);

    const goTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    };


  return (
    
    <div 
    className="btn-Scroll" style={{display: isVisible ? 'block':'none'}} onClick={goTop}>
      <FontAwesomeIcon icon={faArrowCircleUp} color="white" />
    </div>
  )
}

export default ScrollArrow