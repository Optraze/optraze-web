import { useEffect, useRef, useState } from 'react'

const INTERACTIVE =
  'a, button, [role="button"], label, summary, input, select, textarea'

/**
 * Square, on-brand custom cursor: an exact indigo dot + a lagging outline ring
 * that grows over interactive elements. Desktop/fine-pointer only; disabled
 * under reduced-motion and on touch (native cursor stays).
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fine && !reduce) setActive(true)
  }, [])

  useEffect(() => {
    if (!active) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    const root = document.documentElement
    root.classList.add('custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let shown = false

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
      if (!shown) {
        shown = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null
      ring.classList.toggle('is-hovering', !!el?.closest?.(INTERACTIVE))
    }
    const onOut = (e: PointerEvent) => {
      if (e.relatedTarget) return
      shown = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    dot.style.opacity = '0'
    ring.style.opacity = '0'
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerout', onOut, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onOut)
      root.classList.remove('custom-cursor')
    }
  }, [active])

  if (!active) return null
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
