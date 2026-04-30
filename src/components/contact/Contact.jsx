import { useRef, useState, useCallback } from 'react'
import './contact.scss'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLocationDot,
  faClock,
  faCircleCheck,
  faSpinner,
  faCheck,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import {
  faLinkedinIn,
  faGithub,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { socialLinks } from '../../constants/portfolioData'

const RATE_LIMIT_MS = 60000

const SUBJECT_OPTIONS = [
  'Collaboration Opportunity',
  'Freelance Project',
  'Technical Consulting',
  'Speaking / Writing',
  'General Inquiry',
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.15 },
  },
}

const itemVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const validateForm = (data) => {
  const errors = {}
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'
  if (data.name.length > 100)
    errors.name = 'Name must be under 100 characters'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email))
    errors.email = 'Please enter a valid email address'
  if (!data.subject) errors.subject = 'Please select a subject'
  if (!data.message.trim() || data.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters'
  if (data.message.length > 2000)
    errors.message = 'Message must be under 2000 characters'
  return errors
}

const Contact = () => {
  const ref = useRef()
  const formRef = useRef()
  const lastSubmitTime = useRef(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const isInView = useInView(ref, { margin: '-80px' })

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }))
      if (error) setError(false)
    },
    [fieldErrors, error]
  )

  const sendEmail = (e) => {
    e.preventDefault()
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

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
          setFormData({ name: '', email: '', subject: '', message: '' })
          setTimeout(() => setSuccess(false), 5000)
        },
        () => {
          setError('There was an error sending your message. Please try again.')
          setSuccess(false)
          setIsSubmitting(false)
        }
      )
  }

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL

  return (
    <motion.div
      ref={ref}
      className="contact"
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Section Header */}
      <motion.div className="contact__header" variants={itemVariants}>
        <span className="contact__label">Get In Touch</span>
        <h2 className="contact__title">Let&apos;s Work Together</h2>
        <p className="contact__subtitle">
          Open to senior engineering roles, MFE architecture consulting, and
          technical writing collaborations.
        </p>
      </motion.div>

      <div className="contact__panels">
        {/* Left Panel — Contact Info */}
        <motion.div className="contact__info" variants={itemVariants}>
          <div className="contact__info-card">
            {/* Availability */}
            <div className="info-item info-item--availability">
              <span className="availability-dot" aria-hidden="true" />
              <span className="info-item__text">Available for opportunities</span>
            </div>

            {/* Location */}
            <div className="info-item">
              <FontAwesomeIcon icon={faLocationDot} className="info-item__icon" />
              <div>
                <span className="info-item__label">Location</span>
                <span className="info-item__text">
                  Kuala Lumpur, Malaysia · Open to remote
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="info-item">
              <FontAwesomeIcon icon={faEnvelope} className="info-item__icon" />
              <div>
                <span className="info-item__label">Email</span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="info-item__text info-item__link"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="info-item">
              <FontAwesomeIcon icon={faClock} className="info-item__icon" />
              <div>
                <span className="info-item__label">Response Time</span>
                <span className="info-item__text">Usually within 48 hours</span>
              </div>
            </div>

            {/* Social links */}
            <div className="contact__socials">
              <span className="info-item__label">Connect</span>
              <div className="social-icons">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-icon"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="social-icon"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="social-icon"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  aria-label="Email"
                  className="social-icon"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel — Form */}
        <motion.div className="contact__form-wrapper" variants={itemVariants}>
          {/* Animated phone SVG */}
          <motion.div
            className="contact__phone-svg"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
            viewport={{ once: true }}
          >
            <svg width="380px" height="400px" viewBox="0 0 32.666 32.666">
              <motion.path
                strokeWidth={0.2}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 3 }}
                d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0 C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01 c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319 c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529 c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814 c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001 c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459 c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084 c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292 c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095 l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719 C32.666,7.326,25.339,0,16.333,0z"
              />
            </svg>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={sendEmail}
            className="contact__form"
            noValidate
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Name */}
            <div className={`form-field ${formData.name ? 'has-value' : ''} ${fieldErrors.name ? 'has-error' : ''}`}>
              <input
                type="text"
                name="name"
                id="contact-name"
                required
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.name}
                placeholder=" "
              />
              <label htmlFor="contact-name">Name</label>
              {fieldErrors.name && (
                <span className="field-error" role="alert">{fieldErrors.name}</span>
              )}
              {formData.name && !fieldErrors.name && (
                <FontAwesomeIcon icon={faCircleCheck} className="field-check" />
              )}
            </div>

            {/* Email */}
            <div className={`form-field ${formData.email ? 'has-value' : ''} ${fieldErrors.email ? 'has-error' : ''}`}>
              <input
                type="email"
                name="email"
                id="contact-email"
                required
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.email}
                placeholder=" "
              />
              <label htmlFor="contact-email">Email</label>
              {fieldErrors.email && (
                <span className="field-error" role="alert">{fieldErrors.email}</span>
              )}
              {formData.email && !fieldErrors.email && (
                <FontAwesomeIcon icon={faCircleCheck} className="field-check" />
              )}
            </div>

            {/* Subject */}
            <div className={`form-field ${formData.subject ? 'has-value' : ''} ${fieldErrors.subject ? 'has-error' : ''}`}>
              <select
                name="subject"
                id="contact-subject"
                required
                value={formData.subject}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.subject}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <label htmlFor="contact-subject">Subject</label>
              {fieldErrors.subject && (
                <span className="field-error" role="alert">{fieldErrors.subject}</span>
              )}
            </div>

            {/* Message */}
            <div className={`form-field ${formData.message ? 'has-value' : ''} ${fieldErrors.message ? 'has-error' : ''}`}>
              <textarea
                name="message"
                id="contact-message"
                rows="5"
                required
                maxLength={2000}
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.message}
                placeholder=" "
              />
              <label htmlFor="contact-message">Message</label>
              <span className="char-count">
                {formData.message.length}/2000
              </span>
              {fieldErrors.message && (
                <span className="field-error" role="alert">{fieldErrors.message}</span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${success ? 'success' : ''}`}
              disabled={isSubmitting || success}
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Sending...
                </>
              ) : success ? (
                <>
                  <FontAwesomeIcon icon={faCheck} /> Message Sent!
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                </>
              )}
            </button>

            {error && (
              <p className="error-message" role="alert">
                {typeof error === 'string'
                  ? error
                  : 'Error sending message. Please try again.'}
              </p>
            )}
            {success && (
              <p className="success-message" role="alert">
                Thanks for reaching out! I&apos;ll get back to you within 48 hours.
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact
