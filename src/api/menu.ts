import { apiGet, apiPost } from './client'
import type { PlacedMenuOrder, PlaceMenuOrderPayload, PublicMenu } from './types'

export function getPublicMenu(slug: string): Promise<PublicMenu> {
  return apiGet<PublicMenu>(`/menu/${encodeURIComponent(slug)}`)
}

export function placeMenuOrder(
  slug: string,
  payload: PlaceMenuOrderPayload,
): Promise<PlacedMenuOrder> {
  return apiPost<PlacedMenuOrder>(`/menu/${encodeURIComponent(slug)}/orders`, payload)
}
