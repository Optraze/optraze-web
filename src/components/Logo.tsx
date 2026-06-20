import { cx } from './ui'

/** Optraze brand mark — indigo head circle + cyan smile arc. */
export function LogoMark({
  className,
  title = 'Optraze',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <circle
        cx="50"
        cy="41"
        r="24"
        stroke="#4f46e5"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M12 64 Q50 87 88 64"
        stroke="#06b6d4"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** Mark + wordmark lockup used in nav and footer. */
export function Logo({
  className,
  wordmark = true,
}: {
  className?: string
  wordmark?: boolean
}) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-7 w-7 shrink-0" />
      {wordmark ? (
        <span className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">
          Optraze
        </span>
      ) : null}
    </span>
  )
}
