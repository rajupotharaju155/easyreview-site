import type { ReactNode } from 'react'

export interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
  /** Page title heading. Defaults to h2 for in-page sections. */
  as?: 'h1' | 'h2'
}

export type StatIconName = 'eye' | 'reply' | 'star'

export interface StatItem {
  id: string
  value: string
  description: string
  icon: StatIconName
}

export interface StatCardProps {
  value: string
  description: string
  icon: ReactNode
}

export interface HowItWorksStep {
  id: string
  step: string
  title: string
  description: string
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: ReactNode
  tags?: string[]
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
