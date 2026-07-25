import { Collapse } from 'antd'
import { pricingFaqs } from '../../data/content'
import { SectionHeading } from '../shared/SectionHeading'

export function PricingFAQ() {
  const items = pricingFaqs.map((faq) => ({
    key: faq.id,
    label: <span className="font-medium text-ink">{faq.question}</span>,
    children: <p className="text-sm leading-relaxed text-muted">{faq.answer}</p>,
  }))

  return (
    <div>
      <SectionHeading
        title="Pricing Questions"
        subtitle="Quick answers about plans, billing, and add-ons."
        className="mb-8"
      />
      <Collapse
        bordered={false}
        expandIconPosition="end"
        className="!rounded-2xl !bg-white !px-2 sm:!px-4"
        style={{ border: '1px solid var(--color-border)' }}
        items={items}
      />
    </div>
  )
}
