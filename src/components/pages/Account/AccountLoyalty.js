import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import { PageSection } from '../..'
import AccountLoyaltySignUp from './AccountLoyaltySignUp'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import ThanxLoyalty from '../Rewards/ThanxLoyalty'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'
import AccountSection from './AccountSection'

const AccountLoyalty = () => {
  const { has_loyalty, has_thanx, has_levelup } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { account } = useSelector(selectConfig)

  return (
    <AccountSection>
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
    </AccountSection>
  )
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
