import { Container } from './ui'

const STATS = [
  { figure: '∞', label: 'memory / customer' },
  { figure: '<20ms', label: 'recall · p95' },
  { figure: '4', label: 'channels unified' },
  { figure: '0', label: 'vendor lock-in' },
]

export function ProofStrip() {
  return (
    <section
      aria-label="What the layer delivers"
      className="border-b border-line"
    >
      <Container>
        <dl className="grid grid-cols-2 bg-line gap-px md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 bg-paper px-2 py-10 md:px-6"
            >
              <dt className="font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
                {s.figure}
              </dt>
              <dd className="font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
