import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, BookOpen } from 'lucide-react'

const MFEDiagram = () => (
  <div className="relative w-full overflow-x-auto">
    <svg
      viewBox="0 0 760 420"
      className="w-full max-w-3xl mx-auto"
      style={{ minWidth: '420px' }}
      aria-label="Webpack 5 Module Federation architecture diagram"
    >
      {/* ── defs ── */}
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
          markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
        <linearGradient id="shellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(59 130 246 / 0.18)" />
          <stop offset="100%" stopColor="rgb(59 130 246 / 0.08)" />
        </linearGradient>
        <linearGradient id="remoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(245 158 11 / 0.15)" />
          <stop offset="100%" stopColor="rgb(245 158 11 / 0.06)" />
        </linearGradient>
      </defs>

      {/* ── Shell / Host ── */}
      <rect x="20" y="30" width="720" height="340" rx="14"
        fill="url(#shellGrad)" stroke="rgb(59 130 246 / 0.25)" strokeWidth="1" />
      <text x="44" y="58" fill="rgb(59 130 246)" fontSize="11"
        fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="2">
        SHELL APP (HOST) — webpack.config ModuleFederationPlugin
      </text>

      {/* ── IDP Remote (centre, larger) ── */}
      <rect x="280" y="80" width="200" height="82" rx="10"
        fill="url(#remoteGrad)" stroke="rgb(245 158 11 / 0.45)" strokeWidth="1.5" />
      <text x="380" y="108" textAnchor="middle" fill="rgb(252 211 77)"
        fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="500">IDP App</text>
      <text x="380" y="124" textAnchor="middle" fill="rgb(148 163 184)"
        fontSize="10" fontFamily="JetBrains Mono, monospace">LDAP + OIDC (PingID)</text>
      <text x="380" y="140" textAnchor="middle" fill="rgb(148 163 184)"
        fontSize="10" fontFamily="JetBrains Mono, monospace">auth-remote@/remoteEntry.js</text>
      <text x="380" y="156" textAnchor="middle" fill="rgb(245 158 11)"
        fontSize="9.5" fontFamily="JetBrains Mono, monospace">★ org-wide standard</text>

      {/* ── Remote apps row ── */}
      {[
        { x: 44,  label: 'Timesheet App',   sub: 'React + Angular shell' },
        { x: 192, label: 'Claims Portal',   sub: 'Team A remote'         },
        { x: 536, label: 'Policy Manager',  sub: 'Team B remote'         },
        { x: 684-148, label: 'Agent Portal', sub: 'Team C remote'         },
      ].map(({ x, label, sub }) => (
        <g key={label}>
          <rect x={x} y="220" width="148" height="62" rx="8"
            fill="rgb(10 22 40 / 0.9)" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1"/>
          <text x={x + 74} y="247" textAnchor="middle" fill="#e2e8f0"
            fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="500">{label}</text>
          <text x={x + 74} y="263" textAnchor="middle" fill="#64748b"
            fontSize="9.5" fontFamily="JetBrains Mono, monospace">{sub}</text>
          {/* Arrow from IDP to remote */}
          <line
            x1="380" y1="162"
            x2={x + 74} y2="220"
            stroke="rgb(59 130 246 / 0.35)" strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#arr)"
          />
        </g>
      ))}

      {/* ── Shared libs row ── */}
      <rect x="44" y="318" width="672" height="38" rx="8"
        fill="rgb(255 255 255 / 0.03)" stroke="rgb(255 255 255 / 0.07)" strokeWidth="1"/>
      <text x="380" y="332" textAnchor="middle" fill="#475569"
        fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
        SHARED DEPS (singleton) —
      </text>
      <text x="380" y="347" textAnchor="middle" fill="#475569"
        fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        react · react-dom · API Manager Package · design-tokens
      </text>

      {/* ── Label: browser ── */}
      <text x="740" y="395" textAnchor="end" fill="#1e293b"
        fontSize="10" fontFamily="JetBrains Mono, monospace">Browser Runtime</text>
    </svg>
  </div>
)

const codeSnippet = `// Host webpack.config.ts
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    authRemote: 'auth_remote@/remoteEntry.js',
    timesheet:  'timesheet@/remoteEntry.js',
  },
  shared: {
    react:     { singleton: true, requiredVersion: '^18' },
    'react-dom': { singleton: true, requiredVersion: '^18' },
    // API Manager — no direct calls inside remotes
    '@etiqa/api-manager': { singleton: true },
  },
})

// IDP Remote webpack.config.ts
new ModuleFederationPlugin({
  name: 'auth_remote',
  filename: 'remoteEntry.js',
  exposes: {
    './IDPApp': './src/bootstrap',
  },
  // LDAP flow (staff) ←→ OIDC/PingID flow (agents)
  // All API calls abstracted through @etiqa/api-manager
})`

const Architecture = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="architecture" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Architecture deep-dive</span>
          <h2 className="section-title">MFE Architecture Showcase</h2>
          <p className="section-subtitle">
            The Webpack 5 Module Federation pattern I designed at Etiqa — one IDP remote
            consumed by every host app in the org, with zero coupling after authentication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Diagram card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-5"
          >
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
              Runtime federation topology
            </p>
            <MFEDiagram />
          </motion.div>

          {/* Code + ebook card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Code snippet */}
            <div className="card p-5 flex-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                Module federation config (simplified)
              </p>
              <pre
                className="text-xs leading-relaxed overflow-x-auto"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#94a3b8',
                  background: 'rgb(2 8 23 / 0.6)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgb(255 255 255 / 0.05)',
                }}
              >
                <code>{codeSnippet}</code>
              </pre>
            </div>

            {/* Ebook CTA */}
            <div
              className="card p-5"
              style={{
                background: 'linear-gradient(135deg, rgb(59 130 246 / 0.08), rgb(10 22 40))',
                borderColor: 'rgb(59 130 246 / 0.18)',
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <BookOpen size={20} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Micro Frontends with Webpack 5 — The Ebook Series
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Everything I learned building production MFE systems — written as a
                    two-book series for engineers who want the real patterns, not the happy path.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="tag-pill">Book 1: In progress</span>
                <span className="tag-pill">Book 2: Coming soon</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/oluwakemioluwadahunsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs px-4 py-2"
                >
                  Follow for updates
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Architecture
