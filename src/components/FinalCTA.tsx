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
        <div className="flex flex-col items-start gap-7 py-24 md:py-32">
          <Reveal
            as="h2"
            className="max-w-[16ch] text-4xl text-[var(--color-paper)]"
          >
            Start with memory.{' '}
            <span className="text-[#8b93ff]">Then give it a voice.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={80}
            className="max-w-[48ch] text-lg text-[#b9bcc4]"
          >
            ConvoMem is live and free to try for 7 days. VoiceFlow is in
            development — get on the list.
          </Reveal>
          <Reveal delay={140} className="flex flex-wrap items-center gap-4">
            <LinkButton
              href="https://convomem.com"
              external
              variant="cta"
              size="lg"
              magnetic
            >
              Start free with ConvoMem
            </LinkButton>
            <a
              href="mailto:hello@optraze.com?subject=VoiceFlow%20waitlist"
              className="group/button inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-paper underline-offset-4 hover:underline"
            >
              Join the VoiceFlow waitlist <ArrowRight />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
