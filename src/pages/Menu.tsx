import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { BookOpen, Phone, Sparkles, Star, Utensils, X } from 'lucide-react'
import { ApiError } from '../api/client'
import { getPublicMenu } from '../api/menu'
import type { PublicMenu, PublicMenuCombo, PublicMenuItem } from '../api/types'
import { Logo } from '../components/shared/Logo'
import { formatInr } from '../lib/money'

const FOOD_FACTS = [
  'Honey never spoils — archaeologists have found 3,000-year-old jars still edible.',
  'Carrots were originally purple, not orange.',
  "Peanuts aren't nuts — they're legumes.",
  "Bananas are berries, but strawberries technically aren't.",
  'The fortune cookie was actually invented in California, not China.',
  'Chili peppers are fruits, botanically speaking.',
  'A "pinch" of salt is a real unit — roughly 1/8 teaspoon.',
  "Apples float because they're 25% air.",
]

function VegBadge({ isNonVeg }: { isNonVeg: boolean }) {
  const color = isNonVeg ? 'border-red-600' : 'border-emerald-600'
  const fill = isNonVeg ? 'bg-red-600' : 'bg-emerald-600'
  return (
    <span
      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center self-center rounded-[3px] border leading-none ${color} bg-white`}
      aria-label={isNonVeg ? 'Non-veg' : 'Veg'}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${fill}`} />
    </span>
  )
}

function DishImage({
  src,
  alt,
  onOpen,
}: {
  src: string | null
  alt: string
  onOpen?: () => void
}) {
  if (src) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="h-16 w-16 shrink-0 overflow-hidden rounded-xl"
        aria-label={`View photo of ${alt}`}
      >
        <img src={src} alt="" className="h-full w-full object-cover" />
      </button>
    )
  }
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 text-amber-700"
      aria-hidden
    >
      <Utensils className="h-6 w-6" strokeWidth={1.5} />
    </div>
  )
}

function ItemRow({
  item,
  onOpenImage,
}: {
  item: PublicMenuItem
  onOpenImage: (item: PublicMenuItem) => void
}) {
  return (
    <article className="flex gap-3 border-b border-slate-100 py-3.5 last:border-b-0">
      <DishImage
        src={item.imageUrl}
        alt={item.name}
        onOpen={item.imageUrl ? () => onOpenImage(item) : undefined}
      />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <VegBadge isNonVeg={item.isNonVeg} />
              <h3 className="min-w-0 truncate font-medium leading-5 text-ink">{item.name}</h3>
            </div>
            {item.description ? (
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{item.description}</p>
            ) : null}
          </div>
          {item.isHalfServed ? (
            <div className="shrink-0 text-right leading-5">
              <p className="text-sm font-semibold text-ink">
                <span className="font-medium text-muted">Half</span>{' '}
                {formatInr(item.halfPrice ?? item.fullPrice)}
              </p>
              <p className="text-sm font-semibold text-ink">
                <span className="font-medium text-muted">Full</span> {formatInr(item.fullPrice)}
              </p>
            </div>
          ) : (
            <p className="shrink-0 text-sm font-semibold leading-5 text-ink">
              {formatInr(item.fullPrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

function ComboCard({ combo }: { combo: PublicMenuCombo }) {
  return (
    <article className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
            <Sparkles className="h-3 w-3" aria-hidden />
            Combo
          </div>
          <h3 className="font-display text-base font-semibold text-ink">{combo.name}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-ink">{formatInr(combo.price)}</p>
          {combo.savings > 0 ? (
            <p className="text-[11px] text-muted line-through">{formatInr(combo.itemsSubtotal)}</p>
          ) : null}
        </div>
      </div>
      <ul className="mt-3 space-y-1">
        {combo.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-[13px] text-muted">
            <VegBadge isNonVeg={item.isNonVeg} />
            <span className="min-w-0 truncate">{item.name}</span>
          </li>
        ))}
      </ul>
      {combo.savings > 0 ? (
        <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
          You save {formatInr(combo.savings)}
        </p>
      ) : null}
    </article>
  )
}

function CategoryItems({
  items,
  onOpenImage,
}: {
  items: PublicMenuItem[]
  onOpenImage: (item: PublicMenuItem) => void
}) {
  if (items.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No items in this category.</p>
  }
  return (
    <section>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} onOpenImage={onOpenImage} />
      ))}
    </section>
  )
}

