import { useEffect, useRef } from 'react'

interface Props {
  density?: number
  speed?: number
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  update: () => void
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
}

const ParticleBackground = ({ density = 50, speed = 1 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    const createParticle = (): Particle => {
      let x = Math.random() * canvas.width
      let y = Math.random() * canvas.height
      const size   = Math.random() * 1.5 + 0.5
      const speedX = (Math.random() - 0.5) * speed
      const speedY = (Math.random() - 0.5) * speed
      const opacity = Math.random() * 0.4 + 0.1

      return {
        x, y, size, speedX, speedY, opacity,
        update() {
          x += speedX
          y += speedY
          this.x = x < 0 ? canvas.width : x > canvas.width ? 0 : x
          this.y = y < 0 ? canvas.height : y > canvas.height ? 0 : y
        },
        draw(ctx, canvas) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(148, 193, 251, ${this.opacity})`
          ctx.fill()
        },
      }
    }

    for (let i = 0; i < density; i++) particles.push(createParticle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(148, 193, 251, ${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach(p => { p.update(); p.draw(ctx, canvas) })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [density, speed])

  return <canvas ref={canvasRef} className="particle-background" />
}

export default ParticleBackground
