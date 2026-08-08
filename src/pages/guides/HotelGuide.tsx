import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../../components/shared/SeoHead'
import { getGuideBySlug } from '../../data/guides'

const GUIDE = getGuideBySlug('how-hotels-can-win-google-reviews')!

const ROOM_IMG = '/assets/blogs/hotel/hotel-room-landscape.jpg'
const BUILDING_IMG = '/assets/blogs/hotel/hotel-building-portrait.jpg'

export function HotelGuide() {
  return (
    <>
      <SeoHead
        path={GUIDE.path}
        title={`${GUIDE.title} — EasyReview`}
        description={GUIDE.description}
        imageUrl={`${SITE_URL}${GUIDE.ogImage}`}
        imageAlt="How hotels can win more 5-star Google reviews before guests leave"
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
              Guests had a good stay, smiled at checkout, and left. Then silence on Google. The
              easiest fix? Ask for the review before they walk out the door.
            </p>
          </PageContainer>
        </header>

        <div className="bg-white py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <div className="space-y-10 text-base leading-relaxed text-ink/90 sm:text-[1.05rem] sm:leading-8">
              <p>
                Room was clean. Staff was polite. Breakfast was decent. Guests still don’t leave a
                Google review. Not because the stay was bad — because once they check out, they are
                already thinking about the airport, the cab, and the next meeting.
              </p>

              <p>Hotels that keep growing their Google rating follow one simple idea:</p>

              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-5 pr-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Don’t wait for the post-stay email. Catch the review while the guest is still in
                your hotel.
              </blockquote>

              <p>That’s how you win more 5-star reviews before guests leave.</p>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Why hotels miss reviews they already earned
                </h2>
                <p>Most hotels already ask. The problem is timing:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>A review link buried in a checkout printout</li>
                  <li>An email sent hours or days after checkout</li>
                  <li>Front desk staff rushing through a long goodbye speech</li>
                </ul>
                <p>
                  Unhappy guests are faster. One noisy AC or delayed room service can become a
                  public 1-star while happy guests say nothing.
                </p>
                <p>
                  So this is often not a “hospitality quality” problem alone. It’s a{' '}
                  <strong className="font-semibold text-ink">timing</strong> problem — and a problem
                  of bad feedback going public too quickly.
                </p>
              </section>

              <figure className="space-y-3">
                <img
                  src={ROOM_IMG}
                  alt="Hotel guest room — when guests still feel the stay and are more likely to review"
                  width={1600}
                  height={1070}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                />
                <figcaption className="text-sm text-muted">
                  A good stay creates the feeling. A simple QR at the desk or lobby gives guests an
                  easy way to put that feeling on Google.
                </figcaption>
              </figure>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The method: one QR, two outcomes
                </h2>
                <p>Here’s a flow that works for hotels and guest houses:</p>
                <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                  <li>
                    Place a QR at{' '}
                    <strong className="font-semibold text-ink">
                      reception, lobby, or checkout
                    </strong>
                  </li>
                  <li>Guest scans and rates the stay in a few seconds</li>
                  <li>
                    <strong className="font-semibold text-ink">Happy guests (4–5★)</strong> continue
                    to leave a public Google review — often with ready text they can edit and post
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">Unhappy guests (1–3★)</strong> send
                    feedback <strong className="font-semibold text-ink">only to you</strong>, so your
                    team can fix it before it hits Google
                  </li>
                </ol>
                <p>
                  Same QR. Two paths. Your receptionist doesn’t need a long speech at checkout —
                  and one bad night doesn’t automatically become a public review.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Where should you place the QR?
                </h2>
                <p>Put it where guests naturally stop with their phone nearby:</p>
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
                        <td className="px-4 py-3 font-medium text-ink">Reception desk</td>
                        <td className="px-4 py-3">Guests pause here at checkout</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Lobby / lift area</td>
                        <td className="px-4 py-3">Easy to notice while waiting</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Room standee / table tent</td>
                        <td className="px-4 py-3">Quiet ask during a calm moment in the stay</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Breakfast / restaurant</td>
                        <td className="px-4 py-3">Guests are relaxed and often already using phones</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>Keep the message simple:</p>
                <blockquote className="rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-4 text-ink">
                  <p className="font-semibold">Enjoyed your stay?</p>
                  <p className="mt-1 text-muted">
                    Scan for a 20-second review — it helps other guests choose us.
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
                      for reception and 2–3 rooms first
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Brief front desk in 5 minutes</strong>
                      : “If the guest seems happy at checkout, point to the QR. Don’t force it.”
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Act on private low ratings the same day
                      </strong>{' '}
                      — a room change, a call from the manager, or a clear apology
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
                    A quiet daily habit at checkout beats one big email campaign after guests have
                    already left.
                  </p>
                </div>
                <img
                  src={BUILDING_IMG}
                  alt="Hotel building exterior — trust grows when recent Google reviews stay fresh"
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
                  <li>QR with only “Scan me” — guests don’t trust mystery codes</li>
                  <li>Asking only after a complaint</li>
                  <li>Sending SMS review links to every guest phone number</li>
                  <li>Letting every bad night post straight to Google with no private filter</li>
                  <li>
                    A process that only works when the GM is free — not during busy checkout
                  </li>
                </ul>
                <p>
                  If front desk can’t explain it in under 10 seconds, guests won’t use it either.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  What you can expect in 30–60 days
                </h2>
                <p>Hotels that stick with this usually notice:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>
                    More <strong className="font-semibold text-ink">recent</strong> Google reviews
                    (fresh reviews matter when travelers compare options)
                  </li>
                  <li>Fewer surprise public 1-stars, because low feedback comes to you first</li>
                  <li>Less awkward asking at checkout</li>
                  <li>
                    A Google listing that looks active when travelers compare you with nearby hotels
                  </li>
                </ul>
                <p>
                  Google doesn’t only look at old ratings. It also looks at whether guests still
                  talk about you today.
                </p>
              </section>

              <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Want to try this in your hotel?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  EasyReview gives you a QR for reception and rooms. Happy guests go to Google.
                  Unhappy guests message you privately. Guests can also use ready-made review text
                  they can edit before posting.
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
                  Your happiest guests are still in the lobby. Make it easy for them to say so on
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
