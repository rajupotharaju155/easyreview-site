import { Link as LinkIcon } from 'lucide-react'
import type { ProfileLinkType } from '../../api/types'
import { profileLinkPreset } from '../../lib/profileLinks'

/**
 * Uniform icon for a profile link. Brand marks are served as static SVG
 * assets from `/public/assets/social-icons/*.svg`; non-brand link types
 * (Website, Custom) fall back to a Lucide component.
 */
export function ProfileLinkIcon({
  type,
  className,
}: {
  type: ProfileLinkType
  className?: string
}) {
  const preset = profileLinkPreset(type)
  if (preset.iconSrc) {
    return (
      <img src={preset.iconSrc} alt="" aria-hidden className={className} />
    )
  }
  const Icon = preset.icon ?? LinkIcon
  return <Icon className={className} aria-hidden />
}
