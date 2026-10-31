import { LegalDocument } from '../components/legal/LegalDocument'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SeoHead } from '../components/shared/SeoHead'
import { REFUND_LAST_UPDATED, refundSections } from '../data/legal'

export function RefundPolicy() {
  return (
    <>
      <SeoHead
        path="/refund-policy"
        title="Refund and Cancellation Policy — EasyReview"
        description="How cancellations, refunds, billing errors, and replacements for QR standees and NFC cards work at EasyReview."
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            title="Refund and Cancellation Policy"
            subtitle={`Last updated: ${REFUND_LAST_UPDATED}`}
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <LegalDocument sections={refundSections} />
        </PageContainer>
      </section>
    </>
  )
}
