import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/shared/SectionHeading'
import { SeoHead } from '../components/shared/SeoHead'
import { guides } from '../data/guides'

export function Guides() {
  return (
    <>
      <SeoHead
        path="/guides"
        title="Guides — EasyReview"
        description="Practical guides for local businesses that want more Google reviews — without awkward asks or public surprise complaints."
      />

      <section className="hero-atmosphere border-b border-border py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            as="h1"
            eyebrow="EasyReview Guides"
            title="Grow Reviews Without the Awkward Ask"
            subtitle="Short, practical playbooks for restaurants, salons, clinics, and more."
          />
        </PageContainer>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <PageContainer className="max-w-4xl">
          <ul className="space-y-6">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  to={guide.path}
                  className="group block no-underline transition-colors"
                >
                  <article className="overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors group-hover:border-brand-200 group-hover:bg-brand-50/30 sm:grid sm:grid-cols-[14rem_1fr] sm:items-stretch lg:grid-cols-[16rem_1fr]">
                    <img
                      src={guide.coverImage}
                      alt={guide.coverImageAlt}
                      width={640}
                      height={400}
                      loading="lazy"
                      className="aspect-[16/10] h-full w-full object-cover sm:aspect-auto sm:min-h-[11rem]"
                    />
                    <div className="flex flex-col p-6 sm:p-7">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                        {guide.category} · {guide.readMinutes} min read
                      </p>
                      <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                        {guide.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {guide.description}
                      </p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-brand-700">
                        Read guide →
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>
    </>
  )
}
