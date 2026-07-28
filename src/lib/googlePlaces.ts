import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

export interface PlaceSuggestion {
  placeId: string
  mainText: string
  secondaryText: string
  description: string
}

export interface PlaceReviewDetails {
  authorName: string
  authorPhotoURI: string
  authorURI: string
  rating: number | null
  text: string
  originalText: string
  textLanguageCode: string
  originalTextLanguageCode: string
  publishTime: string
  relativePublishTimeDescription: string
  googleMapsURI: string
  flagContentURI: string
  visitDateMonth: number | null
  visitDateYear: number | null
}

export interface PlaceDetails {
  placeId: string
  name: string
  addressLine1: string
  city: string
  state: string
  pincode: string
  country: string
  formattedAddress: string
  phoneNumber: string
  websiteURI: string
  googleMapsURI: string
  rating: number | null
  userRatingCount: number | null
  businessStatus: string
  primaryType: string
  primaryTypeDisplayName: string
  types: string[]
  reviews: PlaceReviewDetails[]
}

let placesReady: Promise<google.maps.PlacesLibrary> | null = null
let sessionToken: google.maps.places.AutocompleteSessionToken | null = null

function getApiKey(): string {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  if (!key) {
    throw new Error('VITE_GOOGLE_MAPS_API_KEY is not configured')
  }
  return key
}

async function getPlacesLibrary(): Promise<google.maps.PlacesLibrary> {
  if (!placesReady) {
    setOptions({
      key: getApiKey(),
      v: 'weekly',
    })
    placesReady = importLibrary('places')
  }
  return placesReady
}

async function getSessionToken(): Promise<google.maps.places.AutocompleteSessionToken> {
  const places = await getPlacesLibrary()
  if (!sessionToken) {
    sessionToken = new places.AutocompleteSessionToken()
  }
  return sessionToken
}

export function resetPlacesSession(): void {
  sessionToken = null
}

function componentText(
  components: google.maps.places.AddressComponent[] | undefined,
  ...types: string[]
): string {
  if (!components) return ''
  const match = components.find((component) =>
    types.some((type) => component.types.includes(type)),
  )
  return match?.longText?.trim() || match?.shortText?.trim() || ''
}

function buildAddressLine1(
  components: google.maps.places.AddressComponent[] | undefined,
  formattedAddress: string,
): string {
  const streetNumber = componentText(components, 'street_number')
  const route = componentText(components, 'route')
  const premise = componentText(components, 'premise', 'subpremise')
  const street = [streetNumber, route].filter(Boolean).join(' ').trim()

  if (street) {
    return premise ? `${premise}, ${street}` : street
  }

  if (premise) return premise

  return formattedAddress.split(',')[0]?.trim() || formattedAddress
}

function mapReviews(reviews: google.maps.places.Review[] | undefined): PlaceReviewDetails[] {
  if (!reviews?.length) return []

  return reviews.map((review) => ({
    authorName: review.authorAttribution?.displayName?.trim() || 'Anonymous',
    authorPhotoURI: review.authorAttribution?.photoURI?.trim() || '',
    authorURI: review.authorAttribution?.uri?.trim() || '',
    rating: typeof review.rating === 'number' ? review.rating : null,
    text: review.text?.trim() || '',
    originalText: review.originalText?.trim() || '',
    textLanguageCode: review.textLanguageCode?.trim() || '',
    originalTextLanguageCode: review.originalTextLanguageCode?.trim() || '',
    publishTime: review.publishTime ? review.publishTime.toISOString() : '',
    relativePublishTimeDescription: review.relativePublishTimeDescription?.trim() || '',
    googleMapsURI: review.googleMapsURI?.trim() || '',
    flagContentURI: review.flagContentURI?.trim() || '',
    visitDateMonth: typeof review.visitDateMonth === 'number' ? review.visitDateMonth : null,
    visitDateYear: typeof review.visitDateYear === 'number' ? review.visitDateYear : null,
  }))
}

