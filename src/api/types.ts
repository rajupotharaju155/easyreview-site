export interface PublicLocation {
  name: string
  placeId: string
  slug: string
  city: string | null
  state: string | null
  keywords: string[] | null
  languages: string[] | null
}

export interface ApiErrorBody {
  message?: string | string[]
  statusCode?: number
  error?: string
}
