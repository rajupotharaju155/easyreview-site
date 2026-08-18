import { Link } from 'react-router-dom'

interface LogoProps {
  /** Use on dark backgrounds (e.g. CTA band) */
  variant?: 'light' | 'dark'
  className?: string
  showWordmark?: boolean
  to?: string
}

export function Logo({
  variant = 'light',
  className = '',
  showWordmark = true,
  to = '/',
}: LogoProps) {
  const wordmarkClass = variant === 'dark' ? 'text-white' : 'text-ink'

  return (
    <Link
      to={to}
      className={`inline-flex items-center no-underline ${className}`}
      aria-label="EasyReview home"
    >
      <img
        src="/logo.png"
        alt="EasyReview logo"
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
      />
      {showWordmark ? (
        <span className={`mb-1 font-display text-xl font-bold tracking-tight ${wordmarkClass}`}>
          EasyReview
        </span>
      ) : null}
    </Link>
  )
}
