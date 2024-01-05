import { useRef } from 'react'
import './services.scss'
import { motion, useInView} from 'framer-motion'
import { useMediaQuery } from '@react-hook/media-query'

const variants = {
  initial1: {
    x: -500,
    y: 100,
    opacity: 0
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    }
  }
}
//whileInView="animate"
const Services = () => {

  // const ref = useRef();

  // const isInView = useInView(ref, {margin: "-100px"} );

  // const isMobile = !useMediaQuery('(min-width: 770px)')

  return (
        <motion.div
          className="services"
          // variants={variants}
          // initial="initial1"
          // ref={ref}
          // // animate={isInView && "animate"}
          // animate={isInView && !isMobile ? "animate" : "initial1"}
        >
          <motion.div className="textContainer" 
          // variants={variants}
          >
            <p>
              I focus on helping your brand grow <span>and move forward</span>{' '}
            </p>
          </motion.div>

          <motion.div className="titleContainer" 
          // variants={variants}
          >
            <div className="title">
              <img src="/images/people.webp" alt="serviceImage" />
              <h1>
                <motion.b whileHover={{ color: '#095a9b' }}>Unique</motion.b>{' '}
                Ideas
              </h1>
            </div>

            <div className="title">
              <h1>
                <motion.b whileHover={{ color: '#095a9b' }}>For Your</motion.b>{' '}
                Business.
              </h1>
              <button>WHAT WE DO</button>
            </div>
          </motion.div>
          <motion.div className="listContainer" 
          // variants={variants}
          >
            <div className="box first">
              <h2 className="serviceTitle">Branding</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                magni esse quo dolor perferendis nihil vero a, quaerat fugit
                recusandae ipsum fugiat, consequatur fuga ab nobis blanditiis?
                Dolorem, officia adipisci!
              </p>

              <button>Go</button>
            </div>

            <div className="box">
              <h2 className="serviceTitle">Branding</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                magni esse quo dolor perferendis nihil vero a, quaerat fugit
                recusandae ipsum fugiat, consequatur fuga ab nobis blanditiis?
                Dolorem, officia adipisci!
              </p>

              <button>Go</button>
            </div>

            <div className="box last">
              <h2 className="serviceTitle">Branding</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                magni esse quo dolor perferendis nihil vero a, quaerat fugit
                recusandae ipsum fugiat, consequatur fuga ab nobis blanditiis?
                Dolorem, officia adipisci!
              </p>

              <button>Go</button>
            </div>
          </motion.div>
        </motion.div>
    //   )}
    // </div>
  )
}

export default Services