export async function fetchPlaceSuggestions(input: string): Promise<PlaceSuggestion[]> {
  const query = input.trim()
  if (query.length < 2) return []

  const places = await getPlacesLibrary()
  const token = await getSessionToken()

  const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input: query,
    sessionToken: token,
    includedPrimaryTypes: ['establishment'],
  })

  return suggestions
    .map((suggestion) => suggestion.placePrediction)
    .filter((prediction): prediction is google.maps.places.PlacePrediction => Boolean(prediction))
    .map((prediction) => ({
      placeId: prediction.placeId,
      mainText: prediction.mainText?.text ?? prediction.text.text,
      secondaryText: prediction.secondaryText?.text ?? '',
      description: prediction.text.text,
    }))
}

export interface TextSearchPlaceResult {
  placeId: string
  name: string
  formattedAddress: string
  rating: number | null
  userRatingCount: number | null
  primaryTypeDisplayName: string
  businessStatus: string
}

/**
 * Text Search (New) via Place.searchByText — e.g. "salons in Mumbai".
 */
export async function searchPlacesByText(
  textQuery: string,
  options: { excludePlaceIds?: string[]; maxResultCount?: number } = {},
): Promise<TextSearchPlaceResult[]> {
  const query = textQuery.trim()
  if (query.length < 2) return []

  const placesLib = await getPlacesLibrary()
  const exclude = new Set(options.excludePlaceIds ?? [])
  const maxResultCount = Math.min(Math.max(options.maxResultCount ?? 12, 1), 20)

  const { places } = await placesLib.Place.searchByText({
    textQuery: query,
    fields: [
      'id',
      'displayName',
      'formattedAddress',
      'rating',
      'userRatingCount',
      'primaryTypeDisplayName',
      'businessStatus',
    ],
    maxResultCount,
  })

  return places
    .map((place) => {
      const placeId = place.id?.trim() || ''
      if (!placeId || exclude.has(placeId)) return null

      return {
        placeId,
        name: place.displayName?.trim() || 'Unnamed place',
        formattedAddress: place.formattedAddress?.trim() || '',
        rating: typeof place.rating === 'number' ? place.rating : null,
        userRatingCount: typeof place.userRatingCount === 'number' ? place.userRatingCount : null,
        primaryTypeDisplayName: place.primaryTypeDisplayName?.trim() || '',
        businessStatus: place.businessStatus?.toString() || '',
      } satisfies TextSearchPlaceResult
    })
    .filter((place): place is TextSearchPlaceResult => place != null)
}

export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const places = await getPlacesLibrary()
  const place = new places.Place({ id: placeId })

  await place.fetchFields({
    fields: [
      'id',
      'displayName',
      'formattedAddress',
      'addressComponents',
      'nationalPhoneNumber',
      'internationalPhoneNumber',
      'websiteURI',
      'googleMapsURI',
      'rating',
      'userRatingCount',
      'businessStatus',
      'primaryType',
      'primaryTypeDisplayName',
      'types',
      'reviews',
    ],
  })

  const formattedAddress = place.formattedAddress?.trim() || ''
  const components = place.addressComponents
  const resolvedPlaceId = place.id || placeId
  const primaryType = place.primaryType?.trim() || ''
  const types = Array.from(
    new Set((place.types ?? []).map((type) => type.trim()).filter(Boolean)),
  )
  const reviews = mapReviews(place.reviews)

  const details: PlaceDetails = {
    placeId: resolvedPlaceId,
    name: place.displayName?.trim() || '',
    addressLine1: buildAddressLine1(components, formattedAddress),
    city: componentText(components, 'locality', 'postal_town', 'sublocality', 'sublocality_level_1'),
    state: componentText(components, 'administrative_area_level_1'),
    pincode: componentText(components, 'postal_code'),
    country: componentText(components, 'country'),
    formattedAddress,
    phoneNumber:
      place.internationalPhoneNumber?.trim() || place.nationalPhoneNumber?.trim() || '',
    websiteURI: place.websiteURI?.trim() || '',
    googleMapsURI: place.googleMapsURI?.trim() || '',
    rating: typeof place.rating === 'number' ? place.rating : null,
    userRatingCount: typeof place.userRatingCount === 'number' ? place.userRatingCount : null,
    businessStatus: place.businessStatus?.toString() || '',
    primaryType,
    primaryTypeDisplayName: place.primaryTypeDisplayName?.trim() || '',
    types,
    reviews,
  }

  // Session ends after place details are fetched.
  resetPlacesSession()

  return details
}
