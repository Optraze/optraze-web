import { Container, Eyebrow, Reveal } from './ui'

const STEPS = [
  {
    n: '01',
    title: 'Connect your channels.',
    desc: 'Point voice, chat, SMS, and email at Optraze.',
  },
  {
    n: '02',
    title: 'We capture and resolve.',
    desc: 'Facts get extracted; identities merge into one profile.',
  },
  {
    n: '03',
    title: 'Your agent recalls in <20ms.',
    desc: 'Context is there before the conversation starts.',
  },
  {
    n: '04',
    title: 'You read the signals.',
    desc: 'Sentiment, intent, and risk — in plain language.',
  },
]

export function HowItWorks() {
  return (
    <section className="section border-b border-line">
      <Container>
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>How it fits together</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={60} className="max-w-[18ch] text-4xl">
            One API call away from continuity.
          </Reveal>
        </div>

        <ol className="mt-12 grid border border-line bg-line gap-px sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70} className="bg-paper p-8">
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
