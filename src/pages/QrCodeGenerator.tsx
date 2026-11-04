import { useState } from 'react'
import { Input } from 'antd'
import { Helmet } from 'react-helmet-async'
import { FAQAccordion } from '../components/faq/FAQAccordion'
import { CTASection } from '../components/home/CTASection'
import { PageContainer } from '../components/layout/PageContainer'
import { QrDesignControls } from '../components/qr-generator/QrDesignControls'
import { QrPreview } from '../components/qr-generator/QrPreview'
import { FeatureCard } from '../components/shared/FeatureCard'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SITE_URL, SeoHead } from '../components/shared/SeoHead'
import { qrFaqCategories, qrFeatures, qrSteps } from '../data/qrGenerator'
import { DEFAULT_QR_DESIGN, normalizeQrUrl, type QrDesign } from '../lib/qrCode'

const PAGE_PATH = '/qr-code-generator'
const MAX_URL_LENGTH = 1000

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free QR Code Generator',
  url: `${SITE_URL}${PAGE_PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: qrFeatures.map((feature) => feature.title),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qrFaqCategories
    .flatMap((category) => category.items)
    .map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
}

export function QrCodeGenerator() {
  const [url, setUrl] = useState('')
  const [design, setDesign] = useState<QrDesign>(DEFAULT_QR_DESIGN)

  const data = normalizeQrUrl(url)
  const invalid = url.trim().length > 0 && !data

  return (
    <>
      <SeoHead
        path={PAGE_PATH}
        title="Free QR Code Generator with Logo — EasyReview"
        description="Create a free custom QR code with your logo, colors, and gradients. Download as PNG, SVG, PDF, or JPG. No sign-up, no watermark, and no expiry."
        imageAlt="EasyReview free QR code generator"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="hero-atmosphere border-b border-border py-10 sm:py-14">
        <PageContainer>
          <SectionHeading
            as="h1"
            eyebrow="Free tool · No sign-up"
            title="Free QR Code Generator"
            subtitle="Create a custom QR code with your logo, colors, and gradients. Download it as PNG, SVG, PDF, or JPG, free and with no watermark."
            className="px-0"
          />
        </PageContainer>
      </section>

      {/* Kept out of session recordings: visitors' links and logos are their own. */}
      <section className="ph-no-capture bg-surface py-8 sm:py-12" data-clarity-mask="true">
        <PageContainer>
          <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
            <label htmlFor="qr-url" className="mb-2 block font-display text-base font-semibold">
              Your URL
            </label>
            <Input
              id="qr-url"
              size="large"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://yourwebsite.com"
              maxLength={MAX_URL_LENGTH}
              status={invalid ? 'error' : undefined}
              aria-invalid={invalid}
              aria-describedby={invalid ? 'qr-url-error' : undefined}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            {invalid ? (
              <p id="qr-url-error" className="mt-2 text-sm text-red-600">
                Enter a full link, like yourwebsite.com or https://yourwebsite.com/menu.
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="lg:sticky lg:top-24 lg:order-2">
              <QrPreview data={data} design={design} />
            </div>
            <div className="min-w-0 lg:order-1">
              <QrDesignControls
                design={design}
                onChange={(patch) => setDesign((current) => ({ ...current, ...patch }))}
              />
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer>
          <SectionHeading title="How to Create a QR Code" />
          <ol className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-3">
            {qrSteps.map((step, index) => (
              <li key={step.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 font-display font-bold text-brand-600">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            title="A Custom QR Code Maker That Stays Free"
            subtitle="Everything you need for menus, flyers, packaging, business cards, and posters."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qrFeatures.map(({ title, description, icon: Icon }) => (
              <FeatureCard
                key={title}
                title={title}
                description={description}
                icon={<Icon size={20} aria-hidden />}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-3xl">
          <FAQAccordion categories={qrFaqCategories} />
        </PageContainer>
      </section>

      <CTASection note="Instant setup · Upgrade anytime" />
    </>
  )
}
