import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectBrand } from '../../../slices'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import ThanxLoyalty from '../Rewards/ThanxLoyalty'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'

const AccountLoyaltView = styled.div`
  padding: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 3rem;
  }
`

const AccountLoyalty = () => {
  const { has_loyalty, has_thanx, has_levelup } = useSelector(selectBrand)
  const loyalty = has_loyalty ? (
    <AccountLoyaltyProgram />
  ) : has_thanx ? (
    <ThanxLoyalty />
  ) : has_levelup ? (
    <LevelUpLoyalty />
  ) : null

  if (!loyalty) return null

  return <AccountLoyaltView>{loyalty}</AccountLoyaltView>
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
