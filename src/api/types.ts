/** Business-configured question shown before generating review drafts. */
export interface AiQuestion {
  question: string
  options: string[]
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
  answer: string
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

export interface ApiErrorBody {
  message?: string | string[]
  statusCode?: number
  error?: string
}
