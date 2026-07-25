import type {
  AddOnItem,
  FAQCategory,
  FAQItem,
  HowItWorksStep,
  PricingTier,
  StatItem,
} from '../types'

export const HERO_HEADLINES = [
  'Turn Every Happy Customer Into a 5-Star Google Review',
  'Your Best Customers Want to Review You — Make It Effortless',
  'Grow Google Ratings With QR Codes. Keep Complaints Private.',
] as const

/** Active headline — swap index when you pick a favorite from HERO_HEADLINES */
export const ACTIVE_HERO_HEADLINE = HERO_HEADLINES[0]

export const stats: StatItem[] = [
  {
    id: 'reviews-check',
    value: '97%',
    description: 'Of consumers read online reviews before choosing a local business.',
    icon: 'eye',
  },
  {
    id: 'trust-response',
    value: '35%',
    description:
      'More revenue earned by businesses that reply to at least 25% of their reviews.',
    icon: 'reply',
  },
  {
    id: 'rating-lift',
    value: '+9%',
    description: 'Revenue increase for every additional star in your average rating.',
    icon: 'star',
  },
]

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 'scan',
    step: '01',
    title: 'Customer Scans the QR Code',
    description:
      'Place your EasyReview QR at the counter, table, or reception. Customers scan in seconds — no app download required.',
  },
  {
    id: 'route',
    step: '02',
    title: 'Smart Routing',
    description:
      'Happy customers (4–5★) get AI-drafted review suggestions. Unhappy customers (1–3★) go to a private feedback form instead of Google.',
  },
  {
    id: 'post',
    step: '03',
    title: 'One-Tap Posting',
    description:
      'Customers copy an AI draft and paste it on your Google profile in moments. Private complaints stay internal so you can fix issues first.',
  },
]

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    priceNote: 'forever',
    description: 'Perfect for getting your first location live and collecting reviews.',
    features: [
      '1 business location',
      'Limited scans per month',
      'AI review drafts',
      'Private feedback gate',
      'Basic analytics',
    ],
    ctaLabel: 'Start Free',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹999',
    priceNote: '/mo per business',
    description: 'For busy shops ready to scale reviews across more foot traffic.',
    features: [
      'Unlimited scans',
      'Advanced analytics',
      'Multi-location support',
      'Keyword targeting',
      'Multi-language AI drafts',
      'Priority email support',
    ],
    ctaLabel: 'Choose Growth',
    highlighted: true,
    badge: 'Most popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'tailored pricing',
    description: 'Built for multi-branch chains and franchise networks.',
    features: [
      'Unlimited locations',
      'Custom onboarding',
      'Dedicated success manager',
      'SLA & invoicing',
      'API access (coming soon)',
    ],
    ctaLabel: 'Contact Sales',
  },
]

export const addOns: AddOnItem[] = [
  {
    id: 'vinyl',
    name: 'Vinyl QR Stickers',
    price: '₹199',
    description: 'Durable counter and window stickers with your unique EasyReview QR.',
  },
  {
    id: 'standee',
    name: 'Acrylic QR Standee',
    price: '₹499',
    description: 'Premium table-top standee ready for reception desks and checkout counters.',
  },
]

export const pricingFaqs: FAQItem[] = [
  {
    id: 'p1',
    question: 'Can I start on the Free plan and upgrade later?',
    answer:
      'Yes. Create your business on Free, then upgrade to Growth whenever you need unlimited scans or multi-location tools. Your QR links and settings stay intact.',
  },
  {
    id: 'p2',
    question: 'Is pricing per business location?',
    answer:
      'Growth is billed per business location per month. Enterprise plans can cover multiple branches under one agreement — contact sales for a package that fits your network.',
  },
  {
    id: 'p3',
    question: 'Do printed QR materials require a paid plan?',
    answer:
      'No. Digital QR downloads are available on Free. Physical stickers and standees are optional add-ons you can order separately when you want branded print pieces.',
  },
  {
    id: 'p4',
    question: 'Can I cancel or change plans anytime?',
    answer:
      'You can change or cancel your paid plan at any time. Access continues through the end of your current billing period, and Free features remain available after downgrade.',
  },
]

export const faqCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        id: 'g1',
        question: 'How does EasyReview help increase my Google reviews?',
        answer:
          'You place a QR code where customers already are — checkout, tables, or reception. Happy guests get AI-written review drafts they can paste onto Google in seconds, removing friction that usually stops people from leaving feedback.',
      },
      {
        id: 'g2',
        question: 'How long does setup take?',
        answer:
          'Most businesses are ready in about two minutes. Add your business details, generate your QR, and download a print-ready layout. No coding or developer help required.',
      },
      {
        id: 'g3',
        question: 'Do I need to know how to code / is there technical setup?',
        answer:
          'No technical setup. EasyReview is designed for non-technical owners and managers. If you can print a PDF and place a standee, you are ready to collect reviews.',
      },
      {
        id: 'g4',
        question: 'Is there a free plan?',
        answer:
          'Yes. The Free plan includes one business location, AI drafts, the private feedback gate, and basic analytics so you can prove value before upgrading.',
      },
    ],
  },
  {
    id: 'reviews-feedback',
    title: 'Reviews & Feedback',
    items: [
      {
        id: 'r1',
        question: 'What happens when a customer has a bad experience?',
        answer:
          'Customers who select 1–3 stars are routed to a private feedback form instead of your public Google profile. You receive the message internally and can resolve the issue before it becomes a public review.',
      },
      {
        id: 'r2',
        question: 'How is negative feedback handled — does it ever go public?',
        answer:
          'Negative feedback captured through EasyReview stays private by design. It is logged for your team only. Customers are not redirected to leave a public Google review after a low rating.',
      },
      {
        id: 'r3',
        question: 'Can I manage multiple business locations?',
        answer:
          'Yes. Growth and Enterprise plans support multiple locations under one account so you can track scans, conversions, and private feedback across branches from a single dashboard.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing',
    items: [
      {
        id: 'b1',
        question: 'Do I need a credit card to start?',
        answer:
          'No credit card is required for the Free plan. You can create a business, download your QR materials, and start collecting reviews without entering payment details.',
      },
      {
        id: 'b2',
        question: 'What payment methods do you accept?',
        answer:
          'Paid plans support common online payment methods for India. Enterprise customers can arrange invoicing and annual billing — reach out to sales for details.',
      },
    ],
  },
]
