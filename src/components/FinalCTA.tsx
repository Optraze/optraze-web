import { useEffect, useState } from 'react'

import type { FormEvent } from 'react'

import { submitSignup } from '@/lib/signup'

import { KineticWords } from './fx'
import { ArrowRight, Container, Reveal } from './ui'

const PRE = ['The', 'build', 'queue']
const ACCENT = ['never', 'stops.']

interface LogLine {
  id: string
  text: string
  type: 'info' | 'warn' | 'success' | 'system'
}

export function FinalCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'typing' | 'submitting' | 'success' | 'error'
  >('idle')
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 'init', text: 'Register standing by.', type: 'system' },
  ])
  const [hasTyped, setHasTyped] = useState(false)

  // Clear typing state logs when email becomes empty
  useEffect(() => {
    if (!email && hasTyped) {
      setHasTyped(false)
      setStatus('idle')
      setLogs([{ id: 'init', text: 'Register standing by.', type: 'system' }])
    }
  }, [email, hasTyped])

  // Track typing state to append a typing log
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setEmail(val)

    if (val && !hasTyped) {
      setHasTyped(true)
      setStatus('typing')
      setLogs((prev) => [
        ...prev,
        {
          id: `typing-open-${Date.now()}`,
          text: 'Connection active.',
          type: 'info',
        },
      ])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus('error')
      setLogs((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          text: 'Error: Invalid email address.',
          type: 'warn',
        },
      ])
      return
    }

    setStatus('submitting')
    setLogs((prev) => [
      ...prev,
      {
        id: `net-tunnel-${Date.now()}`,
        text: 'Registering subscriber...',
        type: 'info',
      },
    ])

    try {
      await submitSignup({ data: { email, source: 'newsletter' } })
    } catch {
      setStatus('error')
      setLogs((prev) => [
        ...prev,
        {
          id: `srv-err-${Date.now()}`,
          text: "Error: couldn't register. Please try again.",
          type: 'warn',
        },
      ])
      return
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `reg-entry-${Date.now()}`,
        text: 'Registered successfully. Welcome to the queue.',
        type: 'success',
      },
    ])
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="relative overflow-hidden border-t border-line py-12 md:py-16">
      {/* glowing aurora finale */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="aurora absolute inset-[-25%]"
          style={{
            background:
              'radial-gradient(40% 50% at 30% 36%, rgba(129,140,248,0.06), transparent 62%), radial-gradient(46% 56% at 74% 64%, rgba(34,211,238,0.05), transparent 62%)',
          }}
        />
      </div>

      <Container narrow>
        <div className="section py-0 flex flex-col items-start gap-7">
          {/* Editorial copywriting */}
          <h2 className="max-w-[18ch] text-hero font-bold leading-[0.95] tracking-[-0.045em] text-ink">
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
            className="max-w-[48ch] text-lg leading-relaxed text-ink-2"
          >
            We compile our reusable architectures into focused, public SaaS
            builds. Register for the studio log to receive early beta access
            keys, launch post-mortems, and release previews before they go
            public.
          </Reveal>

          {/* Minimalist Signup Field Layout (Option 1) */}
          <Reveal delay={180} className="w-full max-w-[28rem]">
            <form
              onSubmit={handleSubmit}
              className="flex items-center border border-line bg-paper-2/40 focus-within:border-indigo px-1 py-1 transition-colors"
            >
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                disabled={status === 'submitting' || status === 'success'}
                onChange={handleEmailChange}
                className="flex-1 min-w-0 bg-transparent px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink placeholder:text-ink-3/40 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="bg-ink hover:bg-indigo text-paper rounded-none px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 disabled:bg-line-strong disabled:text-ink-3 flex items-center gap-1.5 hover:cursor-pointer disabled:cursor-not-allowed group/btn"
              >
                <span>Send</span>
                <ArrowRight className="text-paper group-hover/btn:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-3 flex justify-between items-center font-mono text-[0.62rem] text-ink-3 uppercase tracking-wider px-1">
              <span>01 / month • no spam • one-click opt-out</span>
            </div>

            {/* Minimalist quiet logs feed underneath */}
            <div className="mt-4 border-l border-line-strong/30 pl-4 py-0.5 font-mono text-[0.68rem] leading-relaxed flex flex-col gap-1.5 min-h-[2.5rem]">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex gap-2 items-center text-ink-2"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      log.type === 'success'
                        ? 'bg-live'
                        : log.type === 'warn'
                          ? 'bg-destructive'
                          : log.type === 'system'
                            ? 'bg-indigo'
                            : 'bg-cyan'
                    } shrink-0`}
                  />
                  <span
                    className={
                      log.type === 'success' ? 'text-ink font-semibold' : ''
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={240}
            className="mt-4 flex flex-wrap items-center gap-6"
          >
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              Looking for products?
            </span>
            <a
              href="#products"
              className="group/button inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink hover:text-indigo transition-colors underline underline-offset-4"
            >
              Browse directory <ArrowRight />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
