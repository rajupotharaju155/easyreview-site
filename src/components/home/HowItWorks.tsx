import { Col, Row } from 'antd'
import { ArrowRight } from 'lucide-react'
import { howItWorksSteps } from '../../data/content'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'

export function HowItWorks() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="how-heading">
      <PageContainer>
        <SectionHeading
          id="how-heading"
          eyebrow="Pure simplicity"
          title="How EasyReview Works"
          subtitle="Place a QR code at checkout. We handle the rest."
          className="mb-10 sm:mb-12"
        />

        <FlowDiagram />

        <Row gutter={[20, 20]} className="mt-10">
          {howItWorksSteps.map((step, index) => (
            <Col key={step.id} xs={24} md={8}>
              <article className="relative h-full rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-brand-600">{step.step}</span>
                  {index < howItWorksSteps.length - 1 ? (
                    <ArrowRight className="hidden h-4 w-4 text-brand-200 md:block" aria-hidden />
                  ) : null}
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </article>
            </Col>
          ))}
        </Row>
      </PageContainer>
    </section>
  )
}

function FlowDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <svg
        viewBox="0 0 720 140"
        className="mx-auto hidden w-full max-w-3xl md:block"
        role="img"
        aria-label="Flow: QR scan, smart routing, then Google post or private feedback"
      >
        <FlowNode x={40} label="QR Scan" sub="At counter" />
        <Arrow x1={150} x2={210} />
        <FlowNode x={220} label="Rate visit" sub="1–5 stars" />
        <Arrow x1={330} x2={390} />
        <FlowNode x={400} label="AI draft" sub="If 4–5★" accent />
        <Arrow x1={510} x2={570} />
        <FlowNode x={580} label="Google" sub="Paste & post" accent />
        <path
          d="M290 95 C290 120, 360 125, 400 125"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x="345" y="138" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="DM Sans">
          1–3★ → private feedback
        </text>
      </svg>

      {/* Mobile-friendly stacked labels */}
      <ol className="flex flex-col gap-3 md:hidden">
        {['Scan QR', 'Rate visit', 'AI draft (4–5★) or private form (1–3★)', 'Post to Google'].map(
          (item, i) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-slate-700"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              {item}
            </li>
          ),
        )}
      </ol>
    </div>
  )
}

function FlowNode({
  x,
  label,
  sub,
  accent,
}: {
  x: number
  label: string
  sub: string
  accent?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={28}
        width={100}
        height={56}
        rx={14}
        fill={accent ? '#f3eaff' : '#f8fafc'}
        stroke={accent ? '#6b2fd5' : '#e2e8f0'}
      />
      <text
        x={x + 50}
        y={52}
        textAnchor="middle"
        fill="#0f172a"
        fontSize="12"
        fontWeight="600"
        fontFamily="Outfit"
      >
        {label}
      </text>
      <text x={x + 50} y={70} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="DM Sans">
        {sub}
      </text>
    </g>
  )
}

function Arrow({ x1, x2 }: { x1: number; x2: number }) {
  return (
    <g>
      <line x1={x1} y1={56} x2={x2} y2={56} stroke="#c9a9ff" strokeWidth="2" />
      <polygon points={`${x2},56 ${x2 - 6},52 ${x2 - 6},60`} fill="#c9a9ff" />
    </g>
  )
}
