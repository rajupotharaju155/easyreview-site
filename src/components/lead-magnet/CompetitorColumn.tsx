import type { ReactNode } from 'react'
import { Modal, Spin, message } from 'antd'
import { Plus, RefreshCw, X } from 'lucide-react'
import { useState } from 'react'
import {
  fetchPlaceDetails,
  type PlaceDetails,
  type PlaceSuggestion,
  type TextSearchPlaceResult,
} from '../../lib/googlePlaces'
import { GoogleBusinessSearch } from './GoogleBusinessSearch'
import { GoogleTextSearch } from './GoogleTextSearch'
import {
  ExternalLink,
  StarRating,
  averageReviewRating,
  formatBusinessStatus,
  formatTypeLabel,
  getCategoryLabel,
  reviewRatingBreakdown,
} from './comparisonUtils'

export type CompetitorSlotRole = 'prospect' | 'competitor'

export interface CompetitorSlot {
  id: string
  role: CompetitorSlotRole
  label: string
  place: PlaceDetails | null
  loading: boolean
}

interface CompetitorColumnProps {
  slot: CompetitorSlot
  excludePlaceIds?: string[]
  /** Empty competitor slot ids available to fill from multi-select search. */
  emptyCompetitorSlotIds?: string[]
  onPlaceLoaded: (place: PlaceDetails) => void
  /** Fill one or more competitor slots from a single text search. */
  onCompetitorsSelected?: (places: TextSearchPlaceResult[]) => Promise<void> | void
  onClear: () => void
  onLoadingChange: (loading: boolean) => void
}

