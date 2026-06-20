import { useEffect, useRef, useState } from 'react'

import { Container } from './ui'

type Stat = {
  display?: string
  to?: number
  prefix?: string
  suffix?: string
  label: string
}

const STATS: Stat[] = [
  { display: '∞', label: 'memory / customer' },
  { to: 20, prefix: '<', suffix: 'ms', label: 'recall · p95' },
  { to: 4, label: 'channels unified' },
  { to: 0, label: 'vendor lock-in' },
]

function CountUp({
  to,
  prefix = '',
  suffix = '',
}: {
  to: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to)
      return
    }
    let raf = 0
    const run = () => {
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / 1100, 1)
        setN(Math.round(to * (1 - (1 - p) ** 3)))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

export function ProofStrip() {
  return (
    <section
      aria-label="What the layer delivers"
      className="border-b border-line py-12 md:py-16"
    >
      <Container>
        <dl className="grid grid-cols-2 border border-line bg-line gap-px shadow-soft md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 bg-card px-4 py-10 md:px-7"
            >
              <dt className="font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
                {typeof s.to === 'number' ? (
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  s.display
                )}
              </dt>
              <dd className="font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
