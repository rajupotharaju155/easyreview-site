import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import { ApiError } from '../api/client'
import { getLocationBySlug } from '../api/locations'
import type { PublicLocation } from '../api/types'
import { Logo } from '../components/shared/Logo'

const RATING_OPTIONS: Record<number, { label: string; emoji: string }> = {
  1: { label: 'Sad', emoji: '😢' },
  2: { label: 'Okay', emoji: '😐' },
  3: { label: 'Happy', emoji: '😊' },
  4: { label: 'Very Good', emoji: '😄' },
  5: { label: 'Excellent', emoji: '🤩' },
}

export function Rate() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [location, setLocation] = useState<PublicLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!slug) {
        setError('Missing location')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await getLocationBySlug(slug)
        if (!cancelled) {
          setLocation(data)
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof ApiError && err.status === 404
              ? 'This business could not be found.'
              : err instanceof Error
                ? err.message
                : 'Something went wrong.'
          setError(message)
          setLocation(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const activeRating = hovered || selected
  const hoverOption = hovered ? RATING_OPTIONS[hovered] : null

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(107, 47, 213, 0.16), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 80%, rgba(124, 58, 237, 0.08), transparent 50%), linear-gradient(180deg, #f8fafc 0%, #ffffff 60%)',
        }}
      />

      <header className="relative z-10 flex justify-center px-4 pt-6 sm:pt-8">
        <Logo />
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-14">
        {loading ? (
          <p className="animate-fade-up text-muted">Loading…</p>
        ) : error ? (
          <div className="animate-fade-up max-w-md text-center">
            <Helmet>
              <title>Not found | EasyReview</title>
            </Helmet>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Location not found
            </h1>
            <p className="mt-3 text-muted">{error}</p>
            <Link
              to="/"
              className="mt-6 inline-block text-brand-600 no-underline hover:text-brand-700"
            >
              Go to EasyReview
            </Link>
          </div>
        ) : location ? (
          <div className="animate-fade-up w-full max-w-lg text-center">
            <Helmet>
              <title>Rate {location.name} | EasyReview</title>
              <meta
                name="description"
                content={`Leave a review for ${location.name} on EasyReview.`}
              />
            </Helmet>

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-brand-600">
              Leave a review
            </p>

            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {location.name}
            </h1>

            {(location.city || location.state) && (
              <p className="mt-2 text-sm text-muted">
                {[location.city, location.state].filter(Boolean).join(', ')}
              </p>
            )}

            <p className="mt-8 text-lg text-ink/80 sm:text-xl">
              How was your experience at{' '}
              <span className="font-semibold text-ink">{location.name}</span>?
            </p>

            <div
              className="mt-8 flex items-center justify-center gap-2 sm:gap-3"
              onMouseLeave={() => setHovered(0)}
              role="radiogroup"
              aria-label="Star rating"
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const filled = value <= activeRating
                const option = RATING_OPTIONS[value]
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected === value}
                    aria-label={`${value} star${value === 1 ? '' : 's'} — ${option.label}`}
                    className="rounded-xl border-0 bg-transparent p-1.5 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    onMouseEnter={() => setHovered(value)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(0)}
                    onClick={() => setSelected(value)}
                  >
                    <Star
                      className={`h-10 w-10 transition-colors duration-150 sm:h-12 sm:w-12 ${
                        filled
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-transparent text-slate-300'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                )
              })}
            </div>

            <p
              className={`mt-5 flex min-h-8 items-center justify-center gap-2 text-base font-medium transition-opacity ${
                hoverOption ? 'text-brand-700 opacity-100' : 'opacity-0'
              }`}
              aria-live="polite"
            >
              {hoverOption ? (
                <>
                  <span aria-hidden className="text-xl leading-none">
                    {hoverOption.emoji}
                  </span>
                  <span>{hoverOption.label}</span>
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
          </div>
        ) : null}
      </main>
    </div>
  )
}
