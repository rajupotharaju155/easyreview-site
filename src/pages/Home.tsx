import { SeoHead } from '../components/shared/SeoHead'
import { CTASection } from '../components/home/CTASection'
import { FeatureGrid } from '../components/home/FeatureGrid'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { MultiLanguage } from '../components/home/MultiLanguage'
import { ProblemStats } from '../components/home/ProblemStats'

export function Home() {
  return (
    <>
      <SeoHead
        path="/"
        title="EasyReview — Turn Happy Customers Into 5-Star Google Reviews"
        description="EasyReview helps local businesses convert foot traffic into 5-star Google reviews with QR codes, while privately capturing negative feedback."
      />
      <Hero />
      <ProblemStats />
      <HowItWorks />
      <MultiLanguage />
      <FeatureGrid />
      <CTASection />
    </>
  )
}
