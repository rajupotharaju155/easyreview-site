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
  city?: string
  state?: string
  primaryTypeDisplayName?: string
  keywords: string[]
  languages: string[]
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
  fullPrice: number
  sortOrder: number
}

export interface PublicMenuCategory {
  id: string
  locationId: string
  name: string
  sortOrder: number
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
  }
  categories: PublicMenuCategory[]
  combos: PublicMenuCombo[]
  specials: PublicMenuSpecial[]
}

export interface ApiErrorBody {
  message?: string | string[]
  statusCode?: number
  error?: string
}
