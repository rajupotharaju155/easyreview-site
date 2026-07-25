import { Collapse } from 'antd'
import { faqCategories } from '../../data/content'

export function FAQAccordion() {
  return (
    <div className="space-y-10">
      {faqCategories.map((category) => (
        <div key={category.id}>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">{category.title}</h2>
          <Collapse
            bordered={false}
            expandIconPosition="end"
            className="!rounded-2xl !bg-white !px-2 sm:!px-4"
            style={{ border: '1px solid var(--color-border)' }}
            items={category.items.map((item) => ({
              key: item.id,
              label: <span className="font-medium text-ink">{item.question}</span>,
              children: (
                <p className="text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
              ),
            }))}
          />
        </div>
      ))}
    </div>
  )
}
