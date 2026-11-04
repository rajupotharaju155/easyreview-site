import { useEffect, useRef, useState } from 'react'
import { Alert, Button, Select, message } from 'antd'
import { Download } from 'lucide-react'
import { qrDownloadFormats, qrImageSizes } from '../../data/qrGenerator'
import {
  createQr,
  downloadQr,
  getQrScanWarning,
  type QrDesign,
  type QrFormat,
} from '../../lib/qrCode'
import { SITE_URL } from '../shared/SeoHead'

const PREVIEW_SIZE = 600

interface QrPreviewProps {
  /** Normalized link to encode; null shows a dimmed sample with downloads off */
  data: string | null
  design: QrDesign
}

export function QrPreview({ data, design }: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const [size, setSize] = useState(1024)
  const [downloading, setDownloading] = useState<QrFormat | null>(null)

  useEffect(() => {
    let cancelled = false

    const render = async () => {
      try {
        const qr = await createQr(data ?? SITE_URL, design, PREVIEW_SIZE)
        // Wait for the drawing to finish so the old code never flashes empty.
        await qr.getRawData('svg')
        if (cancelled || !containerRef.current) return
        containerRef.current.replaceChildren()
        qr.append(containerRef.current)
        setFailed(false)
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    void render()
    return () => {
      cancelled = true
    }
  }, [data, design])

  const handleDownload = async (format: QrFormat) => {
    if (!data) return
    setDownloading(format)
    try {
      await downloadQr(data, design, format, size)
    } catch {
      message.error('Could not create the file. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  const warning = getQrScanWarning(design)
  const canDownload = Boolean(data) && !failed

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
      <div
        className={`mx-auto max-w-[280px] overflow-hidden rounded-xl border border-border lg:max-w-none ${design.transparent ? 'qr-transparent-grid' : ''}`}
      >
        <div
          ref={containerRef}
          role="img"
          aria-label={data ? `QR code for ${data}` : 'Sample QR code'}
          className={`[&>svg]:block [&>svg]:h-auto [&>svg]:w-full ${canDownload ? '' : 'opacity-25'}`}
        />
      </div>

      <div className="mt-4 space-y-3">
        {failed ? (
          <Alert
            type="error"
            showIcon
            title="Couldn't create this QR code. If the link is very long, try a shorter one."
          />
        ) : null}
        {!failed && !data ? (
          <p className="text-center text-sm text-muted">Enter your URL to download your QR code.</p>
        ) : null}
        {!failed && data && warning ? <Alert type="warning" showIcon title={warning} /> : null}

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink">Image size</p>
          <Select
            aria-label="Image size"
            className="w-full"
            value={size}
            onChange={setSize}
            options={qrImageSizes.map((value) => ({
              value,
              label: `${value} × ${value} px`,
            }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {qrDownloadFormats.map(({ format, label }) => (
            <Button
              key={format}
              size="large"
              type={format === 'png' ? 'primary' : 'default'}
              disabled={!canDownload}
              loading={downloading === format}
              icon={<Download size={16} aria-hidden />}
              onClick={() => void handleDownload(format)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
