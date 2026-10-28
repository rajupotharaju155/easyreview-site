import { SITE_URL, SeoHead } from '../components/shared/SeoHead'
import { getMarketingProduct } from '../data/products'
import { CTASection } from '../components/home/CTASection'
import { CustomerLogos } from '../components/home/CustomerLogos'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { MultiLanguage } from '../components/home/MultiLanguage'
import { ProductShowcase } from '../components/home/ProductShowcase'
import { Testimonials } from '../components/home/Testimonials'
import { ProblemStats } from '../components/home/ProblemStats'

export function Home() {
  const product = getMarketingProduct('easy-review')

  return (
    <>
      <SeoHead
        path="/"
        title="EasyReview — Turn Happy Customers Into 5-Star Google Reviews"
        description="EasyReview helps local businesses convert foot traffic into 5-star Google reviews with QR codes, while privately capturing negative feedback."
        imageUrl={product.heroImage ? `${SITE_URL}${product.heroImage}` : undefined}
        imageAlt={product.heroImageAlt}
        imageWidth="1200"
        imageHeight="630"
      />
      <Hero />
      <CustomerLogos />
      <ProblemStats />
      <HowItWorks />
      <ProductShowcase />
      <MultiLanguage />
      <Testimonials />
      <CTASection />
    </>
  )
}
