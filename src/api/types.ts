/** Business-configured question shown before generating review drafts. */
export interface AiQuestion {
  question: string
  options: string[]
  multiSelect?: boolean
}

export interface PublicLocation {
  id: string
  name: string
  placeId: string
  slug: string
  city: string | null
  state: string | null
  primaryTypeDisplayName: string | null
  keywords: string[] | null
  languages: string[] | null
  questions: AiQuestion[] | null
}

export interface ReviewAnswer {
  question: string
  answers: string[]
}

export interface SuggestReviewsPayload {
  locationId: string
  starRating: number
  name: string
  primaryTypeDisplayName?: string
  answers?: ReviewAnswer[]
}

export interface ReviewSuggestion {
  text: string
  language: string
}

export interface ReviewSuggestionsResponse {
  suggestions: ReviewSuggestion[]
}

export interface CreatePrivateFeedbackPayload {
  locationId: string
  rating: number
  feedback: string
}

export interface PrivateFeedback {
  id: string
  locationId: string
  rating: number
  feedback: string
  createdAt: string
  updatedAt: string
}

/** Public claimable QR resolve payload. */
export interface PublicQrCode {
  code: string
  targetUrl: string | null
}

export type MenuStyle = 'restaurantStyle' | 'salonStyle'

export type MenuPriceType = 'fixed' | 'onwards' | 'free'

export interface PublicMenuItem {
  id: string
  locationId: string
  categoryId: string
  name: string
  description: string | null
  isNonVeg: boolean
  imageUrl: string | null
  isHalfServed: boolean
  halfPrice: number | null
  fullPrice: number | null
  priceType: MenuPriceType
  isMultiPriced: boolean
  variantPrices: PublicMenuItemVariantPrice[]
  sortOrder: number
}

export interface PublicMenuPriceVariant {
  id: string
  name: string
  sortOrder: number
}

export interface PublicMenuItemVariantPrice {
  variantId: string
  price: number
}

export interface PublicMenuCategory {
  id: string
  locationId: string
  name: string
  sortOrder: number
  priceVariants: PublicMenuPriceVariant[]
  items: PublicMenuItem[]
}

export interface PublicMenuCombo {
  id: string
  locationId: string
  name: string
  sortOrder: number
  itemIds: string[]
  items: PublicMenuItem[]
  itemsSubtotal: number
  priceOverride: number | null
  price: number
  savings: number
}

export interface PublicMenuSpecial {
  id: string
  locationId: string
  menuItemId: string
  sortOrder: number
  item: PublicMenuItem
}

export interface PublicMenu {
  location: {
    id: string
    name: string
    slug: string | null
    city: string | null
    state: string | null
    phoneNumber: string | null
    formattedAddress: string | null
    menuStyle: MenuStyle
  }
  categories: PublicMenuCategory[]
  combos: PublicMenuCombo[]
  specials: PublicMenuSpecial[]
}

export type SubmittedFrom = 'app' | 'site'

export interface ContactMessage {
  id: string
  name: string
  email: string
  countryCode: string
  phone: string
  message: string
  submittedFrom: SubmittedFrom
  userId: string | null
  createdAt: string
  updatedAt: string
}

export type CreateContactMessagePayload = {
  name: string
  email: string
  countryCode: string
  phone: string
  message: string
  submittedFrom: SubmittedFrom
}

export interface ApiErrorBody {
  message?: string | string[]
  statusCode?: number
  error?: string
}

export type ProfileLinkType =
  | 'google_business'
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'linkedin'
  | 'youtube'
  | 'whatsapp'
  | 'telegram'
  | 'tiktok'
  | 'snapchat'
  | 'spotify'
  | 'reddit'
  | 'twitch'
  | 'yelp'
  | 'shopify'
  | 'zoom'
  | 'notion'
  | 'website'
  | 'custom'

export interface PublicProfileLink {
  id: string
  type: ProfileLinkType
  label: string
  url: string
}

export interface PublicProfile {
  id: string
  slug: string
  displayName: string
  designation: string | null
  companyName: string | null
  bio: string | null
  phone: string | null
  whatsappPhone: string | null
  email: string | null
  coverImageUrl: string | null
  profileImageUrl: string | null
  /** `portrait` (default) or `classic`. Missing values render as Portrait. */
  cardTemplate?: 'portrait' | 'classic' | null
  links: PublicProfileLink[]
}

export interface CreateProfileLeadPayload {
  name: string
  phone: string
  email?: string
  companyName?: string
  note?: string
}

export interface ProfileLead {
  id: string
  profileId: string
  name: string
  phone: string
  email: string | null
  companyName: string | null
  note: string | null
  createdAt: string
}
