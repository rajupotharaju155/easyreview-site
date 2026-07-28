import { Button, Input, Spin, message } from 'antd'
import { Check, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import {
  searchPlacesByText,
  type TextSearchPlaceResult,
} from '../../lib/googlePlaces'
import { AnimatedSearchPlaceholder } from './AnimatedSearchPlaceholder'
import { StarRating } from './comparisonUtils'

interface GoogleTextSearchProps {
  excludePlaceIds?: string[]
  /** Max places that can be selected (1 or 2 for competitors). */
  maxSelections?: number
  onConfirm: (places: TextSearchPlaceResult[]) => void
  confirming?: boolean
}

/**
 * Text Search (New) — multi-select places for queries like "gym in Gajwel".
 */
export function GoogleTextSearch({
  excludePlaceIds = [],
  maxSelections = 2,
  onConfirm,
  confirming = false,
}: GoogleTextSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TextSearchPlaceResult[]>([])
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const showPlaceholder = query.length === 0
  const selectedPlaces = results.filter((result) => selectedIds.includes(result.placeId))

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault()
    const text = query.trim()
    if (text.length < 2) {
      message.warning('Enter a search like “salons in Borivali”.')
      return
    }

    setSearching(true)
    setHasSearched(true)
    setSelectedIds([])
    try {
      const places = await searchPlacesByText(text, {
        excludePlaceIds,
        maxResultCount: 12,
      })
      setResults(places)
    } catch {
      setResults([])
      message.error('Search failed. Check Places API (New) is enabled for your API key.')
    } finally {
      setSearching(false)
    }
  }

  const togglePlace = (placeId: string) => {
    setSelectedIds((current) => {
      if (current.includes(placeId)) {
        return current.filter((id) => id !== placeId)
      }
      if (current.length >= maxSelections) {
        message.info(
          maxSelections === 1
            ? 'You can select 1 business.'
            : `You can select up to ${maxSelections} competitors.`,
        )
        return current
      }
      return [...current, placeId]
    })
  }

  const handleConfirm = () => {
    if (selectedPlaces.length === 0) {
      message.warning('Select at least one business from the results.')
      return
    }
    onConfirm(selectedPlaces)
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Input
            size="large"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder=""
            autoFocus
            prefix={<Search className="h-4 w-4 text-muted" />}
            className="w-full"
          />
          <AnimatedSearchPlaceholder visible={showPlaceholder} />
        </div>
        <Button type="primary" size="large" htmlType="submit" loading={searching}>
          Search
        </Button>
      </form>

      {maxSelections > 1 && results.length > 0 && !searching ? (
        <p className="mt-3 text-xs text-muted">
          Select up to {maxSelections} competitors ({selectedIds.length}/{maxSelections})
        </p>
      ) : null}

      <div className="mt-3 max-h-[360px] overflow-y-auto">
        {searching ? (
          <div className="flex items-center justify-center gap-3 py-8">
            <Spin />
            <span className="text-sm text-muted">Searching Google Places…</span>
          </div>
        ) : null}

        {!searching && hasSearched && results.length === 0 ? (
          <p className="rounded-xl bg-surface px-4 py-6 text-center text-sm text-muted">
            No matching businesses found. Try a broader query.
          </p>
        ) : null}

        {!searching && results.length > 0 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {results.map((result) => {
              const isSelected = selectedIds.includes(result.placeId)
              const isDisabled = !isSelected && selectedIds.length >= maxSelections

              return (
                <li key={result.placeId}>
                  <button
                    type="button"
                    onClick={() => togglePlace(result.placeId)}
                    disabled={isDisabled}
                    className={`flex w-full cursor-pointer items-start gap-3 border-0 px-3.5 py-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-brand-50'
                        : isDisabled
                          ? 'cursor-not-allowed bg-white opacity-50'
                          : 'bg-white hover:bg-brand-50/50'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        isSelected
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-border bg-white text-transparent'
                      }`}
                      aria-hidden
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {result.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {result.formattedAddress || 'Address unavailable'}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                        <StarRating rating={result.rating} />
                        <span>
                          {result.userRatingCount != null
                            ? `${result.userRatingCount.toLocaleString()} reviews`
                            : 'No review count'}
                        </span>
                        {result.primaryTypeDisplayName ? (
                          <span className="rounded-md bg-surface px-1.5 py-0.5 ring-1 ring-border">
                            {result.primaryTypeDisplayName}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>

      {results.length > 0 && !searching ? (
        <div className="mt-4 flex justify-end">
          <Button
            type="primary"
            size="large"
            disabled={selectedIds.length === 0}
            loading={confirming}
            onClick={handleConfirm}
          >
            {selectedIds.length === 0
              ? 'Add selected'
              : selectedIds.length === 1
                ? 'Add 1 competitor'
                : `Add ${selectedIds.length} competitors`}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
