import "./parallax.scss"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import PropTypes from 'prop-types';

const Parallax = ({ type }) => {

    const ref = useRef();

    const {scrollYProgress} = useScroll({
        target:ref,
        offset: ["start start", "end start"]

    });

    const yBg = useTransform(scrollYProgress, [0,1], ["0%", "100%"]);
    const yText = useTransform(scrollYProgress, [0,1], ["0%", "500%"])

  return (
    <div className="parallax" ref={ref} style={{background: type === "services" ? "linear-gradient(180deg, #061829, #095a9b) " : "linear-gradient (180deg, #061829, #505064) " }}>
        <motion.h1 
        style={{y: yText}} 
        
        > { type ==="services" ? "What I Do?" : "My Projects"}</motion.h1>
        <motion.div className="mountains"></motion.div>
        <motion.div 
        style={{y: yBg,
        backgroundImage: `url(${type === "services" ? "planets.png" : "/images/sun.png"})`
        }}
        className="planets"></motion.div>
        <motion.div 
        style={{x: yBg}} className="stars"
        
        ></motion.div>
    </div>
  )
}

Parallax.propTypes = {
    type: PropTypes.string.isRequired 
};

export default Parallax