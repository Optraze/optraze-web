import { useEffect, useState } from 'react'

import { Check } from '../ui'

const FACTS = [
  { k: 'Name', v: 'Maya Chen' },
  { k: 'Intent', v: 'Reschedule delivery' },
  { k: 'Order', v: '#4821' },
  { k: 'Sentiment', v: 'Positive' },
  { k: 'Channel', v: 'Voice' },
]
const BARS = 26

/**
 * Hero product visualizer — a sharp, light panel showing a live session:
 * an animated voice waveform, a transcript line, and facts being extracted
 * into the memory store. Demonstrates ConvoMem at a glance. Reduced-motion
 * shows the full, static state.
 */
export function MemoryStream() {
  const [count, setCount] = useState(FACTS.length)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 1
    setCount(1)
    const id = setInterval(() => {
      i = i >= FACTS.length ? 1 : i + 1
      setCount(i)
    }, 1700)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="card-ink shadow-pop relative bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
          <span className="live-dot" /> Live session
        </span>
        <span className="font-mono text-xs text-ink-3">00:07</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-3">
          Voice
        </span>
        <div className="flex h-8 flex-1 items-center justify-between">
          {Array.from({ length: BARS }).map((_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
              key={i}
              className="w-[3px] origin-bottom bg-[linear-gradient(180deg,#4f46e5,#06b6d4)]"
              style={{
                animation: `eq ${0.9 + (i % 5) * 0.12}s var(--ease-neutral) ${i * 45}ms infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 font-mono text-sm text-ink-2">
        “Hi — can you move my delivery to Friday?”
      </p>

      <div className="mt-5 border-t border-line pt-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">
          Extracted → memory
        </span>
        <ul className="mt-3 flex flex-col gap-2.5">
          {FACTS.map((f, i) => (
            <li
              key={f.k}
              className="flex items-center gap-2.5"
              style={
                i < count
                  ? { animation: 'chip-in 0.45s var(--ease-emphatic) both' }
                  : { opacity: 0 }
              }
            >
              <Check className="shrink-0" />
              <span className="font-mono text-xs uppercase tracking-wider text-ink-3">
                {f.k}
              </span>
              <span className="font-mono text-ink-3">→</span>
              <span className="font-display text-sm text-ink">{f.v}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-3">
          Recall
        </span>
        <span className="font-display text-sm text-ink">
          <span className="text-indigo">&lt;20ms</span> p95
        </span>
      </div>
    </div>
  )
}
