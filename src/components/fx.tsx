'use no memo'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

import type { ReactNode } from 'react'

import { cx } from './ui'

const EASE = [0.22, 1, 0.36, 1] as const

/* ----------------------------------------------------- scroll progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[120] h-0.5 origin-left bg-[linear-gradient(90deg,#4f46e5,#06b6d4)]"
      style={{ scaleX: x }}
    />
  )
}

/* ------------------------------------------------ kinetic masked word rise */
export function KineticWords({
  words,
  startIndex = 0,
  className,
  stagger = 0.055,
  base = 0.15,
  inView = false,
}: {
  words: string[]
  startIndex?: number
  className?: string
  stagger?: number
  base?: number
  inView?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <>
      {words.map((w, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed static word list
          key={`${w}-${i}`}
          className={cx(
            'inline-block overflow-hidden pb-[0.2em] [margin-bottom:-0.2em] [margin-right:0.22em]',
            className
          )}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '120%' }}
            {...(inView
              ? {
                  whileInView: { y: 0 },
                  viewport: { once: true, margin: '0px 0px -15% 0px' },
                }
              : { animate: { y: 0 } })}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: reduce ? 0 : base + (startIndex + i) * stagger,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  )
}

/* ------------------------------------------------------------- hover tilt */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 })

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={cx('will-change-transform', className)}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        rx.set(-py * max * 2)
        ry.set(px * max * 2)
      }}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------------- parallax */
export function Parallax({
  children,
  className,
  distance = 50,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}
