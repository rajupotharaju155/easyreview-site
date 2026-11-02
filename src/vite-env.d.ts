/// <reference types="vite/client" />
/// <reference types="google.maps" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_POSTHOG_KEY?: string
  readonly VITE_POSTHOG_HOST?: string
  readonly VITE_CLARITY_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
