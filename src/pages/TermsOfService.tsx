import { Helmet } from 'react-helmet-async'
import { LegalDocument } from '../components/legal/LegalDocument'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { TERMS_LAST_UPDATED, termsSections } from '../data/legal'

export function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — EasyReview</title>
        <meta
          name="description"
          content="Read the EasyReview Terms of Service covering accounts, acceptable use, plans, AI drafts, and liability."
        />
      </Helmet>

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            title="Terms of Service"
            subtitle={`Last updated: ${TERMS_LAST_UPDATED}`}
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <LegalDocument sections={termsSections} />
        </PageContainer>
      </section>
    </>
  )
}
