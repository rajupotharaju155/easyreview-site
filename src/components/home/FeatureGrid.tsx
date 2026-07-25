import { Col, Row } from 'antd'
import { BarChart3, MessageSquareLock, QrCode, Sparkles } from 'lucide-react'
import type { FeatureItem } from '../../types'
import { PageContainer } from '../layout/PageContainer'
import { FeatureCard } from '../shared/FeatureCard'
import { SectionHeading } from '../shared/SectionHeading'

const features: FeatureItem[] = [
  {
    id: 'qr',
    title: 'Print-Ready QR Codes',
    description:
      'Generate and download standee-ready QR designs for counters, tables, menus, and window displays in minutes.',
    icon: <QrCode className="h-5 w-5" aria-hidden />,
    tags: ['High-res PDF', 'Custom slug'],
  },
  {
    id: 'ai',
    title: 'AI-Drafted Reviews',
    description:
      'Multiple personalized review drafts per scan, tailored to your business type so customers never face a blank page.',
    icon: <Sparkles className="h-5 w-5" aria-hidden />,
    tags: ['Keyword optimized', 'Business-aware'],
  },
  {
    id: 'private',
    title: 'Private Feedback Gate',
    description:
      'Negative experiences are captured privately — never publicly — so you can fix issues before they become Google reviews.',
    icon: <MessageSquareLock className="h-5 w-5" aria-hidden />,
    tags: ['1–3★ routed', 'Internal only'],
  },
  {
    id: 'analytics',
    title: 'Live Analytics Dashboard',
    description:
      'Track scans, conversions, rating trends, and feedback across one or multiple business locations in real time.',
    icon: <BarChart3 className="h-5 w-5" aria-hidden />,
    tags: ['Multi-location', 'Trends'],
  },
]

export function FeatureGrid() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="features-heading">
      <PageContainer>
        <SectionHeading
          id="features-heading"
          eyebrow="Built for local businesses"
          title="Everything a Small Business Needs"
          subtitle="Convert foot traffic into verified Google ratings — without spammy SMS blasts or complicated tools."
          className="mb-10 sm:mb-12"
        />
        <Row gutter={[20, 20]}>
          {features.map((feature) => (
            <Col key={feature.id} xs={24} sm={12}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                tags={feature.tags}
              />
            </Col>
          ))}
        </Row>
      </PageContainer>
    </section>
  )
}
