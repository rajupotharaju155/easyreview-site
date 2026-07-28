import type { ReactNode } from 'react'
import type { PlaceDetails } from '../../lib/googlePlaces'
import type { CompetitorSlot } from './CompetitorColumn'
import {
  ExternalLink,
  StarRating,
  averageReviewRating,
  formatBusinessStatus,
  getCategoryLabel,
  reviewRatingBreakdown,
} from './comparisonUtils'

interface ComparisonTableProps {
  slots: CompetitorSlot[]
}

type MetricKey =
  | 'rating'
  | 'reviews'
  | 'sampleAvg'
  | 'website'
  | 'phone'
  | 'category'
  | 'status'

interface MetricDefinition {
  key: MetricKey
  label: string
  higherIsBetter?: boolean
  getValue: (place: PlaceDetails) => number | null
  render: (place: PlaceDetails) => ReactNode
}

const METRICS: MetricDefinition[] = [
  {
    key: 'rating',
    label: 'Google rating',
    higherIsBetter: true,
    getValue: (place) => place.rating,
    render: (place) => <StarRating rating={place.rating} />,
  },
  {
    key: 'reviews',
    label: 'Total reviews',
    higherIsBetter: true,
    getValue: (place) => place.userRatingCount,
    render: (place) =>
      place.userRatingCount != null ? place.userRatingCount.toLocaleString() : '—',
  },
  {
    key: 'sampleAvg',
    label: 'Recent sample avg',
    higherIsBetter: true,
    getValue: (place) => averageReviewRating(place.reviews),
    render: (place) => {
      const avg = averageReviewRating(place.reviews)
      if (avg == null) return '—'
      return (
        <span>
          {avg.toFixed(1)}★ <span className="text-muted">({place.reviews.length} shown)</span>
        </span>
      )
    },
  },
  {
    key: 'website',
    label: 'Website',
    getValue: () => null,
    render: (place) =>
      place.websiteURI ? (
        <ExternalLink href={place.websiteURI}>Yes</ExternalLink>
      ) : (
        <span className="font-medium text-amber-700">No</span>
      ),
  },
  {
    key: 'phone',
    label: 'Phone listed',
    getValue: () => null,
    render: (place) =>
      place.phoneNumber ? (
        <span className="break-all">{place.phoneNumber}</span>
      ) : (
        <span className="font-medium text-amber-700">Missing</span>
      ),
  },
  {
    key: 'category',
    label: 'Primary category',
    getValue: () => null,
    render: (place) => getCategoryLabel(place),
  },
  {
    key: 'status',
    label: 'Business status',
    getValue: () => null,
    render: (place) => formatBusinessStatus(place.businessStatus),
  },
]

function findBestPlaceIds(
  places: PlaceDetails[],
  getValue: (place: PlaceDetails) => number | null,
): Set<string> {
  let best: number | null = null
  for (const place of places) {
    const value = getValue(place)
    if (value == null) continue
    if (best == null || value > best) best = value
  }
  if (best == null) return new Set()

  return new Set(
    places.filter((place) => getValue(place) === best).map((place) => place.placeId),
  )
}

