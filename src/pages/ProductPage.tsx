import { Button, Col, Collapse, Row } from 'antd'
import {
  ChartColumn,
  Clock,
  FileText,
  IdCard,
  Image,
  Images,
  LayoutGrid,
  Percent,
  Phone,
  QrCode,
  Send,
  Sparkles,
  Star,
  UserPlus,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { FeatureCard } from '../components/shared/FeatureCard'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SITE_URL, SeoHead } from '../components/shared/SeoHead'
import {
  getMarketingProduct,
  marketingProducts,
  modulePricingTiers,
  type ProductId,
} from '../data/products'
import { PricingCards } from '../components/pricing/PricingCards'

const HERO_WIDTH = 1200
const HERO_HEIGHT = 630
const HALF_HERO_WIDTH = 1200
const HALF_HERO_HEIGHT = 1097

const FEATURE_ICONS: Record<string, LucideIcon> = {
  layout: UtensilsCrossed,
  photos: Image,
  combos: Sparkles,
  qr: QrCode,
  occasions: Star,
  offers: Percent,
  hours: Clock,
  format: Images,
  card: IdCard,
  share: QrCode,
  save: Phone,
  leads: UserPlus,
  'gst-invoices': FileText,
  'send-invoices': Send,
  'cash-book': Wallet,
  net: ChartColumn,
}

interface ProductPageProps {
  productId: Exclude<ProductId, 'easy-review'>
}

function ProductHeroCopy({
  product,
  centered = false,
}: {
  product: ReturnType<typeof getMarketingProduct>
  centered?: boolean
}) {
  return (
    <div className={centered ? undefined : 'min-w-0'}>
      <p className="text-sm font-semibold text-brand-700">{product.name}</p>
      <h1
        id="product-heading"
        className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl sm:leading-[1.1]"
      >
        {product.heroTitle}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{product.heroSubtitle}</p>
      <div
        className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${centered ? 'items-center justify-center' : ''}`}
      >
        <Button
          type="primary"
          size="large"
          className="!h-12 !px-6 !text-base"
          href="https://app.easyreview.co.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </Button>
        <a
          href="#product-pricing"
          className="text-sm font-semibold text-brand-700 no-underline hover:text-brand-600"
        >
          See {product.name} pricing
        </a>
      </div>
      <p className="mt-4 text-sm text-muted">{product.ctaNote}</p>
    </div>
  )
}

export function ProductPage({ productId }: ProductPageProps) {
  const product = getMarketingProduct(productId)
  const others = marketingProducts.filter((item) => item.id !== product.id)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <SeoHead
        path={product.path}
        title={product.seoTitle}
        description={product.seoDescription}
        imageUrl={product.heroImage ? `${SITE_URL}${product.heroImage}` : undefined}
        imageAlt={product.heroImageAlt}
        imageWidth={String(HERO_WIDTH)}
        imageHeight={String(HERO_HEIGHT)}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section
        className="hero-atmosphere relative overflow-hidden border-b border-border"
        aria-labelledby="product-heading"
      >
        {product.heroHalfImage ? (
          <PageContainer className="grid items-center gap-12 pt-14 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-24">
            <ProductHeroCopy product={product} />
            <div className="relative flex justify-center lg:-ml-10 lg:justify-end">
              <img
                src={product.heroHalfImage}
                alt={product.heroImageAlt}
                width={HALF_HERO_WIDTH}
                height={HALF_HERO_HEIGHT}
                fetchPriority="high"
                className="hero-photo w-full max-w-xl"
              />
            </div>
          </PageContainer>
        ) : (
          <PageContainer className="py-10 sm:py-14">
            {product.heroImage ? (
              <img
                src={product.heroImage}
                alt={product.heroImageAlt}
                width={HERO_WIDTH}
                height={HERO_HEIGHT}
                fetchPriority="high"
                className="w-full rounded-2xl border border-border bg-white shadow-sm"
              />
            ) : null}
            <div className="mx-auto mt-8 max-w-3xl text-center">
              <ProductHeroCopy product={product} centered />
            </div>
          </PageContainer>
        )}
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="product-steps-heading">
        <PageContainer>
          <SectionHeading
            id="product-steps-heading"
            eyebrow={product.name}
            title={`How ${product.name} works`}
            className="mb-10 sm:mb-12"
          />
          <Row gutter={[20, 20]}>
            {product.steps.map((step) => (
              <Col key={step.id} xs={24} md={8}>
                <article className="h-full rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <p className="font-display text-sm font-bold text-brand-600">{step.step}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </article>
              </Col>
            ))}
          </Row>
        </PageContainer>
      </section>

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="product-features-heading">
        <PageContainer>
          <SectionHeading
            id="product-features-heading"
            eyebrow={product.name}
            title="What you get"
            subtitle={product.tagline}
            className="mb-10 sm:mb-12"
          />
          <Row gutter={[20, 20]}>
            {product.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.id] ?? LayoutGrid
              return (
                <Col key={feature.id} xs={24} sm={12}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={<Icon className="h-5 w-5" aria-hidden />}
                    tags={feature.tags}
                  />
                </Col>
              )
            })}
          </Row>
        </PageContainer>
      </section>

      <section
        id="product-pricing"
        className="bg-white py-16 sm:py-20"
        aria-labelledby="product-pricing-heading"
      >
        <PageContainer>
          <SectionHeading
            id="product-pricing-heading"
            eyebrow={product.name}
            title={`${product.name} pricing`}
            subtitle={product.ctaNote}
            className="mb-10 sm:mb-12"
          />
          <PricingCards tiers={modulePricingTiers[productId]} />
        </PageContainer>
      </section>

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="product-faq-heading">
        <PageContainer className="max-w-3xl">
          <SectionHeading
            id="product-faq-heading"
            title={`${product.name} questions`}
            subtitle={`Common questions about ${product.name}.`}
            className="mb-8"
          />
          <Collapse
            bordered={false}
            expandIconPosition="end"
            className="!rounded-2xl !bg-white !px-2 sm:!px-4"
            style={{ border: '1px solid var(--color-border)' }}
            items={product.faqs.map((faq) => ({
              key: faq.id,
              label: <span className="font-medium text-ink">{faq.question}</span>,
              children: <p className="text-sm leading-relaxed text-muted">{faq.answer}</p>,
            }))}
          />
        </PageContainer>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="other-products-heading">
        <PageContainer>
          <SectionHeading
            id="other-products-heading"
            title="Also in the EasyReview app"
            subtitle="Each product has its own page and plan."
            className="mb-10 sm:mb-12"
          />
          <Row gutter={[20, 20]}>
            {others.map((item) => (
              <Col key={item.id} xs={24} md={12} lg={6}>
                <Link
                  to={item.path}
                  className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 no-underline shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.tagline}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-600">Learn more</span>
                </Link>
              </Col>
            ))}
          </Row>
        </PageContainer>
      </section>

      <section className="cta-band py-16 sm:py-20" aria-labelledby="product-cta-heading">
        <PageContainer className="text-center">
          <h2
            id="product-cta-heading"
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {product.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">{product.ctaSubtitle}</p>
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
          <p className="mt-4 text-sm text-white/75">{product.ctaNote}</p>
        </PageContainer>
      </section>
    </>
  )
}
