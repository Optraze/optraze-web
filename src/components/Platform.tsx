import { Container, Eyebrow, Reveal } from './ui'

export function Platform() {
  return (
    <section
      id="approach"
      className="section scroll-mt-20 border-b border-line py-20 md:py-28"
    >
      <Container narrow>
        <Reveal>
          <Eyebrow>How we build</Eyebrow>
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="mt-6 text-3xl font-bold leading-tight text-ink md:text-5xl tracking-tight"
        >
          Every product inherits the same hard-won edges.
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="mt-8 text-lg md:text-xl leading-relaxed text-ink-2"
        >
          We solve the hard, expensive parts of AI-native software once — then
          reuse them across everything we ship, so every new product starts
          further ahead than a blank page ever could.
        </Reveal>
      </Container>
    </section>
  )
}
