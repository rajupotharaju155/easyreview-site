import { Button } from 'antd'
import { PageContainer } from '../layout/PageContainer'

export function CTASection() {
  return (
    <section className="cta-band py-16 sm:py-20" aria-labelledby="cta-heading">
      <PageContainer className="text-center">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Start Growing Your Google Reviews Today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
          Create your business profile, download QR materials, and start collecting five-star
          reviews in under two minutes.
        </p>
        <div className="mt-8">
          <Button
            size="large"
            className="!h-12 !border-0 !bg-white !px-8 !text-base !font-semibold !text-brand-700 hover:!bg-white/90"
            href="https://app.easyreview.co.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/75">
          Instant setup · Quick Trial from ₹7 · Upgrade anytime
        </p>
      </PageContainer>
    </section>
  )
}
