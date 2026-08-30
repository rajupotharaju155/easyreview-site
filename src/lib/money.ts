import type { MenuPriceType } from '../api/types'

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

export function itemDisplayPrice(item: {
  isHalfServed: boolean
  halfPrice: number | null
  fullPrice: number | null
}): number {
  if (item.isHalfServed && item.halfPrice != null) return item.halfPrice
  return item.fullPrice ?? 0
}

export function formatItemPrice(item: {
  fullPrice: number | null
  isMultiPriced?: boolean
  priceType?: MenuPriceType
}): string {
  if (item.isMultiPriced) {
    return item.fullPrice == null ? 'From —' : `From ${formatInr(item.fullPrice)}`
  }
  if (item.priceType === 'free' || item.fullPrice == null) return 'Free'
  return formatInr(item.fullPrice)
}
