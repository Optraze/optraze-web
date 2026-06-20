import { cva } from 'class-variance-authority'
import { Button as ButtonPrimitive } from '@base-ui/react/button'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-mono text-xs font-normal uppercase tracking-[0.12em] transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-[#22232c]',
        cta: 'bg-[linear-gradient(108deg,#4f46e5,#06b6d4)] text-white shadow-cta hover:-translate-y-0.5 hover:brightness-[1.06] active:translate-y-0 active:brightness-100',
        outline:
          'border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
        ghost: 'text-ink hover:bg-secondary',
        destructive: 'bg-destructive text-white hover:brightness-110',
        link: 'font-body text-sm normal-case tracking-normal text-indigo underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3',
        default: 'h-11 px-5',
        lg: 'h-12 px-6',
        xl: 'h-14 px-8 text-sm',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
