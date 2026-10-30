import { cn } from '@/lib/utils'

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-sepia',
        className,
      )}
    >
      <span className="h-px w-10 bg-current" aria-hidden="true" />
      {children}
    </p>
  )
}
