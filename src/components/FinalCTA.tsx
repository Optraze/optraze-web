import { KineticWords } from './fx'
import { ArrowRight, Container, LinkButton, Reveal } from './ui'

const PRE = ['Two', 'products', 'today.']
const ACCENT = ['A', 'studio’s', 'worth', 'tomorrow.']

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* glowing aurora finale */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="aurora absolute inset-[-25%]"
          style={{
            background:
              'radial-gradient(40% 50% at 30% 36%, rgba(129,140,248,0.15), transparent 62%), radial-gradient(46% 56% at 74% 64%, rgba(34,211,238,0.12), transparent 62%)',
          }}
        />
      </div>

      <Container className="relative">
        <div className="section flex flex-col items-start gap-7">
          <h2 className="max-w-[18ch] text-4xl text-ink">
            <KineticWords words={PRE} inView base={0} startIndex={0} />
            <span className="text-indigo">
              <KineticWords
                words={ACCENT}
                inView
                base={0}
                startIndex={PRE.length}
              />
            </span>
          </h2>
          <Reveal
            as="p"
            delay={120}
            className="max-w-[50ch] text-lg text-ink-2"
          >
            ConvoMem is live, VoiceFlow is in development, and the build queue
            keeps moving. Take a look — or tell us what you&apos;re building.
          </Reveal>
          <Reveal delay={200} className="flex flex-wrap items-center gap-4">
            <LinkButton href="#products" variant="cta" size="lg" magnetic>
              See what we build
            </LinkButton>
            <a
              href="mailto:hello@optraze.com?subject=Hello%20Optraze"
              className="group/button inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink underline-offset-4 hover:underline"
            >
              Get in touch <ArrowRight />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
