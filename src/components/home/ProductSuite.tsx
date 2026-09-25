import { Col, Row } from 'antd'
import { IdCard, Images, UtensilsCrossed, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { suiteProducts, type ProductId } from '../../data/products'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'

const ICONS: Record<Exclude<ProductId, 'easy-review'>, LucideIcon> = {
  'easy-menu': UtensilsCrossed,
  'easy-story': Images,
  'easy-profile': IdCard,
}

export function ProductSuite() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="suite-heading">
      <PageContainer>
        <SectionHeading
          id="suite-heading"
          eyebrow="The EasyReview app"
          title="Also in the same app"
          subtitle="A digital menu, story posters, and a business card. Each one has its own plan."
          className="mb-10 sm:mb-12"
        />
        <Row gutter={[20, 20]}>
          {suiteProducts.map((product) => {
            const Icon = ICONS[product.id as Exclude<ProductId, 'easy-review'>]
            return (
              <Col key={product.id} xs={24} md={8}>
                <Link
                  to={product.path}
                  className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 no-underline shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{product.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {product.tagline}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-brand-600">Learn more</span>
                </Link>
              </Col>
            )
          })}
        </Row>
      </PageContainer>
    </section>
  )
}
