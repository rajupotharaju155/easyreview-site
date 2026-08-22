import { apiGet } from './client'
import type { PublicMenu } from './types'

export function getPublicMenu(slug: string): Promise<PublicMenu> {
  return apiGet<PublicMenu>(`/menu/${encodeURIComponent(slug)}`)
}
