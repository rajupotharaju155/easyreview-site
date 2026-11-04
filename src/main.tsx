import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { initAnalytics } from './lib/analytics'

initAnalytics()

// Crawlers read these from the static HTML. Helmet can't replace them under React 19, only add a
// second set, so clear them and let each page's Helmet tags be the only ones.
document
  .querySelectorAll(
    'head title, head meta[name="description"], head link[rel="canonical"], head meta[property^="og:"], head meta[name^="twitter:"]',
  )
  .forEach((tag) => tag.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
