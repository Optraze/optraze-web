import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { ArrowRight, Container, cssVars, Eyebrow, LinkButton } from './ui'

const HeroCanvas = lazy(() => import('./hero/HeroCanvas'))

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function HeroBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null)
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
    const el = wrapRef.current
    if (!el) return
    let visible = true
    let inView = true
    const sync = () => setPaused(!(visible && inView))
    const onVis = () => {
      visible = document.visibilityState === 'visible'
      sync()
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    io.observe(el)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [canvasOn])

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-fallback" />
      {canvasOn ? (
        <Suspense fallback={null}>
          <HeroCanvas paused={paused} />
        </Suspense>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
    </div>
  )
}

const PRE = ['AI', 'that', 'talks', 'should', 'also']
const GRAD = [
  'remember,',
  'understand,',
  'and',
  'respond',
  'in',
  'real',
  'time.',
]

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="word" style={cssVars({ '--delay': `${delay}ms` })}>
      {children}{' '}
    </span>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line pt-28 pb-16"
    >
      <HeroBackdrop />
      <Container className="relative">
        <div className="max-w-[60rem]">
          <div className="reveal is-visible">
            <Eyebrow>Infrastructure for conversational &amp; voice AI</Eyebrow>
          </div>

          <h1 className="mt-7 max-w-[17ch] text-hero font-bold leading-[0.95] tracking-[-0.045em] text-ink">
            {PRE.map((w, i) => (
              <Word key={w} delay={i * 55}>
                {w}
              </Word>
            ))}
            <span className="text-indigo">
              {GRAD.map((w, i) => (
                <Word key={w} delay={(PRE.length + i) * 55}>
                  {w}
                </Word>
              ))}
            </span>
          </h1>

          <p className="mt-8 max-w-[46ch] text-lg text-ink-2 opacity-0 [animation:word-rise_0.6s_var(--ease-emphatic)_forwards] [animation-delay:720ms]">
            Optraze builds the{' '}
            <span className="font-medium text-ink">
              memory, voice, and intelligence
            </span>{' '}
            layers underneath conversational AI — so the products you ship
            don&apos;t start every conversation from zero.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 opacity-0 [animation:word-rise_0.6s_var(--ease-emphatic)_forwards] [animation-delay:860ms]">
            <LinkButton href="#platform" variant="cta" size="lg" magnetic>
              Explore the platform
            </LinkButton>
            <LinkButton
              href="https://convomem.com"
              external
              variant="outline"
              size="lg"
            >
              See ConvoMem live <ArrowRight />
            </LinkButton>
          </div>

          <dl className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs text-ink-3 opacity-0 [animation:word-rise_0.6s_var(--ease-emphatic)_forwards] [animation-delay:1000ms]">
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <dt className="sr-only">Status</dt>
              <dd className="tracking-wider">
                <span className="text-live">LIVE</span> · CONVOMEM
              </dd>
            </div>
            <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
            <div>
              <dt className="sr-only">Recall latency</dt>
              <dd className="tracking-wider">
                <span className="text-ink">&lt;20MS</span> RECALL P95
              </dd>
            </div>
            <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
            <div>
              <dt className="sr-only">Channels</dt>
              <dd className="tracking-wider">
                <span className="text-ink">4</span> CHANNELS
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  )
}
