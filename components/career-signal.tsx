'use client'

import { useEffect, useRef, useState } from 'react'

export function CareerSignal() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let angle = 0
    let previous = 0
    const render = (time: number) => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      const width = el.clientWidth, height = el.clientHeight
      if (el.width !== width * dpr || el.height !== height * dpr) {
        el.width = width * dpr; el.height = height * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      if (!paused && !reduced.matches) angle += Math.min(time - previous, 40) * .00025
      previous = time
      const a = angle + pointer.current.x, tilt = .4 + pointer.current.y
      const glyphs = '░▒▓█│─┼·'
      ctx.font = '9px monospace'
      ctx.textAlign = 'center'
      for (let lat = 1; lat < 18; lat++) {
        const phi = lat * Math.PI / 18
        for (let lon = 0; lon < 36; lon++) {
          const theta = lon * Math.PI / 18 + a
          const x = Math.sin(phi) * Math.cos(theta)
          const y = Math.cos(phi)
          const z = Math.sin(phi) * Math.sin(theta)
          const ry = y * Math.cos(tilt) - z * Math.sin(tilt)
          const rz = y * Math.sin(tilt) + z * Math.cos(tilt)
          const scale = 40 * (2.6 / (2.6 - rz * .35))
          ctx.fillStyle = `rgba(183,195,210,${.14 + (rz + 1) * .34})`
          ctx.fillText(glyphs[(lat + lon) % glyphs.length], width / 2 + x * scale, height / 2 + ry * scale)
        }
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frame)
  }, [paused])
  return <div className="career-signal"><canvas ref={canvas} role="img" aria-label="Career Signal: an ASCII wireframe sphere" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); pointer.current = { x: (e.clientX - r.left) / r.width - .5, y: (e.clientY - r.top) / r.height - .5 } }} onPointerLeave={() => { pointer.current = { x: 0, y: 0 } }} /><button onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? 'Resume signal' : 'Pause signal'}</button></div>
}
