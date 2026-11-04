import type { ReactNode } from 'react'
import { Button, ColorPicker, Segmented, Select, Slider, Switch, Upload, message } from 'antd'
import { Trash2, Upload as UploadIcon } from 'lucide-react'
import {
  cornerDotOptions,
  cornerSquareOptions,
  dotTypeOptions,
  qrColorPresets,
} from '../../data/qrGenerator'
import { readQrLogo, type QrDesign, type QrFill } from '../../lib/qrCode'

const MAX_LOGO_BYTES = 5 * 1024 * 1024

const FILL_OPTIONS: { value: QrFill; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
]

interface QrDesignControlsProps {
  design: QrDesign
  onChange: (patch: Partial<QrDesign>) => void
}

export function QrDesignControls({ design, onChange }: QrDesignControlsProps) {
  const handleLogo = async (file: File) => {
    if (file.size > MAX_LOGO_BYTES) {
      message.error('Please choose an image under 5 MB.')
      return
    }
    try {
      onChange({ logo: await readQrLogo(file) })
    } catch {
      message.error('Could not read that image. Please try a PNG or JPG.')
    }
  }

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      <ControlSection title="Colors">
        <div className="flex flex-wrap gap-2">
          {qrColorPresets.map((preset) => {
            const { fill, color, color2 } = preset.design
            const selected =
              design.fill === fill && design.color === color && design.color2 === color2
            return (
              <button
                key={preset.name}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(preset.design)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-2.5 py-1.5 text-sm font-medium text-ink transition-colors ${selected ? 'border-brand-600' : 'border-border hover:border-brand-200'}`}
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color2})` }}
                />
                {preset.name}
              </button>
            )
          })}
        </div>

        <Field label="Fill">
          <Segmented
            block
            options={FILL_OPTIONS}
            value={design.fill}
            onChange={(fill) => onChange({ fill })}
          />
        </Field>

        <div className="flex flex-wrap gap-4">
          <Field label={design.fill === 'solid' ? 'Color' : 'Start color'}>
            <ColorPicker
              disabledAlpha
              showText
              value={design.color}
              onChange={(color) => onChange({ color: color.toHexString() })}
            />
          </Field>
          {design.fill !== 'solid' ? (
            <Field label="End color">
              <ColorPicker
                disabledAlpha
                showText
                value={design.color2}
                onChange={(color) => onChange({ color2: color.toHexString() })}
              />
            </Field>
          ) : null}
        </div>

        {design.fill === 'linear' ? (
          <Field label={`Gradient angle: ${design.rotation}°`}>
            <Slider
              min={0}
              max={360}
              step={15}
              value={design.rotation}
              ariaLabelForHandle="Gradient angle"
              onChange={(rotation) => onChange({ rotation })}
            />
          </Field>
        ) : null}
      </ControlSection>

      <ControlSection title="Shape">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Dots">
            <Select
              aria-label="Dot style"
              className="w-full"
              options={dotTypeOptions}
              value={design.dotType}
              onChange={(dotType) => onChange({ dotType })}
            />
          </Field>
          <Field label="Corner frame">
            <Select
              aria-label="Corner frame style"
              className="w-full"
              options={cornerSquareOptions}
              value={design.cornerSquareType}
              onChange={(cornerSquareType) => onChange({ cornerSquareType })}
            />
          </Field>
          <Field label="Corner dot">
            <Select
              aria-label="Corner dot style"
              className="w-full"
              options={cornerDotOptions}
              value={design.cornerDotType}
              onChange={(cornerDotType) => onChange({ cornerDotType })}
            />
          </Field>
        </div>

        <div className="flex min-h-8 flex-wrap items-center gap-3">
          <Switch
            aria-label="Use a different color for the corners"
            checked={design.cornerColor !== null}
            onChange={(on) => onChange({ cornerColor: on ? design.color : null })}
          />
          <span className="text-sm text-ink">Different corner color</span>
          {design.cornerColor !== null ? (
            <ColorPicker
              disabledAlpha
              value={design.cornerColor}
              onChange={(color) => onChange({ cornerColor: color.toHexString() })}
            />
          ) : null}
        </div>
      </ControlSection>

      <ControlSection title="Logo">
        <div className="flex flex-wrap items-center gap-3">
          {design.logo ? (
            <img
              src={design.logo}
              alt="Your logo"
              className="h-10 w-10 rounded-lg border border-border object-contain"
            />
          ) : null}
          <Upload
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            showUploadList={false}
            beforeUpload={(file) => {
              void handleLogo(file)
              return false
            }}
          >
            <Button icon={<UploadIcon size={16} aria-hidden />}>
              {design.logo ? 'Change logo' : 'Upload logo'}
            </Button>
          </Upload>
          {design.logo ? (
            <Button
              type="text"
              icon={<Trash2 size={16} aria-hidden />}
              onClick={() => onChange({ logo: null })}
            >
              Remove
            </Button>
          ) : null}
        </div>
        <p className="text-sm text-muted">PNG, JPG, WebP, or SVG, up to 5 MB.</p>

        {design.logo ? (
          <Field label="Logo size">
            <Slider
              min={0.2}
              max={0.5}
              step={0.05}
              value={design.logoSize}
              tooltip={{ open: false }}
              ariaLabelForHandle="Logo size"
              onChange={(logoSize) => onChange({ logoSize })}
            />
          </Field>
        ) : null}
      </ControlSection>

      <ControlSection title="Background">
        <div className="flex min-h-8 flex-wrap items-center gap-3">
          {!design.transparent ? (
            <ColorPicker
              disabledAlpha
              showText
              value={design.background}
              onChange={(color) => onChange({ background: color.toHexString() })}
            />
          ) : null}
          <Switch
            aria-label="Transparent background"
            checked={design.transparent}
            onChange={(transparent) => onChange({ transparent })}
          />
          <span className="text-sm text-ink">Transparent</span>
        </div>

        <Field label={`Border: ${design.marginPercent}%`}>
          <Slider
            min={4}
            max={15}
            value={design.marginPercent}
            tooltip={{ open: false }}
            ariaLabelForHandle="Border size"
            onChange={(marginPercent) => onChange({ marginPercent })}
          />
        </Field>
      </ControlSection>
    </div>
  )
}

function ControlSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 p-4 sm:p-5">
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      {children}
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-ink">{label}</p>
      {children}
    </div>
  )
}
