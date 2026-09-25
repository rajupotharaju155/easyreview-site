import { Button } from 'antd'
import { HERO_HEADLINES } from '../../data/content'
import { PageContainer } from '../layout/PageContainer'

export function Hero() {
  return (
    <section className="hero-atmosphere relative overflow-hidden" aria-labelledby="hero-heading">
      <PageContainer className="grid items-center gap-12 pt-14 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-24">
        <div className="animate-fade-up min-w-0">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
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
            className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            Turn Every Happy Customer Into a{' '}
            <span className="hero-gradient-text sm:whitespace-nowrap">5-Star Google Review</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            People judge your business on Google before they ever walk in.{' '}
            <span className="font-semibold text-brand-600">EasyReview</span> turns satisfied visits
            into 5-star reviews, and catches the unhappy ones privately — before they go public.
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

          <p className="mt-4 text-sm text-muted">Quick Trial at ₹7 for 7 days</p>
          <p className="mt-1.5 text-sm text-muted">
            Setup in 2 minutes · Upgrade anytime for a QR standee
          </p>

          <p className="sr-only">Alternate headlines: {HERO_HEADLINES.join(' | ')}</p>
        </div>

        <div className="animate-fade-up-delay-1 relative flex justify-center lg:-ml-10 lg:justify-end">
          <img
            src="/assets/hero/easy-review-half-hero-image.png"
            alt="EasyReview standee with a review QR code beside a phone showing AI-written Google review drafts"
            width={1312}
            height={1199}
            fetchPriority="high"
            className="hero-photo w-full max-w-xl"
          />
        </div>
      </PageContainer>
    </section>
  )
}
