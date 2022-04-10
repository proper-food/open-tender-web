import React from 'react'
import { useSelector } from 'react-redux'

import { selectBrand, selectConfig } from '../../../slices'
import { PageSection } from '../..'
import AccountRewards from './AccountRewards'
import ThanxLoyalty from '../Rewards/ThanxLoyalty'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'

const AccountLoyalty = () => {
  const { has_rewards, has_thanx, has_levelup } = useSelector(selectBrand)
  const { account } = useSelector(selectConfig)

  return has_rewards ? (
    <AccountRewards />
  ) : has_thanx ? (
    <>
      <PageSection {...account.loyalty} style={{ marginBottom: '2.5rem' }} />
      <ThanxLoyalty />
    </>
  ) : has_levelup ? (
    <LevelUpLoyalty />
  ) : null
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
