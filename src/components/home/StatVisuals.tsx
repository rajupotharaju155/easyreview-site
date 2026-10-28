import { Star } from 'lucide-react'

interface VisualProps {
  /** 0–1, from the count-up, so the picture fills in with the number. */
  progress: number
}

/** 100 dots, one per shopper; 97 of them light up. */
export function ShopperDots({ progress }: VisualProps) {
  const lit = Math.round(97 * progress)
  return (
    <div>
      <div className="grid grid-cols-20 gap-1" aria-hidden>
        {Array.from({ length: 100 }, (_, index) => (
          <span
            key={index}
            className={`aspect-square rounded-full transition-colors duration-150 ${
              index < lit ? 'bg-brand-600' : 'bg-border'
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs font-medium text-muted">
        97 out of every 100 shoppers check first
      </p>
    </div>
  )
}

/** Revenue of businesses that reply to reviews against those that stay silent. */
export function ReplyRevenueBars({ progress }: VisualProps) {
  const rows = [
    { label: 'Reply to reviews', value: '+35%', width: 100, tone: 'bg-brand-600' },
    { label: 'Stay silent', value: 'Baseline', width: 100 / 1.35, tone: 'bg-slate-300' },
  ]
  return (
    <div className="space-y-3" aria-hidden>
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-1 flex justify-between text-xs font-medium">
            <span className="text-slate-700">{row.label}</span>
            <span className="text-muted">{row.value}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-surface">
            <div
              className={`h-full rounded-full ${row.tone}`}
              style={{ width: `${row.width * progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Each extra star adds about 9% more revenue, so the bars climb from 2★ to 5★. */
export function StarRevenueSteps({ progress }: VisualProps) {
  const steps = [2, 3, 4, 5]
  return (
    <div aria-hidden>
      <div className="flex h-24 items-end gap-3">
        {steps.map((stars, index) => {
          const lift = (index + 1) * 9
          const last = index === steps.length - 1
          return (
            <div key={stars} className="flex h-full flex-1 flex-col justify-end text-center">
              <span
                className={`mb-1 text-xs font-semibold ${last ? 'text-brand-700' : 'text-muted'}`}
                style={{ opacity: progress }}
              >
                +{lift}%
              </span>
              <div
                className={`rounded-t-md ${last ? 'bg-brand-600' : 'bg-brand-200'}`}
                style={{ height: `${(lift / 36) * 70 * progress}%` }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-3 border-t border-border pt-2">
        {steps.map((stars) => (
          <span
            key={stars}
            className="flex flex-1 items-center justify-center gap-0.5 text-xs font-medium text-muted"
          >
            {stars}
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          </span>
        ))}
      </div>
    </div>
  )
}
