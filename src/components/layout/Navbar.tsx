import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { Logo } from '../shared/Logo'
import { PageContainer } from './PageContainer'

const navLinks = [
  { label: 'Pricing', to: '/pricing' },
  { label: 'Compare', to: '/competitor-analysis' },
  { label: 'Guides', to: '/guides' },
  { label: 'Demo video', to: '/demo-video' },
  { label: 'FAQ', to: '/faq' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
      <PageContainer className="flex h-16 min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-8">
          <Logo className="min-w-0 [&_span]:truncate" />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium no-underline transition-colors hover:text-brand-600 ${
                    isActive ? 'text-brand-700' : 'text-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <Button
          type="primary"
          className="!h-9 shrink-0 !px-3 text-sm sm:!h-10 sm:!px-4"
          href="https://app.easyreview.co.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </Button>
      </PageContainer>
    </header>
  )
}
