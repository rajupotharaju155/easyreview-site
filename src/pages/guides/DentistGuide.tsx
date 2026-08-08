import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../../components/shared/SeoHead'
import { getGuideBySlug } from '../../data/guides'

const GUIDE = getGuideBySlug('dental-practices-5-star-google-reviews')!

const OFFICE_IMG = '/assets/blogs/dentist/dentist-office-landscape.jpg'
const PATIENT_IMG = '/assets/blogs/dentist/dentist-doctor-n-patient-portrait.jpg'

export function DentistGuide() {
  return (
    <>
      <SeoHead
        path={GUIDE.path}
        title={`${GUIDE.title} — EasyReview`}
        description={GUIDE.description}
        imageUrl={`${SITE_URL}${GUIDE.ogImage}`}
        imageAlt="How dental practices can get more 5-star Google reviews"
        imageWidth="1200"
        imageHeight="630"
        ogType="article"
      />

      <article>
        <header className="hero-atmosphere border-b border-border py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {GUIDE.category} · {GUIDE.readMinutes} min read
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl sm:leading-tight">
              {GUIDE.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Treatment went well, the patient feels relief, pays, and leaves. Then Google stays
              quiet. The easiest win is asking before they walk out — while keeping sensitive
              feedback private.
            </p>
          </PageContainer>
        </header>

        <div className="bg-white py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <div className="space-y-10 text-base leading-relaxed text-ink/90 sm:text-[1.05rem] sm:leading-8">
              <p>
                Cleaning is done. Filling is finished. Staff was polite — and still no Google
                review. Not because the patient disliked the clinic. Because asking feels awkward,
                WhatsApp later feels pushy, and once they leave, they forget.
              </p>

              <p>Dental practices that grow their Google rating use one clear idea:</p>

              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-5 pr-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Don’t wait for a follow-up SMS. Catch the review at checkout — while the patient is
                still in your clinic.
              </blockquote>

              <p>That’s how more 5-star reviews show up on Google.</p>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Why good clinics still look quiet on Google
                </h2>
                <p>Most clinics already “ask for reviews.” Timing is usually wrong:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>A note on the bill that patients ignore</li>
                  <li>A WhatsApp message days later</li>
                  <li>Reception asking while the next patient is already waiting</li>
                </ul>
                <p>
                  Unhappy patients are faster. One long wait or billing confusion can become a
                  public 1-star overnight. Happy patients rarely open Google on their own.
                </p>
                <p>
                  For dental care, privacy also matters. Not every complaint should go public. So
                  this is a <strong className="font-semibold text-ink">timing</strong> problem —
                  and a problem of sensitive feedback going public too fast.
                </p>
              </section>

              <figure className="space-y-3">
                <img
                  src={OFFICE_IMG}
                  alt="Dental clinic office — a natural place to ask for a Google review after treatment"
                  width={1600}
                  height={1067}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                />
                <figcaption className="text-sm text-muted">
                  A smooth visit creates trust. A simple QR at reception turns that trust into a
                  Google review.
                </figcaption>
              </figure>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The method: one QR, two outcomes
                </h2>
                <p>Here’s a flow that works for dental clinics and multi-chair practices:</p>
                <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                  <li>
                    Place a QR at{' '}
                    <strong className="font-semibold text-ink">
                      reception / billing after treatment
                    </strong>
                  </li>
                  <li>Patient scans and rates the visit in a few seconds</li>
                  <li>
                    <strong className="font-semibold text-ink">Happy patients (4–5★)</strong> continue
                    to leave a public Google review — often with ready text they can edit and post
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">Unhappy patients (1–3★)</strong> send
                    feedback <strong className="font-semibold text-ink">only to you</strong>, so your
                    team can fix it privately before it hits Google
                  </li>
                </ol>
                <p>
                  Same QR. Two paths. Reception doesn’t need a long speech — and one rough
                  appointment doesn’t automatically become a public review.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Where should you place the QR?
                </h2>
                <p>Put it where patients naturally pause with a phone nearby:</p>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[28rem] text-left text-sm">
                    <thead className="bg-surface text-ink">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Place</th>
                        <th className="px-4 py-3 font-semibold">Why it works</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-ink/85">
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Reception / billing desk</td>
                        <td className="px-4 py-3">Natural stop after treatment</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Waiting area standee</td>
                        <td className="px-4 py-3">Easy to notice before or after the visit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Checkout counter</td>
                        <td className="px-4 py-3">Last moment before patients leave</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Exit area</td>
                        <td className="px-4 py-3">Gentle reminder without interrupting clinical flow</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>Keep the message simple and respectful:</p>
                <blockquote className="rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-4 text-ink">
                  <p className="font-semibold">Was your visit smooth?</p>
                  <p className="mt-1 text-muted">
                    Scan for a 20-second review — it helps other patients choose us with confidence.
                  </p>
                </blockquote>
                <p>No pressure. No long speech.</p>
              </section>

              <section className="grid items-start gap-6 sm:grid-cols-2 sm:gap-8">
                <div className="order-2 space-y-4 sm:order-1">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    What you can start this week
                  </h2>
                  <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                    <li>
                      <strong className="font-semibold text-ink">Print a few QR standees</strong>{' '}
                      for reception and billing first
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Brief front desk in 5 minutes</strong>
                      : “If the patient seems fine at checkout, point to the QR. Don’t force it.”
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Act on private low ratings the same day
                      </strong>{' '}
                      — a call from the clinic, clarifying billing, or a clear apology
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Reply to every new Google review
                      </strong>{' '}
                      within a day or two
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Check once a week</strong>: scans
                      vs new Google reviews
                    </li>
                  </ol>
                  <p className="text-ink/85">
                    A quiet habit at checkout beats one big “please review us” campaign that patients
                    ignore later.
                  </p>
                </div>
                <img
                  src={PATIENT_IMG}
                  alt="Dentist with patient — best moment to invite a Google review after treatment"
                  width={900}
                  height={1350}
                  loading="lazy"
                  className="order-1 w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5 sm:order-2 sm:sticky sm:top-24"
                />
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Common mistakes to avoid
                </h2>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>QR with only “Scan me” — patients don’t trust mystery codes</li>
                  <li>Asking only after a complaint</li>
                  <li>Sending SMS review links to every contact in your patient list</li>
                  <li>
                    Letting every unhappy visit post straight to Google with no private filter
                  </li>
                  <li>
                    A process that only works when the doctor is free — not during a busy OPD day
                  </li>
                </ul>
                <p>
                  If reception can’t explain it in under 10 seconds, patients won’t use it either.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  What you can expect in 30–60 days
                </h2>
                <p>Clinics that stick with this usually notice:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>
                    More <strong className="font-semibold text-ink">recent</strong> Google reviews
                    (new reviews help when people search for dentists nearby)
                  </li>
                  <li>Fewer surprise public 1-stars, because low feedback comes to you first</li>
                  <li>Less awkward asking at reception</li>
                  <li>
                    A Google page that looks active when people compare you with other clinics nearby
                  </li>
                </ul>
                <p>
                  Google doesn’t only look at old ratings. It also looks at whether patients still
                  trust you today.
                </p>
              </section>

              <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Want to try this in your dental practice?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  EasyReview gives you a QR for reception and billing. Happy patients go to Google.
                  Unhappy patients message you privately. Patients can also use ready-made review
                  text they can edit before posting.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 no-underline transition-opacity hover:opacity-90"
                  >
                    See pricing
                  </Link>
                  <Link
                    to="/demo-video"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
                  >
                    Watch demo
                  </Link>
                  <Link
                    to="/competitor-analysis"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
                  >
                    Compare competitors
                  </Link>
                </div>
                <p className="mt-6 text-sm text-white/70">
                  Your happiest patients are already at the front desk. Make it easy for them to say
                  so on Google.
                </p>
              </section>

              <p className="text-sm text-muted">
                <Link
                  to="/guides"
                  className="font-medium text-brand-700 no-underline hover:underline"
                >
                  ← All guides
                </Link>
              </p>
            </div>
          </PageContainer>
        </div>
      </article>
    </>
  )
}
