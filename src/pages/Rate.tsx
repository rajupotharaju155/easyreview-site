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
import type { PublicLocation, ReviewAnswer, ReviewSuggestion } from '../api/types'
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

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

/** Slide-up + fade used by each questionnaire row, staggered via inline transition delays. */
function revealClasses(open: boolean): string {
  return `transition-[opacity,transform] duration-500 ${EASE} motion-reduce:transition-none ${
    open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`
}

function googleWriteReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

function RateCard({
  children,
  onBack,
  showBack = false,
  fill = false,
  alignTop = false,
}: {
  children: ReactNode
  onBack?: () => void
  showBack?: boolean
  fill?: boolean
  /** Pin content to the top (e.g. after a high rating expands the questionnaire). */
  alignTop?: boolean
}) {
  return (
    <div
      className={`flex w-full flex-col bg-white sm:max-w-[420px] sm:overflow-hidden sm:rounded-[28px] sm:border sm:border-white/80 sm:shadow-[0_20px_60px_rgba(15,23,42,0.1)] ${
        fill
          ? 'h-dvh max-h-dvh overflow-hidden sm:h-auto sm:max-h-none sm:min-h-0'
          : 'min-h-dvh sm:min-h-0'
      }`}
    >
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

      <div
        className={`flex flex-1 flex-col px-5 py-6 sm:px-6 sm:pb-7 sm:pt-4 ${
          fill || alignTop ? 'min-h-0 justify-start' : 'justify-center'
        }`}
      >
        {fill ? (
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        ) : (
          children
        )}
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2 border-t border-slate-100 px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">
          POWERED BY
        </span>
        <Logo className="opacity-80 [&_img]:h-5 [&_img]:w-5 [&_span]:text-xs" />
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
  /** Chosen options keyed by question text. */
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [questionsOpen, setQuestionsOpen] = useState(false)

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

  const questions = location?.questions ?? []
  const canShowQuestions = questions.length > 0 && selected >= 4

  // Mount the questionnaire collapsed, then open it a frame later so the header
  // shrink and the slide-in run as one transition instead of snapping into place.
  useEffect(() => {
    if (!canShowQuestions) {
      setQuestionsOpen(false)
      return
    }

    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setQuestionsOpen(true))
    })

    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [canShowQuestions])

  async function generateSuggestions(starRating: number, loc: PublicLocation) {
    setStep('generating')
    setSuggestionsError(null)
    setSuggestions([])
    setSelectedSuggestionIndex(0)

    const selectedAnswers = (loc.questions ?? []).reduce<ReviewAnswer[]>(
      (collected, { question }) => {
        const chosen = answers[question]?.filter(Boolean) ?? []
        if (chosen.length) collected.push({ question, answers: chosen })
        return collected
      },
      [],
    )

    try {
      const response = await suggestReviews({
        locationId: loc.id,
        starRating,
        name: loc.name,
        city: loc.city ?? undefined,
        state: loc.state ?? undefined,
        primaryTypeDisplayName: loc.primaryTypeDisplayName ?? undefined,
        keywords: loc.keywords?.length ? loc.keywords : ['great service'],
        languages: loc.languages?.length ? loc.languages : ['English'],
        answers: selectedAnswers.length ? selectedAnswers : undefined,
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
    // With a questionnaire configured, collect answers before generating.
    if (location.questions?.length) return
    void generateSuggestions(value, location)
  }

  function handleSelectAnswer(question: string, option: string, multiSelect: boolean) {
    setAnswers((current) => {
      const selected = current[question] ?? []
      if (multiSelect) {
        const next = selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option]
        return { ...current, [question]: next }
      }
      const next = selected.length === 1 && selected[0] === option ? [] : [option]
      return { ...current, [question]: next }
    })
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

  return (
    <div className="relative flex min-h-dvh flex-col bg-white sm:bg-transparent">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
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
            <RateCard alignTop>
              <div className="flex w-full flex-1 flex-col">
                {/* Top/bottom spacers center the rating; they collapse so content rises when questions open */}
                <div
                  aria-hidden
                  className={`w-full transition-[flex-grow,min-height] duration-[600ms] ${EASE} motion-reduce:transition-none ${
                    questionsOpen ? 'min-h-0 grow-0' : 'min-h-4 grow'
                  }`}
                />

                <div className="shrink-0 text-center">
                  <h1
                    className={`font-display font-bold tracking-tight text-ink transition-[font-size,line-height] duration-[600ms] ${EASE} motion-reduce:transition-none ${
                      questionsOpen
                        ? 'text-lg leading-snug sm:text-xl'
                        : 'text-[1.65rem] leading-tight sm:text-[1.85rem]'
                    }`}
                  >
                    {location.name}
                  </h1>
                  <p
                    className={`overflow-hidden text-[15px] leading-relaxed text-slate-500 transition-all duration-500 ${EASE} motion-reduce:transition-none ${
                      questionsOpen
                        ? 'mt-0 max-h-0 opacity-0'
                        : 'mt-3 max-h-12 opacity-100'
                    }`}
                  >
                    How was your experience with us today?
                  </p>

                  <div
                    className={`flex items-center justify-center transition-[margin,gap] duration-[600ms] ${EASE} motion-reduce:transition-none ${
                      questionsOpen ? 'mt-4 gap-1 sm:gap-1.5' : 'mt-8 gap-1.5 sm:gap-2'
                    }`}
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
                            className={`transition-all duration-[600ms] ${EASE} motion-reduce:transition-none ${
                              questionsOpen
                                ? 'h-8 w-8 sm:h-9 sm:w-9'
                                : 'h-11 w-11 sm:h-12 sm:w-12'
                            } ${
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

                  <div
                    className={`flex items-center justify-center transition-[margin,min-height] duration-[600ms] ${EASE} motion-reduce:transition-none ${
                      questionsOpen ? 'mt-2.5 min-h-7' : 'mt-5 min-h-9'
                    }`}
                    aria-live="polite"
                  >
                    {previewOption ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 font-semibold text-amber-800 transition-all duration-[600ms] ${EASE} motion-reduce:transition-none ${
                          questionsOpen
                            ? 'px-2.5 py-1 text-xs'
                            : 'px-3.5 py-1.5 text-sm'
                        }`}
                      >
                        {previewOption.label}{' '}
                        <span aria-hidden className="text-base leading-none">
                          {previewOption.emoji}
                        </span>
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={`overflow-hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 transition-all duration-500 ${EASE} motion-reduce:transition-none ${
                      questionsOpen ? 'mt-0 max-h-0 opacity-0' : 'mt-6 max-h-8 opacity-100'
                    }`}
                  >
                    Tap a star to share your review
                  </p>

                  {canShowQuestions ? (
                    <div
                      className={`grid transition-[grid-template-rows] duration-[600ms] ${EASE} motion-reduce:transition-none ${
                        questionsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden pb-2 text-left">
                        <p
                          className={`mt-2 text-center text-[13px] leading-relaxed text-slate-500 ${revealClasses(
                            questionsOpen,
                          )}`}
                          style={{ transitionDelay: questionsOpen ? '60ms' : '0ms' }}
                        >
                          Tell us a little about your visit so we can write it in your words.
                        </p>

                        <div className="mt-5 flex flex-col gap-5">
                          {questions.map(({ question, options, multiSelect }, index) => (
                            <fieldset
                              key={question}
                              className={`m-0 border-0 p-0 ${revealClasses(questionsOpen)}`}
                              style={{
                                transitionDelay: questionsOpen ? `${130 + index * 80}ms` : '0ms',
                              }}
                            >
                              <legend className="mb-2.5 p-0 text-sm font-semibold text-ink">
                                {question}
                                {multiSelect ? (
                                  <span className="ml-1.5 font-normal text-slate-500">
                                    (Allow multiple answers)
                                  </span>
                                ) : null}
                              </legend>
                              <div className="flex flex-wrap gap-2">
                                {options.map((option) => {
                                  const isSelected = answers[question]?.includes(option) ?? false
                                  return (
                                    <button
                                      key={option}
                                      type="button"
                                      aria-pressed={isSelected}
                                      onClick={() =>
                                        handleSelectAnswer(question, option, Boolean(multiSelect))
                                      }
                                      className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                                        isSelected
                                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  )
                                })}
                              </div>
                            </fieldset>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => void generateSuggestions(selected, location)}
                          className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,47,213,0.28)] ${revealClasses(
                            questionsOpen,
                          )}`}
                          style={{
                            transitionDelay: questionsOpen
                              ? `${130 + questions.length * 80}ms`
                              : '0ms',
                          }}
                        >
                          Continue
                          <span aria-hidden>→</span>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div
                  aria-hidden
                  className={`w-full transition-[flex-grow,min-height] duration-[600ms] ${EASE} motion-reduce:transition-none ${
                    questionsOpen ? 'min-h-0 grow-0' : 'min-h-4 grow'
                  }`}
                />
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
          <div className="animate-fade-up flex h-dvh min-h-0 w-full flex-col sm:h-auto sm:w-auto">
            <Helmet>
              <title>Choose a review | EasyReview</title>
            </Helmet>
            <RateCard showBack onBack={handleBackToStars} fill>
              <p className="flex shrink-0 items-center justify-center gap-2 text-center text-sm font-bold text-ink">
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
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pt-2 sm:max-h-[40dvh] sm:flex-none">
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

                  <div className="shrink-0 pt-4">
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
                </div>
              )}
            </RateCard>
          </div>
        ) : null}
      </main>
    </div>
  )
}
