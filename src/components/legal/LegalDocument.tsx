import { WHATSAPP_NUMBER_DISPLAY } from '../../data/contact'
import { LEGAL_CONTACT_EMAIL } from '../../data/legal'
import type { LegalSection } from '../../types/legal'

const HIGHLIGHTS = [LEGAL_CONTACT_EMAIL, WHATSAPP_NUMBER_DISPLAY]
const HIGHLIGHT_PATTERN = new RegExp(
  `(${HIGHLIGHTS.map((text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
)

/** Bolds our contact details so readers can spot how to reach us. */
function withHighlights(text: string) {
  return text.split(HIGHLIGHT_PATTERN).map((part, index) =>
    HIGHLIGHTS.includes(part) ? (
      <strong key={index} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

interface LegalDocumentProps {
  sections: LegalSection[]
}

export function LegalDocument({ sections }: LegalDocumentProps) {
  return (
    <article className="space-y-10">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {section.title}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.id}-p-${index}`}>{withHighlights(paragraph)}</p>
            ))}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.bullets.map((item, index) => (
                  <li key={`${section.id}-b-${index}`}>{withHighlights(item)}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </article>
  )
}
