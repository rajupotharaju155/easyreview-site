import type { ReactNode } from 'react'
import type { PlaceDetails, PlaceReviewDetails } from '../../lib/googlePlaces'

export function formatBusinessStatus(status: string): string {
  if (!status) return '—'
  return status
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function formatTypeLabel(type: string): string {
  return type
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function averageReviewRating(reviews: PlaceReviewDetails[]): number | null {
  const ratings = reviews
    .map((review) => review.rating)
    .filter((rating): rating is number => typeof rating === 'number')
  if (ratings.length === 0) return null
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
}

export function reviewRatingBreakdown(reviews: PlaceReviewDetails[]): Record<number, number> {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const review of reviews) {
    if (review.rating == null) continue
    const star = Math.round(review.rating)
    if (star >= 1 && star <= 5) counts[star] += 1
  }
  return counts
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="break-all font-medium text-brand-600 hover:text-brand-700"
    >
      {children}
    </a>
  )
}

export function StarRating({ rating }: { rating: number | null }) {
  if (rating == null) return <span className="text-muted">—</span>

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      <span className="text-amber-500" aria-hidden>
        ★
      </span>
    </span>
  )
}

export function getCategoryLabel(place: PlaceDetails): string {
  return (
    place.primaryTypeDisplayName ||
    (place.primaryType ? formatTypeLabel(place.primaryType) : '') ||
    '—'
  )
}
