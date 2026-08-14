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
    id: 'quick-trial',
    name: 'Quick Trial',
    price: '₹7',
    priceNote: '/7 days',
    perDayCost: '₹1/day',
    features: [
      'Admin Panel Access',
      'Unlimited QR scans',
      'Custom Review Link',
      'Real-time scan & review analytics',
      'Keyword targeting',
      'Private feedback gate',
      { label: 'Multi-language AI drafts', included: false },
      { label: 'QR Standee', included: false },
      { label: 'NFC card', included: false }
    ],
    ctaLabel: 'Start Quick Trial',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '₹299',
    priceNote: '/month',
    perDayCost: '~₹10/day',
    features: [
      'Admin Panel Access',
      'Unlimited QR scans',
      'Custom Review Link',
      'Real-time scan & review analytics',
      'Keyword targeting',
      'Private feedback gate',
      'Multi-language AI drafts',
      '1 QR Standee',
      { label: 'NFC card', included: false }
    ],
    ctaLabel: 'Choose Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹999',
    priceNote: '/6 months',
    originalPrice: '₹1,794',
    perDayCost: '~₹5.5/day',
    features: [
      'Admin Panel Access',
      'Unlimited QR scans',
      'Custom Review Link',
      'Real-time scan & review analytics',
      'Keyword targeting',
      'Private feedback gate',
      'Multi-language AI drafts',
      '1 QR Standee',
      { label: 'NFC card', included: false }
    ],
    ctaLabel: 'Choose Growth',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'business-pro',
    name: 'Business Pro',
    price: '₹1,499',
    priceNote: '/year',
    originalPrice: '₹3,588',
    perDayCost: 'Just ₹4/day',
    features: [
      'Admin Panel Access',
      'Unlimited QR scans',
      'Custom Review Link',
      'Real-time scan & review analytics',
      'Keyword targeting',
      'Private feedback gate',
      'Multi-language AI drafts',
      '1 QR Standee',
      '1 NFC card',
      'Priority WhatsApp support',
    ],
    ctaLabel: 'Choose Business Pro',
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
    question: 'Can I start on Quick Trial and upgrade later?',
    answer:
      'Yes. Start a Quick Trial at ₹7 for 7 days, then upgrade to Starter, Growth, or Business Pro for a QR standee, multi-language AI drafts, or an NFC card. Your QR links and settings stay intact.',
  },
  {
    id: 'p2',
    question: 'Is pricing per business location?',
    answer:
      'Yes. Starter is ₹299/month, Growth is ₹999 for 6 months, and Business Pro is ₹1,499/year — each billed per business location.',
  },
  {
    id: 'p3',
    question: 'Do printed QR materials require a paid plan?',
    answer:
      'Quick Trial includes digital QR downloads but no QR standee or NFC card. Starter and Growth include 1 QR standee. Business Pro includes 1 QR standee and 1 NFC card. Extra stickers and standees are available as add-ons.',
  },
  {
    id: 'p4',
    question: 'Can I cancel or change plans anytime?',
    answer:
      'You can change or cancel your paid plan at any time. Access continues through the end of your current billing period.',
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
        question: 'What’s the cheapest way to start?',
        answer:
          'Quick Trial is ₹7 for 7 days. It includes admin panel access, unlimited QR scans, a custom review link, keyword targeting, analytics, and the private feedback gate. Multi-language AI drafts, a QR standee, and an NFC card are not included.',
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
          'Plans are billed per business location. You can run EasyReview for each location on its own plan and track scans, conversions, and private feedback from that location’s dashboard.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing',
    items: [
      {
        id: 'b1',
        question: 'How do I get started?',
        answer:
          'Create your business, download your QR materials, and start collecting reviews in minutes. Quick Trial is ₹7 for 7 days.',
      },
      {
        id: 'b2',
        question: 'What payment methods do you accept?',
        answer:
          'Paid plans support common online payment methods for India. Choose Starter (₹299/month), Growth (₹999/6 months), or Business Pro (₹1,499/year) at checkout.',
      },
    ],
  },
]
