import { ChevronDown } from 'lucide-react'
import type { PublicMenuCombo, PublicMenuItem, PublicMenuPriceVariant } from '../../../api/types'
import { useMenuContext } from '../../../hooks/useMenuContext'
import { comboCartOption, itemCartOptions } from '../../../lib/menuOrder'
import { QuantityStepper } from './QuantityStepper'

/**
 * Add / +/− for a menu item. Items with one price get an inline stepper;
 * half/full and multi-priced items open a picker. Nothing for items without
 * an exact price, or when ordering is off.
 */
export function ItemCartControl({
  item,
  variants = [],
}: {
  item: PublicMenuItem
  variants?: PublicMenuPriceVariant[]
}) {
  const { cart, openItemOptions } = useMenuContext()
  if (!cart) return null

  const options = itemCartOptions(item, variants)
  if (options.length === 0) return null

  if (options.length === 1) {
    const [option] = options
    return (
      <QuantityStepper
        quantity={cart.quantityOf(option.key)}
        onAdd={() => cart.change(option, 1)}
        onRemove={() => cart.change(option, -1)}
        label={item.name}
      />
    )
  }

  const added = options.reduce((sum, option) => sum + cart.quantityOf(option.key), 0)
  return (
    <button
      type="button"
      onClick={() => openItemOptions(item, variants)}
      className={`inline-flex h-8 min-w-[4.5rem] items-center justify-center gap-1 rounded-lg px-3 text-[13px] font-semibold shadow-sm ${
        added > 0 ? 'bg-brand-600 text-white' : 'border border-brand-200 bg-white text-brand-700'
      }`}
      aria-label={`Choose options for ${item.name}`}
    >
      {added > 0 ? `${added} added` : 'Add'}
      <ChevronDown className="h-3.5 w-3.5" aria-hidden />
    </button>
  )
}

export function ComboCartControl({ combo }: { combo: PublicMenuCombo }) {
  const { cart } = useMenuContext()
  if (!cart) return null
  const option = comboCartOption(combo)
  return (
    <QuantityStepper
      quantity={cart.quantityOf(option.key)}
      onAdd={() => cart.change(option, 1)}
      onRemove={() => cart.change(option, -1)}
      label={combo.name}
    />
  )
}
