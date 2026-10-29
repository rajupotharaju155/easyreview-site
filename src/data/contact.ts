/** EasyReview support WhatsApp. Keep in sync with easyreview-ui `components/shared/ContactUs.tsx`. */
export const WHATSAPP_NUMBER_DISPLAY = '+91 76708 28646'
export const WHATSAPP_NUMBER_E164 = '917670828646'

const WHATSAPP_GREETING = 'Hi EasyReview, I want to grow more Google reviews.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
