import { Col, Row } from 'antd'
import { Sticker, Tablet } from 'lucide-react'
import { addOns } from '../../data/content'
import { SectionHeading } from '../shared/SectionHeading'

const icons = {
  vinyl: <Sticker className="h-5 w-5" aria-hidden />,
  standee: <Tablet className="h-5 w-5" aria-hidden />,
}

export function AddOnsGrid() {
  return (
    <div>
      <SectionHeading
        title="Optional Print Materials"
        subtitle="Prefer physical QR pieces? Order branded stickers and standees when you are ready."
        className="mb-8 sm:mb-10"
      />
      <Row gutter={[20, 20]} justify="center">
        {addOns.map((item) => (
          <Col key={item.id} xs={24} sm={12} lg={10}>
            <article className="flex h-full gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                {icons[item.id as keyof typeof icons]}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                  <span className="text-sm font-semibold text-brand-600">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </div>
  )
}
