import { useEffect, useRef } from 'react'

export default function Confetti({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)
    const pieces: any[] = []
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * w,
        y: Math.random() * -h,
        r: Math.random() * 6 + 4,
        dx: (Math.random() - 0.5) * 6,
        dy: Math.random() * 6 + 2,
        color: `hsl(${Math.random() * 360}deg,90%,60%)`
      })
    }

    let raf = 0
    function draw() {
      ctx.clearRect(0, 0, w, h)
      pieces.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        p.dy += 0.12
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const timeout = setTimeout(() => {
      cancelAnimationFrame(raf)
      ctx.clearRect(0, 0, w, h)
    }, 3500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      ctx.clearRect(0, 0, w, h)
    }
  }, [trigger])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />
}
