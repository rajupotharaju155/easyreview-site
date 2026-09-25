import type { FAQItem, HowItWorksStep, PricingTier } from '../types'

export type ProductId = 'easy-review' | 'easy-menu' | 'easy-story' | 'easy-profile'

export interface ProductFeature {
  id: string
  title: string
  description: string
  tags: string[]
}

export interface MarketingProduct {
  id: ProductId
  name: string
  /** One line used in the nav, footer, and homepage cards. */
  tagline: string
  path: string
  seoTitle: string
  seoDescription: string
  heroTitle: string
  heroSubtitle: string
  /** Wide marketing banner. Words inside the file are not page text. */
  heroImage?: string
  heroImageAlt?: string
  /** Standee and phone only, shown beside the page heading. */
  heroHalfImage?: string
  faqs: FAQItem[]
  steps: HowItWorksStep[]
  features: ProductFeature[]
  ctaTitle: string
  ctaSubtitle: string
  ctaNote: string
}

export const marketingProducts: MarketingProduct[] = [
  {
    id: 'easy-review',
    name: 'EasyReview',
    tagline: 'Google reviews, AI drafts, and private feedback.',
    path: '/',
    seoTitle: 'EasyReview — Turn Happy Customers Into 5-Star Google Reviews',
    seoDescription:
      'EasyReview helps local businesses convert foot traffic into 5-star Google reviews with QR codes, while privately capturing negative feedback.',
    heroTitle: 'Turn happy visits into Google reviews',
    heroSubtitle:
      'Customers scan a QR, happy guests get an AI draft to post, and unhappy guests send private feedback.',
    heroImage: '/assets/hero/easy-review-hero-image.png',
    heroImageAlt:
      'EasyReview banner with a review QR standee and a phone showing AI-written Google review drafts.',
    faqs: [],
    steps: [],
    features: [],
    ctaTitle: 'Start Growing Your Google Reviews Today',
    ctaSubtitle:
      'Create your business profile, download QR materials, and start collecting five-star reviews in under two minutes.',
    ctaNote: 'Instant setup · Quick Trial from ₹7 · Upgrade anytime',
  },
  {
    id: 'easy-menu',
    name: 'EasyMenu',
    tagline: 'A digital menu for restaurants and salons.',
    path: '/products/easy-menu',
    seoTitle: 'Digital Menu QR Code for Restaurants and Salons — EasyMenu',
    seoDescription:
      'Create a digital menu for a restaurant or salon and share it with a QR code. Add dishes or services, photos, combos, and today’s special. Guests open it in the browser.',
    heroTitle: 'Digital menu QR code for restaurants and salons',
    heroSubtitle:
      'Build a restaurant or salon menu, mark today’s special, and put a QR on the table. Sold-out items disappear from the guest menu as soon as you hide them.',
    heroImage: '/assets/hero/easy-menu-hero-image.png',
    heroHalfImage: '/assets/hero/easy-menu-half-hero-image.png',
    heroImageAlt:
      'EasyMenu table standee with a menu QR code, next to a phone showing a digital restaurant menu.',
    faqs: [
      {
        id: 'menu-1',
        question: 'Can a salon use EasyMenu, or is it only for restaurants?',
        answer:
          'Both. Restaurants list dishes. Salons list services such as hair, facials, and packages. Combos become packages on a salon menu.',
      },
      {
        id: 'menu-2',
        question: 'Do guests need an app to open the menu?',
        answer:
          'No. They scan the menu QR or open the menu link. The menu loads in the phone browser.',
      },
      {
        id: 'menu-3',
        question: 'What happens when a dish is sold out?',
        answer:
          'Hide the item in EasyMenu. It leaves the guest menu immediately, including combos and today’s special.',
      },
      {
        id: 'menu-4',
        question: 'Is EasyMenu part of an EasyReview plan?',
        answer:
          'EasyMenu has its own plan, starting at ₹399/month. You can subscribe to it from the same EasyReview account.',
      },
    ],
    steps: [
      {
        id: 'build',
        step: '01',
        title: 'Build the menu',
        description:
          'Add categories, dishes or services, photos, prices, combos, and today’s special. Salon menus use a service layout.',
      },
      {
        id: 'share',
        step: '02',
        title: 'Share the QR',
        description:
          'Place the menu QR on a table, counter, or reception. Guests open the menu in the browser. No app download.',
      },
      {
        id: 'update',
        step: '03',
        title: 'Update it live',
        description:
          'Change a price or hide a sold-out dish. The guest menu updates immediately, including combos and today’s special.',
      },
    ],
    features: [
      {
        id: 'layout',
        title: 'Restaurant or salon layout',
        description:
          'Restaurants list dishes. Salons list services such as hair, facials, and packages, with the same editor.',
        tags: ['Dishes', 'Services'],
      },
      {
        id: 'photos',
        title: 'Photos and prices',
        description:
          'Each item can carry a photo, a short description, and half or full prices where you need them.',
        tags: ['Item photos', 'Half / full'],
      },
      {
        id: 'combos',
        title: 'Combos and today’s special',
        description:
          'Bundle dishes or services into a combo, then feature what you want guests to notice first.',
        tags: ['Combos', 'Specials'],
      },
      {
        id: 'qr',
        title: 'Menu QR and custom link',
        description:
          'Every menu has its own link and QR. Plans include printed standees so the code can sit on the table.',
        tags: ['QR code', 'Custom link'],
      },
    ],
    ctaTitle: 'Put your menu on a QR',
    ctaSubtitle:
      'Create your menu in the EasyReview app, then share the link or print the QR for tables and reception.',
    ctaNote: 'Plans from ₹399/month · Billed separately from EasyReview',
  },
  {
    id: 'easy-story',
    name: 'EasyStory',
    tagline: 'Posters for WhatsApp Status and Instagram Stories.',
    path: '/products/easy-story',
    seoTitle: 'WhatsApp Status and Instagram Story Posters — EasyStory',
    seoDescription:
      'Create 9:16 story posters for WhatsApp Status and Instagram Stories. Pick a festival, sale, new service, or opening hours, then download the poster and post it.',
    heroTitle: 'Story posters for WhatsApp Status and Instagram',
    heroSubtitle:
      'Pick what the poster is for, choose a mood, and add the offer. EasyStory makes a 9:16 image you can post on WhatsApp Status or Instagram Stories.',
    heroImage: '/assets/hero/easy-story-hero-image.png',
    heroHalfImage: '/assets/hero/easy-story-half-hero-image.png',
    heroImageAlt:
      'EasyStory on a laptop and phone, with sample story posters for a sale, food, fitness, and a salon offer.',
    faqs: [
      {
        id: 'story-1',
        question: 'Where do I post an EasyStory poster?',
        answer:
          'Download the poster and share it on WhatsApp Status or Instagram Stories. EasyStory does not publish it for you.',
      },
      {
        id: 'story-2',
        question: 'What can the poster say?',
        answer:
          'A festival sale, an everyday offer, a new service, opening hours, a call or WhatsApp button, or your own line. Offers can be percent off, a flat rupee discount, buy one get one, or a free add-on.',
      },
      {
        id: 'story-3',
        question: 'What size is the poster?',
        answer: 'Posters are 9:16, the vertical size WhatsApp Status and Instagram Stories use.',
      },
      {
        id: 'story-4',
        question: 'Is EasyStory part of an EasyReview plan?',
        answer:
          'EasyStory has its own plan, starting at ₹399/month. You can subscribe to it from the same EasyReview account.',
      },
    ],
    steps: [
      {
        id: 'occasion',
        step: '01',
        title: 'Pick the occasion',
        description:
          'Festival sale, everyday offer, new service, opening hours, a call to action, or your own line.',
      },
      {
        id: 'mood',
        step: '02',
        title: 'Choose a mood',
        description:
          'Select a look, then add the offer: percent off, flat rupees off, buy one get one, or a free add-on.',
      },
      {
        id: 'share',
        step: '03',
        title: 'Post the story',
        description:
          'Download the poster and share it on WhatsApp Status or Instagram Stories. Guests see it in the apps they already open.',
      },
    ],
    features: [
      {
        id: 'occasions',
        title: 'Festivals and everyday offers',
        description:
          'Diwali, Holi, Eid, Christmas, Ugadi, Onam, and other festival sales, plus everyday discounts and new services.',
        tags: ['Festival sale', 'New service'],
      },
      {
        id: 'offers',
        title: 'Offers guests can read at a glance',
        description:
          'Percent off, a flat rupee discount, buy one get one, or a free add-on, scoped to everything or to selected items.',
        tags: ['% off', 'Buy 1 get 1'],
      },
      {
        id: 'hours',
        title: 'Hours and calls to action',
        description:
          'Post open-now, holiday hours, or a direct “Call now” and “WhatsApp us” when you need footfall today.',
        tags: ['Open now', 'Call now'],
      },
      {
        id: 'format',
        title: 'Made for Status and Stories',
        description:
          'Posters are 9:16, the size WhatsApp Status and Instagram Stories expect, with your business name on the design.',
        tags: ['9:16', 'WhatsApp', 'Instagram'],
      },
    ],
    ctaTitle: 'Make this week’s story',
    ctaSubtitle:
      'Open EasyStory in the EasyReview app, pick a mood, and download a poster you can post today.',
    ctaNote: 'Plans from ₹399/month · Billed separately from EasyReview',
  },
  {
    id: 'easy-profile',
    name: 'EasyProfile',
    tagline: 'A digital business card, shared by QR or NFC.',
    path: '/products/easy-profile',
    seoTitle: 'Digital Business Card with QR Code and NFC — EasyProfile',
    seoDescription:
      'Share a digital business card with a QR code or an NFC tap. Visitors open your photo, phone, and links in the browser, save your contact, or leave a lead.',
    heroTitle: 'Digital business card with a QR code and NFC',
    heroSubtitle:
      'Share your name, photo, phone, and links from one public card. People open it with a QR scan or an NFC tap, save the contact, or leave their details.',
    heroImage: '/assets/hero/easy-profile-hero-image.png',
    heroHalfImage: '/assets/hero/easy-profile-half-hero-image.png',
    heroImageAlt:
      'EasyProfile NFC card with a QR code, next to a phone showing a digital business card with call, WhatsApp, and social links.',
    faqs: [
      {
        id: 'profile-1',
        question: 'How does someone open my EasyProfile card?',
        answer:
          'They scan the profile QR or tap an NFC card. The same public page opens in the browser. You can also send the link.',
      },
      {
        id: 'profile-2',
        question: 'Can a visitor save my phone number?',
        answer:
          'Yes. The card can download a contact file with your number, so they do not have to type it from a paper card.',
      },
      {
        id: 'profile-3',
        question: 'What is a lead on EasyProfile?',
        answer:
          'When someone wants a follow-up, they leave a name, phone, and a note on the card. You read those leads in the EasyProfile tab.',
      },
      {
        id: 'profile-4',
        question: 'Is EasyProfile part of an EasyReview plan?',
        answer:
          'Buy an NFC card once. A PVC card is ₹999 and a metal card is ₹1,999. The digital card stays active for life.',
      },
    ],
    steps: [
      {
        id: 'create',
        step: '01',
        title: 'Create the card',
        description:
          'Add your name, photo, phone, email, and the links you want people to tap — WhatsApp, Instagram, maps, and more.',
      },
      {
        id: 'share',
        step: '02',
        title: 'Share the QR or NFC tap',
        description:
          'The card has its own link and QR. An NFC tap opens the same page, so a printed card or standee can hand it over.',
      },
      {
        id: 'leads',
        step: '03',
        title: 'Collect the follow-up',
        description:
          'Visitors can save your contact or leave their name and number. Leads show up in the EasyProfile tab.',
      },
    ],
    features: [
      {
        id: 'card',
        title: 'Public profile card',
        description:
          'One page with your photo, contact details, and links. Guests open it in the browser.',
        tags: ['Photo', 'Links'],
      },
      {
        id: 'share',
        title: 'QR and NFC',
        description:
          'The same card opens from a QR scan or an NFC tap. Print it on a card or keep the link in your phone.',
        tags: ['QR code', 'NFC tap'],
      },
      {
        id: 'save',
        title: 'Save to contacts',
        description:
          'Visitors can download a contact card and keep your number, instead of typing it from a paper card.',
        tags: ['vCard'],
      },
      {
        id: 'leads',
        title: 'Lead capture',
        description:
          'When someone wants a follow-up, they leave a name, phone, and a note. You read it in the Leads tab.',
        tags: ['Name', 'Phone'],
      },
    ],
    ctaTitle: 'Share your card from a tap',
    ctaSubtitle:
      'Create an EasyProfile card in the EasyReview app, then hand it over with a QR or an NFC tap.',
    ctaNote: 'PVC card ₹999 · Metal card ₹1,999 · Lifetime access',
  },
]

