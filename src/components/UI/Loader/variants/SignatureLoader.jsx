import { useEffect, useRef } from 'react'

// Strokes measured from the KM logo (same 341x234 space). `s`/`e` are when each stroke
// starts and finishes writing, in seconds within the loop; `w` is the pen width.
// The M's swash, heavy diagonal, rising stroke and right swash are one continuous line,
// exactly as in the logo; its thin left stem is a separate stroke with a small foot serif.
const STROKES = [
  { d: 'M28 47 L28 190', w: 4.5, s: 0.1, e: 0.5 }, // K stem
  { d: 'M5 45 L51 45', w: 2.5, s: 0.45, e: 0.6 }, // K stem top serif
  { d: 'M5 191 L51 191', w: 2.5, s: 0.55, e: 0.7 }, // K stem foot serif
  { d: 'M84 45 L128 45', w: 2.5, s: 0.65, e: 0.8 }, // K arm serif
  { d: 'M104 47 L44 117 L108 182 C135 209 160 224 192 227', w: 4, s: 0.75, e: 1.65 }, // K arm, then leg and swash
  { d: 'M72 5 C104 2 130 24 144 56 C165 98 180 128 192 188 L256 26 C262 70 266 110 274 145 C282 178 290 198 312 214 C324 222 334 225 341 226', w: 4, s: 1.6, e: 3.3 }, // M main line
  { d: 'M130 58 C126 100 122 140 120 176', w: 2.8, s: 3.25, e: 3.55 }, // M thin left stem
  { d: 'M90 186 L135 186', w: 2.5, s: 3.5, e: 3.7 }, // M left stem foot serif
]

const CYCLE = 5 // seconds per loop
const NAME_IN = [3.8, 4.3]
const FADE_OUT = 4.75

const clamp01 = (n) => Math.min(1, Math.max(0, n))
const ease = (n) => 0.5 - 0.5 * Math.cos(Math.PI * n)

const SignatureLoader = () => {
  const inkRefs = useRef([])
  const groupRef = useRef(null)
  const penRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const paths = inkRefs.current
    const showAll = () => {
      paths.forEach((p) => p && (p.style.strokeDashoffset = 0))
      if (nameRef.current) nameRef.current.style.opacity = 0.9
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return showAll()

    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = ((now - start) / 1000) % CYCLE
      let pen = null

      STROKES.forEach(({ s, e }, i) => {
        const p = ease(clamp01((t - s) / (e - s)))
        const path = paths[i]
        if (!path) return
        path.style.strokeDashoffset = 1 - p
        path.style.opacity = p > 0 ? 1 : 0 // hides the round cap dot before a stroke starts
        if (p > 0 && p < 1) pen = { path, p }
      })

      const penEl = penRef.current
      if (penEl) {
        if (pen) {
          const point = pen.path.getPointAtLength(pen.p * pen.path.getTotalLength())
          penEl.setAttribute('cx', point.x)
          penEl.setAttribute('cy', point.y)
          penEl.style.opacity = 1
        } else {
          penEl.style.opacity = 0
        }
      }

      if (nameRef.current) nameRef.current.style.opacity = 0.9 * ease(clamp01((t - NAME_IN[0]) / (NAME_IN[1] - NAME_IN[0])))
      if (groupRef.current) groupRef.current.style.opacity = t > FADE_OUT ? 1 - (t - FADE_OUT) / (CYCLE - FADE_OUT) : 1

      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <svg className="sig-loader" viewBox="-12 -6 370 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="sigGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="340" y2="0">
          <stop offset="0" stopColor="#38d4ff" />
          <stop offset="0.5" stopColor="#6ee755" />
          <stop offset="1" stopColor="#3fabf1" />
        </linearGradient>
      </defs>

      <g className="sig-ghost">
        {STROKES.map(({ d, w }) => (
          <path key={d} d={d} strokeWidth={w} />
        ))}
      </g>

      <g ref={groupRef} className="sig-ink">
        {STROKES.map(({ d, w }, i) => (
          <path
            key={d}
            ref={(el) => (inkRefs.current[i] = el)}
            d={d}
            pathLength="1"
            strokeWidth={w}
            style={{ strokeDashoffset: 1 }}
          />
        ))}
        <circle ref={penRef} className="sig-pen" r="6" cx="38" cy="48" />
      </g>

      <text ref={nameRef} className="sig-name" x="170" y="246" textAnchor="middle">
        KEMI OLUWADAHUNSI
      </text>
    </svg>
  )
}

export default SignatureLoader
