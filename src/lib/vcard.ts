import type { PublicProfile } from '../api/types'

/**
 * Backslashes and commas in vCard values must be escaped, and each raw
 * newline becomes a literal `\n` sequence in the exported file.
 */
function vcEscape(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

function guessWebsite(profile: PublicProfile): string | null {
  const website = profile.links.find((link) => link.type === 'website')
  if (website) return website.url
  return null
}

export function buildProfileVCard(profile: PublicProfile): string {
  const rows: string[] = ['BEGIN:VCARD', 'VERSION:3.0']

  const name = vcEscape(profile.displayName)
  rows.push(`FN:${name}`)
  rows.push(`N:${name};;;;`)

  if (profile.companyName) {
    const org = vcEscape(profile.companyName)
    rows.push(`ORG:${org}`)
  }
  if (profile.designation) {
    rows.push(`TITLE:${vcEscape(profile.designation)}`)
  }
  if (profile.phone) {
    rows.push(`TEL;TYPE=CELL,VOICE:${vcEscape(profile.phone)}`)
  }
  if (profile.whatsappPhone && profile.whatsappPhone !== profile.phone) {
    rows.push(`TEL;TYPE=CELL:${vcEscape(profile.whatsappPhone)}`)
  }
  if (profile.email) {
    rows.push(`EMAIL;TYPE=INTERNET:${vcEscape(profile.email)}`)
  }
  const website = guessWebsite(profile)
  if (website) {
    rows.push(`URL:${vcEscape(website)}`)
  }
  if (profile.bio) {
    rows.push(`NOTE:${vcEscape(profile.bio)}`)
  }

  rows.push('END:VCARD')
  return `${rows.join('\r\n')}\r\n`
}

/** Trigger a .vcf download in the browser from the given profile. */
export function downloadProfileVCard(profile: PublicProfile): void {
  const contents = buildProfileVCard(profile)
  const blob = new Blob([contents], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${profile.slug || 'contact'}.vcf`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  // Delay the revoke so mobile Safari has time to hand the blob to the OS.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
