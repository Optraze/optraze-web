import type { CSSProperties } from 'react'

import { MemoryStream } from './hero/MemoryStream'
import { ArrowRight, Container, cssVars, Eyebrow, LinkButton } from './ui'

const PRE = ['AI', 'that', 'talks', 'should', 'also']
const GRAD = [
  'remember,',
  'understand,',
  'and',
  'respond',
  'in',
  'real',
  'time.',
]

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="word" style={cssVars({ '--delay': `${delay}ms` })}>
      {children}{' '}
    </span>
  )
}

const fade = (delay: number): CSSProperties =>
  cssVars({
    animation: `rise-fade 0.6s var(--ease-emphatic) ${delay}ms forwards`,
  })

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line pt-28 pb-16"
    >
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* left: message */}
          <div>
            <div className="reveal is-visible">
              <Eyebrow>
                Infrastructure for conversational &amp; voice AI
              </Eyebrow>
            </div>

            <h1 className="mt-6 max-w-[18ch] text-hero font-bold leading-[0.95] tracking-[-0.045em] text-ink">
              {PRE.map((w, i) => (
                <Word key={w} delay={i * 50}>
                  {w}
                </Word>
              ))}
              <span className="text-indigo">
                {GRAD.map((w, i) => (
                  <Word key={w} delay={(PRE.length + i) * 50}>
                    {w}
                  </Word>
                ))}
              </span>
            </h1>

            <p
              className="mt-7 max-w-[44ch] text-lg text-ink-2 opacity-0"
              style={fade(680)}
            >
              Optraze builds the{' '}
              <span className="font-medium text-ink">
                memory, voice, and intelligence
              </span>{' '}
              layers underneath conversational AI — so the products you ship
              don&apos;t start every conversation from zero.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 opacity-0"
              style={fade(820)}
            >
              <LinkButton href="#platform" variant="cta" size="lg" magnetic>
                Explore the platform
              </LinkButton>
              <LinkButton
                href="https://convomem.com"
                external
                variant="outline"
                size="lg"
              >
                See ConvoMem live <ArrowRight />
              </LinkButton>
            </div>

            <dl
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs text-ink-3 opacity-0"
              style={fade(960)}
            >
              <div className="flex items-center gap-2">
                <span className="live-dot" />
                <dt className="sr-only">Status</dt>
                <dd className="tracking-wider">
                  <span className="text-live">LIVE</span> · CONVOMEM
                </dd>
              </div>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
              <div>
                <dt className="sr-only">Recall latency</dt>
                <dd className="tracking-wider">
                  <span className="text-ink">&lt;20MS</span> RECALL P95
                </dd>
              </div>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
              <div>
                <dt className="sr-only">Channels</dt>
                <dd className="tracking-wider">
                  <span className="text-ink">4</span> CHANNELS
                </dd>
              </div>
            </dl>
          </div>

          {/* right: live product visualizer */}
          <div className="opacity-0 lg:pl-4" style={fade(900)}>
            <MemoryStream />
          </div>
        </div>
      </Container>
    </section>
  )
}
