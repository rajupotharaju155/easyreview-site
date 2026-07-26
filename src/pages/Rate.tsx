import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'
import { ArrowLeft, ArrowUpRight, Sparkles, Star } from 'lucide-react'
import { ApiError } from '../api/client'
import { getLocationBySlug, recordRedirectToGoogle } from '../api/locations'
import { suggestReviews } from '../api/reviews'
import type { PublicLocation, ReviewSuggestion } from '../api/types'
import { Logo } from '../components/shared/Logo'

const RATING_OPTIONS: Record<number, { label: string; emoji: string }> = {
  1: { label: 'Terrible', emoji: '😢' },
  2: { label: 'Okay', emoji: '😐' },
  3: { label: 'Happy', emoji: '😊' },
  4: { label: 'Very Good', emoji: '😄' },
  5: { label: 'Excellent', emoji: '🤩' },
}

const GENERATING_MESSAGES = [
  'Our AI is crafting personalised review options based on your rating…',
  'Reviews like yours help other customers make wise decisions.',
  'Your feedback shines a light for people discovering this place.',
  'Honest voices like yours help great businesses get noticed.',
  'Thank you — your words can make someone’s next visit better.',
]

type Step = 'rating' | 'generating' | 'suggestions'

function googleWriteReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

export function Rate() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [location, setLocation] = useState<PublicLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)
  const [step, setStep] = useState<Step>('rating')
  const [suggestions, setSuggestions] = useState<ReviewSuggestion[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null)
  const [messageIndex, setMessageIndex] = useState(0)

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

  useEffect(() => {
    if (step !== 'generating') return

    setMessageIndex(0)
    const id = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % GENERATING_MESSAGES.length)
    }, 2800)

    return () => window.clearInterval(id)
  }, [step])

  async function generateSuggestions(starRating: number, loc: PublicLocation) {
    setStep('generating')
    setSuggestionsError(null)
    setSuggestions([])
    setSelectedSuggestionIndex(0)

    try {
      const response = await suggestReviews({
        locationId: loc.id,
        starRating,
        name: loc.name,
        city: loc.city ?? undefined,
        state: loc.state ?? undefined,
        keywords: loc.keywords?.length ? loc.keywords : ['great service'],
        languages: loc.languages?.length ? loc.languages : ['English'],
      })
      setSuggestions(response.suggestions)
      setSelectedSuggestionIndex(0)
      setStep('suggestions')
    } catch (err) {
      setSuggestionsError(
        err instanceof Error ? err.message : 'Could not generate review suggestions.',
      )
      setStep('suggestions')
    }
  }

  function handleSelectRating(value: number) {
    if (!location || step !== 'rating') return
    setSelected(value)
    void generateSuggestions(value, location)
  }

  async function handleCopyAndOpenGoogle() {
    if (!location?.placeId || !suggestions[selectedSuggestionIndex]) return
    const text = suggestions[selectedSuggestionIndex].text
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Still open Google even if clipboard is blocked.
    }
    void recordRedirectToGoogle(location.id).catch(() => {
      // Metrics should not block opening Google.
    })
    window.open(googleWriteReviewUrl(location.placeId), '_blank', 'noopener,noreferrer')
  }

  function handleWriteOwn() {
    if (!location?.placeId) return
    window.open(googleWriteReviewUrl(location.placeId), '_blank', 'noopener,noreferrer')
  }

  function handleBackToStars() {
    setStep('rating')
    setSuggestions([])
    setSelectedSuggestionIndex(0)
    setSuggestionsError(null)
    setHovered(0)
  }

  const activeRating = hovered || selected
  const hoverOption = hovered ? RATING_OPTIONS[hovered] : null
  const showBack = step === 'generating' || step === 'suggestions'

  return (
    <div className="relative flex min-h-dvh flex-col bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(107, 47, 213, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 80%, rgba(124, 58, 237, 0.12), transparent 50%), linear-gradient(180deg, #f8fafc 0%, #ffffff 60%)',
        }}
      />

      <header className="relative z-10 flex items-center justify-center px-4 pt-6 sm:pt-8">
        {showBack ? (
          <button
            type="button"
            onClick={handleBackToStars}
            aria-label="Back to rating"
            className="absolute left-4 top-6 cursor-pointer rounded-xl border-0 bg-transparent p-2 text-ink transition-colors hover:text-brand-600 sm:left-6 sm:top-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : null}
        <Logo />
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8">
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
        ) : location && step === 'rating' ? (
          <div className="animate-fade-up w-full max-w-lg text-center">
            <Helmet>
              <title>Rate {location.name} | EasyReview</title>
              <meta
                name="description"
                content={`Leave a review for ${location.name} on EasyReview.`}
              />
            </Helmet>

            <h1 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {location.name}
            </h1>

            {(location.city || location.state) && (
              <p className="mt-2 text-sm text-muted">
                {[location.city, location.state].filter(Boolean).join(', ')}
              </p>
            )}

            <p className="mt-4 text-base text-ink/80 sm:text-lg">
              How was your experience with us today?
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
                    className="cursor-pointer rounded-xl border-0 bg-transparent p-1.5 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    onMouseEnter={() => setHovered(value)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(0)}
                    onClick={() => handleSelectRating(value)}
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
              className={`mt-5 flex min-h-8 items-center justify-center gap-2 text-base transition-colors ${
                hoverOption ? 'font-medium text-brand-700' : 'text-muted'
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
                <span>Tap a star to rate us</span>
              )}
            </p>
          </div>
        ) : location && step === 'generating' ? (
          <div className="animate-fade-up flex w-full max-w-md flex-col items-center text-center">
            <Helmet>
              <title>Generating reviews | EasyReview</title>
            </Helmet>
            <Trefoil size="56" speed="1.6" color="#6B2FD5" />
            <p
              key={messageIndex}
              className="animate-fade-message mt-6 min-h-14 text-base leading-relaxed text-muted sm:text-lg"
              aria-live="polite"
            >
              {GENERATING_MESSAGES[messageIndex]}
            </p>
          </div>
        ) : location && step === 'suggestions' ? (
          <div className="w-full max-w-lg">
            <Helmet>
              <title>Choose a review | EasyReview</title>
            </Helmet>

            <p className="flex items-center justify-center gap-2 text-sm font-bold text-ink">
              <Sparkles className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
              Select a review to copy and post on Google
            </p>

            {suggestionsError ? (
              <div className="mt-8 text-center">
                <p className="text-sm text-red-600">{suggestionsError}</p>
                <button
                  type="button"
                  className="mt-4 cursor-pointer rounded-xl border-0 bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white"
                  onClick={() => {
                    if (selected && location) {
                      void generateSuggestions(selected, location)
                    }
                  }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="mt-4 max-h-[45dvh] overflow-y-auto pt-3">
                  <div className="flex flex-col gap-3 pb-1">
                    {suggestions.map((suggestion, index) => {
                      const isSelected = index === selectedSuggestionIndex
                      return (
                        <button
                          key={`${suggestion.language}-${index}`}
                          type="button"
                          onClick={() => setSelectedSuggestionIndex(index)}
                          className={`relative w-full cursor-pointer rounded-2xl border bg-slate-100 px-4 pb-4 pt-5 text-left transition-colors ${
                            isSelected
                              ? 'border-brand-600 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className="absolute -top-2.5 left-3 rounded-md bg-slate-100 px-2 text-[11px] font-medium uppercase tracking-wide text-brand-700">
                            {suggestion.language}
                          </span>
                          <p className="text-sm leading-relaxed text-ink sm:text-[15px]">
                            {suggestion.text}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => void handleCopyAndOpenGoogle()}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-brand-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Copy and open Google
                    <span aria-hidden>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWriteOwn}
                    className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 border-0 bg-transparent text-sm text-muted transition-colors hover:text-brand-700"
                  >
                    Write my own review instead
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}
      </main>

      <footer className="relative z-10 flex items-center justify-center gap-2 border-t border-slate-100 px-4 py-4 text-sm text-muted">
        <span className="text-xs font-medium tracking-wide">POWERED BY</span>
        <Link to="/" aria-label="EasyReview home" className="inline-flex no-underline">
          <img
            src="/logo-name.png"
            alt="EasyReview"
            className="h-8 w-auto object-contain"
          />
        </Link>
      </footer>
    </div>
  )
}
