import type { ReactNode, Ref } from 'react'

export interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
  /** Page title heading. Defaults to h2 for in-page sections. */
  as?: 'h1' | 'h2'
  /** Use 'dark' on dark sections so the text stays readable. */
  tone?: 'light' | 'dark'
}

export interface StatItem {
  id: string
  value: string
  description: string
}

/** A number about EasyReview's own customers, not an industry figure. */
export interface ResultItem {
  id: string
  value: string
  label: string
  /** Product this number belongs to, so the product showcase can show it too. */
  productId?: string
}

export interface CustomerLogo {
  id: string
  name: string
  src: string
  width: number
  height: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  business: string
  quote: string
  /** Matches a CustomerLogo id; customers without a logo show their initials. */
  logoId?: string
}

export interface StatCardProps {
  ref?: Ref<HTMLElement>
  value: string
  description: string
  visual?: ReactNode
}

export interface HowItWorksStep {
  id: string
  step: string
  title: string
  description: string
}

export interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  tags?: string[]
}

export type PricingFeature =
  | string
  | {
      label: string
      included: boolean
    }

export interface PricingTier {
  id: string
  name: string
  price: string
  priceNote?: string
  /** Monthly-equivalent total shown struck through (6-month and annual plans). */
  originalPrice?: string
  /** Per-day cost shown under the price, e.g. "₹1/day". */
  perDayCost?: string
  description?: string
  features: PricingFeature[]
  ctaLabel: string
  highlighted?: boolean
  badge?: string
  spotsLeft?: number
}

export interface PricingCardProps {
  tier: PricingTier
}

export interface AddOnItem {
  id: string
  name: string
  price: string
  description: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  items: FAQItem[]
}

export interface PageMeta {
  title: string
  description: string
}
