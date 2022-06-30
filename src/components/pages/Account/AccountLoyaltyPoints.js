import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatQuantity } from '@open-tender/js'
import { Headline, Heading, Preface } from '@open-tender/components'
import { PointsProgress, SeeMoreLink } from '../..'

const AccountLoyaltyPointsView = styled.div``

const AccountLoyaltyPointsTitle = styled.div`
  margin: 0 0 1.5rem;
  text-align: left;
  font-size: ${(props) => props.theme.fonts.sizes.big};
`

const AccountPointsView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

const AccountPointsCount = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: -0.2 rem;

  span {
    display: block;
    line-height: 1;
  }
`

const AccountPointsLabel = styled(Preface)`
  margin: 0 0 0.3rem 0.6rem;
`

const AccountPoints = ({ points, name }) => {
  return (
    <AccountPointsView>
      <AccountPointsCount>
        <Headline size="h1">{formatQuantity(points)}</Headline>
        <AccountPointsLabel size="xSmall">{name}</AccountPointsLabel>
      </AccountPointsCount>
      <SeeMoreLink text="See Details" to="/loyalty" />
    </AccountPointsView>
  )
}

const thresholds = [
  { points: 100 },
  { points: 200 },
  { points: 300 },
  { points: 400 },
]

const AccountLoyaltyPoints = ({ program }) => {
  const { points } = program || {}

  return (
    <AccountLoyaltyPointsView>
      <AccountLoyaltyPointsTitle>
        <Heading as="p">Your rewards...</Heading>
      </AccountLoyaltyPointsTitle>
      <AccountPoints {...points} />
      <PointsProgress {...points} thresholds={thresholds} />
    </AccountLoyaltyPointsView>
  )
}

AccountLoyaltyPoints.displayName = 'AccountLoyaltyPoints'
AccountLoyaltyPoints.propTypes = {
  program: propTypes.object,
}

export default AccountLoyaltyPoints
