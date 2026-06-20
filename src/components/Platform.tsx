import type { ReactNode } from 'react'

import { Container, cx, Eyebrow, Reveal } from './ui'

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center border border-line bg-secondary">
      {children}
    </span>
  )
}

function RealtimeMark() {
  return (
    <IconWrap>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <title>Realtime</title>
        <path
          d="M3 12h2.2M8 6v12M12 3v18M16 8v8M20 11h1"
          stroke="url(#mk-rt)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="mk-rt" x1="3" y1="4" x2="21" y2="20">
            <stop stopColor="#4f46e5" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrap>
  )
}

function MemoryMark() {
  return (
    <IconWrap>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <title>Memory</title>
        <path
          d="M12 3 21 7.5 12 12 3 7.5 12 3Z M3 12l9 4.5L21 12 M3 16.5 12 21l9-4.5"
          stroke="url(#mk-mem)"
          strokeWidth="1.5"
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
    </IconWrap>
  )
}

function ShieldMark() {
  return (
    <IconWrap>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <title>Private</title>
        <path
          d="M12 3 5 5.6v5.2c0 4.1 3 6.8 7 8.2 4-1.4 7-4.1 7-8.2V5.6L12 3Z"
          stroke="url(#mk-pv)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="m9 11.6 2 2 4-4.2"
          stroke="url(#mk-pv)"
          strokeWidth="1.5"
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
    </IconWrap>
  )
}

function Tile({
  mark,
  title,
  body,
  tag,
  className,
  delay,
}: {
  mark: ReactNode
  title: string
  body: string
  tag: string
  className?: string
  delay?: number
}) {
  return (
    <Reveal
      delay={delay}
      className={cx('flex flex-col bg-card p-8 md:p-10', className)}
    >
      {mark}
      <h3 className="mt-7 text-2xl text-ink">{title}</h3>
      <p className="mt-3 max-w-[44ch] text-base text-ink-2">{body}</p>
      <p className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
        {tag}
      </p>
    </Reveal>
  )
}

export function Platform() {
  return (
    <section
      id="approach"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>How we build</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="max-w-[22ch] text-4xl">
            Every product inherits the same hard-won edges.
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="max-w-[54ch] text-lg text-ink-2"
          >
            The difficult, expensive parts of AI-native software get built once
            and reused across everything we ship. Each new product starts
            further ahead — and our current products prove the edges work.
          </Reveal>
        </div>

        <div className="mt-12 grid border border-line bg-line gap-px shadow-soft md:grid-cols-3">
          <Tile
            mark={<RealtimeMark />}
            title="Realtime by default"
            body="Streaming, sub-second systems — products that respond the instant they’re spoken or typed to, not seconds later."
            tag="Proven in VoiceFlow"
          />
          <Tile
            mark={<MemoryMark />}
            title="Durable memory & state"
            body="Context that persists across sessions, channels, and time — so nothing useful is ever reset to zero."
            tag="Proven in ConvoMem"
            delay={80}
          />
          <Tile
            mark={<ShieldMark />}
            title="Private & portable"
            body="Encryption, redaction, and zero vendor lock-in by default. Your data stays yours — and stays leaveable."
            tag="In every product"
            delay={120}
          />
        </div>
      </Container>
    </section>
  )
}
