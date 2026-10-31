import { Minus, Plus } from 'lucide-react'

export function QuantityStepper({
  quantity,
  onAdd,
  onRemove,
  label,
}: {
  quantity: number
  onAdd: () => void
  onRemove: () => void
  /** Item name, for screen readers. */
  label: string
}) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex h-8 min-w-[4.5rem] items-center justify-center gap-1 rounded-lg border border-brand-200 bg-white px-3 text-[13px] font-semibold text-brand-700 shadow-sm"
        aria-label={`Add ${label}`}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Add
      </button>
    )
  }

  return (
    <div className="inline-flex h-8 min-w-[4.5rem] items-center justify-between rounded-lg bg-brand-600 text-white shadow-sm">
      <button
        type="button"
        onClick={onRemove}
        className="flex h-8 w-7 items-center justify-center"
        aria-label={`Remove one ${label}`}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span
        className="min-w-[1.25rem] text-center text-[13px] font-semibold tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onAdd}
        className="flex h-8 w-7 items-center justify-center"
        aria-label={`Add one more ${label}`}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  )
}
