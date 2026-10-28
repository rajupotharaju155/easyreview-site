import { useEffect, useRef, useState } from 'react'

interface StatParts {
  prefix: string
  amount: number
  suffix: string
  decimals: number
  grouped: boolean
}

/** Splits a display value such as "+9%", "97%", or "10,000+" into its number and the text around it. */
export function splitStatValue(value: string): StatParts | null {
  const match = value.match(/^(\D*)([\d,]*\.?\d+)(\D*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  return {
    prefix,
    amount: Number(digits.replace(/,/g, '')),
    suffix,
    decimals: digits.split('.')[1]?.length ?? 0,
    grouped: digits.includes(','),
  }
}

function formatStat(parts: StatParts, amount: number) {
  const number = amount.toLocaleString('en-US', {
    minimumFractionDigits: parts.decimals,
    maximumFractionDigits: parts.decimals,
    useGrouping: parts.grouped,
  })
  return `${parts.prefix}${number}${parts.suffix}`
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/**
 * Counts a stat up from zero the first time its element scrolls into view.
 * Before hydration, and for visitors who prefer reduced motion, it shows the final value,
 * so prerendered HTML always carries the real number. `progress` (0–1) lets visuals animate in step.
 */
export function useCountUp<T extends Element>(value: string, durationMs = 1400) {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const element = ref.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // The prerender runs in a headless browser; it must save the final value, not a frame of the animation.
    const automated = navigator.webdriver
    if (!element || reducedMotion || automated || !('IntersectionObserver' in window)) return

    let frame = 0
    // Stay on the final value until the stat is on screen, then restart from zero and count up.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setProgress(0)
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs)
          setProgress(easeOutCubic(t))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [durationMs])

  const parts = splitStatValue(value)
  const display = parts ? formatStat(parts, parts.amount * progress) : value

  return { ref, display, progress }
}
