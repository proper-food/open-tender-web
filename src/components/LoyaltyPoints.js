import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatQuantity } from '@open-tender/js'
import { LoyaltyHeader, LoyaltyStatus, ProgressPoints, SeeMoreLink } from '.'

const LoyaltyPointsView = styled.div``

const LoyaltyPoints = ({ title, subtitle, terms, thresholds, to }) => {
  const { points, name } = terms

  return (
    <LoyaltyPointsView>
      <LoyaltyHeader title={title} subtitle={subtitle} />
      <LoyaltyStatus count={formatQuantity(points)} name={name}>
        {to && <SeeMoreLink text="See Details" to={to} />}
      </LoyaltyStatus>
      <ProgressPoints points={points} thresholds={thresholds} />
    </LoyaltyPointsView>
  )
}

LoyaltyPoints.displayName = 'LoyaltyPoints'
LoyaltyPoints.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  terms: propTypes.object,
  thresholds: propTypes.array,
}

export default LoyaltyPoints