export function ComparisonTable({ slots }: ComparisonTableProps) {
  const filled = slots.filter((slot) => slot.place != null)
  if (filled.length < 2) return null

  const places = filled.map((slot) => slot.place as PlaceDetails)
  const bestByMetric = Object.fromEntries(
    METRICS.filter((metric) => metric.higherIsBetter).map((metric) => [
      metric.key,
      findBestPlaceIds(places, metric.getValue),
    ]),
  ) as Record<MetricKey, Set<string>>

  const prospect = slots.find((slot) => slot.role === 'prospect' && slot.place)
  const insights = buildInsights(slots)

  return (
    <section className="mt-10 space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
          Side-by-side scorecard
        </h2>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Green cells mark the strongest score for that metric among the businesses you selected.
        </p>
      </div>

      {insights.length > 0 ? (
        <ul className="space-y-2 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-4 sm:px-5">
          {insights.map((insight) => (
            <li key={insight} className="flex gap-2 text-sm leading-relaxed text-ink">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/80">
              <th className="sticky left-0 z-10 bg-surface/95 px-4 py-3 font-semibold text-muted">
                Metric
              </th>
              {filled.map((slot) => (
                <th key={slot.id} className="px-4 py-3 font-semibold text-ink">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {slot.label}
                  </span>
                  <span className="mt-0.5 block max-w-[12rem] truncate">{slot.place?.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS.map((metric) => (
              <tr key={metric.key} className="border-b border-border last:border-b-0">
                <th className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-muted">
                  {metric.label}
                </th>
                {filled.map((slot) => {
                  const place = slot.place as PlaceDetails
                  const isBest =
                    metric.higherIsBetter === true &&
                    bestByMetric[metric.key]?.has(place.placeId) &&
                    places.length > 1

                  return (
                    <td
                      key={`${slot.id}-${metric.key}`}
                      className={`px-4 py-3 align-top text-ink ${
                        isBest ? 'bg-emerald-50 font-medium text-emerald-900' : ''
                      } ${slot.role === 'prospect' && !isBest ? 'bg-brand-50/30' : ''}`}
                    >
                      {metric.render(place)}
                    </td>
                  )
                })}
              </tr>
            ))}

            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-muted">
                Address
              </th>
              {filled.map((slot) => (
                <td key={`${slot.id}-address`} className="px-4 py-3 align-top text-ink">
                  {slot.place?.formattedAddress || '—'}
                </td>
              ))}
            </tr>

            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-muted">
                Maps
              </th>
              {filled.map((slot) => (
                <td key={`${slot.id}-maps`} className="px-4 py-3 align-top text-ink">
                  {slot.place?.googleMapsURI ? (
                    <ExternalLink href={slot.place.googleMapsURI}>Open listing</ExternalLink>
                  ) : (
                    '—'
                  )}
                </td>
              ))}
            </tr>

            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-muted">
                Recent star mix
              </th>
              {filled.map((slot) => {
                const place = slot.place as PlaceDetails
                const breakdown = reviewRatingBreakdown(place.reviews)
                return (
                  <td key={`${slot.id}-mix`} className="px-4 py-3 align-top text-ink">
                    {place.reviews.length === 0 ? (
                      '—'
                    ) : (
                      <div className="space-y-1 text-xs">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="w-6 text-muted">{star}★</span>
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                              <div
                                className="h-full rounded-full bg-amber-400"
                                style={{
                                  width: `${(breakdown[star] / place.reviews.length) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="w-4 text-right text-muted">{breakdown[star]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>

            <tr>
              <th className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-muted">
                Recent reviews
              </th>
              {filled.map((slot) => {
                const place = slot.place as PlaceDetails
                return (
                  <td key={`${slot.id}-reviews`} className="px-4 py-3 align-top text-ink">
                    {place.reviews.length === 0 ? (
                      '—'
                    ) : (
                      <ul className="space-y-2.5">
                        {place.reviews.slice(0, 3).map((review, index) => (
                          <li
                            key={`${review.authorName}-${review.publishTime}-${index}`}
                            className="rounded-lg bg-surface/80 px-2.5 py-2"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs text-muted">
                              <span className="truncate font-medium text-ink">
                                {review.authorName}
                              </span>
                              <span className="shrink-0">
                                {review.rating != null ? `${review.rating.toFixed(0)}★` : '—'}
                                {review.relativePublishTimeDescription
                                  ? ` · ${review.relativePublishTimeDescription}`
                                  : ''}
                              </span>
                            </div>
                            {review.text ? (
                              <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted">
                                {review.text}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {prospect?.place ? (
        <p className="text-center text-sm text-muted">
          Comparing <span className="font-medium text-ink">{prospect.place.name}</span> against{' '}
          {filled.length - 1} competitor{filled.length - 1 === 1 ? '' : 's'} using live Google
          Places data.
        </p>
      ) : null}
    </section>
  )
}

function buildInsights(slots: CompetitorSlot[]): string[] {
  const prospect = slots.find((slot) => slot.role === 'prospect')?.place
  const competitors = slots
    .filter((slot) => slot.role === 'competitor' && slot.place)
    .map((slot) => slot.place as PlaceDetails)

  if (!prospect || competitors.length === 0) return []

  const insights: string[] = []

  const competitorRatings = competitors
    .map((place) => place.rating)
    .filter((rating): rating is number => rating != null)
  const maxCompetitorRating =
    competitorRatings.length > 0 ? Math.max(...competitorRatings) : null

  if (prospect.rating != null && maxCompetitorRating != null) {
    if (prospect.rating < maxCompetitorRating) {
      const gap = (maxCompetitorRating - prospect.rating).toFixed(1)
      insights.push(
        `${prospect.name} trails the top competitor by ${gap} stars on Google — closing that gap is often the fastest trust win.`,
      )
    } else if (prospect.rating > maxCompetitorRating) {
      insights.push(
        `${prospect.name} leads on Google rating. Protect that edge by converting more happy customers into public reviews.`,
      )
    } else {
      insights.push(
        `${prospect.name} is tied with the strongest competitor on rating — review volume will decide who ranks higher.`,
      )
    }
  }

  const competitorCounts = competitors
    .map((place) => place.userRatingCount)
    .filter((count): count is number => count != null)
  const maxCompetitorCount = competitorCounts.length > 0 ? Math.max(...competitorCounts) : null

  if (prospect.userRatingCount != null && maxCompetitorCount != null) {
    if (prospect.userRatingCount < maxCompetitorCount) {
      const deficit = maxCompetitorCount - prospect.userRatingCount
      insights.push(
        `Competitors have up to ${deficit.toLocaleString()} more Google reviews. Consistent review collection can close this volume gap.`,
      )
    } else if (prospect.userRatingCount > maxCompetitorCount) {
      insights.push(
        `${prospect.name} already has more Google reviews than the competitors selected — keep the cadence going.`,
      )
    }
  }

  const missingWebsite = !prospect.websiteURI
  const competitorHasWebsite = competitors.some((place) => Boolean(place.websiteURI))
  if (missingWebsite && competitorHasWebsite) {
    insights.push(
      `${prospect.name} is missing a website on Google while at least one competitor lists one — that hurts discovery and credibility.`,
    )
  }

  const missingPhone = !prospect.phoneNumber
  if (missingPhone) {
    insights.push(
      `${prospect.name} has no phone number on the Google listing. Adding it removes a common friction point for local customers.`,
    )
  }

  return insights.slice(0, 4)
}
