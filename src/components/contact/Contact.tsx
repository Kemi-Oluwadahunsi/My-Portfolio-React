import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Send, Linkedin, Github, Twitter, CheckCircle2, Loader2 } from 'lucide-react'
import { contactInfo, socialLinks } from '../../constants/portfolioData'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm('service_id', 'template_4ydhzmq', formRef.current, 'PE_S_eZ_H0nBimpSo')
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-py border-t border-white/[0.04]" ref={ref}>
      <div className="section-wrap">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Contact</span>
            <h2 className="display-title">Let's build something</h2>
            <p className="section-desc mt-4 max-w-sm">
              Open to senior engineering roles, MFE architecture consulting, and technical
              writing collaborations. Response within 48 hours.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
              >
                <span className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={15} />
                </span>
                <span className="text-sm">{contactInfo.email}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-500">
                <span className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <MapPin size={15} />
                </span>
                <span className="text-sm">Kuala Lumpur, Malaysia</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-2">
                {[
                  { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
                  { icon: Github,   href: socialLinks.github,   label: 'GitHub'   },
                  { icon: Twitter,  href: socialLinks.twitter,  label: 'X'        },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/5 border border-green-500/15">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-400/80 font-mono">Available for new opportunities</span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === 'sent' ? (
              <div className="glass-card p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]">
                <CheckCircle2 size={40} className="text-green-400" />
                <h3 className="text-white font-semibold text-lg">Message sent!</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Thanks for reaching out. I'll get back to you within 48 hours.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-2">
                  Send another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-2">Name</label>
                    <input
                      name="from_name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-navy-800 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-navy-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-2">Email</label>
                    <input
                      name="reply_to"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-navy-800 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-navy-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-2">Subject</label>
                  <input
                    name="subject"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-navy-800 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-navy-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the project, role, or collaboration..."
                    className="w-full px-4 py-3 rounded-xl bg-navy-800 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-navy-700 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs font-mono">
                    Something went wrong. Email me directly at {contactInfo.email}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer line */}
      <div className="section-wrap mt-20 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-xs font-mono text-slate-700">
          © {new Date().getFullYear()} Oluwakemi Oluwadahunsi
        </span>
        <span className="text-xs font-mono text-slate-700">
          Built with React · TypeScript · Tailwind v4
        </span>
      </div>
    </section>
  )
}

export default Contact
