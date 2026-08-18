import { message } from 'antd'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'
import { ApiError } from '../api/client'
import { resolveQrCode } from '../api/qrCodes'
import type { PublicQrCode } from '../api/types'
import { Logo } from '../components/shared/Logo'

type PageState =
  | { kind: 'loading' }
  | { kind: 'redirecting'; code: string }
  | { kind: 'unassigned'; qr: PublicQrCode }
  | { kind: 'not_found'; code: string }
  | { kind: 'error'; message: string }

export function ClaimQr() {
  const { code: rawCode = '' } = useParams<{ code: string }>()
  const displayCode = rawCode.trim().toUpperCase()
  const [state, setState] = useState<PageState>({ kind: 'loading' })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!displayCode) {
        setState({ kind: 'not_found', code: '' })
        return
      }

      setState({ kind: 'loading' })
      setCopied(false)

      try {
        const qr = await resolveQrCode(displayCode)
        if (cancelled) return

        const target = qr.targetUrl?.trim()
        if (target) {
          setState({ kind: 'redirecting', code: qr.code })
          window.location.replace(target)
          return
        }

        setState({ kind: 'unassigned', qr })
      } catch (err) {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 404) {
          setState({ kind: 'not_found', code: displayCode })
          return
        }
        setState({
          kind: 'error',
          message:
            err instanceof Error ? err.message : 'Something went wrong.',
        })
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [displayCode])

  const handleCopy = async () => {
    const value =
      state.kind === 'unassigned' ? state.qr.code : displayCode
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      message.success('Code copied')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      message.error('Unable to copy')
    }
  }

  return (
    <>
      <Helmet>
        <title>
          {state.kind === 'unassigned'
            ? `${state.qr.code} — EasyReview`
            : state.kind === 'not_found'
              ? 'QR not found — EasyReview'
              : 'EasyReview QR'}
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(120%_80%_at_50%_-10%,#efe6ff_0%,#f8fafc_45%,#f1f5f9_100%)] px-4 py-10">
        <div className="w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
          <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-6 sm:px-6">
            <Logo className="min-w-0 [&_img]:h-8 [&_img]:w-8 [&_span]:text-lg" />
            {state.kind !== 'loading' && state.kind !== 'redirecting' ? (
              <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-700">
                QR Standee
              </span>
            ) : null}
          </div>

          <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-10 sm:px-6">
            {state.kind === 'loading' || state.kind === 'redirecting' ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <Trefoil size="40" stroke="4" strokeLength="0.15" bgOpacity="0.1" speed="1.4" color="#6B2FD5" />
                <p className="text-sm text-muted">Loading</p>
              </div>
            ) : null}

            {state.kind === 'unassigned' ? (
              <div className="flex w-full flex-col items-center text-center">
                <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                  Not activated yet
                </p>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <p className="font-mono text-4xl font-bold tracking-[0.2em] text-ink sm:text-5xl">
                    {state.qr.code}
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleCopy()}
                    aria-label="Copy code"
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-slate-50 text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-emerald-600" aria-hidden />
                    ) : (
                      <Copy className="h-5 w-5" aria-hidden />
                    )}
                  </button>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                  This standee hasn’t been linked to a business yet. Share the
                  code with your EasyReview agent to activate it.
                </p>
              </div>
            ) : null}

            {state.kind === 'not_found' ? (
              <div className="flex w-full flex-col items-center text-center">
                <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                  QR not found
                </p>
                <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                  This code isn’t in our system
                </h1>
                {displayCode ? (
                  <p className="mt-4 font-mono text-lg tracking-wider text-slate-400">
                    {displayCode}
                  </p>
                ) : null}
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                  Check the printed code, or ask your EasyReview contact for a
                  replacement standee.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                >
                  Go to homepage
                </Link>
              </div>
            ) : null}

            {state.kind === 'error' ? (
              <div className="text-center">
                <p className="text-sm font-medium text-ink">Something went wrong</p>
                <p className="mt-2 text-sm text-muted">{state.message}</p>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-slate-100 px-5 py-3.5">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">
              POWERED BY
            </span>
            <Logo className="opacity-80 [&_img]:h-5 [&_img]:w-5 [&_span]:text-xs" />
          </div>
        </div>
      </div>
    </>
  )
}
