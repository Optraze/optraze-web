import { useState } from 'react'

import type { FormEvent } from 'react'

import { submitSignup } from '@/lib/signup'

import { ArrowRight, Check } from './ui'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    try {
      await submitSignup({ data: { email, source: 'waitlist' } })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex max-w-[28rem] items-center gap-2.5 border border-line bg-paper-2/40 px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink">
        <Check className="shrink-0" />
        <span>You&apos;re on the list — we&apos;ll be in touch.</span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[28rem]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border border-line bg-paper-2/40 focus-within:border-indigo px-1 py-1 transition-colors"
      >
        <input
          type="email"
          required
          placeholder="Enter email for early access"
          value={email}
          disabled={status === 'submitting'}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          className="flex-1 min-w-0 bg-transparent px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink placeholder:text-ink-3/40 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-ink hover:bg-indigo text-paper rounded-none px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 disabled:bg-line-strong disabled:text-ink-3 flex items-center gap-1.5 hover:cursor-pointer disabled:cursor-not-allowed group/btn"
        >
          <span>{status === 'submitting' ? 'Joining' : 'Join'}</span>
          <ArrowRight className="text-paper group-hover/btn:translate-x-0.5" />
        </button>
      </form>
      {status === 'error' ? (
        <p className="mt-2 px-1 font-mono text-[0.62rem] uppercase tracking-wider text-destructive">
          Enter a valid email and try again.
        </p>
      ) : null}
    </div>
  )
}
