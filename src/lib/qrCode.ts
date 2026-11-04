import type { CornerDotType, CornerSquareType, DotType, Options } from 'qr-code-styling'
import { downloadBlob } from './download'

export type QrFill = 'solid' | 'linear' | 'radial'
export type QrFormat = 'png' | 'jpeg' | 'svg' | 'pdf'

export interface QrDesign {
  fill: QrFill
  color: string
  color2: string
  /** Linear gradient angle in degrees */
  rotation: number
  dotType: DotType
  cornerSquareType: CornerSquareType
  cornerDotType: CornerDotType
  /** Separate colour for the three corner markers; null follows the dots */
  cornerColor: string | null
  background: string
  transparent: boolean
  /** Blank border around the code, as a percentage of the image size */
  marginPercent: number
  /** PNG data URL from readQrLogo */
  logo: string | null
  /** Share of the code's error-correction budget the logo may cover (0–1) */
  logoSize: number
}

export const DEFAULT_QR_DESIGN: QrDesign = {
  fill: 'linear',
  color: '#6b2fd5',
  color2: '#0f172a',
  rotation: 45,
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  cornerColor: null,
  background: '#ffffff',
  transparent: false,
  marginPercent: 8,
  logo: null,
  logoSize: 0.4,
}

const SCHEME = /^([a-z][a-z0-9+.-]*:\/\/|mailto:|tel:|sms:)/i
const LOGO_MAX_PX = 512
const PDF_PAGE_MM = 150
const MIN_CONTRAST = 3

/**
 * Turn what the visitor typed into the exact string to encode, or null if it isn't a usable link.
 * Going through URL also percent-encodes non-ASCII text, which the QR library would otherwise corrupt.
 */
export function normalizeQrUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    const url = new URL(SCHEME.test(trimmed) ? trimmed : `https://${trimmed}`)
    const isWeb = url.protocol === 'http:' || url.protocol === 'https:'
    if (isWeb && !url.hostname.includes('.')) return null
    return url.href
  } catch {
    return null
  }
}

function buildQrOptions(data: string, design: QrDesign, size: number): Options {
  const gradient =
    design.fill === 'solid'
      ? undefined
      : {
          type: design.fill,
          rotation: (design.rotation * Math.PI) / 180,
          colorStops: [
            { offset: 0, color: design.color },
            { offset: 1, color: design.color2 },
          ],
        }

  return {
    type: 'svg',
    width: size,
    height: size,
    margin: Math.round((size * design.marginPercent) / 100),
    data,
    image: design.logo ?? undefined,
    // A centre logo hides modules, so give the code the most redundancy QR allows.
    qrOptions: { errorCorrectionLevel: design.logo ? 'H' : 'Q' },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: design.logoSize,
      margin: Math.round(size * 0.01),
    },
    dotsOptions: { type: design.dotType, color: design.color, gradient },
    cornersSquareOptions: {
      type: design.cornerSquareType,
      color: design.cornerColor ?? undefined,
    },
    cornersDotOptions: { type: design.cornerDotType, color: design.cornerColor ?? undefined },
    backgroundOptions: { color: design.transparent ? 'transparent' : design.background },
  }
}

/** Throws when the data doesn't fit in a QR code. Loaded on demand to keep it out of the main bundle. */
export async function createQr(data: string, design: QrDesign, size: number) {
  const { default: QRCodeStyling } = await import('qr-code-styling')
  return new QRCodeStyling(buildQrOptions(data, design, size))
}

export async function downloadQr(
  data: string,
  design: QrDesign,
  format: QrFormat,
  size: number,
): Promise<void> {
  // JPEG has no alpha channel, so a transparent background would come out black.
  const exportDesign =
    format === 'jpeg' && design.transparent
      ? { ...design, transparent: false, background: '#ffffff' }
      : design
  const qr = await createQr(data, exportDesign, size)

  if (format === 'pdf') {
    const [{ jsPDF }, png] = await Promise.all([import('jspdf'), qr.getRawData('png')])
    const bytes = new Uint8Array(await (png as Blob).arrayBuffer())
    // A square page instead of A4 or Letter, so it suits every country's paper and print shop.
    const pdf = new jsPDF({ unit: 'mm', format: [PDF_PAGE_MM, PDF_PAGE_MM] })
    pdf.addImage(bytes, 'PNG', 0, 0, PDF_PAGE_MM, PDF_PAGE_MM)
    pdf.save('qr-code.pdf')
    return
  }

  const blob = await qr.getRawData(format)
  downloadBlob(blob as Blob, `qr-code.${format === 'jpeg' ? 'jpg' : format}`)
}

/** Redraw an uploaded logo as a fixed-size PNG, so every format embeds it the same way. */
export async function readQrLogo(file: File): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const image = new Image()
    image.src = url
    await image.decode()

    const { naturalWidth: width, naturalHeight: height } = image
    if (!width || !height) throw new Error('Image has no size')

    const scale = LOGO_MAX_PX / Math.max(width, height)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  } finally {
    URL.revokeObjectURL(url)
  }
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** A plain-language scanning risk for this design, or null when it looks safe. */
export function getQrScanWarning(design: QrDesign): string | null {
  if (design.transparent) {
    return 'Transparent QR codes only scan on a light surface. Check it where you plan to use it.'
  }

  const colors = [design.color]
  if (design.fill !== 'solid') colors.push(design.color2)
  if (design.cornerColor) colors.push(design.cornerColor)

  const background = luminance(design.background)
  const levels = colors.map(luminance)

  if (levels.some((level) => level > background)) {
    return 'Light codes on a dark background fail on some scanners. Use dark colors on a light background.'
  }
  const lightest = Math.max(...levels)
  if ((background + 0.05) / (lightest + 0.05) < MIN_CONTRAST) {
    return 'These colors are too close together and may not scan. Try a darker code or a lighter background.'
  }
  return null
}
