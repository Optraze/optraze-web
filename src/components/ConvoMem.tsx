import { useEffect, useRef, useState } from 'react'

import { ArrowRight, Check, Container, Eyebrow, LinkButton, Reveal } from './ui'
import { Badge } from './ui/badge'

const FEATURES = [
  {
    name: 'Memory capture',
    desc: 'Automatic fact extraction from every conversation.',
  },
  {
    name: 'Identity resolution',
    desc: 'One person, one profile, across all four channels.',
  },
  {
    name: 'Sentiment & signals',
    desc: 'Buying intent, complaints, and churn risk in real time.',
  },
  {
    name: 'Knowledge graph',
    desc: 'Every fact connected, queryable, and contextual.',
  },
  {
    name: 'PII redaction',
    desc: 'Sensitive data scrubbed before it is ever stored.',
  },
  {
    name: 'Plain-language analytics',
    desc: 'Ask in English, get answers about your customers.',
  },
]

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

export function ConvoMem() {
  return (
    <section
      id="products"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
        <div className="mb-14 flex flex-col gap-5">
          <Reveal>
            <Eyebrow>Our products</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="max-w-[24ch] text-4xl">
            Focused products, shipped one at a time.
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="max-w-[54ch] text-lg text-ink-2"
          >
            Each one is its own product with its own home. Optraze designs,
            builds, and runs them.
          </Reveal>
        </div>

        <Reveal className="mb-6">
          <Badge
            variant="outline"
            className="h-auto gap-2 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em]"
          >
            <span className="live-dot" />
            <span className="text-live">Live</span>
            <span className="text-ink-3">·</span>
            <span className="text-ink-2">convomem.com</span>
          </Badge>
        </Reveal>

        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Product 01 · ConvoMem</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={60} className="mt-5 max-w-[20ch] text-4xl">
              Give your agents a memory that outlasts the call.
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={120}
            className="max-w-[42ch] text-lg text-ink-2"
          >
            ConvoMem is the memory layer for conversational AI. The next
            interaction starts with context, not repetition — across voice,
            chat, SMS, and email.
          </Reveal>
        </div>

        {/* features as a crisp bordered grid */}
        <div className="mt-12 grid border border-line bg-line gap-px shadow-soft sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.name}
              delay={i * 40}
              className="flex gap-3.5 bg-card p-7"
            >
              <Check className="mt-1 shrink-0" />
              <div>
                <h3 className="font-display text-lg text-ink">{f.name}</h3>
                <p className="mt-1.5 text-base text-ink-2">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* agent handoff — flagship */}
        <Reveal className="mt-4 grid items-start gap-x-10 gap-y-8 border border-line bg-card p-8 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <Eyebrow>Agent handoff</Eyebrow>
            <h3 className="mt-4 max-w-[20ch] text-2xl text-ink">
              When the bot taps out, your team doesn’t start from scratch.
            </h3>
            <p className="mt-3 max-w-[46ch] text-base text-ink-2">
              Escalate to a human and ConvoMem hands them a brief, not a blank
              screen — so they pick up exactly where the conversation broke
              down, and the customer never repeats themselves. Drop it into your
              help desk as an embed, with scoped read or write access.
            </p>
          </div>
          <div className="border border-line bg-paper p-6">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">
              In the handoff brief
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                'Who they are — resolved across channels',
                'The journey — every touch, in order',
                'Key facts — extracted, not retyped',
                'Sentiment — how they feel right now',
                'Open issue — what’s still unresolved',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-ink-2"
                >
                  <Check className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* proof stats */}
        <div className="mt-4 grid grid-cols-2 border border-line bg-line gap-px shadow-soft md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 bg-card px-4 py-10 md:px-7"
            >
              <span className="font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
                {typeof s.to === 'number' ? (
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  s.display
                )}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-3">
          <LinkButton
            href="https://convomem.com"
            external
            variant="cta"
            size="lg"
            magnetic
          >
            Visit ConvoMem <ArrowRight />
          </LinkButton>
          <LinkButton
            href="https://convomem.com"
            external
            variant="outline"
            size="lg"
          >
            Start free trial
          </LinkButton>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-3">
            7 days · no card
          </span>
        </Reveal>
      </Container>
    </section>
  )
}
