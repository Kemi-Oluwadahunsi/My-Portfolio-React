import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import './chatWidget.scss'

const SUGGESTIONS = [
  'What has Kemi built?',
  "Tell me about Kemi's work at Etiqa",
  'What services does Kemi offer?',
  'How can I contact Kemi?',
]

const SITE_HOSTS = new Set(['kemi-oluwadahunsi.vercel.app'])

const GREETING = "Hi, I'm Kemi's portfolio assistant. Ask me about her work, projects, skills or writing."
const FALLBACK_ERROR = "Sorry, I couldn't reach the assistant. Please try again, or use the contact form."
// Matches [label](url) first, then bare URLs.
const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s]+)/g

const toInternal = (href) => {
  try {
    const url = new URL(href)
    const sameSite = url.host === window.location.host || SITE_HOSTS.has(url.host)
    return sameSite ? { path: url.pathname, search: url.search, hash: url.hash } : null
  } catch {
    return null
  }
}

// Turns links in a plain-text answer into anchors; trailing punctuation stays outside the link.
// Links to this site are handled in-app so they scroll or route without a page reload.
const Linkified = ({ text, onInternal }) => {
  const nodes = []
  let last = 0
  for (const match of text.matchAll(LINK_PATTERN)) {
    const [full, label, mdUrl, bareUrl] = match
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const raw = mdUrl || bareUrl
    const url = mdUrl ? raw : raw.replace(/[.,;:!?)]+$/, '')
    const internal = toInternal(url)
    const handleClick = (e) => {
      if (!internal || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      onInternal(internal)
    }
    nodes.push(
      <a
        key={match.index}
        href={url}
        onClick={handleClick}
        {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {label || url}
      </a>,
    )
    last = match.index + (mdUrl ? full.length : url.length)
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function ChatWidget() {
  const reduced = useReducedMotion()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const launcherRef = useRef(null)
  const inputRef = useRef(null)
  const logRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, open])

  useEffect(() => () => abortRef.current?.abort(), [])

  const close = useCallback(() => {
    setOpen(false)
    launcherRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const goInternal = useCallback(
    ({ path, search, hash }) => {
      // Phones: the panel covers the page, so step aside to reveal the section.
      if (window.innerWidth <= 768) setOpen(false)

      const id = hash.replace('#', '')
      const onHome = location.pathname === '/' && path === '/'
      const target = id && onHome ? document.getElementById(id) : null
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', `/${hash}`)
      } else {
        navigate({ pathname: path, search, hash })
      }
    },
    [location.pathname, navigate],
  )

  const send = async (raw) => {
    const content = raw.trim()
    if (!content || loading) return

    const history = [...messages, { role: 'user', content }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    const setAnswer = (text) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: text }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        let message = FALLBACK_ERROR
        try {
          message = (await res.json()).error || message
        } catch {
          /* keep the generic message */
        }
        return setAnswer(message)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        answer += decoder.decode(value, { stream: true })
        setAnswer(answer)
      }
      if (!answer.trim()) setAnswer(FALLBACK_ERROR)
    } catch (err) {
      if (err.name !== 'AbortError') setAnswer(FALLBACK_ERROR)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            className="chat-panel"
            role="dialog"
            aria-label="Chat with Kemi's portfolio assistant"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          >
            <header className="chat-header">
              <div>
                <strong>Ask about Kemi</strong>
                <span>AI assistant · answers from her portfolio</span>
              </div>
              <button type="button" className="chat-icon-btn" onClick={close} aria-label="Close chat">
                <X size={18} />
              </button>
            </header>

            <div className="chat-log" ref={logRef} role="log" aria-live="polite">
              <p className="chat-msg assistant">{GREETING}</p>
              {messages.map((m, i) => (
                <p key={i} className={`chat-msg ${m.role}`}>
                  {m.role === 'assistant' && !m.content ? (
                    <span className="chat-typing" aria-label="Typing">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <Linkified text={m.content} onInternal={goInternal} />
                  )}
                </p>
              ))}

              {messages.length === 0 && (
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((q) => (
                    <button key={q} type="button" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="chat-form" onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                maxLength={500}
                aria-label="Your question"
              />
              <button type="submit" className="chat-send" disabled={loading || !input.trim()} aria-label="Send">
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with Kemi’s assistant'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span>Ask me</span>}
      </button>
    </>
  )
}
