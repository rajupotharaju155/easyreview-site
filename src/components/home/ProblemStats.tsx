import { Col, Row } from 'antd'
import { Eye, MessageSquareReply, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { stats } from '../../data/content'
import type { StatIconName } from '../../types'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../shared/SectionHeading'
import { StatCard } from '../shared/StatCard'

const iconMap: Record<StatIconName, ReactNode> = {
  eye: <Eye className="h-5 w-5" aria-hidden />,
  reply: <MessageSquareReply className="h-5 w-5" aria-hidden />,
  star: <Star className="h-5 w-5" aria-hidden />,
}

export function ProblemStats() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="stats-heading">
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
              <StatCard
                value={stat.value}
                description={stat.description}
                icon={iconMap[stat.icon]}
              />
            </Col>
          ))}
        </Row>
      </PageContainer>
    </section>
  )
}
