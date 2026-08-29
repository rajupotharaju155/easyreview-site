import type { PublicMenuItem } from '../api/types'

export function priceForVariant(
  item: Pick<PublicMenuItem, 'variantPrices'>,
  variantId: string,
): number | undefined {
  return (item.variantPrices ?? []).find((row) => row.variantId === variantId)?.price
}
