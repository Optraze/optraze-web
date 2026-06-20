import type { ReactNode } from 'react'

import { Container, cx, Eyebrow, Reveal } from './ui'

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center border border-line bg-secondary">
      {children}
    </span>
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

function VoiceMark() {
  return (
    <IconWrap>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <title>Voice</title>
        <path
          d="M3 12h2.2M8 7v10M12 3.5v17M16 8v8M20 11h1"
          stroke="url(#mk-voice)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="mk-voice" x1="3" y1="4" x2="21" y2="20">
            <stop stopColor="#4f46e5" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </IconWrap>
  )
}

function IntelMark() {
  return (
    <IconWrap>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <title>Intelligence</title>
        <path
          d="m7 8 5 3 5-4M7 8l5 9 5-9"
          stroke="url(#mk-int)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="8" r="2.2" stroke="url(#mk-int)" strokeWidth="1.5" />
        <circle
          cx="17"
          cy="7"
          r="2.2"
          stroke="url(#mk-int)"
          strokeWidth="1.5"
        />
        <circle
          cx="12"
          cy="18.5"
          r="2.2"
          stroke="url(#mk-int)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="mk-int" x1="5" y1="5" x2="19" y2="20">
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
      id="platform"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>The Optraze platform</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="max-w-[20ch] text-4xl">
            Three layers that make conversational AI actually useful.
          </Reveal>
        </div>

        <div className="mt-12 grid border border-line bg-line gap-px shadow-soft md:grid-cols-3">
          <Tile
            className="md:col-span-2"
            mark={<MemoryMark />}
            title="Memory"
            body="Durable, searchable customer memory that survives every session. Facts get captured automatically; one person stays one profile across voice, chat, SMS, and email."
            tag="Shipping today as ConvoMem"
          />
          <Tile
            mark={<VoiceMark />}
            title="Voice"
            body="Realtime voice orchestration with sub-second latency, interruption handling, and bring-your-own STT / TTS / LLM."
            tag="In development — VoiceFlow"
            delay={80}
          />
          <Tile
            className="md:col-span-3"
            mark={<IntelMark />}
            title="Intelligence"
            body="Sentiment, buying intent, churn risk, and a knowledge graph that connects everything a customer has ever told you."
            tag="Built into every layer"
            delay={120}
          />
        </div>
      </Container>
    </section>
  )
}
