import { Button } from 'antd'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { freeToolLinks } from '../../data/freeTools'
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

function navItemColor(onDark: boolean, isActive: boolean) {
  if (onDark) return isActive ? 'text-white' : 'text-white/60 hover:text-white'
  return isActive ? 'text-brand-700' : 'text-muted hover:text-brand-600'
}

/** Opens on hover, focus, or tap. The links stay in the DOM so the prerendered HTML includes them. */
function FreeToolsMenu({ onDark }: { onDark: boolean }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isActive = freeToolLinks.some((link) => link.to === pathname)

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="free-tools-menu"
        onClick={() => setOpen(true)}
        className={`inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm font-medium whitespace-nowrap transition-colors ${navItemColor(onDark, isActive)}`}
      >
        Free tools
        <ChevronDown
          size={14}
          aria-hidden
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* The top padding bridges the gap to the button, so moving the mouse down keeps it open. */}
      <div
        id="free-tools-menu"
        className={`absolute top-full left-0 pt-3 transition-[opacity,visibility] duration-150 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <ul className="m-0 w-60 list-none rounded-xl border border-border bg-white p-1.5 shadow-lg">
          {freeToolLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive: isCurrent }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors hover:bg-surface ${isCurrent ? 'text-brand-700' : 'text-ink hover:text-brand-600'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
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
                className={({ isActive }) =>
                  `text-sm font-medium whitespace-nowrap no-underline transition-colors ${navItemColor(onDark, isActive)}`
                }
              >
                {product.name}
              </NavLink>
            ))}
            <FreeToolsMenu onDark={onDark} />
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
