import type { StatCardProps } from '../../types'

export function StatCard({ ref, value, description, visual }: StatCardProps) {
  return (
    <article
      ref={ref}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-brand-600" aria-hidden />
      <p className="bg-linear-to-r from-brand-800 to-brand-500 bg-clip-text font-display text-5xl font-extrabold tracking-tight text-transparent tabular-nums sm:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      {visual ? <div className="mt-auto pt-6">{visual}</div> : null}
    </article>
  )
}
