import { useEffect, useRef } from 'react'

const Cursor = () => {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const pos      = useRef({ x: 0, y: 0 })
  const ring     = useRef({ x: 0, y: 0 })
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', move)

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const addHover  = () => ringRef.current?.classList.add('scale-150',    'opacity-50')
    const rmvHover  = () => ringRef.current?.classList.remove('scale-150', 'opacity-50')

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', rmvHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-2 h-2 rounded-full bg-blue-400 will-change-transform hidden lg:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[998] w-8 h-8 rounded-full border border-blue-400/40 will-change-transform transition-transform duration-150 hidden lg:block"
      />
    </>
  )
}

export default Cursor
