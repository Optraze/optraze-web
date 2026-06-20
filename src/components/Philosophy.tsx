import { Container, Eyebrow, Reveal } from './ui'

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section scroll-mt-20 border-b border-line"
    >
      <Container narrow>
        <Reveal>
          <Eyebrow>Why Optraze</Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={60} className="mt-5 max-w-[20ch] text-4xl">
          We build the layer, so you can build the product.
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <p className="font-display text-2xl font-medium leading-snug text-ink">
            Infrastructure should be invisible and unforgiving — fast when it
            matters, honest about what it can&apos;t do yet.
          </p>
          <p className="mt-6 text-lg text-ink-2">
            Optraze is the foundational layer for conversational and voice AI:
            the memory, the voice, the intelligence. We don&apos;t lock you to a
            provider, we don&apos;t keep your data hostage, and we ship
            what&apos;s ready while we tell you plainly what isn&apos;t.
            ConvoMem is live today. VoiceFlow is next.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
