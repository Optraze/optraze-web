import { createElement, useEffect, useId, useRef } from 'react'

import type { CSSProperties, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Inline-style object that carries CSS custom properties. */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties
}

/* ---------------------------------------------------------------- Container */
export function Container({
  children,
  className,
  narrow,
}: {
  children: ReactNode
  className?: string
  narrow?: boolean
}) {
  return (
    <div className={cx('container-x', narrow && 'container-narrow', className)}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ Eyebrow */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <p className={cx('eyebrow', className)}>{children}</p>
}

/* ------------------------------------------------------------------- Reveal */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  id,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return createElement(
    Tag,
    {
      ref,
      id,
      className: cx('reveal', className),
      style: cssVars({ '--delay': `${delay}ms` }),
    } as Record<string, unknown>,
    children
  )
}

/* ----------------------------------------------------------------- Magnetic */
export function Magnetic({
  children,
  strength = 0.2,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`
    }
    const reset = () => {
      el.style.transform = 'translate(0px, 0px)'
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', reset)
    }
  }, [strength])

  return (
    <div
      ref={ref}
      className={cx('inline-block will-change-transform', className)}
      style={{ transition: 'transform 0.4s var(--ease-micro)' }}
    >
      {children}
    </div>
  )
}

/* --------------------------------------------------------------- LinkButton */
type LinkButtonProps = {
  children: ReactNode
  href: string
  external?: boolean
  magnetic?: boolean
  variant?: 'default' | 'cta' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
}

export function LinkButton({
  children,
  href,
  external,
  magnetic,
  variant = 'default',
  size = 'default',
  className,
  onClick,
}: LinkButtonProps) {
  const link = (
    <a
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size, className }))}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
  return magnetic ? <Magnetic>{link}</Magnetic> : link
}

/* -------------------------------------------------------------------- Icons */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={cx(
        'transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/button:translate-x-0.5',
        className
      )}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h10M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Check({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5 6 12l7-9"
        stroke={`url(#${id})`}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={id} x1="2" y1="3" x2="13" y2="12">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ------------------------------------------------------------ Section label */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: ReactNode
  title: ReactNode
  intro?: ReactNode
  className?: string
}) {
  return (
    <div className={cx('flex flex-col gap-5', className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={60} className="max-w-[20ch] text-4xl">
        {title}
      </Reveal>
      {intro ? (
        <Reveal as="p" delay={120} className="max-w-[54ch] text-lg text-ink-2">
          {intro}
        </Reveal>
      ) : null}
    </div>
  )
}
