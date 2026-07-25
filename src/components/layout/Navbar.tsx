import { Button } from 'antd'
import { Logo } from '../shared/Logo'
import { PageContainer } from './PageContainer'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
      <PageContainer className="flex h-16 items-center justify-between">
        <Logo />
        <Button type="primary" className="!h-10 !px-4">
          Get Started Free
        </Button>
      </PageContainer>
    </header>
  )
}
