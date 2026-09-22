import { apiGet, apiPost } from './client'
import type {
  CreateProfileLeadPayload,
  ProfileLead,
  PublicProfile,
} from './types'

export function getProfileBySlug(slug: string): Promise<PublicProfile> {
  return apiGet<PublicProfile>(`/profiles/${encodeURIComponent(slug)}`)
}

export function submitProfileLead(
  slug: string,
  payload: CreateProfileLeadPayload,
): Promise<ProfileLead> {
  return apiPost<ProfileLead>(
    `/profiles/${encodeURIComponent(slug)}/leads`,
    payload,
  )
}
