export type CountryDialCode = {
  iso: string
  name: string
  dial: string
  aliases?: string[]
}

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { iso: 'IN', name: 'India', dial: '+91' },
  { iso: 'US', name: 'United States', dial: '+1', aliases: ['usa', 'united states of america'] },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971', aliases: ['uae'] },
  { iso: 'GB', name: 'United Kingdom', dial: '+44', aliases: ['uk', 'great britain', 'england'] },
  { iso: 'AU', name: 'Australia', dial: '+61' },
  { iso: 'CA', name: 'Canada', dial: '+1' },
  { iso: 'SG', name: 'Singapore', dial: '+65' },
  { iso: 'MY', name: 'Malaysia', dial: '+60' },
  { iso: 'ID', name: 'Indonesia', dial: '+62' },
  { iso: 'TH', name: 'Thailand', dial: '+66' },
  { iso: 'PH', name: 'Philippines', dial: '+63' },
  { iso: 'VN', name: 'Vietnam', dial: '+84', aliases: ['viet nam'] },
  { iso: 'BD', name: 'Bangladesh', dial: '+880' },
  { iso: 'PK', name: 'Pakistan', dial: '+92' },
  { iso: 'LK', name: 'Sri Lanka', dial: '+94' },
  { iso: 'NP', name: 'Nepal', dial: '+977' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'QA', name: 'Qatar', dial: '+974' },
  { iso: 'KW', name: 'Kuwait', dial: '+965' },
  { iso: 'BH', name: 'Bahrain', dial: '+973' },
  { iso: 'OM', name: 'Oman', dial: '+968' },
  { iso: 'JO', name: 'Jordan', dial: '+962' },
  { iso: 'IL', name: 'Israel', dial: '+972' },
  { iso: 'TR', name: 'Turkey', dial: '+90', aliases: ['türkiye'] },
  { iso: 'EG', name: 'Egypt', dial: '+20' },
  { iso: 'ZA', name: 'South Africa', dial: '+27' },
  { iso: 'NG', name: 'Nigeria', dial: '+234' },
  { iso: 'KE', name: 'Kenya', dial: '+254' },
  { iso: 'GH', name: 'Ghana', dial: '+233' },
  { iso: 'DE', name: 'Germany', dial: '+49' },
  { iso: 'FR', name: 'France', dial: '+33' },
  { iso: 'IT', name: 'Italy', dial: '+39' },
  { iso: 'ES', name: 'Spain', dial: '+34' },
  { iso: 'PT', name: 'Portugal', dial: '+351' },
  { iso: 'NL', name: 'Netherlands', dial: '+31' },
  { iso: 'BE', name: 'Belgium', dial: '+32' },
  { iso: 'CH', name: 'Switzerland', dial: '+41' },
  { iso: 'AT', name: 'Austria', dial: '+43' },
  { iso: 'SE', name: 'Sweden', dial: '+46' },
  { iso: 'NO', name: 'Norway', dial: '+47' },
  { iso: 'DK', name: 'Denmark', dial: '+45' },
  { iso: 'FI', name: 'Finland', dial: '+358' },
  { iso: 'IE', name: 'Ireland', dial: '+353' },
  { iso: 'PL', name: 'Poland', dial: '+48' },
  { iso: 'CZ', name: 'Czech Republic', dial: '+420', aliases: ['czechia'] },
  { iso: 'RO', name: 'Romania', dial: '+40' },
  { iso: 'HU', name: 'Hungary', dial: '+36' },
  { iso: 'GR', name: 'Greece', dial: '+30' },
  { iso: 'RU', name: 'Russia', dial: '+7', aliases: ['russian federation'] },
  { iso: 'UA', name: 'Ukraine', dial: '+380' },
  { iso: 'CN', name: 'China', dial: '+86' },
  { iso: 'JP', name: 'Japan', dial: '+81' },
  { iso: 'KR', name: 'South Korea', dial: '+82', aliases: ['korea', 'republic of korea'] },
  { iso: 'HK', name: 'Hong Kong', dial: '+852' },
  { iso: 'TW', name: 'Taiwan', dial: '+886' },
  { iso: 'NZ', name: 'New Zealand', dial: '+64' },
  { iso: 'MX', name: 'Mexico', dial: '+52' },
  { iso: 'BR', name: 'Brazil', dial: '+55' },
  { iso: 'AR', name: 'Argentina', dial: '+54' },
  { iso: 'CL', name: 'Chile', dial: '+56' },
  { iso: 'CO', name: 'Colombia', dial: '+57' },
  { iso: 'PE', name: 'Peru', dial: '+51' },
  { iso: 'AF', name: 'Afghanistan', dial: '+93' },
  { iso: 'AL', name: 'Albania', dial: '+355' },
  { iso: 'DZ', name: 'Algeria', dial: '+213' },
  { iso: 'AM', name: 'Armenia', dial: '+374' },
  { iso: 'AZ', name: 'Azerbaijan', dial: '+994' },
  { iso: 'BY', name: 'Belarus', dial: '+375' },
  { iso: 'BO', name: 'Bolivia', dial: '+591' },
  { iso: 'BA', name: 'Bosnia and Herzegovina', dial: '+387' },
  { iso: 'BG', name: 'Bulgaria', dial: '+359' },
  { iso: 'KH', name: 'Cambodia', dial: '+855' },
  { iso: 'CM', name: 'Cameroon', dial: '+237' },
  { iso: 'HR', name: 'Croatia', dial: '+385' },
  { iso: 'CY', name: 'Cyprus', dial: '+357' },
  { iso: 'EC', name: 'Ecuador', dial: '+593' },
  { iso: 'EE', name: 'Estonia', dial: '+372' },
  { iso: 'ET', name: 'Ethiopia', dial: '+251' },
  { iso: 'GE', name: 'Georgia', dial: '+995' },
  { iso: 'IS', name: 'Iceland', dial: '+354' },
  { iso: 'IQ', name: 'Iraq', dial: '+964' },
  { iso: 'IR', name: 'Iran', dial: '+98' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '+7' },
  { iso: 'LV', name: 'Latvia', dial: '+371' },
  { iso: 'LB', name: 'Lebanon', dial: '+961' },
  { iso: 'LT', name: 'Lithuania', dial: '+370' },
  { iso: 'LU', name: 'Luxembourg', dial: '+352' },
  { iso: 'MO', name: 'Macau', dial: '+853', aliases: ['macao'] },
  { iso: 'MT', name: 'Malta', dial: '+356' },
  { iso: 'MU', name: 'Mauritius', dial: '+230' },
  { iso: 'MA', name: 'Morocco', dial: '+212' },
  { iso: 'MM', name: 'Myanmar', dial: '+95', aliases: ['burma'] },
]

