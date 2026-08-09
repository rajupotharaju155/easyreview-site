import { apiGet } from './client'
import type { PublicQrCode } from './types'

export function resolveQrCode(code: string): Promise<PublicQrCode> {
  return apiGet<PublicQrCode>(`/qr-codes/${encodeURIComponent(code.trim())}`)
}
