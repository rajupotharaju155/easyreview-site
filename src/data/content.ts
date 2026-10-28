import type {
  AddOnItem,
  CustomerLogo,
  FAQCategory,
  FAQItem,
  HowItWorksStep,
  PricingTier,
  ResultItem,
  StatItem,
  Testimonial,
} from '../types'

export const HERO_HEADLINES = [
  'Turn Every Happy Customer Into a 5-Star Google Review',
  'Your Best Customers Want to Review You — Make It Effortless',
  'Grow Google Ratings With QR Codes. Keep Complaints Private.',
] as const

/** Active headline — swap index when you pick a favorite from HERO_HEADLINES */
export const ACTIVE_HERO_HEADLINE = HERO_HEADLINES[0]

export const results: ResultItem[] = [
  { id: 'businesses', value: '350+', label: 'Small businesses' },
  { id: 'reviews', value: '10,000+', label: 'Reviews generated', productId: 'easy-review' },
  { id: 'menus', value: '270+', label: 'Digital menus live', productId: 'easy-menu' },
  { id: 'cards', value: '200+', label: 'Digital business cards live', productId: 'easy-profile' },
]

export const customerLogos: CustomerLogo[] = [
  {
    id: 'coco-hostel',
    name: 'Coco Hostel',
    src: '/assets/customers/coco-hostel.webp',
    width: 320,
    height: 160,
  },
  {
    id: 'flip-and-drip',
    name: 'Flip & Drip',
    src: '/assets/customers/flip-and-drip.webp',
    width: 162,
    height: 160,
  },
  {
    id: 'waffle-house',
    name: 'Waffle House',
    src: '/assets/customers/waffle-house.webp',
    width: 320,
    height: 107,
  },
  {
    id: 'gujarat-sweets',
    name: 'Gujarat Sweets',
    src: '/assets/customers/gujarat-sweets.webp',
    width: 160,
    height: 160,
  },
  { id: 'kidzee', name: 'Kidzee', src: '/assets/customers/kidzee.webp', width: 320, height: 88 },
  {
    id: 'maya-cafe',
    name: 'Maya Cafe',
    src: '/assets/customers/maya-cafe.webp',
    width: 166,
    height: 160,
  },
  {
    id: 'preetham-luxury-salon',
    name: 'Preetham Luxury Salon',
    src: '/assets/customers/preetham-luxury-salon.webp',
    width: 159,
    height: 160,
  },
  {
    id: 'raghavendra-vegetarian',
    name: 'Raghavendra Vegetarian Restaurant',
    src: '/assets/customers/raghavendra-vegetarian.webp',
    width: 320,
    height: 107,
  },
  {
    id: 'shawarma-house',
    name: 'Shawarma House',
    src: '/assets/customers/shawarma-house.webp',
    width: 240,
    height: 160,
  },
  {
    id: 'ashish-reddy-mess',
    name: 'Ashish Reddy Mess',
    src: '/assets/customers/ashish-reddy-mess.webp',
    width: 240,
    height: 160,
  },
  {
    id: 'divya-salon',
    name: 'Divya Salon',
    src: '/assets/customers/divya-salon.webp',
    width: 143,
    height: 160,
  },
  {
    id: 'vaatsalya-inn',
    name: 'Vaatsalya Inn',
    src: '/assets/customers/vaatsalya-inn.webp',
    width: 248,
    height: 160,
  },
  {
    id: 'johns-club',
    name: 'John’s Club',
    src: '/assets/customers/johns-club.webp',
    width: 320,
    height: 107,
  },
  {
    id: 'streets-of-punjab',
    name: 'Streets of Punjab',
    src: '/assets/customers/streets-of-punjab.webp',
    width: 320,
    height: 160,
  },
  {
    id: 'tri-bite',
    name: 'Tri-Bite',
    src: '/assets/customers/tri-bite.webp',
    width: 320,
    height: 146,
  },
]

