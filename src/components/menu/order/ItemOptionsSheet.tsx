import type { PublicMenuItem, PublicMenuPriceVariant } from '../../../api/types'
import type { MenuCart } from '../../../hooks/useMenuCart'
import { itemCartOptions } from '../../../lib/menuOrder'
import { formatMoney } from '../../../lib/money'
import { BottomSheet } from './BottomSheet'
import { QuantityStepper } from './QuantityStepper'

/** Picker for half/full or price variants, each with its own quantity. */
export function ItemOptionsSheet({
  item,
  variants,
  cart,
  currency,
  onClose,
}: {
  item: PublicMenuItem
  variants: PublicMenuPriceVariant[]
  cart: MenuCart
  currency: string
  onClose: () => void
}) {
  const options = itemCartOptions(item, variants)

  return (
    <BottomSheet
      title={item.name}
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-ink py-2.5 text-sm font-semibold text-white"
        >
          Done
        </button>
      }
    >
      <ul className="divide-y divide-slate-100">
        {options.map((option) => (
          <li key={option.key} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="break-words text-sm font-medium text-ink">{option.variantLabel}</p>
              <p className="text-[13px] text-muted">{formatMoney(option.unitPrice, currency)}</p>
            </div>
            <QuantityStepper
              quantity={cart.quantityOf(option.key)}
              onAdd={() => cart.change(option, 1)}
              onRemove={() => cart.change(option, -1)}
              label={`${item.name} ${option.variantLabel ?? ''}`.trim()}
            />
          </li>
        ))}
      </ul>
    </BottomSheet>
  )
}
