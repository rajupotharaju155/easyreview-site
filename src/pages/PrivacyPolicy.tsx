import { Helmet } from 'react-helmet-async'
import { LegalDocument } from '../components/legal/LegalDocument'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { PRIVACY_LAST_UPDATED, privacySections } from '../data/legal'

export function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — EasyReview</title>
        <meta
          name="description"
          content="Learn how EasyReview collects, uses, and protects information for businesses and customers using our review platform."
        />
      </Helmet>

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
