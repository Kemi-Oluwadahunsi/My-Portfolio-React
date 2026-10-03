import { useEffect, useState } from 'react'

const COMMAND = 'npm run build'
const STEPS = [
  { label: 'federating modules', time: '420ms' },
  { label: 'signing sessions', time: '186ms' },
  { label: 'compiling components', time: '1.2s' },
]
const TYPE_MS = 60
const STEP_MS = 800
const CYCLE_MS = 5600

const BuildLogLoader = () => {
  const [typed, setTyped] = useState(0) // characters of the command typed so far
  const [steps, setSteps] = useState(0) // finished steps shown (STEPS.length + 1 = the final line)
  const [run, setRun] = useState(0) // bumps each loop to restart the sequence

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(COMMAND.length)
      setSteps(STEPS.length + 1)
      return
    }

    setTyped(0)
    setSteps(0)
    const timers = []
    for (let i = 1; i <= COMMAND.length; i++) timers.push(setTimeout(() => setTyped(i), TYPE_MS * i))
    const afterTyping = TYPE_MS * COMMAND.length + 250
    for (let i = 1; i <= STEPS.length + 1; i++) timers.push(setTimeout(() => setSteps(i), afterTyping + (i - 1) * STEP_MS))
    timers.push(setTimeout(() => setRun((n) => n + 1), CYCLE_MS))
    return () => timers.forEach(clearTimeout)
  }, [run])

  const done = steps > STEPS.length
  const progress = Math.min(1, (steps + (typed === COMMAND.length ? 0.3 : 0)) / (STEPS.length + 1))

  return (
    <div className="log-loader" aria-hidden="true">
      <div className="log-line on">
        <span className="p">$</span> {COMMAND.slice(0, typed)}
        {!done && <span className="caret" />}
      </div>
      {STEPS.map(({ label, time }, i) => (
        <div key={label} className={`log-line ${steps > i ? 'on' : ''}`}>
          <span className="ok">✓</span> {label} <span className="dim">{time}</span>
        </div>
      ))}
      <div className={`log-line ${done ? 'on' : ''}`}>
        <span className="go">→</span> <b>ready</b> in 4.9s
      </div>
      <div className="log-bar">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  )
}

export default BuildLogLoader
