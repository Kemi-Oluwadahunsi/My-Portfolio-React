import { useEffect } from 'react'

const SCRIPT_SRC = import.meta.env.VITE_REPLYBASE_SCRIPT_SRC
const AGENT_ID = import.meta.env.VITE_REPLYBASE_AGENT_ID
const AGENT_ATTR = import.meta.env.VITE_REPLYBASE_AGENT_ATTR || 'data-agent-id'

export default function ChatWidget() {
  useEffect(() => {
    if (!SCRIPT_SRC || document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return

    const load = () => {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      if (AGENT_ID) script.setAttribute(AGENT_ATTR, AGENT_ID)
      document.body.appendChild(script)
    }

    // Defer so the widget never competes with the hero/3D scene for main-thread time.
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(load, 2500)
    return () => window.clearTimeout(id)
  }, [])

  return null
}
