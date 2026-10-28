import { Col, Row } from 'antd'
import type { ComponentType } from 'react'
import { stats } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import type { StatItem } from '../../types'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'
import { StatCard } from '../shared/StatCard'
import { ReplyRevenueBars, ShopperDots, StarRevenueSteps } from './StatVisuals'

const VISUALS: Record<string, ComponentType<{ progress: number }>> = {
  'reviews-check': ShopperDots,
  'trust-response': ReplyRevenueBars,
  'rating-lift': StarRevenueSteps,
}

function AnimatedStat({ stat }: { stat: StatItem }) {
  const { ref, display, progress } = useCountUp<HTMLElement>(stat.value)
  const Visual = VISUALS[stat.id]

  return (
    <StatCard
      ref={ref}
      value={display}
      description={stat.description}
      visual={Visual ? <Visual progress={progress} /> : null}
    />
  )
}

export function ProblemStats() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="stats-heading">
      <PageContainer>
        <SectionHeading
          id="stats-heading"
          eyebrow="The reputation gap"
          title="Why Your Online Reputation Can't Wait"
          subtitle="Prospects decide whether to walk in based on what they see on Google — silence and unresolved complaints both cost you."
          className="mb-10 sm:mb-12"
        />
        <Row gutter={[20, 20]}>
          {stats.map((stat) => (
            <Col key={stat.id} xs={24} md={8}>
              <AnimatedStat stat={stat} />
            </Col>
          ))}
        </Row>
      </PageContainer>
    </section>
  )
}
