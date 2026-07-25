import { Col, Row } from 'antd'
import { pricingTiers } from '../../data/content'
import { PricingCard } from '../shared/PricingCard'

export function PricingCards() {
  return (
    <Row gutter={[20, 24]} align="stretch">
      {pricingTiers.map((tier) => (
        <Col key={tier.id} xs={24} md={8}>
          <PricingCard tier={tier} />
        </Col>
      ))}
    </Row>
  )
}
