import {
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  UserPlus,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../api/client'
import { getProfileBySlug, submitProfileLead } from '../api/profiles'
import type { PublicProfile } from '../api/types'
import { ProfileCardHeader } from '../components/profile/ProfileCardHeader'
import { ProfileLinkIcon } from '../components/profile/ProfileLinkIcon'
import { SITE_URL } from '../components/shared/SeoHead'
import { normaliseWhatsappNumber, WHATSAPP_ICON_SRC } from '../lib/profileLinks'
import { downloadProfileVCard } from '../lib/vcard'

type LeadForm = {
  name: string
  phone: string
  email: string
  companyName: string
  note: string
}

const EMPTY_LEAD_FORM: LeadForm = {
  name: '',
  phone: '',
  email: '',
  companyName: '',
  note: '',
}

export function Profile() {
  const navigate = useNavigate()
  const { slug = '' } = useParams<{ slug: string }>()
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorTitle, setErrorTitle] = useState<string>('Profile not found')
  const [error, setError] = useState<string | null>(null)
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadForm, setLeadForm] = useState<LeadForm>(EMPTY_LEAD_FORM)
  const [leadError, setLeadError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [leadSaved, setLeadSaved] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Missing profile slug')
      return
    }

    let cancelled = false
    let redirecting = false
    setLoading(true)
    setError(null)
    setProfile(null)

    getProfileBySlug(slug)
      .then((data) => {
        if (cancelled) return
        if (data.slug && data.slug !== slug) {
          redirecting = true
          navigate(`/profile/${encodeURIComponent(data.slug)}`, {
            replace: true,
          })
          return
        }
        setProfile(data)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 404) {
          setErrorTitle('Profile not found')
          setError('This card is not available. It may have been unpublished.')
        } else {
          setErrorTitle('Something went wrong')
          setError(err instanceof Error ? err.message : 'Something went wrong.')
        }
      })
      .finally(() => {
        if (!cancelled && !redirecting) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [navigate, slug])

  const whatsappNumber = useMemo(
    () =>
      normaliseWhatsappNumber(profile?.whatsappPhone ?? null) ??
      normaliseWhatsappNumber(profile?.phone ?? null),
    [profile?.whatsappPhone, profile?.phone],
  )

  const canCall = Boolean(profile?.phone?.trim())
  const canEmail = Boolean(profile?.email?.trim())
  const canWhatsapp = Boolean(whatsappNumber)

  const openLead = () => {
    setLeadForm(EMPTY_LEAD_FORM)
    setLeadError(null)
    setLeadSaved(false)
    setLeadOpen(true)
  }

  const closeLead = () => {
    if (submitting) return
    setLeadOpen(false)
  }

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!profile || submitting) return

    const name = leadForm.name.trim()
    const phone = leadForm.phone.trim()
    if (!name) {
      setLeadError('Please enter your name.')
      return
    }
    if (phone.length < 4) {
      setLeadError('Please enter a valid phone number.')
      return
    }

    setSubmitting(true)
    setLeadError(null)
    try {
      await submitProfileLead(profile.slug, {
        name,
        phone,
        email: leadForm.email.trim() || undefined,
        companyName: leadForm.companyName.trim() || undefined,
        note: leadForm.note.trim() || undefined,
      })
      setLeadSaved(true)
    } catch (err) {
      setLeadError(
        err instanceof ApiError
          ? err.message
          : 'Could not send your details. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-50 text-muted">
        Loading…
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
        <Helmet>
          <title>{errorTitle} | EasyReview</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          {errorTitle}
        </h1>
        <p className="max-w-sm text-sm text-muted">{error}</p>
      </div>
    )
  }

  const pageTitle = profile.companyName
    ? `${profile.displayName} · ${profile.companyName}`
    : profile.displayName

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <Helmet>
        <title>{pageTitle} | EasyReview</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={
            profile.bio ??
            `Digital business card for ${profile.displayName}${
              profile.companyName ? ` at ${profile.companyName}` : ''
            }.`
          }
        />
      </Helmet>

      <main className="mx-auto flex w-full max-w-[420px] flex-1 flex-col bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:my-6 sm:rounded-[24px] sm:overflow-hidden">
        <ProfileCardHeader
          profile={profile}
          onOpenImage={setLightboxSrc}
        />

        {/* Save contact / Exchange contact --------------------------------- */}
        <section className="mt-3 flex gap-2 px-4 sm:px-5">
          <button
            type="button"
            onClick={() => downloadProfileVCard(profile)}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-3 py-2 text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(107,47,213,0.28)] transition-opacity hover:opacity-95"
          >
            <UserPlus className="h-3.5 w-3.5" aria-hidden />
            Save contact
          </button>
          <button
            type="button"
            onClick={openLead}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-[13px] font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            <UserRoundPlus className="h-3.5 w-3.5" aria-hidden />
            Exchange
          </button>
        </section>

        {/* Quick actions --------------------------------------------------- */}
        {canCall || canEmail || canWhatsapp ? (
          <section className="mt-2 grid grid-cols-3 gap-1.5 px-4 sm:px-5">
            {canCall ? (
              <QuickAction
                href={`tel:${profile.phone?.replace(/\s+/g, '')}`}
                label="Call"
                icon={<Phone className="h-4 w-4" aria-hidden />}
              />
            ) : null}
            {canWhatsapp ? (
              <QuickAction
                href={`https://wa.me/${whatsappNumber}`}
                label="WhatsApp"
                icon={
                  <img
                    src={WHATSAPP_ICON_SRC}
                    alt=""
                    aria-hidden
                    className="h-4 w-4"
                  />
                }
                external
              />
            ) : null}
            {canEmail ? (
              <QuickAction
                href={`mailto:${profile.email}`}
                label="Email"
                icon={<Mail className="h-4 w-4" aria-hidden />}
              />
            ) : null}
          </section>
        ) : null}

        {/* Links ----------------------------------------------------------- */}
        {profile.links.length > 0 ? (
          <section className="mt-3 space-y-1.5 px-4 pb-4 sm:px-5">
            {profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-ink no-underline transition-colors hover:border-brand-300 hover:bg-brand-50/50"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-brand-600">
                    <ProfileLinkIcon type={link.type} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 truncate">{link.label}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
              </a>
            ))}
          </section>
        ) : (
          <div className="px-4 pb-4 sm:px-5" />
        )}

        {/* Powered by ------------------------------------------------------ */}
        <footer className="mt-auto border-t border-slate-100">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full cursor-pointer items-center justify-center gap-1 px-4 py-2 no-underline"
          >
            <span className="text-[8px] font-semibold tracking-[0.14em] text-slate-400">
              POWERED BY
            </span>
            <img
              src="/logo.svg"
              alt=""
              aria-hidden
              className="h-3 w-3 shrink-0 object-contain opacity-70"
            />
            <span className="font-display text-[10px] font-bold tracking-tight text-ink opacity-70">
              EasyReview
            </span>
          </a>
        </footer>
      </main>

      {leadOpen ? (
        <LeadModal
          profile={profile}
          form={leadForm}
          onChange={setLeadForm}
          onSubmit={handleLeadSubmit}
          onClose={closeLead}
          submitting={submitting}
          error={leadError}
          saved={leadSaved}
        />
      ) : null}

      {lightboxSrc ? (
        <ImageLightbox
          src={lightboxSrc}
          onClose={() => setLightboxSrc(null)}
        />
      ) : null}
    </div>
  )
}