export function CompetitorColumn({
  slot,
  excludePlaceIds = [],
  emptyCompetitorSlotIds = [],
  onPlaceLoaded,
  onCompetitorsSelected,
  onClear,
  onLoadingChange,
}: CompetitorColumnProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const isProspect = slot.role === 'prospect'
  const isReplacing = !isProspect && slot.place != null
  const maxSelections = isReplacing
    ? 1
    : Math.max(1, Math.min(2, emptyCompetitorSlotIds.length || 2))

  const loadPlace = async (placeId: string) => {
    setSearchOpen(false)
    onLoadingChange(true)
    try {
      const details = await fetchPlaceDetails(placeId)
      onPlaceLoaded(details)
    } catch {
      message.error('Could not load business details. Please try another search.')
      onLoadingChange(false)
    }
  }

  const handleAutocompleteSelected = async (suggestion: PlaceSuggestion) => {
    await loadPlace(suggestion.placeId)
  }

  const handleCompetitorsConfirm = async (places: TextSearchPlaceResult[]) => {
    if (!onCompetitorsSelected) {
      const first = places[0]
      if (first) await loadPlace(first.placeId)
      return
    }

    setConfirming(true)
    try {
      await onCompetitorsSelected(places)
      setSearchOpen(false)
    } finally {
      setConfirming(false)
    }
  }

  return (
    <div
      className={`flex min-h-[280px] flex-col rounded-2xl border bg-white ${
        isProspect ? 'border-brand-200 ring-1 ring-brand-100' : 'border-border'
      }`}
    >
      <div
        className={`flex items-center justify-between gap-2 border-b px-4 py-3 ${
          isProspect ? 'border-brand-100 bg-brand-50/60' : 'border-border bg-surface/80'
        }`}
      >
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {slot.label}
          </p>
          {slot.place ? (
            <h3 className="truncate font-display text-base font-semibold text-ink">
              {slot.place.name}
            </h3>
          ) : (
            <h3 className="font-display text-base font-semibold text-ink">
              {isProspect ? 'Add your business' : 'Add a competitor'}
            </h3>
          )}
        </div>
        {slot.place ? (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-white hover:text-brand-600"
              aria-label={`Change ${slot.label}`}
              title="Change business"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-white hover:text-red-600"
              aria-label={`Remove ${slot.label}`}
              title="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col p-4">
        {slot.loading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10">
            <Spin size="large" />
            <p className="text-sm text-muted">Loading Google details…</p>
          </div>
        ) : slot.place ? (
          <PlaceSummary place={slot.place} />
        ) : (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="group flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface/40 px-4 py-10 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm ring-1 ring-border transition-transform group-hover:scale-105">
              <Plus className="h-6 w-6" strokeWidth={2.25} />
            </span>
            <span className="text-sm font-medium text-ink">
              {isProspect ? 'Search your Google Business' : 'Find competitors nearby'}
            </span>
            <span className="max-w-[14rem] text-xs text-muted">
              {isProspect
                ? 'Search by your exact business name'
                : 'Try “salons in Borivali” or a business name'}
            </span>
          </button>
        )}
      </div>

      <Modal
        title={isProspect ? 'Find your business' : 'Find competitors'}
        open={searchOpen}
        onCancel={() => setSearchOpen(false)}
        footer={null}
        destroyOnHidden
        centered
        width={isProspect ? 520 : 560}
      >
        {isProspect ? (
          <>
            <p className="mb-3 text-sm text-muted">
              Search by your business name on Google Places, then select the correct listing.
            </p>
            <GoogleBusinessSearch onPlaceSelected={handleAutocompleteSelected} />
          </>
        ) : (
          <>
            <p className="mb-3 text-sm text-muted">
              Search with a category + area (e.g. “Restaurants in Hyderabad”) or a known business
              name
            </p>
            <GoogleTextSearch
              excludePlaceIds={excludePlaceIds.filter((id) => id !== slot.place?.placeId)}
              maxSelections={maxSelections}
              confirming={confirming}
              onConfirm={handleCompetitorsConfirm}
            />
          </>
        )}
      </Modal>
    </div>
  )
}

function PlaceSummary({ place }: { place: PlaceDetails }) {
  const relatedTags = place.types
    .filter((type) => type !== place.primaryType)
    .slice(0, 6)
    .map(formatTypeLabel)
  const sampleAvg = averageReviewRating(place.reviews)
  const breakdown = reviewRatingBreakdown(place.reviews)

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Google rating</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <StarRating rating={place.rating} />
          <span className="text-sm text-muted">
            {place.userRatingCount != null
              ? `${place.userRatingCount.toLocaleString()} total reviews`
              : 'No review count'}
          </span>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <SummaryRow label="Total reviews">
          {place.userRatingCount != null ? place.userRatingCount.toLocaleString() : '—'}
        </SummaryRow>
        <SummaryRow label="Sample avg">
          {sampleAvg != null ? (
            <span>
              {sampleAvg.toFixed(1)}★{' '}
              <span className="text-muted">({place.reviews.length} recent)</span>
            </span>
          ) : (
            '—'
          )}
        </SummaryRow>
        <SummaryRow label="Category">{getCategoryLabel(place)}</SummaryRow>
        <SummaryRow label="Related tags">
          {relatedTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {relatedTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            '—'
          )}
        </SummaryRow>
        <SummaryRow label="Status">{formatBusinessStatus(place.businessStatus)}</SummaryRow>
        <SummaryRow label="Phone">
          {place.phoneNumber ? (
            place.phoneNumber
          ) : (
            <span className="font-medium text-amber-700">Missing</span>
          )}
        </SummaryRow>
        <SummaryRow label="Website">
          {place.websiteURI ? (
            <ExternalLink href={place.websiteURI}>Visit site</ExternalLink>
          ) : (
            <span className="font-medium text-amber-700">Missing</span>
          )}
        </SummaryRow>
        <SummaryRow label="Address">
          <span className="leading-snug">{place.formattedAddress || '—'}</span>
        </SummaryRow>
        <SummaryRow label="Maps">
          {place.googleMapsURI ? (
            <ExternalLink href={place.googleMapsURI}>Open listing</ExternalLink>
          ) : (
            '—'
          )}
        </SummaryRow>
      </dl>

      <div className="border-t border-border pt-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
          Recent star mix
        </p>
        {place.reviews.length === 0 ? (
          <p className="text-sm text-muted">No recent review sample returned.</p>
        ) : (
          <div className="space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-xs">
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
      </div>
    </div>
  )
}

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2 sm:grid-cols-[6.25rem_1fr]">
      <dt className="text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-ink">{children}</dd>
    </div>
  )
}
