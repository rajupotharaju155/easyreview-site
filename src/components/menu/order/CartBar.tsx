import { ChevronRight, ShoppingBag } from 'lucide-react'
import { formatMoney } from '../../../lib/money'

export function CartBar({
  count,
  total,
  currency,
  onOpen,
}: {
  count: number
  total: number
  currency: string
  onOpen: () => void
}) {
  return (
    <div className="shrink-0 px-4 pb-2">
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center justify-between gap-3 rounded-2xl bg-brand-600 px-4 py-3 text-white shadow-[0_10px_24px_rgba(91,36,184,0.3)]"
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate text-sm font-semibold">
            {count} {count === 1 ? 'item' : 'items'} · {formatMoney(total, currency)}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold">
          View cart
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </button>
    </div>
  )
}
