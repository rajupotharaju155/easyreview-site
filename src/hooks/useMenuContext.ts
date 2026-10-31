import { createContext, useContext } from 'react'
import type { PublicMenuItem, PublicMenuPriceVariant } from '../api/types'
import type { MenuCart } from './useMenuCart'

export type MenuContextValue = {
  currency: string
  /** Null when the business has turned ordering off. */
  cart: MenuCart | null
  /** Opens the half/full or price-variant picker for an item. */
  openItemOptions: (item: PublicMenuItem, variants: PublicMenuPriceVariant[]) => void
}

export const MenuContext = createContext<MenuContextValue>({
  currency: 'INR',
  cart: null,
  openItemOptions: () => {},
})

export function useMenuContext(): MenuContextValue {
  return useContext(MenuContext)
}
