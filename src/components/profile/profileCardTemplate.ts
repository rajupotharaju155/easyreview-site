/**
 * Public card layouts.
 * `portrait` is the large photo with the name beside it.
 * `classic` is the smaller photo with the name underneath.
 */
export const PROFILE_CARD_TEMPLATES = ['portrait', 'classic'] as const

export type ProfileCardTemplate = (typeof PROFILE_CARD_TEMPLATES)[number]

export const DEFAULT_PROFILE_CARD_TEMPLATE: ProfileCardTemplate = 'portrait'

export function resolveProfileCardTemplate(
  value: string | null | undefined,
): ProfileCardTemplate {
  if (value === 'classic' || value === 'portrait') return value
  return DEFAULT_PROFILE_CARD_TEMPLATE
}
