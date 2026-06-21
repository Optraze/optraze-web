import { Container, cx, Eyebrow, Reveal } from './ui'

const STEPS = [
  {
    n: '01',
    title: 'Find the gap.',
    desc: 'Where a category hasn’t caught up to what AI can now do.',
  },
  {
    n: '02',
    title: 'Build on what’s proven.',
    desc: 'Start from the systems earlier products already battle-tested, not a blank repo.',
  },
  {
    n: '03',
    title: 'Ship something focused.',
    desc: 'One sharp product with its own brand — never a bloated platform.',
  },
  {
    n: '04',
    title: 'Let it earn the next.',
    desc: 'Real usage decides what we build after it.',
  },
]

export function HowItWorks() {
  return (
    <section className="section border-b border-line">
      <Container>
        <div className="flex max-w-[34ch] flex-col gap-5">
          <Reveal>
            <Eyebrow>The studio model</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="text-4xl">
            Built like a studio, run like a product team.
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 80}
              className={cx(
                'lg:pl-8 lg:first:pl-0',
                i > 0 && 'lg:border-l lg:border-line'
              )}
            >
              <span className="font-display text-6xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)]">
                {s.n}
              </span>
              <h3 className="mt-6 text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-base text-ink-2">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
