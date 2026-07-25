import type { StatCardProps } from '../../types'

export function StatCard({ value, description, icon }: StatCardProps) {
  return (
    <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <span
        className="absolute inset-x-0 top-0 h-0.5 bg-brand-600"
        aria-hidden
      />
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </div>
      <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </article>
  )
}
