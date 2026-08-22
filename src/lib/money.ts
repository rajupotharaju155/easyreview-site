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
  fullPrice: number
}): number {
  if (item.isHalfServed && item.halfPrice != null) return item.halfPrice
  return item.fullPrice
}
