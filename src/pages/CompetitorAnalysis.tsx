import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { PageContainer } from '../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../components/shared/SeoHead'
import {
  CompetitorColumn,
  type CompetitorSlot,
} from '../components/competitor-analysis/CompetitorColumn'
import { ComparisonTable } from '../components/competitor-analysis/ComparisonTable'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  fetchPlaceDetails,
  type PlaceDetails,
  type TextSearchPlaceResult,
} from '../lib/googlePlaces'

const INITIAL_SLOTS: CompetitorSlot[] = [
  {
    id: 'prospect',
    role: 'prospect',
    label: 'Your business',
    place: null,
    loading: false,
  },
  {
    id: 'competitor-1',
    role: 'competitor',
    label: 'Competitor 1',
    place: null,
    loading: false,
  },
  {
    id: 'competitor-2',
    role: 'competitor',
    label: 'Competitor 2',
    place: null,
    loading: false,
  },
]

export function CompetitorAnalysis() {
  const [slots, setSlots] = useState<CompetitorSlot[]>(INITIAL_SLOTS)

  const updateSlot = (id: string, patch: Partial<CompetitorSlot>) => {
    setSlots((current) =>
      current.map((slot) => (slot.id === id ? { ...slot, ...patch } : slot)),
    )
  }

  const handlePlaceLoaded = (id: string, place: PlaceDetails) => {
    updateSlot(id, { place, loading: false })
  }

  const handleClear = (id: string) => {
    updateSlot(id, { place: null, loading: false })
  }

  const handleCompetitorsSelected = async (
    sourceSlotId: string,
    places: TextSearchPlaceResult[],
  ) => {
    if (places.length === 0) return

    const sourceSlot = slots.find((slot) => slot.id === sourceSlotId)
    const isReplacing = sourceSlot?.place != null

    const targetIds = isReplacing
      ? [sourceSlotId]
      : slots
          .filter((slot) => slot.role === 'competitor' && slot.place == null && !slot.loading)
          .map((slot) => slot.id)
          .slice(0, places.length)

    if (targetIds.length === 0) {
      message.info('No empty competitor slots available.')
      return
    }

    const assignments = places.slice(0, targetIds.length).map((place, index) => ({
      slotId: targetIds[index],
      placeId: place.placeId,
    }))

    for (const assignment of assignments) {
      updateSlot(assignment.slotId, { loading: true })
    }

    const results = await Promise.allSettled(
      assignments.map(async (assignment) => {
        const details = await fetchPlaceDetails(assignment.placeId)
        return { slotId: assignment.slotId, details }
      }),
    )

    let successCount = 0
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        handlePlaceLoaded(result.value.slotId, result.value.details)
        successCount += 1
        return
      }
      updateSlot(assignments[index].slotId, { loading: false })
    })

    if (successCount === 0) {
      message.error('Could not load the selected businesses. Please try again.')
      return
    }

    if (successCount < assignments.length) {
      message.warning(`Added ${successCount} of ${assignments.length} competitors.`)
      return
    }

    message.success(
      successCount === 1 ? 'Competitor added' : `${successCount} competitors added`,
    )
  }

  const filledCount = slots.filter((slot) => slot.place != null).length
  const selectedPlaceIds = useMemo(
    () => slots.map((slot) => slot.place?.placeId).filter((id): id is string => Boolean(id)),
    [slots],
  )
  const emptyCompetitorSlotIds = useMemo(
    () =>
      slots
        .filter((slot) => slot.role === 'competitor' && slot.place == null && !slot.loading)
        .map((slot) => slot.id),
    [slots],
  )

  return (
    <>
      <SeoHead
        path="/competitor-analysis"
        title="Competitor Analysis — EasyReview"
        description="Compare your Google Business profile against local competitors — ratings, reviews, website, and listing completeness side by side."
        imageUrl={`${SITE_URL}/og-competitor-analysis.jpg`}
        imageAlt="EasyReview competitor analysis — compare your business with competitors"
      />

      <section className="hero-atmosphere overflow-x-clip border-b border-border py-10 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            eyebrow="Free competitive snapshot"
            title="See Where You Stand on Google"
            subtitle="Add your business, then find competitors by name — or discover them with a simple search like “salons in Mumbai”."
            className="px-0"
          />
        </PageContainer>
      </section>

      <section className="overflow-x-clip bg-white py-8 sm:py-14">
        <PageContainer className="max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Choose 3 businesses
              </h2>
              <p className="mt-1 text-sm text-muted">
                First card is your business. Next two are competitors.
              </p>
            </div>
            <p className="text-sm font-medium text-muted">{filledCount}/3 selected</p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {slots.map((slot, index) => (
              <div
                key={slot.id}
                className="min-w-0 w-full animate-fade-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CompetitorColumn
                  slot={slot}
                  excludePlaceIds={selectedPlaceIds}
                  emptyCompetitorSlotIds={emptyCompetitorSlotIds}
                  onPlaceLoaded={(place) => handlePlaceLoaded(slot.id, place)}
                  onCompetitorsSelected={
                    slot.role === 'competitor'
                      ? (places) => handleCompetitorsSelected(slot.id, places)
                      : undefined
                  }
                  onClear={() => handleClear(slot.id)}
                  onLoadingChange={(loading) => updateSlot(slot.id, { loading })}
                />
              </div>
            ))}
          </div>

          <ComparisonTable slots={slots} />

          {filledCount >= 2 ? (
            <div className="cta-band mt-10 rounded-2xl px-4 py-8 text-center text-white sm:mt-12 sm:px-10">
              <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                Ready to close the gap?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                EasyReview helps you turn happy customers into Google reviews — so your listing
                can catch up (or stay ahead) of the competition.
              </p>
              <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="https://app.easyreview.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 no-underline transition-opacity hover:opacity-90"
                >
                  Get started for free
                </a>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
                >
                  View pricing
                </Link>
              </div>
            </div>
          ) : null}
        </PageContainer>
      </section>
    </>
  )
}
