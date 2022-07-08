import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import { Headline, Heading } from '@open-tender/components'
import { ProgressSpend, SeeMoreLink } from '../..'
import { useSelector } from 'react-redux'
import { selectContentSection } from '../../../slices'
import {
  AccountLoyaltyTitle,
  AccountPointsView,
  AccountPointsCount,
  AccountPointsLabel,
} from './AccountLoyaltyPoints'

const AccountLoyaltySpendView = styled.div``

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
      <AccountLoyaltyTitle>
        <Heading as="p">
          {!isGuest ? title : 'Create an account to get started...'}
        </Heading>
      </AccountLoyaltyTitle>
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