const menuFeatures: PricingTier['features'] = [
  'Admin Panel Access',
  'Digital menu page',
  'Categories and items',
  'Item photos',
  'Menu QR code',
  'Restaurant or salon layout',
  'Custom Menu Link',
  '3 QR standees',
  'Real-time menu updates',
  'Priority WhatsApp support',
]

const storyFeatures: PricingTier['features'] = [
  'Admin Panel Access',
  'WhatsApp and Instagram story posters',
  'Generate story',
  'Priority WhatsApp support',
]

const profileCardFeatures = [
  'Lifetime digital card',
  'Public profile card',
  'Profile QR and link',
  'Lead capture',
  'Admin Panel Access',
]

function moduleTiers(
  productId: Exclude<ProductId, 'easy-review'>,
  features: PricingTier['features'],
): PricingTier[] {
  return [
    {
      id: `${productId}-starter`,
      name: 'Starter',
      price: '₹399',
      priceNote: '/month',
      perDayCost: '~₹13/day',
      features,
      ctaLabel: 'Choose Starter',
    },
    {
      id: `${productId}-growth`,
      name: 'Growth',
      price: '₹1,999',
      priceNote: '/6 months',
      originalPrice: '₹2,394',
      perDayCost: '~₹11/day',
      features,
      ctaLabel: 'Choose Growth',
    },
    {
      id: `${productId}-pro`,
      name: 'Pro',
      price: '₹3,499',
      priceNote: '/year',
      originalPrice: '₹4,788',
      perDayCost: '~₹9.6/day',
      features,
      ctaLabel: 'Choose Pro',
      highlighted: true,
      badge: 'Best Value',
    },
  ]
}

