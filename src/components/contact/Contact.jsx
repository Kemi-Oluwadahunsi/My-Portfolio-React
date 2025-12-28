import { useRef, useState } from 'react'
import './contact.scss'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { contactInfo } from '../../constants/portfolioData'
import GlassCard from '../UI/GlassCard/GlassCard'
import GlowCard from '../UI/GlowCard/GlowCard'
import Button from '../UI/Button/Button'
import ParticleBackground from '../UI/ParticleBackground/ParticleBackground'

const Contact = () => {
  const ref = useRef()
  const formRef = useRef()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear errors when user starts typing
    if (error) setError(false)
  }

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)
    setSuccess(false)

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
          setError(false)
          setIsSubmitting(false)
          console.log(result)

          // Reset the form fields
          setFormData({
            name: '',
            email: '',
            message: '',
          })
        },
        (error) => {
          setError(true)
          setSuccess(false)
          setIsSubmitting(false)
          console.log('Error sending email:', error)
        }
      )
  }

  const isInView = useInView(ref, { margin: '-100px', once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="contact-section" id="contact">
      <ParticleBackground density={20} speed={0.3} />
      <hr className="divider" />
      <motion.div
        ref={ref}
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="contact-header" variants={itemVariants}>
          <h1 className="contact-title">Let&apos;s Work Together</h1>
          <p className="contact-subtitle">
            Have a project in mind? I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <GlowCard intensity="medium">
              <GlassCard className="info-card">
              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <div className="phone-numbers">
                    {contactInfo.phone.map((phone, index) => (
                      <a key={index} href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              </GlassCard>
            </GlowCard>
          </motion.div>

          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <GlowCard intensity="high">
              <GlassCard className="form-card">
              <motion.form
                ref={formRef}
                onSubmit={sendEmail}
                className="contact-form"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="Feel free to give your feedbacks or for collaboration on worthy projects. Thank you!"
                    value={formData.message}
                    onChange={handleChange}
                    aria-label="Your message"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting
                    ? 'Sending...'
                    : error
                    ? 'Try Again'
                    : success
                    ? 'Message Sent!'
                    : 'Send Message'}
                </Button>

                {error && (
                  <motion.p
                    className="error-message"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    There was an error sending your message. Please try again.
                  </motion.p>
                )}

                {success && (
                  <motion.p
                    className="success-message"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </motion.form>
              </GlassCard>
            </GlowCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
