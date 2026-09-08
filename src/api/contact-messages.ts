import { apiPost } from './client'
import type { ContactMessage, CreateContactMessagePayload } from './types'

export function createContactMessage(
  payload: Omit<CreateContactMessagePayload, 'submittedFrom'>,
): Promise<ContactMessage> {
  return apiPost<ContactMessage>('/contact-messages', {
    ...payload,
    submittedFrom: 'site',
  })
}