/**
 * Full-screen backdrop that shows a single image at its natural aspect,
 * scaled to fit the viewport. Closes on Esc, backdrop click, or the
 * explicit close button.
 */
function ImageLightbox({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    // Lock body scroll while the lightbox is open so the backdrop
    // does not scroll the underlying profile page on mobile.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={src}
        alt=""
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full cursor-default rounded-xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      />
    </div>
  )
}

function QuickAction({
  href,
  label,
  icon,
  external = false,
}: {
  href: string
  label: string
  icon: React.ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-2 text-[11px] font-semibold text-ink no-underline transition-colors hover:border-brand-300 hover:bg-brand-50/50"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        {icon}
      </span>
      {label}
    </a>
  )
}

function LeadModal({
  profile,
  form,
  onChange,
  onSubmit,
  onClose,
  submitting,
  error,
  saved,
}: {
  profile: PublicProfile
  form: LeadForm
  onChange: (form: LeadForm) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClose: () => void
  submitting: boolean
  error: string | null
  saved: boolean
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/60 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-[420px] rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:rounded-3xl sm:p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {saved ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">
              Thank you
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {profile.displayName} has your details and will get in touch.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-2xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">
              Share your contact
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {profile.displayName} will receive your details and can reach out.
            </p>

            <form className="mt-5 space-y-3" onSubmit={onSubmit}>
              <LeadField
                id="lead-name"
                label="Your name"
                required
                value={form.name}
                onChange={(value) => onChange({ ...form, name: value })}
                autoComplete="name"
              />
              <LeadField
                id="lead-phone"
                label="Phone"
                type="tel"
                required
                value={form.phone}
                onChange={(value) => onChange({ ...form, phone: value })}
                autoComplete="tel"
              />
              <LeadField
                id="lead-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => onChange({ ...form, email: value })}
                autoComplete="email"
              />
              <LeadField
                id="lead-company"
                label="Company"
                value={form.companyName}
                onChange={(value) => onChange({ ...form, companyName: value })}
                autoComplete="organization"
              />
              <div>
                <label
                  htmlFor="lead-note"
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  Note (optional)
                </label>
                <textarea
                  id="lead-note"
                  rows={3}
                  maxLength={500}
                  value={form.note}
                  onChange={(event) => onChange({ ...form, note: event.target.value })}
                  className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                  placeholder="What is this about?"
                />
              </div>

              {error ? (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full cursor-pointer items-center justify-center rounded-2xl border-0 bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,47,213,0.28)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Sending…' : 'Send my details'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function LeadField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-600">
        {label}
        {required ? <span className="ml-0.5 text-brand-600">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
      />
    </div>
  )
}
