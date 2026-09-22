import { Globe, Link as LinkIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import type { ProfileLinkType } from '../api/types'

/** Icon component that can render either a Lucide SVG or an <img> tag. */
export type LucideLikeIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string }
>

export type ProfileLinkPreset = {
  type: ProfileLinkType
  label: string
  /**
   * Brand icons come from `/public/assets/social-icons/*.svg`.
   * Non-brand link types (Website, Custom) fall back to a Lucide icon.
   */
  iconSrc?: string
  icon?: LucideLikeIcon
}

const ASSET_BASE = '/assets/social-icons'

export const PROFILE_LINK_PRESETS: ProfileLinkPreset[] = [
  { type: 'google_business', label: 'Google Business', iconSrc: `${ASSET_BASE}/GoogleMaps.svg` },
  { type: 'website', label: 'Website', icon: Globe },
  { type: 'instagram', label: 'Instagram', iconSrc: `${ASSET_BASE}/Instagram.svg` },
  { type: 'facebook', label: 'Facebook', iconSrc: `${ASSET_BASE}/Facebook.svg` },
  // NOTE: file on disk is `LinkedIN.svg` (case-sensitive).
  { type: 'linkedin', label: 'LinkedIn', iconSrc: `${ASSET_BASE}/LinkedIN.svg` },
  { type: 'youtube', label: 'YouTube', iconSrc: `${ASSET_BASE}/Youtube.svg` },
  { type: 'x', label: 'X', iconSrc: `${ASSET_BASE}/X.svg` },
  { type: 'whatsapp', label: 'WhatsApp', iconSrc: `${ASSET_BASE}/WhatsApp.svg` },
  { type: 'telegram', label: 'Telegram', iconSrc: `${ASSET_BASE}/Telegram.svg` },
  { type: 'tiktok', label: 'TikTok', iconSrc: `${ASSET_BASE}/TikTok.svg` },
  { type: 'snapchat', label: 'Snapchat', iconSrc: `${ASSET_BASE}/Snapchat.svg` },
  { type: 'spotify', label: 'Spotify', iconSrc: `${ASSET_BASE}/Spotify.svg` },
  { type: 'reddit', label: 'Reddit', iconSrc: `${ASSET_BASE}/Reddit.svg` },
  { type: 'twitch', label: 'Twitch', iconSrc: `${ASSET_BASE}/Twitch.svg` },
  { type: 'yelp', label: 'Yelp', iconSrc: `${ASSET_BASE}/Yelp.svg` },
  { type: 'shopify', label: 'Shopify', iconSrc: `${ASSET_BASE}/Shopify.svg` },
  { type: 'zoom', label: 'Zoom', iconSrc: `${ASSET_BASE}/Zoom.svg` },
  { type: 'notion', label: 'Notion', iconSrc: `${ASSET_BASE}/Notion.svg` },
  { type: 'custom', label: 'Custom link', icon: LinkIcon },
]

const PRESET_BY_TYPE: Record<ProfileLinkType, ProfileLinkPreset> =
  PROFILE_LINK_PRESETS.reduce(
    (acc, preset) => {
      acc[preset.type] = preset
      return acc
    },
    {} as Record<ProfileLinkType, ProfileLinkPreset>,
  )

export function profileLinkPreset(type: ProfileLinkType): ProfileLinkPreset {
  return PRESET_BY_TYPE[type] ?? PRESET_BY_TYPE.custom
}

/** Strip non-digits so we can build the `wa.me/{digits}` URL. */
export function normaliseWhatsappNumber(raw: string | null): string | null {
  if (!raw) return null
  const digits = raw.replace(/\D+/g, '')
  return digits.length >= 6 ? digits : null
}

/** Absolute path to the WhatsApp icon (also used by the phone quick-action). */
export const WHATSAPP_ICON_SRC = `${ASSET_BASE}/WhatsApp.svg`
