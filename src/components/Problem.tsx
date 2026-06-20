import { Container, Eyebrow, Reveal } from './ui'

export function Problem() {
  return (
    <section className="section border-b border-line">
      <Container narrow>
        <Reveal className="mb-7">
          <Eyebrow>The problem</Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={40} className="text-4xl">
          Most AI forgets you the second you hang up.
        </Reveal>
        <Reveal as="p" delay={100} className="mt-7 text-lg text-ink-2">
          Voice bots, chat bots, and support agents lose the thread the moment a
          session ends. The customer repeats their name, their order number,
          their problem — every single time. The model is smart; the system
          around it has no memory, no shared identity across channels, and no
          real-time backbone. That gap is what Optraze closes.
        </Reveal>
        <Reveal delay={160} className="mt-12 border-l-2 border-ink pl-6">
          <blockquote className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
            Intelligence without continuity is just a very expensive way to
            start over.
          </blockquote>
        </Reveal>
      </Container>
    </section>
  )
}
