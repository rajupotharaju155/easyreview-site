import type { MenuStyle } from '../api/types'

export function isSalonMenu(style?: MenuStyle | null): boolean {
  return style === 'salonStyle'
}
