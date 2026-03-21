import { useState, useRef, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import { Mail, Linkedin, Github, Twitter, Send, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react'
import { socialLinks, contactInfo } from '../../constants/portfolioData'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm('service_id', 'template_4ydhzmq', formRef.current, 'PE_S_eZ_H0nBimpSo')
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  const SOCIALS = [
    { Icon: Linkedin, label: 'LinkedIn', href: socialLinks.linkedin, handle: 'oluwakemioluwadahunsi' },
    { Icon: Github,   label: 'GitHub',   href: socialLinks.github,   handle: 'Kemi-Oluwadahunsi'    },
    { Icon: Twitter,  label: 'X',        href: socialLinks.twitter,  handle: 'km_oluwadahunsi'       },
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
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">{contactInfo.availability}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — info panel */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Availability */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Available</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{contactInfo.availability}</p>
            </div>

            {/* Location + response */}
            <div className="card p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin size={14} className="text-blue-400 shrink-0" />
                Kuala Lumpur, Malaysia
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail size={14} className="text-blue-400 shrink-0" />
                <a href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors truncate">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Clock size={14} className="text-blue-400 shrink-0" />
                Response within 48 hours
              </div>
            </div>

            {/* Socials */}
            <div className="card p-5">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Find me on</p>
              <div className="space-y-3">
                {SOCIALS.map(({ Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'rgb(255 255 255 / 0.04)' }}>
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-sm text-white leading-none mb-0.5">{label}</p>
                      <p className="text-xs text-slate-500">@{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card p-6">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600
                        outline-none transition-colors"
                      style={{
                        background: 'rgb(2 8 23 / 0.6)',
                        border: '1px solid rgb(255 255 255 / 0.08)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                      onBlur={(e)  => (e.target.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600
                        outline-none transition-colors"
                      style={{
                        background: 'rgb(2 8 23 / 0.6)',
                        border: '1px solid rgb(255 255 255 / 0.08)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                      onBlur={(e)  => (e.target.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600
                      outline-none transition-colors"
                    style={{
                      background: 'rgb(2 8 23 / 0.6)',
                      border: '1px solid rgb(255 255 255 / 0.08)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                    onBlur={(e)  => (e.target.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, role, or what you'd like to collaborate on..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600
                      outline-none transition-colors resize-none"
                    style={{
                      background: 'rgb(2 8 23 / 0.6)',
                      border: '1px solid rgb(255 255 255 / 0.08)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgb(59 130 246 / 0.5)')}
                    onBlur={(e)  => (e.target.style.borderColor = 'rgb(255 255 255 / 0.08)')}
                  />
                </div>

                {/* Status feedback */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle size={15} /> Message sent! I'll get back to you within 48 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={15} /> Something went wrong. Try emailing me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending…' : (
                    <>Send message <Send size={14} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
