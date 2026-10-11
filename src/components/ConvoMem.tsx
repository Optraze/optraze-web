import { ArrowRight, Container, Eyebrow, LinkButton, Reveal } from './ui'
import { Badge } from './ui/badge'

const FEATURES = [
  {
    name: 'Memory capture',
    desc: 'Source-grounded facts with speaker attribution and pollable capture status.',
  },
  {
    name: 'Identity resolution',
    desc: 'One person, one profile, across all four channels.',
  },
  {
    name: 'Controlled recall',
    desc: 'Bounded, topic-aware context with configurable retrieval controls.',
  },
  {
    name: 'Memory lifecycle',
    desc: 'Provenance, versions, expiry, supersession, and reviewable patterns.',
  },
  {
    name: 'PII redaction',
    desc: 'Secrets are dropped and sensitive memory candidates follow the configured agent policy.',
  },
  {
    name: 'Plain-language analytics',
    desc: 'Ask in plain language, get answers about your customers.',
  },
  {
    name: 'Integration toolkit',
    desc: 'REST, hosted MCP, webhooks, embeds, and TypeScript, Python, and Rust SDKs.',
  },
]

const BRIEF = [
  'Who they are — resolved across channels',
  'The journey — every touch, in order',
  'Key facts — extracted, not retyped',
  'Sentiment — how they feel right now',
  'Open issue — what’s still unresolved',
]

export function ConvoMem() {
  return (
    <section
      id="products"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
        {/* products intro */}
        <div className="flex flex-col gap-5">
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
            Each one is its own product with its own home, brand, and roadmap —
            all built and run under one roof.
          </Reveal>
        </div>

        {/* ConvoMem — Product 01, editorial */}
        <div className="mt-20 grid gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-sm text-ink-3">01</span>
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
            <Reveal
              as="h3"
              delay={60}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,1.2rem+2.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-ink"
            >
              A memory that outlasts the conversation.
            </Reveal>
          </div>
          <Reveal as="p" delay={120} className="text-lg text-ink-2">
            ConvoMem is the memory layer for conversational AI — the next
            interaction starts with context, not repetition, across voice, chat,
            SMS, and email. It runs in production today.
          </Reveal>
        </div>

        <Reveal as="p" className="mt-10 max-w-[60ch] text-sm text-ink-3">
          Next-release scope: the controls and integrations below are under
          final validation. They are not a claim that the new release or SDK
          packages have already shipped.
        </Reveal>

        {/* feature spec list — hairline rows, no boxes */}
        <div className="mt-12 grid gap-x-16 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.name}
              delay={(i % 2) * 60}
              className="flex items-baseline gap-5 border-t border-line py-6"
            >
              <span className="font-mono text-xs text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-display text-lg text-ink">{f.name}</h4>
                <p className="mt-1.5 text-base text-ink-2">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* agent handoff — editorial */}
        <div className="mt-20 grid gap-x-16 gap-y-10 border-t border-line pt-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <Eyebrow>Agent handoff</Eyebrow>
            </Reveal>
            <Reveal
              as="h3"
              delay={60}
              className="mt-5 max-w-[18ch] font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink"
            >
              When the bot taps out, your team doesn&apos;t start from scratch.
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="mt-5 max-w-[46ch] text-lg text-ink-2"
            >
              Escalate to a human and ConvoMem hands them a brief, not a blank
              screen — they get the available conversation context and key
              customer facts, helping reduce repeated questions. Drop it into
              your help desk as an embed, with scoped read or write access.
            </Reveal>
          </div>
          <Reveal delay={120}>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">
              In the handoff brief
            </span>
            <ul className="mt-2">
              {BRIEF.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-t border-line py-4 text-base text-ink-2"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[linear-gradient(135deg,#4f46e5,#06b6d4)]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-20 flex flex-wrap items-center gap-3 border-t border-line pt-12">
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
