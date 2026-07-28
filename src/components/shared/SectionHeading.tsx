import type { SectionHeadingProps } from '../../types'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  id,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  )
}
