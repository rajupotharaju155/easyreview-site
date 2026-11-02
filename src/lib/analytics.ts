import posthog from 'posthog-js'

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID

/** Pages our clients' customers use (feedback, orders, contact cards): no recordings there. */
const CUSTOMER_PAGE = /^\/(rate|menu|profile|q)\//

/** Puppeteer prerender and other automated browsers must not count as visits. */
const enabled = typeof navigator !== 'undefined' && !navigator.webdriver

let clarityLoaded = false

export function initAnalytics() {
  if (!enabled || !POSTHOG_KEY) return
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: 'history_change',
    person_profiles: 'identified_only',
    // Started per route in trackRoute, so customer pages are never recorded.
    disable_session_recording: true,
  })
}

function loadClarity(id: string) {
  const w = window as Window & { clarity?: { (...args: unknown[]): void; q?: unknown[] } }
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      ;(w.clarity!.q = w.clarity!.q || []).push(args)
    }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${id}`
  document.head.appendChild(script)
}

/** Call on every route change: turns recording on for marketing pages, off for customer pages. */
export function trackRoute(pathname: string) {
  if (!enabled) return
  const isCustomerPage = CUSTOMER_PAGE.test(pathname)

  if (POSTHOG_KEY) {
    if (isCustomerPage) posthog.stopSessionRecording()
    else posthog.startSessionRecording()
  }

  if (CLARITY_ID && !isCustomerPage && !clarityLoaded) {
    clarityLoaded = true
    loadClarity(CLARITY_ID)
  }
}
