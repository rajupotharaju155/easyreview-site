import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from '../../data/contact'

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with EasyReview on WhatsApp, ${WHATSAPP_NUMBER_DISPLAY}`}
      className="group fixed right-4 z-40 flex items-center gap-2 no-underline print:hidden sm:right-6"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <span className="pointer-events-none hidden rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-ink opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        Chat with us
      </span>
      <img
        src="/assets/social-icons/WhatsApp.svg"
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-105"
      />
    </a>
  )
}
