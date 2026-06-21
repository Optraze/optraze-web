import { ArrowRight, Container, LinkButton, Reveal } from './ui'
import { Badge } from './ui/badge'

const CAPABILITIES = [
  {
    name: 'Realtime orchestration',
    desc: 'Sub-second latency with barge-in and interruption handling.',
  },
  {
    name: 'Bring your own provider',
    desc: 'Deepgram, OpenAI, Anthropic, Gemini, Groq, ElevenLabs, Azure, Cartesia for STT / TTS / LLM / S2S.',
  },
  {
    name: 'Inbound + outbound calling',
    desc: 'Via Twilio, with continuous dual-track call recording.',
  },
  {
    name: 'Knowledge & RAG',
    desc: 'Agents answer from your own sources, grounded and current.',
  },
  {
    name: 'Analytics',
    desc: 'Every call measured, transcribed, and searchable.',
  },
]

const PROVIDERS = [
  'Deepgram',
  'OpenAI',
  'Anthropic',
  'Gemini',
  'Groq',
  'ElevenLabs',
  'Azure',
  'Cartesia',
]

export function VoiceFlow() {
  return (
    <section
      id="voiceflow"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container>
        <div
          className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          data-cursor-label="VoiceFlow"
        >
          <div>
            <Reveal className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-sm text-ink-3">02</span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-2">
                VoiceFlow
              </span>
              <Badge
                variant="outline"
                className="h-auto gap-2 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em]"
              >
                <span className="h-1.5 w-1.5 bg-indigo" />
                <span className="text-indigo">In development</span>
              </Badge>
            </Reveal>
            <Reveal
              as="h3"
              delay={60}
              className="mt-6 max-w-[15ch] font-display text-[clamp(2rem,1.2rem+2.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-ink"
            >
              Voice agents that listen, think, and speak.
            </Reveal>
          </div>
          <Reveal as="p" delay={120} className="text-lg text-ink-2">
            VoiceFlow is the voice-AI platform we&apos;re building on the
            Optraze stack — to design, deploy, and scale realtime voice agents
            without stitching the infrastructure together yourself.
          </Reveal>
        </div>

        {/* capability spec list */}
        <div className="mt-12 grid gap-x-16 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              key={c.name}
              delay={(i % 2) * 60}
              className="flex items-baseline gap-5 border-t border-line py-6"
            >
              <span className="font-mono text-xs text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-display text-lg text-ink">{c.name}</h4>
                <p className="mt-1.5 text-base text-ink-2">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* provider marquee — text, no chips */}
        <div className="mt-16 border-t border-line pt-10">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
            Works with
          </span>
          <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
            <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
              {[...PROVIDERS, ...PROVIDERS].map((p, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee track
                  key={i}
                  className="flex items-center"
                >
                  <span className="px-8 font-display text-2xl text-ink-2">
                    {p}
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-[linear-gradient(135deg,#4f46e5,#06b6d4)]" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-3">
          <LinkButton
            href="mailto:hello@optraze.com?subject=VoiceFlow%20early%20access"
            variant="cta"
            size="lg"
            magnetic
          >
            Get early access
          </LinkButton>
          <LinkButton
            href="mailto:hello@optraze.com?subject=VoiceFlow%20waitlist"
            variant="link"
          >
            Join the waitlist <ArrowRight />
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  )
}
