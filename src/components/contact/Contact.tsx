import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import { contactInfo, socialLinks } from '../../constants/portfolioData'
import { Send, Github, Linkedin, Twitter, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

type FormState = { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'success' | 'error'

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      await emailjs.sendForm(
        'service_l5v9o2d',
        'template_4ydhzmq',
        formRef.current!,
        'PE_S_eZ_H0nBimpSo'
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const socials = [
    { href: socialLinks.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: socialLinks.github, Icon: Github, label: 'GitHub' },
    { href: socialLinks.twitter, Icon: Twitter, label: 'X / Twitter' },
    { href: `mailto:${contactInfo.email}`, Icon: Mail, label: 'Email' },
  ]

  return (
    <section id="contact" className="section-py border-t border-white/[0.04]">
      <div className="section-wrap" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Get in touch</span>
            <h2 className="display-title">Let's build something</h2>
            <p className="text-slate-400 text-[1.05rem] leading-relaxed mt-4 max-w-md">
              {contactInfo.availability}
            </p>

            <div className="mt-8 space-y-3">
              {[
                { label: 'Response time', value: 'Within 48 hours' },
                { label: 'Location', value: 'Kuala Lumpur, Malaysia' },
                { label: 'Time zone', value: 'MYT (UTC+8)' },
                { label: 'Email', value: contactInfo.email },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-sm text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-8">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass-card p-6 lg:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <CheckCircle size={40} className="text-emerald-400" />
                  <h3 className="font-display text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-slate-400 text-sm">I'll get back to you within 48 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn-ghost mt-2">
                    Send another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      rows={5}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                      <AlertCircle size={14} />
                      Something went wrong. Try emailing me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-blue w-full justify-center mt-1"
                  >
                    {status === 'sending' ? (
                      <>Sending... <span className="animate-spin">⟳</span></>
                    ) : (
                      <>Send message <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} Oluwakemi Oluwadahunsi · Built with React + TypeScript
          </p>
          <p className="text-xs text-slate-600 font-mono flex items-center gap-1">
            Designed & engineered with
            <span className="text-red-500/60">♥</span>
            in Kuala Lumpur
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
