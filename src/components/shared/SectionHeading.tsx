import type { SectionHeadingProps } from '../../types'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  id,
  as = 'h2',
  tone = 'light',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const HeadingTag = as
  const dark = tone === 'dark'

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${dark ? 'text-brand-200' : 'text-brand-600'}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        id={id}
        className={`font-display text-2xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </HeadingTag>
      {subtitle ? (
        <p
          className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-lg ${dark ? 'text-white/70' : 'text-muted'}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
