import { ArrowRight, Check, Container, Eyebrow, LinkButton, Reveal } from './ui'
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
        <Reveal className="card-ink p-8 md:p-12">
          <Badge
            variant="outline"
            className="h-auto gap-2 border-ink px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em]"
          >
            <span className="h-1.5 w-1.5 bg-indigo" />
            <span className="text-indigo">In development</span>
            <span className="text-ink-3">· coming soon</span>
          </Badge>

          <div className="mt-6 grid gap-x-12 gap-y-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>Voice agent platform — VoiceFlow</Eyebrow>
              <h2 className="mt-5 max-w-[22ch] text-4xl">
                Voice agents that listen, think, and speak in real time.
              </h2>
            </div>
            <p className="max-w-[42ch] text-lg text-ink-2">
              VoiceFlow is the voice-AI platform we&apos;re building on top of
              the Optraze stack — to design, deploy, and scale realtime voice
              agents without stitching the infrastructure together yourself.
            </p>
          </div>

          <div className="mt-10 grid border border-line bg-line gap-px sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div key={c.name} className="flex gap-3.5 bg-card p-7">
                <Check className="mt-1 shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-ink">{c.name}</h3>
                  <p className="mt-1.5 text-base text-ink-2">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
              Works with
            </span>
            {PROVIDERS.map((p) => (
              <span
                key={p}
                className="border border-line bg-paper px-3 py-1 font-mono text-xs text-ink-2"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
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
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