export const COUNTRY_DIAL_OPTIONS = COUNTRY_DIAL_CODES.map((country) => ({
  value: country.iso,
  label: `${country.name} (${country.dial})`,
  search: `${country.name} ${country.dial} ${country.iso} ${country.aliases?.join(' ') ?? ''}`.toLowerCase(),
}))

const DEFAULT_COUNTRY_ISO = 'IN'

function normalizeCountry(value: string): string {
  return value.trim().toLowerCase()
}

export function countryIsoFromLocationCountry(
  country: string | null | undefined,
): string {
  const value = country ? normalizeCountry(country) : ''
  if (!value) return DEFAULT_COUNTRY_ISO

  const match = COUNTRY_DIAL_CODES.find(
    (item) =>
      normalizeCountry(item.name) === value ||
      normalizeCountry(item.iso) === value ||
      item.aliases?.some((alias) => normalizeCountry(alias) === value),
  )
  return match?.iso ?? DEFAULT_COUNTRY_ISO
}

export function dialCodeForIso(iso: string): string {
  return COUNTRY_DIAL_CODES.find((item) => item.iso === iso)?.dial ?? '+91'
}

export function countryIsoFromDialCode(
  dial: string | null | undefined,
): string {
  const value = dial?.trim()
  if (!value) return DEFAULT_COUNTRY_ISO
  return COUNTRY_DIAL_CODES.find((item) => item.dial === value)?.iso ?? DEFAULT_COUNTRY_ISO
}
