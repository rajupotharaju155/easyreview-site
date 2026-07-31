import { Helmet } from 'react-helmet-async'
import { FAQAccordion } from '../components/faq/FAQAccordion'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'

export function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ — EasyReview</title>
        <meta
          name="description"
          content="Answers about EasyReview setup, Google reviews, private feedback, multi-location management, and billing."
        />
      </Helmet>

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
