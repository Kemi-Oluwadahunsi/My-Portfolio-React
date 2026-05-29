import "./parallax.scss"
import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import PropTypes from 'prop-types'
import { Suspense } from 'react'
import Background3D from '../3D/Background3D'

const Parallax = ({ type }) => {
    const ref = useRef()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
    const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
    const starsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.8])

    // Trigger h1 entrance when section top hits viewport center
    const isInView = useInView(ref, { once: true, margin: '0px 0px -50% 0px' })

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
                style={{ y: yText, opacity, scale }}
                className="parallax-title"
                initial={{ rotateX: -90 }}
                animate={isInView ? { rotateX: 0 } : { rotateX: -90 }}
                transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
            >
                {type === "services" ? "What I Do?" : "My Projects"}
            </motion.h1>

            <motion.div
                className="mountains"
                style={{ y: yBg }}
            />

            <motion.div
                className="planets"
                style={{
                    y: yBg,
                    rotate: planetRotate,
                    backgroundImage: `url(${type === "services" ? "/images/planets.webp" : "/images/sun.webp"})`
                }}
            />

            <motion.div
                className="stars"
                style={{ x: yBg, scale, opacity: starsOpacity }}
            />
        </div>
    )
}

Parallax.propTypes = {
    type: PropTypes.string.isRequired
}

export default Parallax
