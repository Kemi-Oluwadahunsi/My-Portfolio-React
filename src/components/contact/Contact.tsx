import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import {
  Mail, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle,
} from 'lucide-react'
import { socialLinks, contactInfo } from '../../constants/portfolioData'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<FormState>('idle')
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setState('sending')
    try {
      await emailjs.sendForm(
        'service_id',
        'template_4ydhzmq',
        formRef.current,
        'PE_S_eZ_H0nBimpSo',
      )
      setState('success')
      formRef.current.reset()
    } catch {
      setState('error')
    }
  }

  const SOCIALS = [
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Github,   href: socialLinks.github,   label: 'GitHub'   },
    { icon: Twitter,  href: socialLinks.twitter,  label: 'X / Twitter' },
  ]

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Get in touch</span>
          <h2 className="section-title">Let's Talk</h2>
          <p className="section-subtitle">{contactInfo.availability}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Email */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: 'rgb(10 22 40 / 0.6)', border: '1px solid rgb(255 255 255 / 0.06)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgb(59 130 246 / 0.1)', color: 'var(--color-brand-blue-light)' }}
              >
                <Mail size={15} />
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Email</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-200 text-sm hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Response time */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgb(10 22 40 / 0.6)', border: '1px solid rgb(255 255 255 / 0.06)' }}
            >
              <p className="text-slate-500 text-xs mb-1">Response time</p>
              <p className="text-white text-sm">Within 48 hours</p>
            </div>

            {/* Availability pill */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgb(10 22 40 / 0.6)', border: '1px solid rgb(255 255 255 / 0.06)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <p className="text-slate-500 text-xs">Status</p>
              </div>
              <p className="text-white text-sm">Open to senior roles & consulting</p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg transition-colors duration-200"
                  style={{ color: '#475569', border: '1px solid rgb(255 255 255 / 0.06)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-slate-500">Name</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors duration-200"
                    style={{
                      background: 'rgb(10 22 40 / 0.8)',
                      border: '1px solid rgb(255 255 255 / 0.08)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-slate-500">Email</label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors duration-200"
                    style={{
                      background: 'rgb(10 22 40 / 0.8)',
                      border: '1px solid rgb(255 255 255 / 0.08)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-slate-500">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What are you reaching out about?"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors duration-200"
                  style={{
                    background: 'rgb(10 22 40 / 0.8)',
                    border: '1px solid rgb(255 255 255 / 0.08)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-slate-500">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project, role, or collaboration idea..."
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none resize-none transition-colors duration-200"
                  style={{
                    background: 'rgb(10 22 40 / 0.8)',
                    border: '1px solid rgb(255 255 255 / 0.08)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                />
              </div>

              <button
                type="submit"
                disabled={state === 'sending' || state === 'success'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === 'sending' ? (
                  'Sending...'
                ) : state === 'success' ? (
                  <><CheckCircle size={15} /> Message sent!</>
                ) : (
                  <><Send size={15} /> Send message</>
                )}
              </button>

              {state === 'error' && (
                <p className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={14} />
                  Something went wrong. Please email directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
