import { Button } from 'antd'
import { QrCode, Star } from 'lucide-react'
import { ACTIVE_HERO_HEADLINE, HERO_HEADLINES } from '../../data/content'
import { PageContainer } from '../layout/PageContainer'

export function Hero() {
  return (
    <section className="hero-atmosphere relative overflow-hidden" aria-labelledby="hero-heading">
      <PageContainer className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
            Rank higher on Google Maps
          </span>

          {/*
            Headline variants (pick one):
            1. {HERO_HEADLINES[0]}
            2. {HERO_HEADLINES[1]}
            3. {HERO_HEADLINES[2]}
            Change ACTIVE_HERO_HEADLINE in src/data/content.ts
          */}
          <h1
            id="hero-heading"
            className="mt-5 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            {ACTIVE_HERO_HEADLINE}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Customers scan a QR at your counter, rate their visit, and — if they loved it — get an
            AI-written 5-star draft for Google. Lower ratings go to a private form so you can fix
            issues before they go public.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="primary" size="large" className="!h-12 !px-6 !text-base">
              Set Up Your Business Free
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted">
            <span className="font-semibold text-ink">22</span> spots left — free for first 50
            businesses
          </p>
          <p className="mt-1.5 text-sm text-muted">
            No credit card required · Free QR standees · Setup in 2 minutes
          </p>

          <p className="sr-only">Alternate headlines: {HERO_HEADLINES.join(' | ')}</p>
        </div>

        <div className="animate-fade-up-delay-1 relative flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </PageContainer>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="animate-float relative w-full max-w-md">
      <svg
        viewBox="0 0 400 360"
        className="w-full drop-shadow-xl"
        role="img"
        aria-label="Diagram showing QR scan leading to star rating and Google review"
      >
        <defs>
          <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="12"
              floodColor="#0f172a"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* Flow connectors */}
        <path
          d="M70 80 C120 80, 140 120, 200 140"
          fill="none"
          stroke="#c9a9ff"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M322 168 C358 205, 368 255, 330 292"
          fill="none"
          stroke="#c9a9ff"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* QR card */}
        <g filter="url(#softShadow)">
          <rect x="24" y="40" width="88" height="88" rx="16" fill="white" stroke="#e2e8f0" />
          <rect x="40" y="56" width="56" height="56" rx="6" fill="#6b2fd5" opacity="0.12" />
          <rect x="48" y="64" width="18" height="18" rx="2" fill="#6b2fd5" />
          <rect x="70" y="64" width="18" height="18" rx="2" fill="#6b2fd5" />
          <rect x="48" y="86" width="18" height="18" rx="2" fill="#6b2fd5" />
          <rect x="70" y="86" width="8" height="8" rx="1" fill="#6b2fd5" />
          <rect x="82" y="86" width="6" height="6" rx="1" fill="#6b2fd5" />
          <rect x="70" y="98" width="6" height="6" rx="1" fill="#6b2fd5" />
          <rect x="82" y="98" width="6" height="6" rx="1" fill="#6b2fd5" />
        </g>
        <text x="68" y="148" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="DM Sans">
          Scan QR
        </text>

        {/* Phone mock */}
        <g filter="url(#softShadow)">
          <rect
            x="150"
            y="60"
            width="160"
            height="240"
            rx="28"
            fill="url(#phoneGrad)"
            stroke="#e2e8f0"
          />
          <rect x="162" y="78" width="136" height="200" rx="18" fill="white" />
          <text
            x="230"
            y="110"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="13"
            fontWeight="600"
            fontFamily="Outfit"
          >
            How was your visit?
          </text>
          {/* Stars */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${178 + i * 22}, 128)`}>
              <path
                d="M8 0l2.2 5.2 5.6.5-4.3 3.7 1.3 5.5L8 12.2l-4.8 2.7 1.3-5.5L0 5.7l5.6-.5z"
                fill={i < 5 ? '#f59e0b' : '#e2e8f0'}
              />
            </g>
          ))}
          <rect x="178" y="170" width="104" height="28" rx="8" fill="#6b2fd5" />
          <text
            x="230"
            y="188"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="600"
            fontFamily="DM Sans"
          >
            Get AI draft
          </text>
          <rect x="178" y="210" width="104" height="40" rx="10" fill="#f3eaff" />
          <text
            x="230"
            y="228"
            textAnchor="middle"
            fill="#6b2fd5"
            fontSize="9"
            fontFamily="DM Sans"
          >
            “Friendly staff and
          </text>
          <text
            x="230"
            y="240"
            textAnchor="middle"
            fill="#6b2fd5"
            fontSize="9"
            fontFamily="DM Sans"
          >
            quick service!”
          </text>
        </g>

        {/* Google badge — kept clear of floating chips */}
        <g filter="url(#softShadow)">
          <rect x="268" y="292" width="108" height="48" rx="12" fill="white" stroke="#e2e8f0" />
          <circle cx="290" cy="316" r="10" fill="#6b2fd5" />
          <text x="290" y="320" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
            G
          </text>
          <text
            x="334"
            y="312"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="10"
            fontWeight="600"
            fontFamily="DM Sans"
          >
            Google
          </text>
          <text
            x="334"
            y="326"
            textAnchor="middle"
            fill="#64748b"
            fontSize="9"
            fontFamily="DM Sans"
          >
            5★ posted
          </text>
        </g>
      </svg>

      <div className="pointer-events-none absolute -left-2 top-8 flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-md sm:-left-4">
        <QrCode className="h-4 w-4 text-brand-600" aria-hidden />
        <span className="text-xs font-medium text-slate-700">Counter QR</span>
      </div>
      <div className="pointer-events-none absolute right-0 top-[42%] flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-md sm:-right-2">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
        <span className="text-xs font-medium text-slate-700">Private if &lt;4★</span>
      </div>
    </div>
  )
}
