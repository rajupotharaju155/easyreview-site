import { Download, FileImage, Image, Infinity as InfinityIcon, Palette, UserX } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CornerDotType, CornerSquareType, DotType } from 'qr-code-styling'
import type { QrDesign, QrFormat } from '../lib/qrCode'
import type { FAQCategory } from '../types'

export const dotTypeOptions: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy rounded' },
]

export const cornerSquareOptions: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Rounded' },
  { value: 'dot', label: 'Circle' },
]

export const cornerDotOptions: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Circle' },
]

export const qrColorPresets: {
  name: string
  design: Pick<QrDesign, 'fill' | 'color' | 'color2'>
}[] = [
  { name: 'Classic', design: { fill: 'solid', color: '#0f172a', color2: '#0f172a' } },
  { name: 'Violet', design: { fill: 'linear', color: '#6b2fd5', color2: '#0f172a' } },
  { name: 'Ocean', design: { fill: 'linear', color: '#0369a1', color2: '#0f766e' } },
  { name: 'Sunset', design: { fill: 'linear', color: '#c2410c', color2: '#be123c' } },
  { name: 'Forest', design: { fill: 'linear', color: '#166534', color2: '#0f766e' } },
  { name: 'Berry', design: { fill: 'radial', color: '#9d174d', color2: '#4c1d95' } },
]

export const qrDownloadFormats: { format: QrFormat; label: string }[] = [
  { format: 'png', label: 'PNG' },
  { format: 'svg', label: 'SVG' },
  { format: 'pdf', label: 'PDF' },
  { format: 'jpeg', label: 'JPG' },
]

export const qrImageSizes = [512, 1024, 2048, 4096]

export const qrSteps = [
  {
    title: 'Paste your URL',
    description: 'Enter any website, menu, review page, or social profile link.',
  },
  {
    title: 'Style your QR code',
    description:
      'Pick colors or a gradient, choose the dot shape, and add your logo in the center.',
  },
  {
    title: 'Download and print',
    description: 'Save it as PNG, SVG, PDF, or JPG. Scan a test print before you order in bulk.',
  },
]

export const qrFeatures: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Free, with no watermark',
    description: 'Make as many QR codes as you like. Nothing is added to your design.',
    icon: Download,
  },
  {
    title: 'No sign-up',
    description: 'No account and no email address. Open the page and create your code.',
    icon: UserX,
  },
  {
    title: 'QR code with logo',
    description: 'Upload your logo and place it in the center of the code, at the size you want.',
    icon: Image,
  },
  {
    title: 'Gradient colors',
    description: 'Use solid colors, linear gradients, or radial gradients to match your brand.',
    icon: Palette,
  },
  {
    title: 'Print-ready downloads',
    description: 'Get a vector SVG for any size, plus PNG, JPG, and PDF up to 4096 pixels.',
    icon: FileImage,
  },
  {
    title: 'Codes that never expire',
    description:
      'Your link is stored in the code itself, so scans are unlimited and never time out.',
    icon: InfinityIcon,
  },
]

export const qrFaqCategories: FAQCategory[] = [
  {
    id: 'qr-code-generator',
    title: 'QR code generator FAQ',
    items: [
      {
        id: 'free',
        question: 'Is this QR code generator really free?',
        answer:
          'Yes. You can create and download QR codes for free, with no sign-up and no watermark.',
      },
      {
        id: 'expire',
        question: 'Do these QR codes expire?',
        answer:
          'No. These are static QR codes: your link is stored in the code itself and does not pass through a redirect. The code keeps working for as long as your link does, with no limit on scans.',
      },
      {
        id: 'logo',
        question: 'How do I make a QR code with a logo?',
        answer:
          'Enter your URL, then upload a PNG, JPG, WebP, or SVG image in the Logo section. The logo sits in the center of the code, and you can resize it with the slider.',
      },
      {
        id: 'logo-scan',
        question: 'Will a logo or gradient stop my QR code from scanning?',
        answer:
          'Usually not. When you add a logo, the generator switches to the highest error correction level so the code can still be read. Keep the code darker than its background, and test it with a few phones before printing.',
      },
      {
        id: 'format',
        question: 'Which file format is best for printing?',
        answer:
          'SVG is best for professional printing because it stays sharp at any size. PDF suits office printers and print shops, and PNG works well for websites, documents, and social media.',
      },
      {
        id: 'size',
        question: 'What is the smallest size I can print a QR code?',
        answer:
          'A common guideline is at least 2 cm (0.8 in) across for something held in the hand, like a business card. For posters, make the code about one tenth of the distance people will scan it from.',
      },
      {
        id: 'edit',
        question: 'Can I change the link after printing?',
        answer:
          'No. The link is part of the code, so a new link needs a new QR code. Check the link carefully before you print.',
      },
      {
        id: 'track',
        question: 'Can I track how many people scan my QR code?',
        answer:
          'Not with these codes, because scans go straight to your link. You can use the analytics on your own website to see those visits.',
      },
    ],
  },
]
