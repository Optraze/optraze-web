import type { ReactNode } from 'react'

import { Container, Eyebrow, Reveal } from './ui'

function RealtimeMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <title>Realtime</title>
      <path
        d="M2 12h2.4M7 6v12M12 3v18M17 8v8M21.6 11h.4"
        stroke="url(#mk-rt)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="mk-rt" x1="2" y1="4" x2="22" y2="20">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function MemoryMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <title>Memory</title>
      <path
        d="M12 3 21 7.5 12 12 3 7.5 12 3Z M3 12l9 4.5L21 12 M3 16.5 12 21l9-4.5"
        stroke="url(#mk-mem)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="mk-mem" x1="3" y1="3" x2="21" y2="21">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ShieldMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <title>Private</title>
      <path
        d="M12 3 5 5.6v5.2c0 4.1 3 6.8 7 8.2 4-1.4 7-4.1 7-8.2V5.6L12 3Z"
        stroke="url(#mk-pv)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m9 11.6 2 2 4-4.2"
        stroke="url(#mk-pv)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="mk-pv" x1="5" y1="3" x2="19" y2="20">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const CAPS: {
  mark: ReactNode
  n: string
  title: string
  body: string
  tag: string
}[] = [
  {
    mark: <RealtimeMark />,
    n: '01',
    title: 'Realtime by default',
    body: 'Streaming, sub-second systems — products that respond the instant they’re spoken or typed to, not seconds later.',
    tag: 'Proven in VoiceFlow',
  },
  {
    mark: <MemoryMark />,
    n: '02',
    title: 'Durable memory & state',
    body: 'Context that persists across sessions, channels, and time — so nothing useful is ever reset to zero.',
    tag: 'Proven in ConvoMem',
  },
  {
    mark: <ShieldMark />,
    n: '03',
    title: 'Private & portable',
    body: 'Encryption, redaction, and zero vendor lock-in by default. Your data stays yours — and stays leaveable.',
    tag: 'In every product',
  },
]

export function Platform() {
  return (
    <section
      id="approach"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
        <div className="flex max-w-[40ch] flex-col gap-5">
          <Reveal>
            <Eyebrow>How we build</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="text-4xl">
            Every product inherits the same hard-won edges.
          </Reveal>
          <Reveal as="p" delay={120} className="text-lg text-ink-2">
            The difficult, expensive parts of AI-native software get built once
            and reused across everything we ship — so each new product starts
            further ahead.
          </Reveal>
        </div>

        <div className="mt-14">
          {CAPS.map((c, i) => (
            <Reveal
              key={c.n}
              delay={i * 80}
              className="grid items-start gap-x-10 gap-y-4 border-t border-line py-10 md:grid-cols-[auto_1fr_auto] md:py-12"
            >
              <div className="flex items-center gap-5">
                {c.mark}
                <span className="font-mono text-sm text-ink-3">{c.n}</span>
              </div>
              <div>
                <h3 className="text-2xl text-ink md:text-3xl">{c.title}</h3>
                <p className="mt-3 max-w-[52ch] text-base text-ink-2">
                  {c.body}
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 md:pt-2 md:text-right">
                {c.tag}
              </span>
            </Reveal>
          ))}
        </div>

        {/* studio velocity metrics */}
        <div className="mt-20 border-t border-line pt-12">
          <Reveal>
            <Eyebrow>Studio Velocity</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-3">
            <Reveal className="flex flex-col gap-2">
              <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                70%
              </span>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-3">
                Shared codebase leverage
              </h4>
              <p className="text-sm text-ink-2">
                Every new portfolio product inherits pre-tested realtime,
                memory, and privacy engines.
              </p>
            </Reveal>
            <Reveal delay={60} className="flex flex-col gap-2">
              <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                110 Days
              </span>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-3">
                Validation to Launch
              </h4>
              <p className="text-sm text-ink-2">
                Our focused studio model takes a validated market gap to a fully
                branded live SaaS in under 4 months.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-2">
              <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                2 Active
              </span>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-3">
                Incubated Products
              </h4>
              <p className="text-sm text-ink-2">
                One live in production (ConvoMem) and one in active development
                (VoiceFlow).
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
