import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  MessageSquareLock,
  Sparkles,
  Star,
} from 'lucide-react'
import { ApiError } from '../api/client'
import { getLocationBySlug, recordRedirectToGoogle } from '../api/locations'
import { createPrivateFeedback } from '../api/private-feedback'
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

type Step = 'rating' | 'generating' | 'suggestions' | 'private-feedback' | 'thank-you'

function googleWriteReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

function RateCard({
  children,
  onBack,
  showBack = false,
}: {
  children: ReactNode
  onBack?: () => void
  showBack?: boolean
}) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-white sm:min-h-0 sm:max-w-[420px] sm:overflow-hidden sm:rounded-[28px] sm:border sm:border-white/80 sm:shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
      <div className="relative flex shrink-0 items-center justify-between gap-3 px-5 pb-2 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6">
        <div className="flex min-w-0 items-center gap-1">
          {showBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to rating"
              className="mr-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-ink transition-colors hover:bg-slate-50 hover:text-brand-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
          <Logo className="min-w-0 [&_img]:h-8 [&_img]:w-8 [&_span]:text-lg" />
        </div>
        <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-700">
          Verified Feedback
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-6 sm:pb-7 sm:pt-4">
        {children}
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2 border-t border-slate-100 px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">
          POWERED BY
        </span>
        <Link to="/" aria-label="EasyReview home" className="inline-flex no-underline">
          <img
            src="/logo-name.png"
            alt="EasyReview"
            className="h-6 w-auto object-contain opacity-80"
          />
        </Link>
      </div>
    </div>
  )
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
  const [privateFeedbackText, setPrivateFeedbackText] = useState('')
  const [privateFeedbackError, setPrivateFeedbackError] = useState<string | null>(null)
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

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
    if (value <= 3) {
      setPrivateFeedbackText('')
      setPrivateFeedbackError(null)
      setStep('private-feedback')
      return
    }
    void generateSuggestions(value, location)
  }

  async function handleSubmitPrivateFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!location || !selected || submittingFeedback) return
    const trimmed = privateFeedbackText.trim()
    if (!trimmed) {
      setPrivateFeedbackError('Please share a few words about your experience.')
      return
    }
    setSubmittingFeedback(true)
    setPrivateFeedbackError(null)
    try {
      await createPrivateFeedback({
        locationId: location.id,
        rating: selected,
        feedback: trimmed,
      })
      setStep('thank-you')
    } catch (err) {
      setPrivateFeedbackError(
        err instanceof Error ? err.message : 'Could not send your feedback. Please try again.',
      )
    } finally {
      setSubmittingFeedback(false)
    }
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
    setPrivateFeedbackText('')
    setPrivateFeedbackError(null)
    setHovered(0)
  }

  const activeRating = hovered || selected
  const previewOption = hovered
    ? RATING_OPTIONS[hovered]
    : selected
      ? RATING_OPTIONS[selected]
      : null
  const showBack =
    step === 'generating' ||
    step === 'suggestions' ||
    step === 'private-feedback'

  return (
    <div className="relative flex min-h-dvh flex-col bg-white sm:bg-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% -20%, rgba(107, 47, 213, 0.16), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(56, 189, 248, 0.12), transparent 50%), linear-gradient(180deg, #eef2ff 0%, #f8fafc 45%, #ffffff 100%)',
        }}
      />

      <main className="relative z-10 flex flex-1 flex-col sm:items-center sm:justify-center sm:px-4 sm:py-12">
        {loading ? (
          <p className="animate-fade-up flex flex-1 items-center justify-center text-muted sm:flex-none">
            Loading…
          </p>
        ) : error ? (
          <div className="animate-fade-up w-full sm:w-auto">
            <Helmet>
              <title>Not found | EasyReview</title>
            </Helmet>
            <RateCard>
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Location not found
                </h1>
                <p className="mt-3 text-sm text-muted">{error}</p>
                <Link
                  to="/"
                  className="mt-6 inline-block text-sm font-semibold text-brand-600 no-underline hover:text-brand-700"
                >
                  Go to EasyReview
                </Link>
              </div>
            </RateCard>
          </div>
        ) : location && step === 'rating' ? (
          <div className="animate-fade-up w-full sm:w-auto">
            <Helmet>
              <title>Rate {location.name} | EasyReview</title>
              <meta
                name="description"
                content={`Leave a review for ${location.name} on EasyReview.`}
              />
            </Helmet>
            <RateCard>
              <div className="text-center">
                <h1 className="font-display text-[1.65rem] font-bold leading-tight tracking-tight text-ink sm:text-[1.85rem]">
                  {location.name}
                </h1>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
                  How was your experience with us today?
                </p>

                <div
                  className="mt-8 flex items-center justify-center gap-1.5 sm:gap-2"
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
                        className="cursor-pointer rounded-xl border-0 bg-transparent p-1 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                        onMouseEnter={() => setHovered(value)}
                        onFocus={() => setHovered(value)}
                        onBlur={() => setHovered(0)}
                        onClick={() => handleSelectRating(value)}
                      >
                        <Star
                          className={`h-11 w-11 transition-all duration-150 sm:h-12 sm:w-12 ${
                            filled
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.55)]'
                              : 'fill-transparent text-slate-300'
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    )
                  })}
                </div>

                <div className="mt-5 flex min-h-9 items-center justify-center" aria-live="polite">
                  {previewOption ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-sm font-semibold text-amber-800">
                      {previewOption.label}{' '}
                      <span aria-hidden className="text-base leading-none">
                        {previewOption.emoji}
                      </span>
                    </span>
                  ) : null}
                </div>

                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Tap a star to share your review
                </p>
              </div>
            </RateCard>
          </div>
        ) : location && step === 'private-feedback' ? (
          <div className="animate-fade-up w-full sm:w-auto">
            <Helmet>
              <title>Share feedback | EasyReview</title>
            </Helmet>
            <RateCard showBack onBack={handleBackToStars}>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <MessageSquareLock className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </div>
                <h1 className="mt-5 font-display text-[1.55rem] font-bold tracking-tight text-ink sm:text-[1.7rem]">
                  Tell us what happened
                </h1>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                  Your feedback helps us improve our service and provide a better experience.
                </p>
              </div>

              <form
                className="mt-6"
                onSubmit={(event) => void handleSubmitPrivateFeedback(event)}
              >
                <label htmlFor="private-feedback" className="sr-only">
                  Private feedback
                </label>
                <textarea
                  id="private-feedback"
                  value={privateFeedbackText}
                  onChange={(event) => {
                    setPrivateFeedbackText(event.target.value)
                    if (privateFeedbackError) setPrivateFeedbackError(null)
                  }}
                  rows={5}
                  maxLength={2000}
                  required
                  placeholder="What could have been better?"
                  className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 sm:text-[15px]"
                />
                {privateFeedbackError ? (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {privateFeedbackError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-2xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,47,213,0.28)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submittingFeedback ? 'Sending…' : 'Send feedback'}
                </button>
              </form>
            </RateCard>
          </div>
        ) : location && step === 'thank-you' ? (
          <div className="animate-fade-up w-full sm:w-auto">
            <Helmet>
              <title>Thank you | EasyReview</title>
            </Helmet>
            <RateCard>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CheckCircle2 className="h-8 w-8" aria-hidden />
                </div>
                <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                  Thank you
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                  Honest feedback like this helps {location.name} improve and serve you better next
                  time.
                </p>
              </div>
            </RateCard>
          </div>
        ) : location && step === 'generating' ? (
          <div className="animate-fade-up w-full sm:w-auto">
            <Helmet>
              <title>Generating reviews | EasyReview</title>
            </Helmet>
            <RateCard showBack onBack={handleBackToStars}>
              <div className="flex flex-col items-center py-6 text-center">
                <Trefoil size="56" speed="1.6" color="#6B2FD5" />
                <p
                  key={messageIndex}
                  className="animate-fade-message mt-6 min-h-14 text-[15px] leading-relaxed text-slate-500"
                  aria-live="polite"
                >
                  {GENERATING_MESSAGES[messageIndex]}
                </p>
              </div>
            </RateCard>
          </div>
        ) : location && step === 'suggestions' ? (
          <div className="animate-fade-up w-full sm:w-auto">
            <Helmet>
              <title>Choose a review | EasyReview</title>
            </Helmet>
            <RateCard showBack onBack={handleBackToStars}>
              <p className="flex items-center justify-center gap-2 text-center text-sm font-bold text-ink">
                <Sparkles className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                Select a review to copy and post on Google
              </p>

              {suggestionsError ? (
                <div className="mt-8 text-center">
                  <p className="text-sm text-red-600">{suggestionsError}</p>
                  <button
                    type="button"
                    className="mt-4 cursor-pointer rounded-2xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white"
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
                  <div className="mt-4 max-h-[40dvh] overflow-y-auto pt-2">
                    <div className="flex flex-col gap-3 pb-1">
                      {suggestions.map((suggestion, index) => {
                        const isSelected = index === selectedSuggestionIndex
                        return (
                          <button
                            key={`${suggestion.language}-${index}`}
                            type="button"
                            onClick={() => setSelectedSuggestionIndex(index)}
                            className={`relative w-full cursor-pointer rounded-2xl border bg-slate-50 px-4 pb-4 pt-5 text-left transition-colors ${
                              isSelected
                                ? 'border-brand-600 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="absolute -top-2.5 left-3 rounded-md bg-white px-2 text-[11px] font-medium uppercase tracking-wide text-brand-700">
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
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,47,213,0.28)] transition-opacity hover:opacity-95"
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
            </RateCard>
          </div>
        ) : null}
      </main>
    </div>
  )
}
