export type GuideSummary = {
  slug: string
  path: string
  title: string
  description: string
  category: string
  readMinutes: number
  publishedAt: string
  ogImage: string
  /** Landscape image shown on the /guides index */
  coverImage: string
  coverImageAlt: string
}

export const guides: GuideSummary[] = [
  {
    slug: 'restaurant-qr-code-google-reviews',
    path: '/guides/restaurant-qr-code-google-reviews',
    title: 'The QR Code Trick Restaurants Use to Get 5-Star Google Reviews',
    description:
      'Guests enjoy the meal and leave — then forget to review. Here’s a simple QR code method restaurants use to get more Google reviews, without awkward asking or public 1-star surprises.',
    category: 'Restaurants',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/restaurant/easyreview-og-blog-qr-code-trick-restaurants-1200x630.png',
    coverImage: '/assets/blogs/restaurant/restaurant-food-top-view-landscape.jpg',
    coverImageAlt: 'Restaurant food plated for dining guests',
  },
  {
    slug: 'how-hotels-can-win-google-reviews',
    path: '/guides/how-hotels-can-win-google-reviews',
    title: 'How Hotels Can Win More 5-Star Reviews Before Guests Leave',
    description:
      'Hotel guests check out and disappear. Here’s a simple QR method that captures Google reviews before they leave — while keeping complaints private.',
    category: 'Hotels',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/hotel/easyreview-og-blog-hotels-5star-reviews-1200x630.png',
    coverImage: '/assets/blogs/hotel/hotel-room-landscape.jpg',
    coverImageAlt: 'Hotel guest room ready for checkout',
  },
  {
    slug: 'turn-members-into-5-star-google-review',
    path: '/guides/turn-members-into-5-star-google-review',
    title: 'How to Turn Happy Members Into 5-Star Google Reviews for Your Gym',
    description:
      'Members finish a good workout and leave without reviewing. Here’s a simple QR method gyms use to get more Google reviews — without awkward asks or public 1-stars.',
    category: 'Gyms',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/gym/easyreview-og-blog-gyms-5star-reviews-1200x630.png',
    coverImage: '/assets/blogs/gym/gym-ambience-landscape.jpg',
    coverImageAlt: 'Gym floor after a workout',
  },
  {
    slug: 'easiest-way-salons-collect-google-reviews',
    path: '/guides/easiest-way-salons-collect-google-reviews',
    title: 'The Easiest Way for Salons to Collect Reviews After Every Appointment',
    description:
      'Clients look great after a haircut or spa visit — then leave without reviewing. Here’s a simple QR method salons use to collect Google reviews after every appointment.',
    category: 'Salons',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/salon/easyreview-og-blog-salons-collect-reviews-1200x630.png',
    coverImage: '/assets/blogs/salon/saloon-shop-landscape.jpg',
    coverImageAlt: 'Salon interior after a client appointment',
  },
  {
    slug: 'dental-practices-5-star-google-reviews',
    path: '/guides/dental-practices-5-star-google-reviews',
    title: 'How Dental Practices Can Get More 5-Star Google Reviews',
    description:
      'Patients leave after treatment and forget to review. Here’s a simple QR method dental clinics use to get more Google reviews — while keeping sensitive feedback private.',
    category: 'Dentists',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/dentist/easyreview-og-blog-dentists-5star-reviews-1200x630.png',
    coverImage: '/assets/blogs/dentist/dentist-office-landscape.jpg',
    coverImageAlt: 'Dental clinic treatment room',
  },
  {
    slug: 'mobile-laptop-repair-google-reviews',
    path: '/guides/mobile-laptop-repair-google-reviews',
    title: 'How Mobile & Laptop Repair Shops Can Win More 5-Star Reviews',
    description:
      'Customers pick up a fixed phone or laptop and leave without reviewing. Here’s a simple QR method repair shops use to get more Google reviews — without awkward asks or public 1-stars.',
    category: 'Repair shops',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/mobile-laptop-repairing/easyreview-og-blog-repair-shops-5star-reviews-1200x630.png',
    coverImage: '/assets/blogs/mobile-laptop-repairing/mobile-repairing-landscape.jpg',
    coverImageAlt: 'Mobile repair workbench after a successful fix',
  },
  {
    slug: 'spa-wellness-google-reviews',
    path: '/guides/spa-wellness-google-reviews',
    title: 'Spa & Wellness Reviews: A Simple System to Get More 5-Star Ratings',
    description:
      'Clients leave a spa feeling calm — then forget to review. Here’s a simple QR method spas and wellness centres use to get more Google reviews after every treatment.',
    category: 'Spa & wellness',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/spa-wellness/easyreview-og-blog-spa-wellness-5star-reviews-1200x630.png',
    coverImage: '/assets/blogs/spa-wellness/spa-lady-landscape.jpg',
    coverImageAlt: 'Spa guest during a wellness treatment',
  },
  {
    slug: 'real-estate-5-star-google-reviews',
    path: '/guides/real-estate-5-star-google-reviews',
    title: 'How to Turn Happy Clients Into 5-Star Google Reviews for Your Real Estate Business',
    description:
      'Deals close and clients move on without reviewing. Here’s a simple QR method real estate agents use to get more Google reviews — at handover, without awkward asks.',
    category: 'Real estate',
    readMinutes: 6,
    publishedAt: '2026-08-08',
    ogImage: '/assets/blogs/real-estate/easyreview-og-blog-real-estate-5star-reviews-1200x630.png',
    coverImage: '/assets/blogs/real-estate/real-estate-agent-home-landscape.jpg',
    coverImageAlt: 'Real estate agent showing a home to clients',
  },
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
