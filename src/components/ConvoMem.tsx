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

export function ConvoMem() {
  return (
    <section
      id="convomem"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
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
              <Eyebrow>Memory layer — ConvoMem</Eyebrow>
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

        <Reveal className="mt-12 flex flex-wrap items-center gap-3">
          <LinkButton
            href="https://convomem.com"
            external
            variant="cta"
            size="lg"
            magnetic
          >
            Start free trial
          </LinkButton>
          <LinkButton
            href="https://convomem.com"
            external
            variant="outline"
            size="lg"
          >
            Try the live demo <ArrowRight />
          </LinkButton>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-3">
            7 days · no card
          </span>
        </Reveal>
      </Container>
    </section>
  )
}
