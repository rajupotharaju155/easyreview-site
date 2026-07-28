import { Button } from 'antd'
import { Check } from 'lucide-react'
import type { PricingCardProps } from '../../types'

export function PricingCard({ tier }: PricingCardProps) {
  const { name, price, priceNote, description, features, ctaLabel, highlighted, badge } = tier

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-8 ${
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
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold tracking-tight text-ink">{price}</span>
          {priceNote ? <span className="text-sm text-muted">{priceNote}</span> : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      </div>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
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
