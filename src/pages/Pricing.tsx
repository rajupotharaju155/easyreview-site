import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { AddOnsGrid } from '../components/pricing/AddOnsGrid'
import { PricingCards } from '../components/pricing/PricingCards'
import { PricingFAQ } from '../components/pricing/PricingFAQ'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SITE_URL, SeoHead } from '../components/shared/SeoHead'
import { pricingTiers } from '../data/content'
import {
  getMarketingProduct,
  isProductId,
  marketingProducts,
  modulePricingTiers,
  type ProductId,
} from '../data/products'

export function Pricing() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('product')
  const productId: ProductId = isProductId(requested) ? requested : 'easy-review'
  const product = getMarketingProduct(productId)
  const tiers = productId === 'easy-review' ? pricingTiers : modulePricingTiers[productId]
  const isReview = productId === 'easy-review'

  function selectProduct(next: ProductId) {
    if (next === 'easy-review') {
      setSearchParams({}, { replace: true })
      return
    }
    setSearchParams({ product: next }, { replace: true })
  }

  return (
    <>
      <SeoHead
        path="/pricing"
        title="Pricing — EasyReview"
        description="Simple pricing for EasyReview, EasyMenu, EasyStory, EasyProfile, and EasyCash. EasyReview starts at ₹7. EasyMenu and EasyStory start at ₹399/month. EasyProfile is a one-time NFC card. EasyCash is free."
        imageUrl={`${SITE_URL}/og/og-pricing.jpg`}
        imageWidth="1024"
        imageHeight="537"
        imageAlt="EasyReview pricing — simple pricing, no surprises"
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            title={isReview ? 'Plans Built for Growing Ratings' : `${product.name} plans`}
            subtitle={
              isReview
                ? 'Start a 7-day Quick Trial at ₹7, then upgrade to Starter, Growth, or Business Pro for a longer plan and included hardware.'
                : productId === 'easy-profile'
                  ? 'Buy an NFC card once. A PVC card is ₹999 and a metal card is ₹1,999. The digital card stays active for life.'
                  : productId === 'easy-cash'
                    ? `${product.tagline} Free to use.`
                    : `${product.tagline} Starter is ₹399/month, with 6-month and yearly plans.`
            }
          />
          <div
            role="tablist"
            aria-label="Products"
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {marketingProducts.map((item) => {
              const selected = item.id === productId
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectProduct(item.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-border bg-white text-ink hover:border-brand-500'
                  }`}
                >
                  {item.name}
                </button>
              )
            })}
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer>
          <PricingCards tiers={tiers} />
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            {isReview
              ? 'Each product has its own plan. Switch above to see EasyMenu, EasyStory, EasyProfile, and EasyCash.'
              : productId === 'easy-profile'
                ? 'The digital card is included with the NFC card and stays active for life.'
                : productId === 'easy-cash'
                  ? 'EasyCash is in the same EasyReview account. No separate plan is needed.'
                  : `${product.name} is billed on its own plan.`}
          </p>
        </PageContainer>
      </section>

      {isReview ? (
        <section className="bg-surface py-14 sm:py-16">
          <PageContainer>
            <AddOnsGrid />
          </PageContainer>
        </section>
      ) : null}

      {isReview ? (
        <section className="bg-white py-14 sm:py-16">
          <PageContainer className="max-w-3xl">
            <PricingFAQ />
          </PageContainer>
        </section>
      ) : null}
    </>
  )
}
