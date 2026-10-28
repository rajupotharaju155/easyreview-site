import { Button } from 'antd'
import { HERO_HEADLINES, results } from '../../data/content'
import { DARK_HERO_ID, NAVBAR_HEIGHT } from '../layout/navbarLayout'
import { PageContainer } from '../layout/PageContainer'

export function Hero() {
  return (
    // Pulled up under the sticky navbar, which stays transparent while it sits over this section.
    <section
      id={DARK_HERO_ID}
      className="section-dark relative overflow-hidden"
      style={{ marginTop: -NAVBAR_HEIGHT, paddingTop: NAVBAR_HEIGHT }}
      aria-labelledby="hero-heading"
    >
      <PageContainer className="grid items-center gap-12 pt-14 pb-12 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-16">
        <div className="animate-fade-up min-w-0">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-brand-100">
            Rank your business #1 on Google
          </span>

          {/*
            Headline variants (pick one):
            1. {HERO_HEADLINES[0]}
            2. {HERO_HEADLINES[1]}
            3. {HERO_HEADLINES[2]}
            Change ACTIVE_HERO_HEADLINE in src/data/content.ts
          */}
          <h1
            id="hero-heading"
            className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            Turn Every Happy Customer Into a{' '}
            <span className="hero-gradient-text-dark sm:whitespace-nowrap">
              5-Star Google Review
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            People judge your business on Google before they ever walk in.{' '}
            <span className="font-semibold text-white">EasyReview</span> turns satisfied visits into
            5-star reviews, and catches the unhappy ones privately — before they go public.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="primary"
              size="large"
              className="!h-12 !px-6 !text-base"
              href="https://app.easyreview.co.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Set Up Your Business
            </Button>
          </div>

          <p className="mt-4 text-sm text-white/60">Quick Trial at ₹7 for 7 days</p>
          <p className="mt-1.5 text-sm text-white/60">Setup in 2 minutes</p>

          <p className="sr-only">Alternate headlines: {HERO_HEADLINES.join(' | ')}</p>
        </div>

        <div className="animate-fade-up-delay-1 relative flex justify-center lg:-ml-10 lg:justify-end">
          <img
            src="/assets/hero/easy-review-half-hero-image.webp"
            alt="EasyReview standee with a review QR code beside a phone showing AI-written Google review drafts"
            width={1200}
            height={1097}
            fetchPriority="high"
            className="hero-photo w-full max-w-xl"
          />
        </div>
      </PageContainer>

      <PageContainer className="pb-14 lg:pb-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex flex-col-reverse justify-center bg-night/80 px-5 py-6 text-center sm:px-6 sm:py-8"
            >
              <dt className="mt-2 text-xs font-semibold tracking-wider text-brand-200 uppercase sm:text-sm">
                {item.label}
              </dt>
              <dd className="m-0 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageContainer>
    </section>
  )
}
