import { Col, Row } from 'antd'
import { Check } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'

const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Spanish', 'Arabic']

const sampleReview =
  'Warm service and a spotless dining area. The team remembered our order and made dinner feel effortless — highly recommend for a quick, quality meal.'

export function MultiLanguage() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="lang-heading">
      <PageContainer>
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={12}>
            <SectionHeading
              id="lang-heading"
              align="left"
              eyebrow="New"
              title="AI Reviews in Your Customers' Language"
              subtitle="Choose which languages AI drafts should use, and add custom keywords you want naturally featured — like “friendly staff” or “clean environment.”"
            />
            <ul className="mt-8 space-y-3">
              {[
                'Generate drafts in the languages your customers actually speak',
                'Add keyword targeting so reviews highlight what makes you unique',
                'Keep tone natural — drafts sound like real customers, not ads',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} lg={12}>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Language preferences
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={lang}
                    className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                      i < 3
                        ? 'bg-brand-600 text-white'
                        : 'border border-border bg-white text-slate-600'
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Sample AI draft</p>
                  <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    English
                  </span>
                </div>
                <div className="mb-3 flex gap-0.5" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">“{sampleReview}”</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['friendly staff', 'clean environment'].map((kw) => (
                    <span
                      key={kw}
                      className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </PageContainer>
    </section>
  )
}
