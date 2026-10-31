import type { MenuPriceType } from '../api/types'

/** Amount in the given ISO 4217 currency, in the viewer's number format. */
export function formatMoney(amount: number, currency: string): string {
  const fractionDigits = amount % 1 === 0 ? 0 : 2
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: fractionDigits,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(fractionDigits)}`
  }
}

export function itemDisplayPrice(item: {
  isHalfServed: boolean
  halfPrice: number | null
  fullPrice: number | null
}): number {
  if (item.isHalfServed && item.halfPrice != null) return item.halfPrice
  return item.fullPrice ?? 0
}

export function formatItemPrice(
  item: {
    fullPrice: number | null
    isMultiPriced?: boolean
    priceType?: MenuPriceType
  },
  currency: string,
): string {
  if (item.isMultiPriced) {
    return item.fullPrice == null ? 'From —' : `From ${formatMoney(item.fullPrice, currency)}`
  }
  if (item.priceType === 'free' || item.fullPrice == null) return 'Free'
  return formatMoney(item.fullPrice, currency)
}
