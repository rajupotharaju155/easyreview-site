import type { FeatureCardProps } from '../../types'

export function FeatureCard({ title, description, icon, tags }: FeatureCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>
      {tags && tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  )
}
