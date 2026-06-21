import { lazy, Suspense, useEffect, useState } from 'react'

const ParticleCanvas = lazy(() => import('./ParticleCanvas'))

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Fixed, site-wide living backdrop: the particle field flows behind every
 * section. Solid cards sit on top; the texture shows in headings and gutters.
 * Client-only and lazy (three.js never hits the server). Mobile + reduced-motion
 * fall back to a static CSS wash; the loop pauses while the tab is hidden.
 */
export function SiteBackdrop() {
  const [canvasOn, setCanvasOn] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches
    if (reduce || mobile || !hasWebGL()) return
    setCanvasOn(true)
  }, [])

  useEffect(() => {
    if (!canvasOn) return
    const onVis = () => setPaused(document.visibilityState !== 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [canvasOn])

  return (
    <div className="-z-10 pointer-events-none fixed inset-0" aria-hidden="true">
      <div className="hero-fallback absolute inset-0" />
      {canvasOn ? (
        <Suspense fallback={null}>
          <ParticleCanvas paused={paused} />
        </Suspense>
      ) : null}
    </div>
  )
}
