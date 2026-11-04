import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '../components/shared/Logo'
import { SeoHead } from '../components/shared/SeoHead'

export function DemoVideo() {
  return (
    <>
      <SeoHead
        path="/demo-video"
        title="Demo video — EasyReview"
        description="Watch how EasyReview works: a customer scans a QR code, rates their visit, and leaves a 5-star Google review in a few taps with an AI-written draft."
      />
      <div className="flex h-dvh min-h-0 flex-col bg-[#F4F1EA]">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-black/5 bg-white/90 px-4 backdrop-blur-md sm:px-6">
          <Logo className="min-w-0 [&_span]:truncate" />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted no-underline transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </Link>
        </header>
        <iframe
          title="EasyReview demo video"
          src="/demo-video.html"
          className="block min-h-0 w-full flex-1 border-0"
          allow="autoplay"
        />
      </div>
    </>
  )
}
