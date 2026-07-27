import { apiPost } from './client'
import type { CreatePrivateFeedbackPayload, PrivateFeedback } from './types'

export function createPrivateFeedback(
  payload: CreatePrivateFeedbackPayload,
): Promise<PrivateFeedback> {
  return apiPost<PrivateFeedback>('/private-feedback', payload)
}
