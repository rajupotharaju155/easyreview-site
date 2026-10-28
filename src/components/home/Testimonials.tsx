import { Quote } from 'lucide-react'
import { customerLogos, testimonials } from '../../data/content'
import type { Testimonial } from '../../types'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const logo = customerLogos.find((item) => item.id === testimonial.logoId)

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white">
      {logo ? (
        <img
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          loading="lazy"
          decoding="async"
          className="max-h-10 w-auto max-w-10 object-contain"
        />
      ) : (
        <span className="font-display text-sm font-bold text-brand-700">
          {initials(testimonial.name)}
        </span>
      )}
    </span>
  )
}

export function Testimonials() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="testimonials-heading">
      <PageContainer>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Customer stories"
          title="Loved by local business owners"
          subtitle="Restaurants, salons, sweet shops, and hotels use EasyReview every day to win more Google reviews."
          className="mb-10 sm:mb-12"
        />

        <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const featured = index === 0
            return (
              <li
                key={testimonial.id}
                className={featured ? 'md:col-span-2 lg:col-span-2' : undefined}
              >
                <figure
                  className={`m-0 flex h-full flex-col rounded-2xl border p-6 shadow-sm sm:p-7 ${
                    featured ? 'section-dark border-transparent' : 'border-border bg-white'
                  }`}
                >
                  <Quote className="h-7 w-7 text-brand-200" aria-hidden />
                  <blockquote
                    className={`m-0 mt-4 flex-1 leading-relaxed ${
                      featured
                        ? 'font-display text-lg font-medium text-white sm:text-2xl sm:leading-snug'
                        : 'text-sm text-slate-700 sm:text-base'
                    }`}
                  >
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar testimonial={testimonial} />
                    <span className="min-w-0">
                      <span
                        className={`block font-semibold ${featured ? 'text-white' : 'text-ink'}`}
                      >
                        {testimonial.name}
                      </span>
                      <span
                        className={`block text-sm ${featured ? 'text-white/65' : 'text-muted'}`}
                      >
                        {testimonial.role}, {testimonial.business}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </PageContainer>
    </section>
  )
}
