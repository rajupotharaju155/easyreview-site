import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { marketingProducts } from '../../data/products'
import { Logo } from '../shared/Logo'
import { DARK_HERO_ID, NAVBAR_HEIGHT } from './navbarLayout'
import { PageContainer } from './PageContainer'

/** The homepage and product pages open with a dark hero. */
const DARK_HERO_PATHS = new Set(marketingProducts.map((product) => product.path))

type NavbarTone = 'clear' | 'dark' | 'light'

const HEADER_CLASSES: Record<NavbarTone, string> = {
  clear: 'border-transparent bg-transparent',
  dark: 'border-white/10 bg-night/80 backdrop-blur-md',
  light: 'border-border/80 bg-white/90 backdrop-blur-md',
}

/**
 * Clear at the top of a page with a dark hero, frosted dark once the hero scrolls under it,
 * and the usual white bar after the hero has gone past.
 */
function useNavbarTone(pathname: string): NavbarTone {
  const hasDarkHero = DARK_HERO_PATHS.has(pathname)
  const [overHero, setOverHero] = useState(hasDarkHero)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    setOverHero(hasDarkHero)
    const hero = hasDarkHero ? document.getElementById(DARK_HERO_ID) : null
    if (!hero) return

    // The root is shrunk to the area below the navbar, so the hero stops intersecting
    // exactly when its bottom edge scrolls up past the navbar.
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
    })
    observer.observe(hero)

    const onScroll = () => setAtTop(window.scrollY < 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasDarkHero, pathname])

  if (!overHero) return 'light'
  return atTop ? 'clear' : 'dark'
}

export function Navbar() {
  const { pathname } = useLocation()
  const tone = useNavbarTone(pathname)
  const onDark = tone !== 'light'

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${HEADER_CLASSES[tone]}`}
    >
      <PageContainer className="flex h-16 min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Logo variant={onDark ? 'dark' : 'light'} className="min-w-0 [&_span]:truncate" />
          <nav className="hidden items-center gap-4 md:flex lg:gap-6" aria-label="Primary">
            {marketingProducts.map((product) => (
              <NavLink
                key={product.id}
                to={product.path}
                end={product.path === '/'}
                className={({ isActive }) => {
                  const color = onDark
                    ? isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                    : isActive
                      ? 'text-brand-700'
                      : 'text-muted hover:text-brand-600'
                  return `text-sm font-medium whitespace-nowrap no-underline transition-colors ${color}`
                }}
              >
                {product.name}
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
