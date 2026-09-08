import { WriteToUsForm } from '../components/contact/WriteToUsForm'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SeoHead } from '../components/shared/SeoHead'

export function Contact() {
  return (
    <>
      <SeoHead
        path="/contact"
        title="Contact us — EasyReview"
        description="Have a question about EasyReview? Send us a message and we'll help you get more Google reviews for your business."
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            title="Contact us"
            subtitle="Have a question about EasyReview? Tell us about your business and we'll get back to you."
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <WriteToUsForm />
        </PageContainer>
      </section>
    </>
  )
}