function ImagePreview({
  item,
  onClose,
}: {
  item: PublicMenuItem
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-5 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-preview-title"
      onClick={onClose}
    >
      <div
        className="w-full max-h-full overflow-y-auto rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.2)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <VegBadge isNonVeg={item.isNonVeg} />
          <h2
            id="dish-preview-title"
            className="min-w-0 font-display text-lg font-semibold leading-tight text-ink"
          >
            {item.name}
          </h2>
        </div>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="mt-3 aspect-square w-full rounded-xl object-cover"
          />
        ) : null}
        {item.description ? (
          <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.description}</p>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-ink py-2.5 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits}`
}

type JumpSection = { id: string; label: string; count: number }

function scrollSectionInto(
  scroller: HTMLElement | null,
  section: HTMLElement | null,
) {
  if (!scroller || !section) return
  const next =
    scroller.scrollTop +
    (section.getBoundingClientRect().top - scroller.getBoundingClientRect().top) -
    8
  scroller.scrollTo({ top: Math.max(0, next), behavior: 'smooth' })
}

function scrollChildX(scroller: HTMLElement, child: HTMLElement) {
  const scrollerRect = scroller.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()
  const delta =
    childRect.left +
    childRect.width / 2 -
    (scrollerRect.left + scrollerRect.width / 2)
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
  const next = Math.max(0, Math.min(max, scroller.scrollLeft + delta))
  if (Math.abs(next - scroller.scrollLeft) < 1) return
  scroller.scrollTo({ left: next, behavior: 'smooth' })
}

function CategoryPills({
  sections,
  activeId,
  onSelect,
}: {
  sections: JumpSection[]
  activeId: string | null
  onSelect: (id: string) => void
}) {
  const navRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())

  useEffect(() => {
    const nav = navRef.current
    const item = activeId ? itemRefs.current.get(activeId) : undefined
    if (!nav || !item) return
    scrollChildX(nav, item)
  }, [activeId])

  if (sections.length === 0) return null

  return (
    <nav
      ref={navRef}
      className="shrink-0 overflow-x-auto overflow-y-hidden border-b border-slate-100 bg-white px-4 py-2.5 [overflow-anchor:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex w-max gap-2">
        {sections.map((section) => {
          const active = section.id === activeId
          return (
            <button
              key={section.id}
              type="button"
              ref={(node) => {
                if (node) itemRefs.current.set(section.id, node)
                else itemRefs.current.delete(section.id)
              }}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSelect(section.id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium ${
                active ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {section.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function MenuJumpFab({
  sections,
  onJump,
}: {
  sections: JumpSection[]
  onJump: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  if (sections.length === 0) return null

  return (
    <>
      {open ? (
        <button
          type="button"
          className="absolute inset-0 z-30 cursor-default bg-black/20"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {open ? (
        <div className="absolute bottom-[5.75rem] right-4 z-40 w-[min(16.5rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
          <p className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Jump to
          </p>
          <div className="max-h-64 overflow-y-auto py-1">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  onJump(section.id)
                  setOpen(false)
                }}
                className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm text-ink hover:bg-slate-50"
              >
                <span className="min-w-0 truncate font-medium">{section.label}</span>
                <span className="shrink-0 text-xs text-muted">{section.count}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="absolute bottom-16 right-4 z-40 inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2.5 text-white shadow-[0_10px_24px_rgba(15,23,42,0.28)]"
        aria-expanded={open}
        aria-label={open ? 'Close category menu' : 'Open category menu'}
      >
        {open ? <X className="h-4 w-4" aria-hidden /> : <BookOpen className="h-4 w-4" aria-hidden />}
        <span className="text-sm font-semibold">Menu</span>
      </button>
    </>
  )
}

export function Menu() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [menu, setMenu] = useState<PublicMenu | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorTitle, setErrorTitle] = useState('Menu not found')
  const scrollRef = useRef<HTMLElement | null>(null)
  const sectionRefs = useRef(new Map<string, HTMLElement>())
  const jumpingRef = useRef(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [foodFact] = useState(
    () => FOOD_FACTS[Math.floor(Math.random() * FOOD_FACTS.length)] ?? FOOD_FACTS[0],
  )
  const [preview, setPreview] = useState<PublicMenuItem | null>(null)
  const closePreview = useCallback(() => setPreview(null), [])
  const openPreview = useCallback((item: PublicMenuItem) => {
    setPreview(item)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!slug) {
        setErrorTitle('Menu not found')
        setError('Missing location')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await getPublicMenu(slug)
        if (cancelled) return
        setMenu(data)
      } catch (err) {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 404) {
          setErrorTitle('Menu not found')
          setError('This restaurant menu could not be found.')
        } else {
          setErrorTitle('Something went wrong')
          setError(err instanceof Error ? err.message : 'Something went wrong.')
        }
        setMenu(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const sections = useMemo<JumpSection[]>(() => {
    if (!menu) return []
    const next: JumpSection[] = []
    if (menu.specials.length > 0) {
      next.push({ id: 'specials', label: "Today's Special", count: menu.specials.length })
    }
    if (menu.combos.length > 0) {
      next.push({ id: 'combos', label: 'Combos', count: menu.combos.length })
    }
    for (const category of menu.categories) {
      if (category.items.length === 0) continue
      next.push({ id: category.id, label: category.name, count: category.items.length })
    }
    return next
  }, [menu])

  const jumpTo = (id: string) => {
    setActiveId(id)
    const scroller = scrollRef.current
    jumpingRef.current = true
    scrollSectionInto(scroller, sectionRefs.current.get(id) ?? null)
    if (!scroller) {
      jumpingRef.current = false
      return
    }
    const unlock = () => {
      jumpingRef.current = false
      scroller.removeEventListener('scrollend', unlock)
    }
    scroller.addEventListener('scrollend', unlock, { once: true })
    window.setTimeout(unlock, 700)
  }

  useEffect(() => {
    if (sections.length === 0) {
      setActiveId(null)
      return
    }
    setActiveId((current) =>
      current && sections.some((section) => section.id === current) ? current : sections[0].id,
    )
  }, [sections])

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller || sections.length === 0) return

    const onScroll = () => {
      if (jumpingRef.current) return
      const top = scroller.getBoundingClientRect().top
      let current = sections[0].id
      for (const section of sections) {
        const el = sectionRefs.current.get(section.id)
        if (!el) continue
        if (el.getBoundingClientRect().top - top <= 28) current = section.id
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [sections])

  const setSectionRef = (id: string) => (node: HTMLElement | null) => {
    if (node) sectionRefs.current.set(id, node)
    else sectionRefs.current.delete(id)
  }

  const location = menu?.location
  const phone = location?.phoneNumber
  const placeLine = [location?.city, location?.state].filter(Boolean).join(', ')
  const hasContent = sections.length > 0

  return (
    <div className="relative min-h-dvh bg-[#fffaf5]">
      <Helmet>
        <title>
          {location ? `${location.name} Menu | EasyReview` : 'EasyMenu | EasyReview'}
        </title>
        {location ? (
          <meta
            name="description"
            content={`View the menu, combos, and today's special at ${location.name}.`}
          />
        ) : null}
      </Helmet>

      <div className="relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-[0_0_40px_rgba(15,23,42,0.06)]">
        {loading ? (
          <div
            className="flex h-full flex-col items-center justify-center px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            role="status"
            aria-live="polite"
          >
            <img
              src="/assets/app/menu-loader-purple.svg"
              alt="Loading menu"
              width={160}
              height={160}
              className="h-40 w-40"
            />
            <p className="-mt-2 max-w-xs text-center text-sm leading-relaxed text-muted">
              {foodFact}
            </p>
          </div>
        ) : (
          <>
        <header className="shrink-0 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur">
          <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                EasyMenu
              </p>
              <h1 className="mt-0.5 font-display text-xl font-bold leading-tight tracking-tight text-ink">
                {location?.name || errorTitle}
              </h1>
              {placeLine ? <p className="mt-0.5 text-xs text-muted">{placeLine}</p> : null}
            </div>
            {phone ? (
              <a
                href={telHref(phone)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 no-underline"
                aria-label="Call restaurant"
              >
                <Phone className="h-4 w-4" />
              </a>
            ) : (
              <Logo showWordmark={false} className="shrink-0 [&_img]:h-8 [&_img]:w-8" />
            )}
          </div>
        </header>

        {hasContent ? (
          <CategoryPills sections={sections} activeId={activeId} onSelect={jumpTo} />
        ) : null}

        <main ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 pb-24 [overflow-anchor:none]">
          {error ? (
            <div className="py-16 text-center">
              <h2 className="font-display text-xl font-bold text-ink">{errorTitle}</h2>
              <p className="mt-2 text-sm text-muted">{error}</p>
            </div>
          ) : !hasContent ? (
            <div className="py-16 text-center">
              <Utensils className="mx-auto h-10 w-10 text-amber-500" strokeWidth={1.5} />
              <h2 className="mt-4 font-display text-xl font-bold text-ink">Menu coming soon</h2>
              <p className="mt-2 text-sm text-muted">
                {location?.name} has not published dishes yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8 pt-2">
              {menu!.specials.length > 0 ? (
                <section
                  ref={setSectionRef('specials')}
                  className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white px-3 py-3"
                >
                  <div className="mb-2 flex items-center gap-1.5 text-brand-700">
                    <Star className="h-4 w-4 fill-brand-500 text-brand-500" aria-hidden />
                    <h2 className="text-sm font-semibold">Today's Special</h2>
                  </div>
                  {menu!.specials.map((special) => (
                    <ItemRow key={special.id} item={special.item} onOpenImage={openPreview} />
                  ))}
                </section>
              ) : null}

              {menu!.combos.length > 0 ? (
                <section ref={setSectionRef('combos')} className="space-y-3">
                  <h2 className="text-sm font-semibold text-ink">Combos</h2>
                  {menu!.combos.map((combo) => (
                    <ComboCard key={combo.id} combo={combo} />
                  ))}
                </section>
              ) : null}

              {menu!.categories
                .filter((category) => category.items.length > 0)
                .map((category) => (
                  <section key={category.id} ref={setSectionRef(category.id)}>
                    <h2 className="mb-1 text-sm font-semibold text-ink">{category.name}</h2>
                    <CategoryItems items={category.items} onOpenImage={openPreview} />
                  </section>
                ))}
            </div>
          )}
        </main>

        <MenuJumpFab sections={sections} onJump={jumpTo} />

        {preview ? <ImagePreview item={preview} onClose={closePreview} /> : null}

        <footer className="flex shrink-0 items-center justify-center gap-2 border-t border-slate-100 px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">
            POWERED BY
          </span>
          <Logo className="opacity-80 [&_img]:h-5 [&_img]:w-5 [&_span]:text-xs" />
        </footer>
          </>
        )}
      </div>
    </div>
  )
}
