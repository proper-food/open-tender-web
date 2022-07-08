import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatQuantity } from '@open-tender/js'
import { Headline, Heading, Preface } from '@open-tender/components'
import { ProgressPoints, SeeMoreLink } from '../..'
import { useSelector } from 'react-redux'
import { selectContentSection } from '../../../slices'

const AccountLoyaltyPointsView = styled.div``

export const AccountLoyaltyTitle = styled.div`
  margin: 0 0 1.5rem;
  text-align: left;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

export const AccountPointsView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

export const AccountPointsCount = styled.div`
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

export const AccountPointsLabel = styled(Preface)`
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

const AccountLoyaltyPoints = ({ terms, thresholds, isGuest = false }) => {
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.loyalty || {}
  const { points, name } = terms

  return (
    <AccountLoyaltyPointsView>
      <AccountLoyaltyTitle>
        <Heading as="p">
          {!isGuest ? title : 'Create an account to get started...'}
        </Heading>
      </AccountLoyaltyTitle>
      <AccountPoints points={points} name={name} />
      <ProgressPoints points={points} thresholds={thresholds} />
    </AccountLoyaltyPointsView>
  )
}

AccountLoyaltyPoints.displayName = 'AccountLoyaltyPoints'
AccountLoyaltyPoints.propTypes = {
  isGuest: propTypes.bool,
  terms: propTypes.object,
  thresholds: propTypes.array,
}

export default AccountLoyaltyPoints
