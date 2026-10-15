import { useEffect, useSyncExternalStore } from 'react'

// Ids of the page sections, top to bottom (the nav links point at these).
const SECTION_IDS = [
  'main-content',
  'services',
  'portfolioSection',
  'architecture',
  'experience',
  'skills',
  'writing',
  'opensource',
  'testimonials',
  'contact',
]
const SCROLLER_ID = 'scroll-container'
const ACTIVATE_WITHIN = 160 // px below the top of the scroll area where a section counts as current

let active = SECTION_IDS[0]
const listeners = new Set()
const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

const compute = () => {
  const scroller = document.getElementById(SCROLLER_ID)
  if (!scroller) return
  const top = scroller.getBoundingClientRect().top
  const present = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)

  let current = present[0]
  for (const el of present) {
    if (el.getBoundingClientRect().top - top <= ACTIVATE_WITHIN) current = el
  }
  // Short last sections can never reach the threshold, so the page bottom selects the last one.
  if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4) current = present[present.length - 1]

  if (current && current.id !== active) {
    active = current.id
    listeners.forEach((fn) => fn())
  }
}

// Mount once (in the layout that owns the scroll container). Works out the current section from where
// the sections actually sit, so it is right on first load, after returning from another page, and
// after lazy sections load and shift the layout.
export const useTrackActiveSection = () => {
  useEffect(() => {
    const scroller = document.getElementById(SCROLLER_ID)
    if (!scroller) return

    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(compute)
    }

    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const resizeObserver = new ResizeObserver(schedule)
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) resizeObserver.observe(el)
    })
    compute()

    return () => {
      cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      resizeObserver.disconnect()
    }
  }, [])
}

export const useActiveSection = () => useSyncExternalStore(subscribe, () => active)
