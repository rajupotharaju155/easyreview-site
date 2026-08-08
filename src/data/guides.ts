export type GuideSummary = {
  slug: string
  path: string
  title: string
  description: string
  category: string
  readMinutes: number
  publishedAt: string
  ogImage: string
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
  },
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
