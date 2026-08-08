import { AutoComplete, Input, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import {
  fetchPlaceSuggestions,
  resetPlacesSession,
  type PlaceSuggestion,
} from '../../lib/googlePlaces'

interface GoogleBusinessSearchProps {
  onPlaceSelected: (suggestion: PlaceSuggestion) => void
}

export function GoogleBusinessSearch({ onPlaceSelected }: GoogleBusinessSearchProps) {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<PlaceSuggestion[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    return () => {
      resetPlacesSession()
    }
  }, [])

  const autoCompleteOptions = useMemo(
    () =>
      options.map((option) => ({
        value: option.placeId,
        label: (
          <div className="min-w-0 py-0.5">
            <div className="truncate text-sm font-medium text-ink">{option.mainText}</div>
            {option.secondaryText ? (
              <div className="truncate text-xs text-muted">{option.secondaryText}</div>
            ) : null}
          </div>
        ),
      })),
    [options],
  )

  const handleSearch = async (text: string) => {
    setValue(text)

    if (text.trim().length < 2) {
      setOptions([])
      return
    }

    setSearching(true)
    try {
      const suggestions = await fetchPlaceSuggestions(text)
      setOptions(suggestions)
    } catch {
      setOptions([])
    } finally {
      setSearching(false)
    }
  }

  const handleSelect = (placeId: string) => {
    const suggestion = options.find((option) => option.placeId === placeId)
    if (!suggestion) return

    setOptions([])
    setValue(suggestion.mainText)
    onPlaceSelected(suggestion)
  }

  return (
    <AutoComplete
      value={value}
      options={autoCompleteOptions}
      onSearch={handleSearch}
      onSelect={handleSelect}
      className="w-full"
      popupMatchSelectWidth
      getPopupContainer={() => document.body}
      notFoundContent={searching ? <Spin size="small" /> : null}
    >
      <Input
        size="large"
        placeholder="Search Google Business name"
        autoFocus
        suffix={searching ? <Spin size="small" /> : undefined}
      />
    </AutoComplete>
  )
}