/** Plans for products other than EasyReview. EasyReview tiers stay in content.ts. */
export const modulePricingTiers: Record<Exclude<ProductId, 'easy-review'>, PricingTier[]> = {
  'easy-menu': moduleTiers('easy-menu', menuFeatures),
  'easy-story': moduleTiers('easy-story', storyFeatures),
  'easy-profile': [
    {
      id: 'easy-profile-pvc',
      name: 'PVC card',
      price: '₹999',
      priceNote: 'one time',
      perDayCost: 'Lifetime access',
      features: [...profileCardFeatures, '1 PVC NFC card'],
      ctaLabel: 'Choose PVC card',
    },
    {
      id: 'easy-profile-metal',
      name: 'Metal card',
      price: '₹1,999',
      priceNote: 'one time',
      perDayCost: 'Lifetime access',
      features: [...profileCardFeatures, '1 Metal NFC card'],
      ctaLabel: 'Choose Metal card',
      highlighted: true,
    },
  ],
}

export function getMarketingProduct(id: ProductId): MarketingProduct {
  const product = marketingProducts.find((item) => item.id === id)
  if (!product) {
    throw new Error(`Unknown product: ${id}`)
  }
  return product
}

export function isProductId(value: string | null): value is ProductId {
  return marketingProducts.some((product) => product.id === value)
}

/** Products with their own marketing page. EasyReview stays on the homepage. */
export const suiteProducts = marketingProducts.filter((product) => product.id !== 'easy-review')
