export interface PublicLocation {
  id: string
  name: string
  placeId: string
  slug: string
  city: string | null
  state: string | null
  keywords: string[] | null
  languages: string[] | null
}

export interface SuggestReviewsPayload {
  locationId: string
  starRating: number
  name: string
  city?: string
  state?: string
  keywords: string[]
  languages: string[]
}

export interface ReviewSuggestion {
  text: string
  language: string
  targetWordCount: number
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

export interface ApiErrorBody {
  message?: string | string[]
  statusCode?: number
  error?: string
}
