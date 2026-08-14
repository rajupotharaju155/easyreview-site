import { FAQAccordion } from '../components/faq/FAQAccordion'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SITE_URL, SeoHead } from '../components/shared/SeoHead'

export function FAQ() {
  return (
    <>
      <SeoHead
        path="/faq"
        title="FAQ — EasyReview"
        description="Answers about EasyReview setup, Google reviews, private feedback, plans, and billing."
        imageUrl={`${SITE_URL}/og-faq.jpg`}
        imageAlt="EasyReview FAQ — got questions? We've got answers"
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about EasyReview"
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <FAQAccordion />
        </PageContainer>
      </section>
    </>
  )
}
