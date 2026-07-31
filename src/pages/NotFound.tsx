import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found — EasyReview</title>
        <meta
          name="description"
          content="The page you requested could not be found on EasyReview."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="hero-atmosphere border-b border-border py-20 sm:py-28">
        <PageContainer className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            That URL doesn’t match any page on EasyReview. Check the address, or head back home.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
            >
              Go to homepage
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink no-underline transition-colors hover:border-brand-200 hover:text-brand-700"
            >
              View pricing
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
