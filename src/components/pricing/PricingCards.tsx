import { Col, Row } from 'antd'
import type { PricingTier } from '../../types'
import { PricingCard } from '../shared/PricingCard'

export function PricingCards({ tiers }: { tiers: PricingTier[] }) {
  const span = tiers.length > 3 ? 6 : 8

  return (
    <Row gutter={[20, 24]} justify="center" align="stretch">
      {tiers.map((tier) => (
        <Col key={tier.id} xs={24} sm={12} xl={span}>
          <PricingCard tier={tier} />
        </Col>
      ))}
    </Row>
  )
}
