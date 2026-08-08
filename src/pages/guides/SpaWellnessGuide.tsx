import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../../components/shared/SeoHead'
import { getGuideBySlug } from '../../data/guides'

const GUIDE = getGuideBySlug('spa-wellness-google-reviews')!

const LANDSCAPE_IMG = '/assets/blogs/spa-wellness/spa-lady-landscape.jpg'
const PORTRAIT_IMG = '/assets/blogs/spa-wellness/spa-room-portrait.jpg'

export function SpaWellnessGuide() {
  return (
    <>
      <SeoHead
        path={GUIDE.path}
        title={`${GUIDE.title} — EasyReview`}
        description={GUIDE.description}
        imageUrl={`${SITE_URL}${GUIDE.ogImage}`}
        imageAlt="A simple system for spas and wellness centres to get more 5-star Google ratings"
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
              Client finishes a massage or facial, feels calm, pays, and leaves — then Google stays
              quiet. The simple win is asking at checkout, while they still feel refreshed.
            </p>
          </PageContainer>
        </header>

        <div className="bg-white py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <div className="space-y-10 text-base leading-relaxed text-ink/90 sm:text-[1.05rem] sm:leading-8">
              <p>
                Treatment went well. Soft music. Soft towels. Client feels better — and still no
                Google review. Not because they disliked your spa. Because asking feels awkward,
                WhatsApp later feels pushy, and once they leave the calm, they forget.
              </p>

              <p>Spas and wellness centres that grow their Google rating use one clear idea:</p>

              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-5 pr-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Don’t wait for a follow-up message. Catch the review right after the treatment —
                while the client is still relaxed and happy.
              </blockquote>

              <p>That’s a simple system for more 5-star ratings.</p>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Why good spas still look quiet on Google
                </h2>
                <p>Most owners already ask. Timing is usually the issue:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>A line on the bill that clients never notice</li>
                  <li>A WhatsApp message hours after they get home</li>
                  <li>Staff asking while preparing the next treatment room</li>
                </ul>
                <p>
                  Unhappy clients are faster. One rushed session or billing surprise can become a
                  public 1-star overnight. Happy clients rarely open Google on their own.
                </p>
                <p>
                  So this is often not a service problem. It’s a{' '}
                  <strong className="font-semibold text-ink">timing</strong> problem — and a problem
                  of bad feedback going public too fast.
                </p>
              </section>

              <figure className="space-y-3">
                <img
                  src={LANDSCAPE_IMG}
                  alt="Spa guest during a wellness treatment — natural moment to request a Google review"
                  width={1600}
                  height={1068}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                />
                <figcaption className="text-sm text-muted">
                  A good treatment creates calm. A simple QR at reception turns that calm into a
                  Google review.
                </figcaption>
              </figure>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The method: one QR, two outcomes
                </h2>
                <p>Here’s a flow that works for spas, massage studios, and wellness clinics:</p>
                <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                  <li>
                    Place a QR at{' '}
                    <strong className="font-semibold text-ink">
                      reception, lounge, or checkout
                    </strong>
                  </li>
                  <li>Client scans and rates the visit in a few seconds</li>
                  <li>
                    <strong className="font-semibold text-ink">Happy clients (4–5★)</strong> continue
                    to leave a public Google review — often with ready text they can edit and post
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">Unhappy clients (1–3★)</strong> send
                    feedback <strong className="font-semibold text-ink">only to you</strong>, so your
                    team can fix it before it hits Google
                  </li>
                </ol>
                <p>
                  Same QR. Two paths. Your therapists don’t need a speech between sessions — and one
                  off day doesn’t automatically become a public review.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Where should you place the QR?
                </h2>
                <p>Put it where clients naturally pause with a phone nearby:</p>
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
                        <td className="px-4 py-3 font-medium text-ink">Reception / checkout</td>
                        <td className="px-4 py-3">Best moment after a good session ends</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Waiting lounge standee</td>
                        <td className="px-4 py-3">Clients notice it while they sit and unwind</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Near treatment room exit</td>
                        <td className="px-4 py-3">Catch them while they still feel relaxed</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Bill / package card</td>
                        <td className="px-4 py-3">Extra reminder at payment (keep copy short)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>Keep the message simple:</p>
                <blockquote className="rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-4 text-ink">
                  <p className="font-semibold">Feeling renewed?</p>
                  <p className="mt-1 text-muted">
                    Scan for a 20-second review — it helps new guests discover us.
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
                      for reception and the lounge first
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Brief the team in 5 minutes</strong>
                      : “If the client feels good after the session, just point to the QR. Don’t
                      force it.”
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Act on private low ratings the same day
                      </strong>{' '}
                      — a call, a complimentary add-on, or a clear apology
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
                    A quiet habit after every treatment beats one big “please review us” campaign
                    that guests ignore later.
                  </p>
                </div>
                <img
                  src={PORTRAIT_IMG}
                  alt="Spa treatment room — calm setting where guests feel ready to leave a Google review"
                  width={900}
                  height={1125}
                  loading="lazy"
                  className="order-1 w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5 sm:order-2 sm:sticky sm:top-24"
                />
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Common mistakes to avoid
                </h2>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>QR with only “Scan me” — clients don’t trust mystery codes</li>
                  <li>Asking only after a complaint</li>
                  <li>Sending SMS review links to every booking number</li>
                  <li>Letting every bad day post straight to Google with no private filter</li>
                  <li>
                    A process that only works when the owner is free — not during weekend rush
                  </li>
                </ul>
                <p>
                  If your staff can’t explain it in under 10 seconds, clients won’t use it either.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  What you can expect in 30–60 days
                </h2>
                <p>Spas that stick with this usually notice:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>
                    More <strong className="font-semibold text-ink">recent</strong> Google reviews
                    (new reviews help when people search “spa near me”)
                  </li>
                  <li>Fewer surprise public 1-stars, because low feedback comes to you first</li>
                  <li>Less awkward asking at reception</li>
                  <li>
                    A Google page that looks active when people compare you with other wellness
                    centres nearby
                  </li>
                </ul>
                <p>
                  Google doesn’t only look at old ratings. It also looks at whether guests still
                  trust you today.
                </p>
              </section>

              <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Want to try this in your spa?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  EasyReview gives you a QR for reception and the lounge. Happy clients go to
                  Google. Unhappy clients message you privately. Clients can also use ready-made
                  review text they can edit before posting.
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
                  Your happiest guests are already at reception. Make it easy for them to say so on
                  Google.
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
