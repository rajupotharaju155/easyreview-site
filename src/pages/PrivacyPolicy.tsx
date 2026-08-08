import { LegalDocument } from '../components/legal/LegalDocument'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SeoHead } from '../components/shared/SeoHead'
import { PRIVACY_LAST_UPDATED, privacySections } from '../data/legal'

export function PrivacyPolicy() {
  return (
    <>
      <SeoHead
        path="/privacy"
        title="Privacy Policy — EasyReview"
        description="Learn how EasyReview collects, uses, and protects information for businesses and customers using our review platform."
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            title="Privacy Policy"
            subtitle={`Last updated: ${PRIVACY_LAST_UPDATED}`}
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <LegalDocument sections={privacySections} />
        </PageContainer>
      </section>
    </>
  )
}
