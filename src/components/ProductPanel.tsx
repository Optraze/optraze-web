'use no memo'

import { motion, useReducedMotion } from 'motion/react'

import { cx } from './ui'

/**
 * Hero centerpiece — a polished, on-brand mock of ConvoMem's live customer
 * memory. Editorial styling (warm card, hairlines, mono labels, one indigo
 * accent) with restrained motion: rows stream in, a typing caret blinks, the
 * live dot pulses. This shows the product instead of describing it.
 */

const TIMELINE = [
  { t: '09:24', ch: 'voice', note: 'Asked about upgrading the plan' },
  { t: '09:31', ch: 'chat', note: 'Shared last invoice' },
  { t: 'now', ch: 'sms', note: 'typing', typing: true },
]

const FACTS = [
  { k: 'Plan', v: 'Growth → Scale' },
  { k: 'Renewal', v: 'Aug 2026' },
  { k: 'Sentiment', v: 'Positive', accent: true },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function ProductPanel({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  const row = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.5, ease: EASE, delay: 0.25 + i * 0.12 },
  })

  return (
    <div className={cx('relative', className)}>
      {/* soft cast shadow / depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -bottom-8 top-10 -z-[1]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 60%, rgba(58,51,224,0.10), transparent 70%)',
        }}
      />

      <motion.div
        className="float-soft card-sharp w-full max-w-[27rem] shadow-pop"
        style={{ background: 'var(--color-card)' }}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      >
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="live-dot" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink">
              ConvoMem
            </span>
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-3">
            Live memory
          </span>
        </div>

        {/* customer */}
        <div className="flex items-center gap-3.5 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink font-display text-base text-paper">
            M
          </span>
          <div className="min-w-0">
            <p className="font-display text-base text-ink">Maria Alvarez</p>
            <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-3">
              voice · chat · sms · email
            </p>
          </div>
          <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-3">
            #4821
          </span>
        </div>

        {/* timeline */}
        <div className="border-t border-line px-5 pt-4 pb-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
            Timeline
          </p>
          <ul className="mt-3">
            {TIMELINE.map((e, i) => (
              <motion.li
                key={e.t}
                {...row(i)}
                className="flex items-baseline gap-3 py-2"
              >
                <span className="w-10 shrink-0 font-mono text-[0.68rem] tabular-nums text-ink-3">
                  {e.t}
                </span>
                <span className="w-12 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-indigo">
                  {e.ch}
                </span>
                <span className="text-sm text-ink-2">
                  {e.typing ? (
                    <span className="inline-flex items-center gap-1 text-ink-3">
                      typing
                      <span className="caret inline-block h-3 w-[2px] translate-y-[1px] bg-ink-3" />
                    </span>
                  ) : (
                    e.note
                  )}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* extracted facts */}
        <div className="border-t border-line px-5 pt-4 pb-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
            Extracted
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {FACTS.map((f, i) => (
              <motion.li
                key={f.k}
                {...row(i + 3)}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
                  {f.k}
                </span>
                <span
                  className={cx(
                    'text-sm',
                    f.accent ? 'text-indigo' : 'text-ink'
                  )}
                >
                  {f.v}
                  {f.accent ? ' ▴' : ''}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* handoff */}
        <motion.div
          {...row(6)}
          className="flex items-center justify-between border-t border-line bg-[color-mix(in_srgb,var(--color-indigo)_5%,transparent)] px-5 py-3.5"
        >
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink">
            Handoff brief ready
          </span>
          <span className="font-mono text-base text-indigo">→</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
