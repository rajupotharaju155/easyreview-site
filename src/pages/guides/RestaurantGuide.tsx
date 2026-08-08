import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../../components/shared/SeoHead'
import { getGuideBySlug } from '../../data/guides'

const GUIDE = getGuideBySlug('restaurant-qr-code-google-reviews')!

const FOOD_IMG = '/assets/blogs/restaurant/restaurant-food-top-view-landscape.jpg'
const AMBIENCE_IMG = '/assets/blogs/restaurant/restaurant-ambience-portrait.jpg'

export function RestaurantGuide() {
  return (
    <>
      <SeoHead
        path={GUIDE.path}
        title={`${GUIDE.title} — EasyReview`}
        description={GUIDE.description}
        imageUrl={`${SITE_URL}${GUIDE.ogImage}`}
        imageAlt="The QR code trick restaurants use to get 5-star Google reviews"
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
              Guests enjoy the meal, pay the bill, and leave. Then nothing shows up on Google. The
              fix is simpler than most owners think: ask for the review while they’re still at the
              table.
            </p>
          </PageContainer>
        </header>

        <div className="bg-white py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <div className="space-y-10 text-base leading-relaxed text-ink/90 sm:text-[1.05rem] sm:leading-8">
              <p>
                Food was good. Service was fine. People even laughed through dessert — and still no
                Google review. Not because they hated the place. Because asking feels awkward,
                WhatsApp messages feel pushy, and once they leave, they simply forget.
              </p>

              <p>Restaurants that slowly climb their Google rating use one clear idea:</p>

              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-5 pr-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Don’t wait for later. Catch the review while the guest is still happy at the
                table.
              </blockquote>

              <p>That’s the QR code trick.</p>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Why good restaurants still have few reviews
                </h2>
                <p>Most owners already ask. The problem is how and when:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>A line printed on the bill that nobody reads</li>
                  <li>A WhatsApp message two or three days later</li>
                  <li>Staff asking while clearing plates, when nobody wants a speech</li>
                </ul>
                <p>
                  Unhappy guests are quicker. One slow order or cold dish can turn into a public
                  1-star before you even know what happened.
                </p>
                <p>
                  So this often isn’t a food problem. It’s a{' '}
                  <strong className="font-semibold text-ink">timing</strong> problem — and a problem
                  of bad feedback going public too fast.
                </p>
              </section>

              <figure className="space-y-3">
                <img
                  src={FOOD_IMG}
                  alt="Food on a restaurant table — when guests are still happy and more likely to leave a review"
                  width={1600}
                  height={1200}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                />
                <figcaption className="text-sm text-muted">
                  Good food creates the feeling. A simple QR code gives guests an easy way to turn
                  that feeling into a Google review.
                </figcaption>
              </figure>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The trick: one QR, two outcomes
                </h2>
                <p>Here’s how it works in a busy restaurant:</p>
                <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                  <li>
                    Put a small QR on the{' '}
                    <strong className="font-semibold text-ink">table standee or bill folder</strong>
                  </li>
                  <li>Guest scans and gives a quick rating (takes a few seconds)</li>
                  <li>
                    <strong className="font-semibold text-ink">Happy guests (4–5★)</strong> go on to
                    leave a public Google review — often with ready text they can edit and post
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">Unhappy guests (1–3★)</strong> send
                    feedback <strong className="font-semibold text-ink">only to you</strong>, so you
                    can fix it before it hits Google
                  </li>
                </ol>
                <p>
                  Same QR code. Two different paths. On a packed Friday night, your staff doesn’t
                  need to give a speech — and angry feedback doesn’t automatically become a public
                  review.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Where should you place the QR?
                </h2>
                <p>
                  Don’t hide it on the last page of the menu. Put it where people already look:
                </p>
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
                        <td className="px-4 py-3 font-medium text-ink">Table standee</td>
                        <td className="px-4 py-3">Guests see it throughout the meal</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Bill folder / tray</td>
                        <td className="px-4 py-3">Phone is usually out when they pay</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Counter (quick-service)</td>
                        <td className="px-4 py-3">Easy to scan while waiting for parcels</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Near billing screen</td>
                        <td className="px-4 py-3">Natural last stop before they leave</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>Keep the message simple:</p>
                <blockquote className="rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-4 text-ink">
                  <p className="font-semibold">Enjoyed your meal?</p>
                  <p className="mt-1 text-muted">
                    Scan for a 20-second review — it helps us a lot.
                  </p>
                </blockquote>
                <p>No long speeches. No pressure.</p>
              </section>

              <section className="grid items-start gap-6 sm:grid-cols-2 sm:gap-8">
                <div className="order-2 space-y-4 sm:order-1">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    What you can start this week
                  </h2>
                  <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                    <li>
                      <strong className="font-semibold text-ink">Print 10–20 QR standees</strong>{' '}
                      and put them on your busiest tables first
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Tell your team in 5 minutes</strong>
                      : “If the guest is happy at billing, just point to the QR. Don’t force it.”
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Reply to private low ratings the same day
                      </strong>{' '}
                      — a call, a replacement dessert, or a clear apology goes a long way
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Reply to every new Google review
                      </strong>{' '}
                      within a day or two — customers notice
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Check once a week</strong>: how
                      many people scanned, and how many Google reviews came in
                    </li>
                  </ol>
                  <p className="text-ink/85">
                    Doing this every day beats one big “please review us” campaign that everyone
                    forgets next week.
                  </p>
                </div>
                <img
                  src={AMBIENCE_IMG}
                  alt="Restaurant dining area — a natural place for a table QR review standee"
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="order-1 w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5 sm:order-2 sm:sticky sm:top-24"
                />
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Common mistakes to avoid
                </h2>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>QR with only “Scan me” — people don’t trust mystery codes</li>
                  <li>Asking only after a complaint</li>
                  <li>Sending review links by SMS to every number you have</li>
                  <li>Letting every bad evening post straight to Google with no private filter</li>
                  <li>
                    A system that works in theory, but not when your waiter is rushing at 8:40pm
                  </li>
                </ul>
                <p>
                  If your staff can’t explain it in under 10 seconds, guests won’t use it either.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  What you can expect in 30–60 days
                </h2>
                <p>Owners who stick with this usually notice:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>
                    More <strong className="font-semibold text-ink">recent</strong> Google reviews
                    (new reviews matter as much as the star number)
                  </li>
                  <li>Fewer surprise public 1-stars, because low feedback comes to you first</li>
                  <li>Less awkward asking — the QR does the work</li>
                  <li>
                    A Google page that looks active when people compare you with the restaurant
                    next door
                  </li>
                </ul>
                <p>
                  Google doesn’t only look at old ratings. It also looks at whether people still
                  talk about you today.
                </p>
              </section>

              <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Want to try this in your restaurant?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  EasyReview gives you a QR for your tables. Happy guests go to Google. Unhappy
                  guests message you privately. Guests can also use ready-made review text they can
                  edit before posting.
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
                  Your happiest customers are already at the table. Make it easy for them to say so
                  on Google.
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
