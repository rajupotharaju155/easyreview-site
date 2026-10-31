import { useCallback, useEffect, useMemo, useState } from 'react'
import { cartCount, cartTotal, type CartLine, type CartLineBase } from '../lib/menuOrder'

const MAX_LINE_QUANTITY = 99

export type MenuCart = {
  lines: CartLine[]
  count: number
  total: number
  quantityOf: (key: string) => number
  /** Adds `delta` (may be negative); a line at 0 is removed. */
  change: (line: CartLineBase, delta: number) => void
  clear: () => void
}

function storageKey(slug: string): string {
  return `easymenu-cart:${slug}`
}

function readStoredCart(slug: string): CartLine[] {
  try {
    const raw = window.localStorage.getItem(storageKey(slug))
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as CartLine[]) : []
  } catch {
    return []
  }
}

/** Guest cart for one menu, kept in localStorage so a refresh doesn't lose it. */
export function useMenuCart(slug: string): MenuCart {
  const [lines, setLines] = useState<CartLine[]>(() => readStoredCart(slug))

  useEffect(() => {
    setLines(readStoredCart(slug))
  }, [slug])

  useEffect(() => {
    try {
      if (lines.length === 0) window.localStorage.removeItem(storageKey(slug))
      else window.localStorage.setItem(storageKey(slug), JSON.stringify(lines))
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [slug, lines])

  const change = useCallback((line: CartLineBase, delta: number) => {
    setLines((current) => {
      const existing = current.find((row) => row.key === line.key)
      const quantity = Math.min(MAX_LINE_QUANTITY, (existing?.quantity ?? 0) + delta)
      if (quantity <= 0) return current.filter((row) => row.key !== line.key)
      if (existing) {
        return current.map((row) => (row.key === line.key ? { ...row, quantity } : row))
      }
      // Keep options of the same item (e.g. Half and Full) next to each other.
      const siblingIndex = line.menuItemId
        ? current.findLastIndex((row) => row.menuItemId === line.menuItemId)
        : -1
      if (siblingIndex === -1) return [...current, { ...line, quantity }]
      return [
        ...current.slice(0, siblingIndex + 1),
        { ...line, quantity },
        ...current.slice(siblingIndex + 1),
      ]
    })
  }, [])

  const clear = useCallback(() => setLines([]), [])

  return useMemo(
    () => ({
      lines,
      count: cartCount(lines),
      total: cartTotal(lines),
      quantityOf: (key: string) => lines.find((line) => line.key === key)?.quantity ?? 0,
      change,
      clear,
    }),
    [lines, change, clear],
  )
}
