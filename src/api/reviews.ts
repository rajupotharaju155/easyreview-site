import { apiPost } from './client'
import type { ReviewSuggestionsResponse, SuggestReviewsPayload } from './types'

export function suggestReviews(
  payload: SuggestReviewsPayload,
): Promise<ReviewSuggestionsResponse> {
  return apiPost<ReviewSuggestionsResponse>('/review/suggestions', payload)
}
