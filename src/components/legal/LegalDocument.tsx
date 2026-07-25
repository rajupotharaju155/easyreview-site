import type { LegalSection } from '../../types/legal'

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
              <p key={`${section.id}-p-${index}`}>{paragraph}</p>
            ))}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.bullets.map((item, index) => (
                  <li key={`${section.id}-b-${index}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </article>
  )
}
