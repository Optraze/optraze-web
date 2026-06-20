import type { CSSProperties } from 'react'

import { ArrowRight, Container, cssVars, Eyebrow, LinkButton } from './ui'

const PRE = ['We', 'build', 'the', 'next', 'generation', 'of']
const GRAD = ['AI-native', 'software.']

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
        <div className="max-w-[60rem]">
          <div className="reveal is-visible">
            <Eyebrow>Optraze · AI-native product studio</Eyebrow>
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
            className="mt-7 max-w-[48ch] text-lg text-ink-2 opacity-0"
            style={fade(680)}
          >
            Optraze is a studio building focused SaaS for a world where software
            is expected to think — products with{' '}
            <span className="font-medium text-ink">
              memory, voice, and intelligence
            </span>{' '}
            built in. ConvoMem is live. VoiceFlow is next. More is on the way.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 opacity-0"
            style={fade(820)}
          >
            <LinkButton href="#products" variant="cta" size="lg" magnetic>
              See what we build
            </LinkButton>
            <LinkButton
              href="https://convomem.com"
              external
              variant="outline"
              size="lg"
            >
              ConvoMem is live <ArrowRight />
            </LinkButton>
          </div>

          <dl
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs text-ink-3 opacity-0"
            style={fade(960)}
          >
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <dt className="sr-only">ConvoMem</dt>
              <dd className="tracking-wider">
                CONVOMEM · <span className="text-live">LIVE</span>
              </dd>
            </div>
            <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
            <div>
              <dt className="sr-only">VoiceFlow</dt>
              <dd className="tracking-wider">
                VOICEFLOW · <span className="text-ink">IN DEV</span>
              </dd>
            </div>
            <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
            <div>
              <dt className="sr-only">More products</dt>
              <dd className="tracking-wider">
                MORE · <span className="text-ink">IN BUILD</span>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  )
}