// Drafts written for each customer to approve. Replace any quote they change before publishing.
export const testimonials: Testimonial[] = [
  {
    id: 'malhar-patel',
    name: 'Malhar Patel',
    role: 'Proprietor',
    business: 'Gujarat Sweets',
    logoId: 'gujarat-sweets',
    quote:
      'In festival season the counter is packed and nobody has time to type a review. Now customers scan the QR while their box is being packed and post in under a minute. Our Google profile finally shows how busy we really are.',
  },
  {
    id: 'preetham-naidu',
    name: 'Preetham Naidu',
    role: 'Founder',
    business: 'Preetham Luxury Salon',
    logoId: 'preetham-luxury-salon',
    quote:
      'My clients loved the service but never knew what to write. The AI drafts sound like a real client, not a copy-paste line. And when someone isn’t happy, I hear about it privately and can call them the same day.',
  },
  {
    id: 'gurdeep-singh',
    name: 'Gurdeep Singh',
    role: 'Owner',
    business: 'Streets of Punjab',
    logoId: 'streets-of-punjab',
    quote:
      'We put the standee on every table. Families scan it while they wait for the bill, and the drafts come in the language they’re comfortable with, so even our older guests leave reviews now.',
  },
  {
    id: 'naman-bhandari',
    name: 'Naman Bhandari',
    role: 'Owner',
    business: 'Hotel Vaatsalya Inn',
    logoId: 'vaatsalya-inn',
    quote:
      'Guests used to promise a review at checkout and forget by the time they reached home. Now they scan at reception before they leave, and the dashboard shows me how many scanned and how many posted.',
  },
  {
    id: 'dayakar',
    name: 'Dayakar',
    role: 'Owner',
    business: 'Mayuri Family Restaurant',
    quote:
      'Setup took a few minutes and I didn’t need anyone’s help. Happy customers go straight to Google, and complaints come to me first, so I can fix the problem while the customer is still here.',
  },
]

export const stats: StatItem[] = [
  {
    id: 'reviews-check',
    value: '97%',
    description: 'Of consumers read online reviews before choosing a local business.',
  },
  {
    id: 'trust-response',
    value: '35%',
    description: 'More revenue earned by businesses that reply to at least 25% of their reviews.',
  },
  {
    id: 'rating-lift',
    value: '+9%',
    description: 'Revenue increase for every additional star in your average rating.',
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
      { label: 'NFC card', included: false },
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
      { label: 'NFC card', included: false },
    ],
    ctaLabel: 'Choose Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹1,499',
    priceNote: '/6 months',
    originalPrice: '₹1,794',
    perDayCost: '~₹8/day',
    features: [
      'Admin Panel Access',
      'Unlimited QR scans',
      'Custom Review Link',
      'Real-time scan & review analytics',
      'Keyword targeting',
      'Private feedback gate',
      'Multi-language AI drafts',
      '1 QR Standee',
      { label: 'NFC card', included: false },
    ],
    ctaLabel: 'Choose Growth',
  },
  {
    id: 'business-pro',
    name: 'Business Pro',
    price: '₹2,499',
    priceNote: '/year',
    originalPrice: '₹3,588',
    perDayCost: 'Just ₹6.8/day',
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
    highlighted: true,
    badge: 'Best Value',
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
      'Yes. Starter is ₹299/month, Growth is ₹1,499 for 6 months, and Business Pro is ₹2,499/year — each billed per business location.',
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
          'Paid plans support common online payment methods for India. Choose Starter (₹299/month), Growth (₹1,499/6 months), or Business Pro (₹2,499/year) at checkout.',
      },
    ],
  },
  {
    id: 'other-products',
    title: 'Other products',
    items: [
      {
        id: 'o1',
        question: 'What else is in the EasyReview app?',
        answer:
          'The same app includes EasyMenu, a digital menu for restaurants and salons; EasyStory, posters for WhatsApp Status and Instagram Stories; EasyProfile, a digital business card shared by QR or NFC; and EasyCash, for GST invoices and tracking income and expenses.',
      },
      {
        id: 'o2',
        question: 'Does an EasyReview plan cover EasyMenu, EasyStory, EasyProfile, and EasyCash?',
        answer:
          'EasyMenu and EasyStory start at ₹399/month, with 6-month and yearly options. EasyProfile is a one-time NFC card: ₹999 for PVC or ₹1,999 for metal, and the digital card stays active for life. EasyCash is free.',
      },
      {
        id: 'o3',
        question: 'Where do customers see my menu, story, or business card?',
        answer:
          'EasyMenu opens from a menu QR or link. EasyProfile opens from a QR scan or an NFC tap, and visitors can leave a lead. EasyStory posters are yours to post on WhatsApp Status and Instagram Stories.',
      },
    ],
  },
]
