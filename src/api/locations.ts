import { apiGet } from './client'
import type { PublicLocation } from './types'

export function getLocationBySlug(slug: string): Promise<PublicLocation> {
  return apiGet<PublicLocation>(`/locations/by-slug/${encodeURIComponent(slug)}`)
}
