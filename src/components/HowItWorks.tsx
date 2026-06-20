import { Container, Eyebrow, Reveal } from './ui'

const STEPS = [
  {
    n: '01',
    title: 'Find the gap.',
    desc: 'Where a category hasn’t caught up to what AI can now do.',
  },
  {
    n: '02',
    title: 'Build on foundations.',
    desc: 'Reuse the hard-won edges — realtime, memory, privacy — instead of starting over.',
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
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>The studio model</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="max-w-[20ch] text-4xl">
            Built like a studio, run like a product team.
          </Reveal>
        </div>

        <ol className="mt-12 grid border border-line bg-line gap-px shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70} className="bg-card p-8">
              <span className="font-mono text-sm text-indigo">{s.n}</span>
              <div className="mt-6 h-px w-full bg-line" />
              <h3 className="mt-6 text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-base text-ink-2">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
