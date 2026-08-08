import { useEffect, useState } from 'react'

export const COMPETITOR_SEARCH_SAMPLES = [
  'Salons in Hyderabad',
  'Restaurants in Jubilee hills',
  'Mobile repairing Hitec city',
  'Cafes in Bandra',
  'Gyms near Andheri',
] as const

const ITEM_HEIGHT_PX = 40
const SLIDE_MS = 500

interface AnimatedSearchPlaceholderProps {
  samples?: readonly string[]
  visible: boolean
  intervalMs?: number
}

/**
 * Vertically cycling placeholder hints for empty search inputs.
 * Loops forward seamlessly (last → first keeps sliding up, never reverses).
 */
export function AnimatedSearchPlaceholder({
  samples = COMPETITOR_SEARCH_SAMPLES,
  visible,
  intervalMs = 2600,
}: AnimatedSearchPlaceholderProps) {
  // Append first sample so the last→first step can slide forward, then snap.
  const loopSamples = [...samples, samples[0]]
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (!visible || samples.length <= 1) return

    const timer = window.setInterval(() => {
      setAnimate(true)
      setIndex((current) => current + 1)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [visible, samples.length, intervalMs])

  useEffect(() => {
    if (index < samples.length) return

    const snap = window.setTimeout(() => {
      setAnimate(false)
      setIndex(0)
    }, SLIDE_MS)

    return () => window.clearTimeout(snap)
  }, [index, samples.length])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-9 right-3 flex items-center overflow-hidden"
      aria-hidden
    >
      <div className="relative h-10 w-full overflow-hidden">
        <div
          className={
            animate
              ? 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
              : ''
          }
          style={{ transform: `translateY(-${index * ITEM_HEIGHT_PX}px)` }}
        >
          {loopSamples.map((sample, sampleIndex) => (
            <div
              key={`${sample}-${sampleIndex}`}
              className="flex h-10 items-center truncate text-base leading-none text-slate-400"
            >
              {sample}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
