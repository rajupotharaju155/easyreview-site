import { Link } from 'react-router-dom'
import { Logo } from '../shared/Logo'
import { PageContainer } from './PageContainer'

const productLinks = [
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Login', to: '#' },
  { label: 'Sign Up', to: '#' },
]

const companyLinks = [
  { label: 'About', to: '#' },
  { label: 'Contact', to: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <PageContainer className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Helping local businesses turn happy customers into five-star Google reviews — while
              keeping complaints private.
            </p>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
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
              className="text-sm text-muted transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
