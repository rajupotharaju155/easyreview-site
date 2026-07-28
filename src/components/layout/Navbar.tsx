import { Button } from 'antd'
import { Logo } from '../shared/Logo'
import { PageContainer } from './PageContainer'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
      <PageContainer className="flex h-16 min-w-0 items-center justify-between gap-3">
        <Logo className="min-w-0 [&_span]:truncate" />
        <Button
          type="primary"
          className="!h-9 shrink-0 !px-3 text-sm sm:!h-10 sm:!px-4"
          href="https://app.easyreview.co.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sm:hidden">Get Started</span>
          <span className="hidden sm:inline">Get Started Free</span>
        </Button>
      </PageContainer>
    </header>
  )
}
