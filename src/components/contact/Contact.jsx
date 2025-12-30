// import { useRef, useState } from 'react'
// import './contact.scss'
// import { motion, useInView } from 'framer-motion'
// import emailjs from '@emailjs/browser'
// import { contactInfo } from '../../constants/portfolioData'
// import GlassCard from '../UI/GlassCard/GlassCard'
// import GlowCard from '../UI/GlowCard/GlowCard'
// import Button from '../UI/Button/Button'
// import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

// const Contact = () => {
//   const ref = useRef()
//   const formRef = useRef()

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   })

//   const [error, setError] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//     // Clear errors when user starts typing
//     if (error) setError(false)
//   }

//   const sendEmail = (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError(false)
//     setSuccess(false)

//     emailjs
//       .sendForm(
//         'service_l5v9o2d',
//         'template_4ydhzmq',
//         formRef.current,
//         'PE_S_eZ_H0nBimpSo'
//       )
//       .then(
//         (result) => {
//           setSuccess(true)
//           setError(false)
//           setIsSubmitting(false)
//           console.log(result)

//           // Reset the form fields
//           setFormData({
//             name: '',
//             email: '',
//             message: '',
//           })
//         },
//         (error) => {
//           setError(true)
//           setSuccess(false)
//           setIsSubmitting(false)
//           console.log('Error sending email:', error)
//         }
//       )
//   }

//   const isInView = useInView(ref, { margin: '-100px', once: true })

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: 'easeOut',
//       },
//     },
//   }

//   return (
//     <section className="contact-section" id="contact">
//       <ParticleBackground density={20} speed={0.3} />
//       <hr className="divider" />
//       <motion.div
//         ref={ref}
//         className="contact-container"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? 'visible' : 'hidden'}
//       >
//         <motion.div className="contact-header" variants={itemVariants}>
//           <h1 className="contact-title">Let&apos;s Work Together</h1>
//           <p className="contact-subtitle">
//             Have a project in mind? I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
//           </p>
//         </motion.div>

//         <div className="contact-content">
//           <motion.div className="contact-info" variants={itemVariants}>
//             <GlowCard intensity="medium">
//               <GlassCard className="info-card">
//               <div className="info-item">
//                 <div className="info-icon">
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//                     <polyline points="22,6 12,13 2,6" />
//                   </svg>
//                 </div>
//                 <div className="info-content">
//                   <h3>Email</h3>
//                   <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
//                 </div>
//               </div>

//               <div className="info-item">
//                 <div className="info-icon">
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//                   </svg>
//                 </div>
//                 <div className="info-content">
//                   <h3>Phone</h3>
//                   <div className="phone-numbers">
//                     {contactInfo.phone.map((phone, index) => (
//                       <a key={index} href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>
//                         {phone}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               </GlassCard>
//             </GlowCard>
//           </motion.div>

//           <motion.div className="contact-form-wrapper" variants={itemVariants}>
//             <GlowCard intensity="high">
//               <GlassCard className="form-card">
//               <motion.form
//                 ref={formRef}
//                 onSubmit={sendEmail}
//                 className="contact-form"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//               >
//                 <div className="form-group">
//                   <label htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     placeholder="Your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     aria-label="Your name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     placeholder="your.email@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     aria-label="Your email"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message">Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="6"
//                     required
//                     placeholder="Feel free to give your feedbacks or for collaboration on worthy projects. Thank you!"
//                     value={formData.message}
//                     onChange={handleChange}
//                     aria-label="Your message"
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   variant="primary"
//                   size="lg"
//                   disabled={isSubmitting}
//                   className="submit-button"
//                 >
//                   {isSubmitting
//                     ? 'Sending...'
//                     : error
//                     ? 'Try Again'
//                     : success
//                     ? 'Message Sent!'
//                     : 'Send Message'}
//                 </Button>

//                 {error && (
//                   <motion.p
//                     className="error-message"
//                     role="alert"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                   >
//                     There was an error sending your message. Please try again.
//                   </motion.p>
//                 )}

//                 {success && (
//                   <motion.p
//                     className="success-message"
//                     role="alert"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                   >
//                     Message sent successfully! I&apos;ll get back to you soon.
//                   </motion.p>
//                 )}
//               </motion.form>
//               </GlassCard>
//             </GlowCard>
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   )
// }

// export default Contact







import { useRef, useState } from 'react';
import './contact.scss';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser'

const variants = {
    initial: {
        y: 100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            staggerChildren: 0.1,
        }
    },
}

const Contact = () => {
    const ref = useRef ()
    const formRef = useRef()

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    })

    const handleSubmit = () => {
      alert('Message submitted successfully')
    }

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const sendEmail = (e) => {
      e.preventDefault()

      emailjs
        .sendForm(
          'service_l5v9o2d',
          'template_4ydhzmq',
          formRef.current,
          'PE_S_eZ_H0nBimpSo'
        )
        .then(
          (result) => {
            setSuccess(true)
            setError(false);
            console.log(result);

            // Reset the form fields
            setFormData({
              name: '',
              email: '',
              message: '',
            })
            handleSubmit()
          },
          (error) => {
            setError(true)
            setSuccess(false)
            console.log('Error sending email:', error)
          }
        )
    }



    const isInView = useInView(ref, {margin: "-100px"});

  return (
    <section>
      <hr className="divider" />
      <motion.div
        ref={ref}
        className="contact"
        variants={variants}
        initial="initial"
        whileInView={isInView && 'animate'}
      >
        <motion.div className="contactText" variants={variants}>
          <motion.h1 className="heading" variants={variants}>
            Let&apos;s Work Together
          </motion.h1>
          <motion.div variants={variants} className="item">
         
            <h2 className="mail">Mail:</h2>

            <span>oluwakemioluwadahunsi@gmail.com</span>
          </motion.div>

          <motion.div variants={variants} className="item">
            <h2 className="mail">Phone:</h2>
            <span>(+60) 111-321-9046, (+234) 814-643-3203</span>
          </motion.div>
        </motion.div>

        <div className=" largeScreen">
          <motion.div
            className="phoneSVG"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <svg width="380px" height="400px" viewBox="0 0 32.666 32.666">
              <motion.path
                strokeWidth={0.2}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView && { pathLength: 1 }}
                transition={{ duration: 3 }}
                d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
                M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0
                C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01
                c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319
                c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529
                c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814
                c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001
                c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459
                c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084
                c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292
                c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095
                l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
                C32.666,7.326,25.339,0,16.333,0z"
              />
            </svg>
          </motion.div>

          <motion.form
            className="largeForm"
            ref={formRef}
            onSubmit={sendEmail}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              rows="10"
              placeholder="Feel free to give your feedbacks or for collaboration on worthy projects. Thank you!"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">Submit</button>
            {error && 'Error'}
            {success && ''}
          </motion.form>
        </div>

        <div className="smallScreen">
          <motion.form ref={formRef} onSubmit={sendEmail} className="smallForm">
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              rows="10"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">Submit</button>
            {error && 'Error'}
            {success && ''}
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
