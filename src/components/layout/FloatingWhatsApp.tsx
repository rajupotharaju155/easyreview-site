import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from '../../data/contact'

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp with EasyReview, ${WHATSAPP_NUMBER_DISPLAY}`}
      className="fixed right-3 z-40 flex items-center gap-1.5 rounded-full bg-[#25D366] py-1 pr-3.5 pl-1 font-semibold text-white no-underline shadow-lg transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[#1ebe5b] print:hidden sm:right-6 sm:gap-2 sm:py-1.5 sm:pr-5 sm:pl-1.5"
      style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      {/* The icon's own circle is the same green, so only the white glyph shows on the pill. */}
      <img
        src="/assets/social-icons/WhatsApp.svg"
        alt=""
        width={40}
        height={40}
        className="h-8 w-8 sm:h-10 sm:w-10"
      />
      <span className="text-[13px] sm:text-base">Chat on WhatsApp</span>
    </a>
  )
}
