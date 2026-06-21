import { Container, Eyebrow, Reveal } from './ui'

export function Problem() {
  return (
    <section className="section border-b border-line">
      <Container narrow>
        <Reveal className="mb-7">
          <Eyebrow>The thesis</Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={40} className="text-4xl">
          Most software was built before machines could understand us.
        </Reveal>
        <Reveal as="p" delay={100} className="mt-7 text-lg text-ink-2">
          Every category of software is being rebuilt for a world where the
          product can remember, understand, and respond on its own. Most teams
          bolt AI onto what already exists. We start from the other end —
          building focused products that are AI-native from the first line, on
          foundations we don&apos;t have to reinvent each time.
        </Reveal>
        <Reveal delay={160} className="mt-12 border-l-2 border-ink pl-6">
          <blockquote className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
            The next decade of software won&apos;t be AI-assisted. It&apos;ll be
            AI-native — or it won&apos;t matter.
          </blockquote>
        </Reveal>
      </Container>
    </section>
  )
}
