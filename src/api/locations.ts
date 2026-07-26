import { apiGet, apiPost } from './client'
import type { PublicLocation } from './types'

export function getLocationBySlug(slug: string): Promise<PublicLocation> {
  return apiGet<PublicLocation>(`/locations/by-slug/${encodeURIComponent(slug)}`)
}

export function recordRedirectToGoogle(locationId: string): Promise<unknown> {
  return apiPost(
    `/locations/${encodeURIComponent(locationId)}/redirect-to-google`,
    {},
  )
}
