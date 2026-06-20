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
          We build the products, not just the parts.
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <p className="font-display text-2xl font-medium leading-snug text-ink">
            Plenty of companies sell the building blocks. We use ours to ship
            products people actually open.
          </p>
          <p className="mt-6 text-lg text-ink-2">
            Optraze is a studio. We design, build, and run our own AI-native
            software — each product focused, each with its own brand, each
            inheriting the same hard-won edges so it starts further ahead. We
            ship what&apos;s ready and say plainly what isn&apos;t. ConvoMem is
            live today. VoiceFlow is next. The build queue keeps moving.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
