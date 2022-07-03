import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import { Headline, Heading, Preface } from '@open-tender/components'
import { ProgressSpend, SeeMoreLink } from '../..'
import { useSelector } from 'react-redux'
import { selectContentSection } from '../../../slices'

const AccountLoyaltySpendView = styled.div``

const AccountLoyaltySpendTitle = styled.div`
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

const AccountCredit = ({ credit }) => {
  return (
    <AccountPointsView>
      <AccountPointsCount>
        <Headline size="h1">{formatDollars(credit, '', 0)}</Headline>
        <AccountPointsLabel size="xSmall">Available Credit</AccountPointsLabel>
      </AccountPointsCount>
      <SeeMoreLink text="See Details" to="/loyalty" />
    </AccountPointsView>
  )
}

const AccountLoyaltySpend = ({
  credit,
  spend,
  threshold,
  reward,
  isGuest = false,
}) => {
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.loyalty || {}

  return (
    <AccountLoyaltySpendView>
      <AccountLoyaltySpendTitle>
        <Heading as="p">
          {!isGuest ? title : 'Create an account to get started...'}
        </Heading>
      </AccountLoyaltySpendTitle>
      <AccountCredit credit={credit} />
      <ProgressSpend spend={spend} threshold={threshold} reward={reward} />
    </AccountLoyaltySpendView>
  )
}

AccountLoyaltySpend.displayName = 'AccountLoyaltySpend'
AccountLoyaltySpend.propTypes = {
  isGuest: propTypes.bool,
  credit: propTypes.string,
  spend: propTypes.string,
  threshold: propTypes.string,
  reward: propTypes.string,
}

export default AccountLoyaltySpend
