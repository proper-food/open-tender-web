import styled from '@emotion/styled'
import { selectCustomer } from '@open-tender/redux'
import { useSelector } from 'react-redux'

import AccountLoyaltySignUp from './AccountLoyaltySignUp'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import AccountLoyaltyRewards from './AccountLoyaltyRewards'

const AccountRewardsView = styled.div`
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountRewards = () => {
  const { auth } = useSelector(selectCustomer)

  return (
    <AccountRewardsView>
      {!auth ? (
        <AccountLoyaltySignUp />
      ) : (
        <>
          <AccountLoyaltyProgram />
          <AccountLoyaltyRewards />
        </>
      )}
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {}

export default AccountRewards
