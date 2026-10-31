import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { placeMenuOrder } from '../../../api/menu'
import type { MenuOrderType, PlacedMenuOrder } from '../../../api/types'
import type { MenuCart } from '../../../hooks/useMenuCart'
import { countryIsoFromLocationCountry, dialCodeForIso } from '../../../lib/countryDialCodes'
import { cartTotal, ORDER_TYPE_LABELS, SPOT_LABELS } from '../../../lib/menuOrder'
import { formatMoney } from '../../../lib/money'
import { CountryCodeSelect } from '../../shared/CountryCodeSelect'
import { BottomSheet } from './BottomSheet'
import { QuantityStepper } from './QuantityStepper'

const PHONE_PATTERN = /^[0-9]{4,14}$/
/** Time on the success screen before WhatsApp opens on its own. */
const WHATSAPP_REDIRECT_SECONDS = 10
/** Field styling without a width, for fields sized by their row. */
const fieldClass =
  'rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
const inputClass = `w-full ${fieldClass}`

type Step = 'cart' | 'checkout' | 'placed'

export function CartSheet({
  slug,
  cart,
  currency,
  orderTypes,
  businessCountry,
  onClose,
}: {
  slug: string
  cart: MenuCart
  currency: string
  orderTypes: MenuOrderType[]
  businessCountry: string | null
  onClose: () => void
}) {
  const [step, setStep] = useState<Step>('cart')
  const [name, setName] = useState('')
  const [countryIso, setCountryIso] = useState(() => countryIsoFromLocationCountry(businessCountry))
  const [phone, setPhone] = useState('')
  const [orderType, setOrderType] = useState<MenuOrderType>(orderTypes[0] ?? 'dine_in')
  const [spotNumber, setSpotNumber] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [placed, setPlaced] = useState<PlacedMenuOrder | null>(null)
  const [redirectIn, setRedirectIn] = useState(WHATSAPP_REDIRECT_SECONDS)

  // Count down on the success screen, then open WhatsApp. Closing the sheet cancels it.
  const whatsappUrl = step === 'placed' ? placed?.whatsappUrl : null
  useEffect(() => {
    if (!whatsappUrl) return
    setRedirectIn(WHATSAPP_REDIRECT_SECONDS)
    const timer = window.setInterval(
      () => setRedirectIn((seconds) => Math.max(0, seconds - 1)),
      1000,
    )
    return () => window.clearInterval(timer)
  }, [whatsappUrl])

  useEffect(() => {
    if (whatsappUrl && redirectIn === 0) window.location.href = whatsappUrl
  }, [whatsappUrl, redirectIn])

  const spotLabel = SPOT_LABELS[orderType]

  async function submit(event: FormEvent) {
    event.preventDefault()
    const phoneDigits = phone.replace(/\D/g, '')
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!PHONE_PATTERN.test(phoneDigits)) {
      setError('Please enter a valid phone number')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      const order = await placeMenuOrder(slug, {
        customerName: name.trim(),
        customerCountryCode: dialCodeForIso(countryIso),
        customerPhone: phoneDigits,
        orderType,
        spotNumber: spotLabel ? spotNumber.trim() || null : null,
        note: note.trim() || null,
        items: cart.lines.map((line) => ({
          menuItemId: line.menuItemId,
          comboId: line.comboId,
          priceOption: line.priceOption,
          quantity: line.quantity,
        })),
      })
      setPlaced(order)
      setStep('placed')
      cart.clear()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not place the order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'placed' && placed) {
    return (
      <BottomSheet title="Order placed" onClose={onClose}>
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" strokeWidth={1.5} />
          <p className="mt-3 text-[13px] text-muted">Your order number</p>
          <p className="font-display text-4xl font-bold text-ink">#{placed.orderNumber}</p>
          <p className="mt-1 text-sm text-muted">
            Total {formatMoney(placed.totalAmount, placed.currency)}
          </p>
          {placed.whatsappUrl ? (
            <>
              <p className="mx-auto mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
                Send the order on WhatsApp so the business gets your details.
              </p>
              <a
                href={placed.whatsappUrl}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white no-underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Send on WhatsApp
              </a>
              <p className="mt-2 text-[12px] text-muted" aria-live="polite">
                {redirectIn > 0 ? `Opening WhatsApp in ${redirectIn}s…` : 'Opening WhatsApp…'}
              </p>
            </>
          ) : (
            <p className="mx-auto mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              The business has your order. Show this number to the staff if asked.
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-ink"
          >
            Back to menu
          </button>
        </div>
      </BottomSheet>
    )
  }

  if (step === 'checkout') {
    return (
      <BottomSheet
        title="Your details"
        onClose={onClose}
        overlay={
          submitting ? (
            <div role="status" className="flex flex-col items-center gap-3">
              <Loader2 className="h-9 w-9 animate-spin text-brand-600" aria-hidden />
              <p className="text-sm font-medium text-ink">Placing your order…</p>
            </div>
          ) : null
        }
        footer={
          <div className="space-y-2">
            {error ? (
              <p className="text-center text-[13px] text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setStep('cart')
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink"
              >
                Back
              </button>
              <button
                type="submit"
                form="menu-checkout"
                disabled={submitting}
                className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white"
              >
                Place order · {formatMoney(cart.total, currency)}
              </button>
            </div>
          </div>
        }
      >
        <form id="menu-checkout" onSubmit={submit} className="space-y-4" noValidate>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-ink">Name</span>
            <input
              className={inputClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={160}
              required
            />
          </label>

          <div>
            <span className="mb-1 block text-[13px] font-medium text-ink">Phone number</span>
            <div className="flex gap-2">
              <CountryCodeSelect
                value={countryIso}
                onChange={setCountryIso}
                size="large"
                className="w-[7.5rem] shrink-0"
                styles={{ root: { height: 42, borderRadius: 12 } }}
              />
              <input
                className={`${fieldClass} min-w-0 flex-1`}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={20}
                aria-label="Phone number"
                required
              />
            </div>
          </div>

          {orderTypes.length > 1 ? (
            <div>
              <span className="mb-1 block text-[13px] font-medium text-ink">Order type</span>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Order type">
                {orderTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    role="radio"
                    aria-checked={orderType === type}
                    onClick={() => setOrderType(type)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
                      orderType === type ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {ORDER_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {spotLabel ? (
            <label className="block">
              <span className="mb-1 block text-[13px] font-medium text-ink">
                {spotLabel} <span className="font-normal text-muted">(optional)</span>
              </span>
              <input
                className={inputClass}
                value={spotNumber}
                onChange={(event) => setSpotNumber(event.target.value)}
                maxLength={16}
              />
            </label>
          ) : null}

          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-ink">
              Note <span className="font-normal text-muted">(optional)</span>
            </span>
            <textarea
              className={`${inputClass} min-h-[4.5rem] resize-none`}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={300}
              placeholder="Less spicy, no onion…"
            />
          </label>
        </form>
      </BottomSheet>
    )
  }

  return (
    <BottomSheet
      title="Your cart"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={() => setStep('checkout')}
          disabled={cart.lines.length === 0}
          className="flex w-full items-center justify-between rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          <span>Total {formatMoney(cart.total, currency)}</span>
          <span>Place order</span>
        </button>
      }
    >
      {cart.lines.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {cart.lines.map((line) => (
            <li key={line.key} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium text-ink">
                  {line.name}
                  {line.variantLabel ? (
                    <span className="font-normal text-muted"> · {line.variantLabel}</span>
                  ) : null}
                </p>
                {line.comboItemNames?.length ? (
                  <p className="mt-0.5 text-[12px] leading-snug text-muted">
                    {line.comboItemNames.join(', ')}
                  </p>
                ) : null}
                <p className="mt-0.5 text-[13px] text-muted">
                  {formatMoney(line.unitPrice, currency)} × {line.quantity} ={' '}
                  <span className="font-semibold text-ink">
                    {formatMoney(cartTotal([line]), currency)}
                  </span>
                </p>
              </div>
              <QuantityStepper
                quantity={line.quantity}
                onAdd={() => cart.change(line, 1)}
                onRemove={() => cart.change(line, -1)}
                label={line.name}
              />
            </li>
          ))}
        </ul>
      )}
    </BottomSheet>
  )
}
