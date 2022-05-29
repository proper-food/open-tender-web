import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import styled from '@emotion/styled'

import { selectBrand, selectConfig } from '../../../slices'
import { PageSection } from '../..'
import AccountLoyaltySignUp from './AccountLoyaltySignUp'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import ThanxLoyalty from '../Rewards/ThanxLoyalty'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'

const AccountLoyaltyView = styled.div`
  width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountLoyalty = () => {
  const { has_loyalty, has_thanx, has_levelup } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { account } = useSelector(selectConfig)

  return (
    <AccountLoyaltyView>
      {has_loyalty ? (
        !auth ? (
          <AccountLoyaltySignUp />
        ) : (
          <AccountLoyaltyProgram />
        )
      ) : has_thanx ? (
        <>
          <PageSection
            {...account.loyalty}
            style={{ marginBottom: '2.5rem' }}
          />
          <ThanxLoyalty />
        </>
      ) : has_levelup && auth ? (
        <LevelUpLoyalty />
      ) : null}
    </AccountLoyaltyView>
  )
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
