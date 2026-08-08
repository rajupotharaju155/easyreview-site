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
    <section className="mt-8 space-y-5 animate-fade-up sm:mt-10 sm:space-y-6">
      <div className="min-w-0">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Side-by-side scorecard
        </h2>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Green cells mark the strongest score. Summary pointers compare you against this peer set
          and highlight where EasyReview can help you pull ahead.
        </p>
      </div>

      {insights.length > 0 ? (
        <ul className="space-y-2 rounded-2xl border border-brand-100 bg-brand-50/50 px-3 py-4 sm:px-5">
          {insights.map((insight) => (
            <li key={insight} className="flex gap-2 text-sm leading-relaxed text-ink">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
              <span className="min-w-0 break-words">{insight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium text-muted sm:hidden">Swipe sideways to compare →</p>
        <div className="-mx-4 overflow-x-auto overscroll-x-contain border-y border-border bg-white sm:mx-0 sm:rounded-2xl sm:border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/80">
                <th className="sticky left-0 z-10 min-w-[7rem] bg-surface px-3 py-3 font-semibold text-muted sm:bg-surface/95 sm:px-4">
                  Metric
                </th>
                {filled.map((slot) => (
                  <th key={slot.id} className="min-w-[9rem] px-3 py-3 font-semibold text-ink sm:px-4">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {slot.label}
                    </span>
                    <span className="mt-0.5 block max-w-[10rem] truncate sm:max-w-[12rem]">
                      {slot.place?.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRICS.map((metric) => (
                <tr key={metric.key} className="border-b border-border last:border-b-0">
                  <th className="sticky left-0 z-10 bg-white px-3 py-3 font-medium text-muted sm:px-4">
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
                        className={`px-3 py-3 align-top break-words text-ink sm:px-4 ${
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
                <th className="sticky left-0 z-10 bg-white px-3 py-3 font-medium text-muted sm:px-4">
                  Address
                </th>
                {filled.map((slot) => (
                  <td
                    key={`${slot.id}-address`}
                    className="px-3 py-3 align-top break-words text-ink sm:px-4"
                  >
                    {slot.place?.formattedAddress || '—'}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border">
                <th className="sticky left-0 z-10 bg-white px-3 py-3 font-medium text-muted sm:px-4">
                  Maps
                </th>
                {filled.map((slot) => (
                  <td key={`${slot.id}-maps`} className="px-3 py-3 align-top text-ink sm:px-4">
                    {slot.place?.googleMapsURI ? (
                      <ExternalLink href={slot.place.googleMapsURI}>Open listing</ExternalLink>
                    ) : (
                      '—'
                    )}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border">
                <th className="sticky left-0 z-10 bg-white px-3 py-3 font-medium text-muted sm:px-4">
                  Recent star mix
                </th>
                {filled.map((slot) => {
                  const place = slot.place as PlaceDetails
                  const breakdown = reviewRatingBreakdown(place.reviews)
                  return (
                    <td key={`${slot.id}-mix`} className="px-3 py-3 align-top text-ink sm:px-4">
                      {place.reviews.length === 0 ? (
                        '—'
                      ) : (
                        <div className="space-y-1 text-xs">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2">
                              <span className="w-6 shrink-0 text-muted">{star}★</span>
                              <div className="h-1.5 min-w-[3rem] flex-1 overflow-hidden rounded-full bg-surface">
                                <div
                                  className="h-full rounded-full bg-amber-400"
                                  style={{
                                    width: `${(breakdown[star] / place.reviews.length) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="w-4 shrink-0 text-right text-muted">
                                {breakdown[star]}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>

              <tr>
                <th className="sticky left-0 z-10 bg-white px-3 py-3 font-medium text-muted sm:px-4">
                  Recent reviews
                </th>
                {filled.map((slot) => {
                  const place = slot.place as PlaceDetails
                  return (
                    <td key={`${slot.id}-reviews`} className="px-3 py-3 align-top text-ink sm:px-4">
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
                                <span className="min-w-0 truncate font-medium text-ink">
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
                                <p className="mt-1 line-clamp-3 break-words text-xs leading-relaxed text-muted">
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

function average(values: number[]): number | null {
  if (values.length === 0) return null
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function buildInsights(slots: CompetitorSlot[]): string[] {
  const prospect = slots.find((slot) => slot.role === 'prospect')?.place
  const competitors = slots
    .filter((slot) => slot.role === 'competitor' && slot.place)
    .map((slot) => slot.place as PlaceDetails)

  if (!prospect || competitors.length === 0) return []

  const insights: string[] = []
  const peerLabel =
    competitors.length === 1 ? 'the competitor you selected' : 'the competitors you selected'

  const competitorRatings = competitors
    .map((place) => place.rating)
    .filter((rating): rating is number => rating != null)
  const maxCompetitorRating =
    competitorRatings.length > 0 ? Math.max(...competitorRatings) : null
  const avgCompetitorRating = average(competitorRatings)

  if (prospect.rating != null && maxCompetitorRating != null) {
    if (prospect.rating < maxCompetitorRating) {
      const gap = (maxCompetitorRating - prospect.rating).toFixed(1)
      const peerAvgText =
        avgCompetitorRating != null
          ? ` Peer listings here average ${avgCompetitorRating.toFixed(1)}★.`
          : ''
      insights.push(
        `${prospect.name} is at ${prospect.rating.toFixed(1)}★ and trails the top competitor by ${gap} stars.${peerAvgText} Closing that gap is usually the fastest trust win.`,
      )
    } else if (prospect.rating > maxCompetitorRating) {
      const lead = (prospect.rating - maxCompetitorRating).toFixed(1)
      insights.push(
        `${prospect.name} leads by ${lead} stars (${prospect.rating.toFixed(1)}★ vs ${maxCompetitorRating.toFixed(1)}★). That edge disappears quickly if competitors collect fresher reviews faster — keep converting happy customers into Google reviews.`,
      )
    } else {
      insights.push(
        `${prospect.name} is tied at ${prospect.rating.toFixed(1)}★ with the strongest competitor. When ratings are equal, review volume and recency decide who looks more trusted.`,
      )
    }
  } else if (prospect.rating != null && avgCompetitorRating != null) {
    insights.push(
      `${prospect.name} sits at ${prospect.rating.toFixed(1)}★ while ${peerLabel} average ${avgCompetitorRating.toFixed(1)}★. A steady review flow is what moves you toward the top of this set.`,
    )
  }

  const competitorCounts = competitors
    .map((place) => place.userRatingCount)
    .filter((count): count is number => count != null)
  const maxCompetitorCount = competitorCounts.length > 0 ? Math.max(...competitorCounts) : null
  const avgCompetitorCount = average(competitorCounts)

  if (prospect.userRatingCount != null && maxCompetitorCount != null) {
    if (prospect.userRatingCount < maxCompetitorCount) {
      const deficit = maxCompetitorCount - prospect.userRatingCount
      const peerAvgText =
        avgCompetitorCount != null
          ? ` Peer listings here average about ${Math.round(avgCompetitorCount).toLocaleString()} reviews.`
          : ''
      insights.push(
        `${prospect.name} has ${prospect.userRatingCount.toLocaleString()} Google reviews — ${deficit.toLocaleString()} behind the top competitor.${peerAvgText} Consistent collection closes this proof gap.`,
      )
    } else if (prospect.userRatingCount > maxCompetitorCount) {
      const lead = prospect.userRatingCount - maxCompetitorCount
      insights.push(
        `${prospect.name} leads with ${prospect.userRatingCount.toLocaleString()} reviews (${lead.toLocaleString()} more than the next competitor). Leaders still lose ground when review velocity slows — protect the lead with a weekly review habit.`,
      )
    } else if (avgCompetitorCount != null) {
      insights.push(
        `${prospect.name} matches the top competitor on review count (${prospect.userRatingCount.toLocaleString()}). Pulling ahead of the peer average (~${Math.round(avgCompetitorCount).toLocaleString()}) needs a more consistent review cadence.`,
      )
    }
  }

  // Stretch goal even when the prospect looks strong on both headline metrics.
  if (
    prospect.rating != null &&
    prospect.userRatingCount != null &&
    maxCompetitorRating != null &&
    maxCompetitorCount != null &&
    prospect.rating >= maxCompetitorRating &&
    prospect.userRatingCount >= maxCompetitorCount
  ) {
    const stretchRating = Math.min(5, Number((prospect.rating + 0.1).toFixed(1)))
    const stretchReviews = Math.ceil(prospect.userRatingCount * 1.25)
    if (stretchRating > prospect.rating || stretchReviews > prospect.userRatingCount) {
      insights.push(
        `Among this set you’re ahead — but local customers still compare listings. Moving from ${prospect.rating.toFixed(1)}★ / ${prospect.userRatingCount.toLocaleString()} reviews toward ${stretchRating.toFixed(1)}★ / ${stretchReviews.toLocaleString()}+ reviews is a realistic next target with steady review collection.`,
      )
    }
  }

  insights.push(
    'Aim for at least 1 new Google review every day to keep momentum — consistency beats occasional review spikes.',
  )

  const missingWebsite = !prospect.websiteURI
  const competitorHasWebsite = competitors.some((place) => Boolean(place.websiteURI))
  if (missingWebsite && competitorHasWebsite) {
    insights.push(
      `${prospect.name} is missing a website on Google while at least one competitor lists one — that hurts discovery and credibility.`,
    )
  } else if (missingWebsite) {
    insights.push(
      `${prospect.name} has no website on the Google listing. Adding one makes the profile look more complete and trustworthy.`,
    )
  }

  const missingPhone = !prospect.phoneNumber
  if (missingPhone) {
    insights.push(
      `${prospect.name} has no phone number on the Google listing. Adding it removes a common friction point for local customers ready to call.`,
    )
  }

  return insights.slice(0, 5)
}
