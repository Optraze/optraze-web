import { Logo } from './Logo'
import { Container } from './ui'

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'ConvoMem', href: 'https://convomem.com', external: true },
      { label: 'VoiceFlow', href: '#voiceflow' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Approach', href: '#approach' },
      { label: 'Philosophy', href: '#philosophy' },
      { label: 'Contact', href: 'mailto:hello@optraze.com' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '#faq' },
      {
        label: 'ConvoMem docs',
        href: 'https://convomem.com/docs',
        external: true,
      },
    ],
  },
]

const SOCIALS = [
  {
    label: 'X',
    href: 'https://twitter.com/optraze',
    path: 'M13.5 10.6 21 2h-2.3l-6 6.9L7.9 2H2l7.9 11.4L2 22h2.3l6.4-7.3L16 22h5.9L13.5 10.6Zm-2.2 2.6-.8-1.1L5 3.7h2.7l4.5 6.5.8 1.1 6 8.6h-2.7l-5-6.7Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/optraze',
    path: 'M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3 8.5h3.9V21H3V8.5Zm6.5 0h3.7v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21H21v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9.5V8.5Z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/optraze',
    path: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  },
]

export function Footer() {
  return (
    <footer className="bg-paper">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-ink-2">
              An independent studio shipping AI-native products, one at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...('external' in l && l.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="text-sm text-ink-2 transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-line pt-7 sm:flex-row">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
            © 2026 Optraze · Built for a world where software thinks
          </p>
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center text-ink-3 transition-colors hover:text-ink"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
                <span className="sr-only">Optraze on {s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
