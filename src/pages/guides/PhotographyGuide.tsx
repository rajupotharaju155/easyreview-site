import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { SITE_URL, SeoHead } from '../../components/shared/SeoHead'
import { getGuideBySlug } from '../../data/guides'

const GUIDE = getGuideBySlug('photography-google-reviews')!

const LANDSCAPE_IMG = '/assets/blogs/photography/photography-landscape.jpg'
const PORTRAIT_IMG = '/assets/blogs/photography/photography-portrait.jpg'

export function PhotographyGuide() {
  return (
    <>
      <SeoHead
        path={GUIDE.path}
        title={`${GUIDE.title} — EasyReview`}
        description={GUIDE.description}
        imageUrl={`${SITE_URL}${GUIDE.ogImage}`}
        imageAlt="The easiest way for photographers to collect Google reviews after every shoot"
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
              Shoot goes well. Client loves the photos. Payment is done — then Google stays quiet.
              The easiest way is asking at delivery, while they’re still excited.
            </p>
          </PageContainer>
        </header>

        <div className="bg-white py-12 sm:py-16">
          <PageContainer className="max-w-3xl">
            <div className="space-y-10 text-base leading-relaxed text-ink/90 sm:text-[1.05rem] sm:leading-8">
              <p>
                Wedding shoot. Product shoot. Portrait session — clients often say “amazing photos”
                and still leave no Google review. Not because they disliked your work. Because asking
                feels awkward, WhatsApp later feels pushy, and once they share the album with family,
                they forget.
              </p>

              <p>Photographers who grow their Google rating use one clear idea:</p>

              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-5 pr-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Don’t wait for a follow-up week later. Catch the review when you share the final
                gallery — while the client is still happy.
              </blockquote>

              <p>That’s the easiest way to collect reviews after every shoot.</p>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Why busy photographers still have few Google reviews
                </h2>
                <p>Most photographers already ask. Timing is usually the issue:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>A line in the invoice that nobody reads</li>
                  <li>A WhatsApp message days after delivery</li>
                  <li>Asking only when the next booking is already running</li>
                </ul>
                <p>
                  Unhappy clients are faster. One delay in delivery or a missed shot can become a
                  public 1-star overnight. Happy clients rarely open Google on their own.
                </p>
                <p>
                  So this is often not a skill problem. It’s a{' '}
                  <strong className="font-semibold text-ink">timing</strong> problem — and a problem
                  of bad feedback going public too fast.
                </p>
              </section>

              <figure className="space-y-3">
                <img
                  src={LANDSCAPE_IMG}
                  alt="Photographer with camera — natural moment to request a Google review after a successful shoot"
                  width={1600}
                  height={1600}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                />
                <figcaption className="text-sm text-muted">
                  A strong gallery creates excitement. A simple QR at delivery turns that excitement
                  into a Google review.
                </figcaption>
              </figure>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The method: one QR, two outcomes
                </h2>
                <p>Here’s a flow that works for studio and freelance photographers:</p>
                <ol className="list-decimal space-y-3 pl-5 text-ink/85">
                  <li>
                    Place a QR at the{' '}
                    <strong className="font-semibold text-ink">
                      studio desk, delivery link page, or thank-you card
                    </strong>
                  </li>
                  <li>Client scans and rates the experience in a few seconds</li>
                  <li>
                    <strong className="font-semibold text-ink">Happy clients (4–5★)</strong> continue
                    to leave a public Google review — often with ready text they can edit and post
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">Unhappy clients (1–3★)</strong> send
                    feedback <strong className="font-semibold text-ink">only to you</strong>, so you
                    can fix it before it hits Google
                  </li>
                </ol>
                <p>
                  Same QR. Two paths. You don’t need a long ask after every wedding — and one delayed
                  gallery doesn’t automatically become a public review.
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
                        <td className="px-4 py-3 font-medium text-ink">Final gallery / delivery screen</td>
                        <td className="px-4 py-3">Best moment — client just saw the photos</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Studio checkout / seating</td>
                        <td className="px-4 py-3">Natural pause after a studio session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Thank-you card with album</td>
                        <td className="px-4 py-3">Physical reminder at handover</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-ink">Invoice / WhatsApp delivery note</td>
                        <td className="px-4 py-3">Short link right when you send the files</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>Keep the message simple:</p>
                <blockquote className="rounded-2xl border border-brand-200 bg-brand-50/40 px-5 py-4 text-ink">
                  <p className="font-semibold">Loved the photos?</p>
                  <p className="mt-1 text-muted">
                    Scan for a 20-second review — it helps new clients find us.
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
                      <strong className="font-semibold text-ink">Print a few QR cards</strong> for
                      studio checkout and album handovers
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">Add the QR to your delivery note</strong>
                      : “If you liked the shoot, scan here. No pressure.”
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">
                        Act on private low ratings the same day
                      </strong>{' '}
                      — a call, a redo of key frames, or a clear apology
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
                    A quiet habit at delivery beats one big “please review us” message that clients
                    ignore later.
                  </p>
                </div>
                <img
                  src={PORTRAIT_IMG}
                  alt="Portrait photography session — best moment to invite a Google review after the shoot"
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
                  <li>QR with only “Scan me” — clients don’t trust mystery codes</li>
                  <li>Asking only after a complaint</li>
                  <li>Sending SMS review links to every old client in your phone</li>
                  <li>Letting every bad day post straight to Google with no private filter</li>
                  <li>
                    Asking during the shoot, before they’ve seen a single edited image
                  </li>
                </ul>
                <p>
                  If you can’t explain it in under 10 seconds, clients won’t use it either.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  What you can expect in 30–60 days
                </h2>
                <p>Photographers who stick with this usually notice:</p>
                <ul className="list-disc space-y-2 pl-5 text-ink/85">
                  <li>
                    More <strong className="font-semibold text-ink">recent</strong> Google reviews
                    (new reviews help when people search “photographer near me”)
                  </li>
                  <li>Fewer surprise public 1-stars, because low feedback comes to you first</li>
                  <li>Less awkward asking after delivery</li>
                  <li>
                    A Google page that looks active when clients compare you with other photographers
                    nearby
                  </li>
                </ul>
                <p>
                  Google doesn’t only look at old ratings. It also looks at whether clients still
                  trust you today.
                </p>
              </section>

              <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Want to try this for your photography business?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  EasyReview gives you a QR for delivery and the studio. Happy clients go to Google.
                  Unhappy clients message you privately. Clients can also use ready-made review text
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
                  Your happiest clients are already looking at the photos. Make it easy for them to
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
