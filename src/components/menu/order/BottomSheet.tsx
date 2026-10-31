import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

/** Panel that slides up over the menu; closes on backdrop tap or Escape. */
export function BottomSheet({
  title,
  onClose,
  children,
  footer,
  overlay,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  /** Covers the whole panel, e.g. a loader while submitting. */
  overlay?: ReactNode
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
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[88%] flex-col rounded-t-3xl bg-white shadow-[0_-12px_40px_rgba(15,23,42,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <h2 className="min-w-0 truncate font-display text-base font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">{children}</div>
        {footer ? (
          <div className="shrink-0 border-t border-slate-100 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {footer}
          </div>
        ) : null}
        {overlay ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-t-3xl bg-white/85 backdrop-blur-[2px]">
            {overlay}
          </div>
        ) : null}
      </div>
    </div>
  )
}
