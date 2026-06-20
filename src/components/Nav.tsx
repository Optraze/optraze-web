import { useEffect, useState } from 'react'

import { Logo } from './Logo'
import { cx, LinkButton } from './ui'

const LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'ConvoMem', href: '#convomem' },
  { label: 'VoiceFlow', href: '#voiceflow' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Docs', href: 'https://convomem.com', external: true },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          'transition-[background-color,backdrop-filter,border-color] duration-300',
          scrolled
            ? 'border-b border-line bg-paper/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        )}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-16 items-center justify-between gap-4"
        >
          <a href="#top" aria-label="Optraze home">
            <Logo />
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="font-mono text-xs uppercase tracking-[0.12em] text-ink-3 transition-colors duration-150 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <LinkButton
              href="https://convomem.com"
              external
              variant="cta"
              size="sm"
              magnetic
            >
              Start free
            </LinkButton>
          </div>

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={cx(
                  'absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cx(
                  'absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200',
                  open && 'opacity-0'
                )}
              />
              <span
                className={cx(
                  'absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                )}
              />
            </span>
          </button>
        </nav>
      </div>

      <div
        className={cx(
          'fixed inset-0 z-40 bg-paper transition-opacity duration-300 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="container-x flex h-full flex-col justify-center gap-3 pb-16">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-8">
            <LinkButton
              href="https://convomem.com"
              external
              variant="cta"
              onClick={() => setOpen(false)}
            >
              Start free
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  )
}
