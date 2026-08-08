import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../../components/shared/SeoHead'
import { getGuideBySlug } from '../../data/guides'

const GUIDE = getGuideBySlug('turn-members-into-5-star-google-review')!

const GYM_FLOOR_IMG = '/assets/blogs/gym/gym-ambience-landscape.jpg'
const WORKOUT_IMG = '/assets/blogs/gym/gym-person-chest-excersice-portrait.jpg'

export function GymGuide() {
  return (
    <>
      <SeoHead
        path={GUIDE.path}
        title={`${GUIDE.title} — EasyReview`}
        description={GUIDE.description}
        imageUrl={`${SITE_URL}${GUIDE.ogImage}`}
        imageAlt="How to turn happy gym members into 5-star Google reviews"
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
              Members finish a solid session, fist-bump the trainer, and walk out. Then Google stays
              quiet. The easiest win is asking while they still feel good — not days later on
              WhatsApp.
            </p>
          </PageContainer>
        </header>

        <div className="bg-white py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <div className="space-y-10 text-base leading-relaxed text-ink/90 sm:text-[1.05rem] sm:leading-8">
              <p>
                Class was packed. Equipment was clean. Someone hit a PR and left smiling — still no
                Google review. Not because they disliked your gym. Because asking feels awkward,
                WhatsApp reminders feel pushy, and once members leave the floor, they forget.
              </p>

              <p>Gyms that slowly grow their Google rating use one clear idea:</p>

              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-5 pr-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Don’t wait for renewal season. Catch the review after a good workout — while the
                member is still happy.
              </blockquote>

              <p>That’s how happy members become 5-star Google reviews.</p>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Why busy gyms still look empty on Google
                </h2>
                <p>Most owners already “ask for reviews.” Timing is usually wrong:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>A poster near the washroom that people walk past</li>
                  <li>A WhatsApp broadcast once a month</li>
                  <li>Staff asking at peak hour when everyone is rushing out</li>
                </ul>
                <p>
                  Upset members are faster. One broken machine or rude checkout experience can
                  become a public 1-star overnight. Happy members rarely open Google on their own.
                </p>
                <p>
                  So this is often not a “your gym is bad” problem. It’s a{' '}
                  <strong className="font-semibold text-ink">timing</strong> problem — and a problem
                  of bad feedback going public too fast.
                </p>
              </section>

              <figure className="space-y-3">
                <img
                  src={GYM_FLOOR_IMG}
                  alt="Gym floor with equipment — when members feel good after a workout and may review"
                  width={1600}
                  height={1070}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                />
                <figcaption className="text-sm text-muted">
                  A good session creates the feeling. A simple QR at the desk or exit gives members
                  an easy way to turn that feeling into a Google review.
                </figcaption>
              </figure>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The method: one QR, two outcomes
                </h2>
                <p>Here’s a flow that works for gyms, studios, and fitness centers:</p>
                <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                  <li>
                    Place a QR at the{' '}
                    <strong className="font-semibold text-ink">front desk, exit, or locker area</strong>
                  </li>
                  <li>Member scans and rates the visit in a few seconds</li>
                  <li>
                    <strong className="font-semibold text-ink">Happy members (4–5★)</strong> continue
                    to leave a public Google review — often with ready text they can edit and post
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">Unhappy members (1–3★)</strong> send
                    feedback <strong className="font-semibold text-ink">only to you</strong>, so your
                    team can fix it before it hits Google
                  </li>
                </ol>
                <p>
                  Same QR. Two paths. Your front desk doesn’t need a long pitch — and one bad day
                  doesn’t automatically become a public review.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Where should you place the QR?
                </h2>
                <p>Put it where members already pause with a phone nearby:</p>
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
                        <td className="px-4 py-3 font-medium text-ink">Front desk / entry</td>
                        <td className="px-4 py-3">Natural stop at check-in or checkout</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Near the exit</td>
                        <td className="px-4 py-3">Catch members after a good workout</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Locker / shoe area</td>
                        <td className="px-4 py-3">People slow down and often check phones</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">After group class</td>
                        <td className="px-4 py-3">Energy is high; trainer can gently point to QR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>Keep the message simple:</p>
                <blockquote className="rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-4 text-ink">
                  <p className="font-semibold">Good session today?</p>
                  <p className="mt-1 text-muted">
                    Scan for a 20-second review — it helps new members find us.
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
                      for the desk and exit first
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Brief staff in 5 minutes</strong>:
                      “If a member seems happy leaving, just point to the QR. Don’t force it.”
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Act on private low ratings the same day
                      </strong>{' '}
                      — fix the AC, follow up on billing, or a quick call from the manager
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
                    A quiet daily habit at the desk beats one big renewal-season “please review us”
                    campaign.
                  </p>
                </div>
                <img
                  src={WORKOUT_IMG}
                  alt="Gym member working out — happy members are the best source of Google reviews"
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
                  <li>QR with only “Scan me” — members don’t trust mystery codes</li>
                  <li>Asking only after a complaint or cancellation</li>
                  <li>Sending review SMS to every contact in your membership list</li>
                  <li>Letting every bad evening post straight to Google with no private filter</li>
                  <li>
                    A process that only works when the owner is free — not during evening rush
                  </li>
                </ul>
                <p>
                  If your team can’t explain it in under 10 seconds, members won’t use it either.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  What you can expect in 30–60 days
                </h2>
                <p>Gyms that stick with this usually notice:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>
                    More <strong className="font-semibold text-ink">recent</strong> Google reviews
                    (new reviews help when people search for gyms nearby)
                  </li>
                  <li>Fewer surprise public 1-stars, because low feedback comes to you first</li>
                  <li>Less awkward asking at the desk</li>
                  <li>
                    A Google page that looks active when people compare you with other gyms in the
                    area
                  </li>
                </ul>
                <p>
                  Google doesn’t only look at old ratings. It also looks at whether members still
                  talk about you today.
                </p>
              </section>

              <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Want to try this in your gym?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  EasyReview gives you a QR for your front desk and exit. Happy members go to
                  Google. Unhappy members message you privately. Members can also use ready-made
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
                  Your happiest members are already walking past the desk. Make it easy for them to
                  say so on Google.
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
