import { ArrowRight, Container, LinkButton, Reveal } from './ui'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(60% 80% at 85% 0%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(50% 70% at 100% 100%, rgba(6,182,212,0.28), transparent 60%)',
        }}
      />
      <Container className="relative">
        <div className="section flex flex-col items-start gap-7">
          <Reveal
            as="h2"
            className="max-w-[18ch] text-4xl text-[var(--color-paper)]"
          >
            Two products today.{' '}
            <span className="text-[#8b93ff]">A studio’s worth tomorrow.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={80}
            className="max-w-[50ch] text-lg text-[#b9bcc4]"
          >
            ConvoMem is live, VoiceFlow is in development, and the build queue
            keeps moving. Take a look — or tell us what you&apos;re building.
          </Reveal>
          <Reveal delay={140} className="flex flex-wrap items-center gap-4">
            <LinkButton href="#products" variant="cta" size="lg" magnetic>
              See what we build
            </LinkButton>
            <a
              href="mailto:hello@optraze.com?subject=Hello%20Optraze"
              className="group/button inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-paper underline-offset-4 hover:underline"
            >
              Get in touch <ArrowRight />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
