import { Button } from 'antd'
import { Check, X } from 'lucide-react'
import type { PricingCardProps, PricingFeature } from '../../types'

function featureItem(feature: PricingFeature) {
  return typeof feature === 'string' ? { label: feature, included: true } : feature
}

export function PricingCard({ tier }: PricingCardProps) {
  const {
    name,
    price,
    priceNote,
    originalPrice,
    perDayCost,
    features,
    ctaLabel,
    highlighted,
    badge,
  } = tier

  return (
    <article
      className={`relative z-0 flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-8 transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100 ${
        highlighted
          ? 'border-brand-600 shadow-lg shadow-brand-600/10 ring-1 ring-brand-600'
          : 'border-border shadow-sm'
      }`}
    >
      {badge ? (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1 text-xs font-semibold text-white ${
            tier.spotsLeft != null ? 'bg-amber-500' : 'bg-brand-600'
          }`}
        >
          {badge}
        </span>
      ) : null}

      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
        <div className="mt-3 flex flex-nowrap items-baseline gap-1.5 whitespace-nowrap">
          {originalPrice ? (
            <span className="text-sm text-muted line-through decoration-slate-400">
              {originalPrice}
            </span>
          ) : null}
          <span className="font-display text-3xl font-bold tracking-tight text-ink">{price}</span>
          {priceNote ? <span className="text-sm text-muted">{priceNote}</span> : null}
        </div>
        {perDayCost ? (
          <p
            className={`mt-2 text-sm ${
              highlighted ? 'font-bold text-brand-700' : 'font-medium text-slate-600'
            }`}
          >
            {perDayCost}
          </p>
        ) : null}
      </div>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {features.map((feature) => {
          const { label, included } = featureItem(feature)
          return (
            <li
              key={label}
              className={`flex items-start gap-2.5 text-sm ${
                included ? 'text-slate-700' : 'text-muted'
              }`}
            >
              {included ? (
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500"
                  aria-hidden
                >
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
              ) : (
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500"
                  aria-hidden
                >
                  <X className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
              )}
              <span>{label}</span>
            </li>
          )
        })}
      </ul>

      <Button
        type={highlighted ? 'primary' : 'default'}
        size="large"
        block
        className="!h-11"
        href="https://app.easyreview.co.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaLabel}
      </Button>
    </article>
  )
}
