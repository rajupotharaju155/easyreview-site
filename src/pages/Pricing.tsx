import { PageContainer } from '../components/layout/PageContainer'
import { AddOnsGrid } from '../components/pricing/AddOnsGrid'
import { PricingCards } from '../components/pricing/PricingCards'
import { PricingFAQ } from '../components/pricing/PricingFAQ'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SITE_URL, SeoHead } from '../components/shared/SeoHead'

export function Pricing() {
  return (
    <>
      <SeoHead
        path="/pricing"
        title="Pricing — EasyReview"
        description="Simple EasyReview pricing. Start at ₹7 with Quick Trial, then choose Starter, Growth, or Business Pro."
        imageUrl={`${SITE_URL}/og-pricing.jpg`}
        imageAlt="EasyReview pricing — simple pricing, no surprises"
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            title="Plans Built for Growing Ratings"
            subtitle="Start a 7-day Quick Trial at ₹7, then upgrade to Starter, Growth, or Business Pro for a longer plan and included hardware."
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer>
          <PricingCards />
        </PageContainer>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <PageContainer>
          <AddOnsGrid />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <PricingFAQ />
        </PageContainer>
      </section>
    </>
  )
}
