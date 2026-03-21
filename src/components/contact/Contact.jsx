import { useRef, useState, useCallback } from 'react';
import './contact.scss';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser'

const RATE_LIMIT_MS = 60000 // 1 minute between submissions

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

const validateForm = (data) => {
    const errors = {}
    if (!data.name.trim() || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    if (data.name.length > 100) {
      errors.name = 'Name must be under 100 characters'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    if (data.message.length > 2000) {
      errors.message = 'Message must be under 2000 characters'
    }
    return errors
}

const Contact = () => {
    const ref = useRef()
    const formRef = useRef()
    const lastSubmitTime = useRef(0)

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    })

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    const handleChange = useCallback((e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      // Clear field error when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors(prev => ({ ...prev, [name]: '' }))
      }
      if (error) setError(false)
    }, [fieldErrors, error])

    const sendEmail = (e) => {
      e.preventDefault()

      // Validate form
      const errors = validateForm(formData)
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        return
      }

      // Rate limiting
      const now = Date.now()
      if (now - lastSubmitTime.current < RATE_LIMIT_MS) {
        setError('Please wait a moment before sending another message.')
        return
      }

      setIsSubmitting(true)
      setError(false)
      setSuccess(false)
      setFieldErrors({})

      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            lastSubmitTime.current = Date.now()
            setSuccess(true)
            setError(false)
            setIsSubmitting(false)
            setFormData({ name: '', email: '', message: '' })
          },
          () => {
            setError('There was an error sending your message. Please try again.')
            setSuccess(false)
            setIsSubmitting(false)
          }
        )
    }

    const isInView = useInView(ref, {margin: "-100px"});

    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL
    const contactPhone1 = import.meta.env.VITE_CONTACT_PHONE_1
    const contactPhone2 = import.meta.env.VITE_CONTACT_PHONE_2

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
            <span>{contactEmail}</span>
          </motion.div>

          <motion.div variants={variants} className="item">
            <h2 className="mail">Phone:</h2>
            <span>{contactPhone1}, {contactPhone2}</span>
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
            <div className="form-field">
              <input
                type="text"
                name="name"
                required
                maxLength={100}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                aria-label="Your name"
                aria-invalid={!!fieldErrors.name}
              />
              {fieldErrors.name && <span className="field-error" role="alert">{fieldErrors.name}</span>}
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                aria-label="Your email"
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && <span className="field-error" role="alert">{fieldErrors.email}</span>}
            </div>

            <div className="form-field">
              <textarea
                name="message"
                rows="10"
                required
                maxLength={2000}
                placeholder="Feel free to give your feedbacks or for collaboration on worthy projects. Thank you!"
                value={formData.message}
                onChange={handleChange}
                aria-label="Your message"
                aria-invalid={!!fieldErrors.message}
              />
              {fieldErrors.message && <span className="field-error" role="alert">{fieldErrors.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
            {error && <p className="error-message" role="alert">{typeof error === 'string' ? error : 'Error sending message. Please try again.'}</p>}
            {success && <p className="success-message" role="alert">Message sent successfully!</p>}
          </motion.form>
        </div>

        <div className="smallScreen">
          <motion.form ref={formRef} onSubmit={sendEmail} className="smallForm">
            <div className="form-field">
              <input
                type="text"
                name="name"
                required
                maxLength={100}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                aria-label="Your name"
                aria-invalid={!!fieldErrors.name}
              />
              {fieldErrors.name && <span className="field-error" role="alert">{fieldErrors.name}</span>}
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                aria-label="Your email"
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && <span className="field-error" role="alert">{fieldErrors.email}</span>}
            </div>

            <div className="form-field">
              <textarea
                name="message"
                rows="10"
                required
                maxLength={2000}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                aria-label="Your message"
                aria-invalid={!!fieldErrors.message}
              />
              {fieldErrors.message && <span className="field-error" role="alert">{fieldErrors.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
            {error && <p className="error-message" role="alert">{typeof error === 'string' ? error : 'Error sending message. Please try again.'}</p>}
            {success && <p className="success-message" role="alert">Message sent successfully!</p>}
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
