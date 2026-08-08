import { Link } from 'react-router-dom'
import { Logo } from '../shared/Logo'
import { PageContainer } from './PageContainer'

const productLinks = [
  { label: 'Home', to: '/' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Competitor Analysis', to: '/competitor-analysis' },
  { label: 'Demo video', to: '/demo-video' },
  { label: 'FAQ', to: '/faq' },
]

const guideLinks = [
  { label: 'All guides', to: '/guides' },
  {
    label: 'Restaurant Google reviews',
    to: '/guides/restaurant-qr-code-google-reviews',
  },
  {
    label: 'Hotel Google reviews',
    to: '/guides/how-hotels-can-win-google-reviews',
  },
  {
    label: 'Gym Google reviews',
    to: '/guides/turn-members-into-5-star-google-review',
  },
  {
    label: 'Salon Google reviews',
    to: '/guides/easiest-way-salons-collect-google-reviews',
  },
  {
    label: 'Dental Google reviews',
    to: '/guides/dental-practices-5-star-google-reviews',
  },
  {
    label: 'Mobile & Laptop Repair shop Google reviews',
    to: '/guides/mobile-laptop-repair-google-reviews',
  },
  {
    label: 'Spa & Wellness Google reviews',
    to: '/guides/spa-wellness-google-reviews',
  },
  {
    label: 'Real estate Google reviews',
    to: '/guides/real-estate-5-star-google-reviews',
  },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <PageContainer className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Helping local businesses turn happy customers into five-star Google reviews — while
              keeping complaints private.
            </p>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Guides" links={guideLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted">© 2026 EasyReview. All rights reserved.</p>
        </div>
      </PageContainer>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  links: { label: string; to: string }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-muted no-underline transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
