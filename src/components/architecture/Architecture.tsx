import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'

const MFEDiagram = () => (
  <div className="relative w-full overflow-x-auto">
    <svg
      viewBox="0 0 760 400"
      className="w-full max-w-3xl mx-auto"
      style={{ fontFamily: 'JetBrains Mono, monospace' }}
    >
      {/* ── Background grid */}
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgb(255 255 255 / 0.03)" strokeWidth="0.5" />
        </pattern>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect width="760" height="400" fill="url(#grid)" />

      {/* ── IDP Shell / Host Apps row label */}
      <text x="16" y="30" fill="#475569" fontSize="9" letterSpacing="2">HOST APPLICATIONS</text>
      <text x="16" y="210" fill="#475569" fontSize="9" letterSpacing="2">IDP · IDENTITY PROVIDER (MFE)</text>
      <text x="16" y="340" fill="#475569" fontSize="9" letterSpacing="2">SHARED LAYER</text>

      {/* ── Host app boxes (3 teams) */}
      {[
        { x: 40,  label: 'Team A App',   sub: 'React Host'   },
        { x: 280, label: 'Team B App',   sub: 'Angular Host' },
        { x: 520, label: 'Team C App',   sub: 'React Host'   },
      ].map(({ x, label, sub }) => (
        <g key={label}>
          <rect x={x} y="44" width="180" height="72" rx="8"
            fill="rgb(13 31 60 / 0.9)" stroke="rgb(255 255 255 / 0.1)" strokeWidth="0.75" />
          <text x={x + 90} y="76" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="500">{label}</text>
          <text x={x + 90} y="93" textAnchor="middle" fill="#475569" fontSize="9">{sub}</text>
          {/* Consumes badge */}
          <rect x={x + 52} y="99" width="76" height="13" rx="6"
            fill="rgb(59 130 246 / 0.12)" stroke="rgb(59 130 246 / 0.25)" strokeWidth="0.5" />
          <text x={x + 90} y="109" textAnchor="middle" fill="#60A5FA" fontSize="8">consumes IDP</text>
        </g>
      ))}

      {/* ── Arrows from host down to IDP */}
      {[130, 370, 610].map((cx) => (
        <line key={cx} x1={cx} y1="116" x2={cx} y2="168"
          stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr)" opacity="0.5" />
      ))}

      {/* ── IDP Box (centre, prominent) */}
      <rect x="40" y="172" width="680" height="110" rx="12"
        fill="rgb(10 22 40 / 0.95)" stroke="rgb(59 130 246 / 0.4)" strokeWidth="1" />
      {/* IDP label */}
      <text x="380" y="198" textAnchor="middle" fill="#60A5FA" fontSize="12" fontWeight="500" letterSpacing="1">
        IDP — Identity Provider
      </text>

      {/* LDAP flow */}
      <rect x="68" y="208" width="148" height="56" rx="8"
        fill="rgb(59 130 246 / 0.08)" stroke="rgb(59 130 246 / 0.25)" strokeWidth="0.75" />
      <text x="142" y="233" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="500">LDAP Flow</text>
      <text x="142" y="249" textAnchor="middle" fill="#475569" fontSize="9">Staff login</text>
      <text x="142" y="259" textAnchor="middle" fill="#475569" fontSize="9">Directory auth</text>

      {/* OIDC flow */}
      <rect x="238" y="208" width="148" height="56" rx="8"
        fill="rgb(59 130 246 / 0.08)" stroke="rgb(59 130 246 / 0.25)" strokeWidth="0.75" />
      <text x="312" y="233" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="500">OIDC / PingID</text>
      <text x="312" y="249" textAnchor="middle" fill="#475569" fontSize="9">Agent login</text>
      <text x="312" y="259" textAnchor="middle" fill="#475569" fontSize="9">Federated auth</text>

      {/* API Manager */}
      <rect x="408" y="208" width="148" height="56" rx="8"
        fill="rgb(245 158 11 / 0.06)" stroke="rgb(245 158 11 / 0.25)" strokeWidth="0.75" />
      <text x="482" y="233" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="500">API Manager Pkg</text>
      <text x="482" y="249" textAnchor="middle" fill="#475569" fontSize="9">Zero direct calls</text>
      <text x="482" y="259" textAnchor="middle" fill="#475569" fontSize="9">from IDP</text>

      {/* Token lifecycle */}
      <rect x="578" y="208" width="124" height="56" rx="8"
        fill="rgb(59 130 246 / 0.08)" stroke="rgb(59 130 246 / 0.25)" strokeWidth="0.75" />
      <text x="640" y="233" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="500">Token Lifecycle</text>
      <text x="640" y="249" textAnchor="middle" fill="#475569" fontSize="9">JWT · Refresh</text>
      <text x="640" y="259" textAnchor="middle" fill="#475569" fontSize="9">Session management</text>

      {/* ── Arrows from IDP down to shared */}
      {[142, 312, 482, 640].map((cx) => (
        <line key={cx} x1={cx} y1="282" x2={cx} y2="318"
          stroke="#475569" strokeWidth="0.75" strokeDasharray="3 3" markerEnd="url(#arr-gray)" opacity="0.4" />
      ))}

      {/* ── Shared layer */}
      <rect x="40" y="322" width="680" height="56" rx="8"
        fill="rgb(5 11 24 / 0.8)" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.75" />
      <text x="380" y="345" textAnchor="middle" fill="#475569" fontSize="10">Webpack 5 Module Federation · Shared dependencies (React, singleton) · Module registry</text>
      <text x="380" y="362" textAnchor="middle" fill="#334155" fontSize="9">All teams consume IDP as a remote · Autonomous post-auth · Zero version lock</text>
    </svg>
  </div>
)

const Architecture = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="architecture" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="section-label">System Design</span>
          <h2 className="section-title">MFE Architecture Showcase</h2>
          <p className="section-subtitle">
            The IDP architecture now used as the org-wide authentication standard
            at Etiqa — consumed by every host application across all teams.
          </p>
        </motion.div>

        {/* Diagram card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card p-6 mb-6"
        >
          <MFEDiagram />
        </motion.div>

        {/* Key decisions grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {[
            {
              label: 'Dual-flow auth',
              detail: 'LDAP for staff, OIDC via PingID for agents — single IDP handles both without coupling.',
              color: 'var(--color-brand-blue)',
            },
            {
              label: 'Zero API calls in IDP',
              detail: 'All requests managed through a shared API Manager package library. The IDP is purely presentational.',
              color: 'var(--color-brand-amber)',
            },
            {
              label: 'Full team autonomy',
              detail: 'Each host app consumes the IDP remote and gains independence immediately after authentication.',
              color: 'var(--color-brand-blue-light)',
            },
          ].map(({ label, detail, color }) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{ background: 'rgb(10 22 40 / 0.6)', border: '1px solid rgb(255 255 255 / 0.06)' }}
            >
              <div className="w-1 h-4 rounded-full mb-3" style={{ background: color }} />
              <p className="text-white text-sm font-medium mb-1">{label}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{detail}</p>
            </div>
          ))}
        </motion.div>

        {/* Ebook CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgb(59 130 246 / 0.08), rgb(10 22 40 / 0.6))',
            border: '1px solid rgb(59 130 246 / 0.15)',
          }}
        >
          <div>
            <p className="text-white font-medium mb-1">
              Writing a full ebook on this architecture
            </p>
            <p className="text-slate-400 text-sm">
              Micro Frontends with Webpack 5 Module Federation — from zero to production.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/oluwakemioluwadahunsi/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2 shrink-0"
          >
            Join the waitlist
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Architecture
