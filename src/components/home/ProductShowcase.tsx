import { Button } from 'antd'
import {
  ArrowRight,
  Check,
  IdCard,
  Images,
  ReceiptIndianRupee,
  Star,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { results } from '../../data/content'
import { marketingProducts, type ProductId } from '../../data/products'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'

const ICONS: Record<ProductId, LucideIcon> = {
  'easy-review': Star,
  'easy-menu': UtensilsCrossed,
  'easy-story': Images,
  'easy-profile': IdCard,
  'easy-cash': ReceiptIndianRupee,
}

/** What each product does for the business, read left to right as one journey. */
const OUTCOMES: Record<ProductId, string> = {
  'easy-review': 'Get found',
  'easy-menu': 'Get chosen',
  'easy-profile': 'Stay in touch',
  'easy-story': 'Bring them back',
  'easy-cash': 'Get paid',
}

const ORDER: ProductId[] = ['easy-review', 'easy-menu', 'easy-profile', 'easy-story', 'easy-cash']

const products = ORDER.map((id) => marketingProducts.find((product) => product.id === id)!)

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = products[activeIndex]
  const result = results.find((item) => item.productId === active.id)

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (activeIndex + step + products.length) % products.length
    setActiveIndex(next)
    document.getElementById(`showcase-tab-${products[next].id}`)?.focus()
  }

  return (
    <section className="section-dark py-16 sm:py-24" aria-labelledby="showcase-heading">
      <PageContainer>
        <SectionHeading
          id="showcase-heading"
          tone="dark"
          eyebrow="One app, five tools"
          title="Everything a local business needs to grow"
          subtitle="Start with Google reviews, then add a menu, a business card, story posters, and invoices from the same account."
          className="mb-10 sm:mb-12"
        />

        <div
          role="tablist"
          aria-label="EasyReview products"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0"
        >
          {products.map((product, index) => {
            const Icon = ICONS[product.id]
            const selected = index === activeIndex
            return (
              <button
                key={product.id}
                id={`showcase-tab-${product.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="showcase-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={onTabKeyDown}
                className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left transition-colors ${
                  selected
                    ? 'border-brand-500 bg-brand-600 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold tracking-wider uppercase opacity-75">
                    {OUTCOMES[product.id]}
                  </span>
                  <span className="text-sm font-semibold">{product.name}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby={`showcase-tab-${active.id}`}
          className="mt-8 grid items-center gap-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:grid-cols-2"
        >
          <div key={active.id} className="animate-fade-up min-w-0">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {active.heroTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/70">{active.heroSubtitle}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {active.features.slice(0, 4).map((feature) => (
                <li key={feature.id} className="flex items-start gap-2.5 text-sm text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/25 text-brand-200">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {feature.title}
                </li>
              ))}
            </ul>

            {result ? (
              <p className="mt-6 text-sm text-white/60">
                <span className="font-display text-xl font-bold text-white">{result.value}</span>{' '}
                {result.label.toLowerCase()}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="primary"
                size="large"
                className="!h-11 !px-6"
                href="https://app.easyreview.co.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </Button>
              <Link
                to={active.path === '/' ? '/pricing' : active.path}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-100 no-underline hover:text-white"
              >
                {active.path === '/' ? 'See pricing' : `Explore ${active.name}`}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          {active.heroHalfImage ? (
            <img
              key={active.heroHalfImage}
              src={active.heroHalfImage}
              alt={active.heroImageAlt ?? ''}
              loading="lazy"
              decoding="async"
              className="animate-fade-up-delay-1 mx-auto w-full max-w-md rounded-2xl"
            />
          ) : null}
        </div>
      </PageContainer>
    </section>
  )
}
