import type {
  MenuOrderType,
  PublicMenuCombo,
  PublicMenuItem,
  PublicMenuPriceVariant,
} from '../api/types'

const HALF_PRICE_OPTION = 'half'
const FULL_PRICE_OPTION = 'full'

export const ORDER_TYPE_LABELS: Record<MenuOrderType, string> = {
  dine_in: 'Dine-in',
  takeaway: 'Takeaway',
  room_service: 'Room service',
}

/** Label for the table / room number field; null when the type has none. */
export const SPOT_LABELS: Record<MenuOrderType, string | null> = {
  dine_in: 'Table number',
  takeaway: null,
  room_service: 'Room number',
}

export type CartLine = {
  key: string
  menuItemId?: string
  comboId?: string
  priceOption?: string
  name: string
  variantLabel: string | null
  comboItemNames: string[] | null
  unitPrice: number
  quantity: number
}

export type CartLineBase = Omit<CartLine, 'quantity'>

/**
 * Ways an item can be added to the cart, one per price (half/full or each
 * price variant). Empty when the item has no exact price ("onwards", free).
 * The server applies the same rules and reprices every order.
 */
export function itemCartOptions(
  item: PublicMenuItem,
  variants: PublicMenuPriceVariant[],
): CartLineBase[] {
  const base = {
    menuItemId: item.id,
    name: item.name,
    comboItemNames: null,
  }

  if (item.isMultiPriced) {
    return variants.flatMap((variant) => {
      const row = item.variantPrices.find((price) => price.variantId === variant.id)
      if (!row) return []
      return [
        {
          ...base,
          key: `item:${item.id}:${variant.id}`,
          priceOption: variant.id,
          variantLabel: variant.name,
          unitPrice: row.price,
        },
      ]
    })
  }

  if (item.priceType !== 'fixed' || item.fullPrice == null) return []

  if (item.isHalfServed) {
    const options: CartLineBase[] = []
    if (item.halfPrice != null) {
      options.push({
        ...base,
        key: `item:${item.id}:${HALF_PRICE_OPTION}`,
        priceOption: HALF_PRICE_OPTION,
        variantLabel: 'Half',
        unitPrice: item.halfPrice,
      })
    }
    options.push({
      ...base,
      key: `item:${item.id}:${FULL_PRICE_OPTION}`,
      priceOption: FULL_PRICE_OPTION,
      variantLabel: 'Full',
      unitPrice: item.fullPrice,
    })
    return options
  }

  return [{ ...base, key: `item:${item.id}`, variantLabel: null, unitPrice: item.fullPrice }]
}

export function comboCartOption(combo: PublicMenuCombo): CartLineBase {
  return {
    key: `combo:${combo.id}`,
    comboId: combo.id,
    name: combo.name,
    variantLabel: null,
    comboItemNames: combo.items.map((item) => item.name),
    unitPrice: combo.price,
  }
}

/** Sum in minor units so totals have no float error. */
export function cartTotal(lines: CartLine[]): number {
  const cents = lines.reduce(
    (sum, line) => sum + Math.round(line.unitPrice * 100) * line.quantity,
    0,
  )
  return cents / 100
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0)
}
