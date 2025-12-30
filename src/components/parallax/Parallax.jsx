import "./parallax.scss"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PropTypes from 'prop-types';
import { Suspense } from 'react'
import Background3D from '../3D/Background3D'

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Parallax = ({ type }) => {
    const ref = useRef();
    const h1Ref = useRef();
    const mountainsRef = useRef();
    const planetsRef = useRef();
    const starsRef = useRef();

    const {scrollYProgress} = useScroll({
        target:ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0,1], ["0%", "100%"]);
    const yText = useTransform(scrollYProgress, [0,1], ["0%", "500%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    // GSAP animations for enhanced scroll effects
    useEffect(() => {
        if (h1Ref.current) {
            gsap.fromTo(
                h1Ref.current,
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.5,
                    rotationX: -90,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top center",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }

        // Animate mountains
        if (mountainsRef.current) {
            gsap.to(mountainsRef.current, {
                y: -50,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }

        // Animate planets with rotation
        if (planetsRef.current) {
            gsap.to(planetsRef.current, {
                rotation: 360,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }

        // Animate stars
        if (starsRef.current) {
            gsap.to(starsRef.current, {
                opacity: 0.8,
                scale: 1.5,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }
    }, []);

  return (
    <div 
        className="parallax" 
        ref={ref} 
        style={{
            background: type === "services" 
                ? "linear-gradient(180deg, var(--color-bgPrimary, #061829), var(--color-accent, #095a9b))" 
                : "linear-gradient(180deg, var(--color-bgPrimary, #061829), var(--color-accentSecondary, #505064))"
        }}
    >
        <Suspense fallback={null}>
            <Background3D intensity={0.25} />
        </Suspense>
        
        <motion.h1 
            ref={h1Ref}
            style={{y: yText, opacity, scale}} 
            className="parallax-title"
        > 
            {type === "services" ? "What I Do?" : "My Projects"}
        </motion.h1>
        
        <motion.div 
            ref={mountainsRef}
            className="mountains"
            style={{ y: yBg }}
        ></motion.div>
        
        <motion.div 
            ref={planetsRef}
            style={{
                y: yBg,
                backgroundImage: `url(${type === "services" ? "/images/planets.webp" : "/images/sun.webp"})`
            }}
            className="planets"
        ></motion.div>
        
        <motion.div 
            ref={starsRef}
            style={{x: yBg, scale}} 
            className="stars"
        ></motion.div>
    </div>
  )
}

Parallax.propTypes = {
    type: PropTypes.string.isRequired 
};

export default Parallax