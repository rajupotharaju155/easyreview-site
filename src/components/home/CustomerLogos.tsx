import { customerLogos, results } from '../../data/content'
import { PageContainer } from '../layout/PageContainer'

const businessCount = results.find((item) => item.id === 'businesses')?.value

export function CustomerLogos() {
  return (
    <section
      className="border-b border-border bg-white py-12 sm:py-14"
      aria-labelledby="logos-heading"
    >
      <PageContainer>
        <h2
          id="logos-heading"
          className="text-center text-sm font-semibold tracking-wider text-muted uppercase"
        >
          Trusted by {businessCount} restaurants, cafes, salons, and hotels
        </h2>
      </PageContainer>

      <div className="logo-marquee mt-8">
        {/* The list is rendered twice so the scroll loops without a gap; the copy is hidden from screen readers. */}
        <div className="logo-marquee-track">
          {[false, true].map((copy) => (
            <ul key={String(copy)} className="logo-marquee-list" aria-hidden={copy || undefined}>
              {customerLogos.map((logo) => (
                <li
                  key={logo.id}
                  className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-4 sm:h-24 sm:w-48"
                >
                  <img
                    src={logo.src}
                    alt={copy ? '' : logo.name}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                    className="max-h-16 w-auto max-w-full object-contain sm:max-h-20"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
