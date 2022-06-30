import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectBrand } from '../../../slices'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import ThanxLoyalty from '../Rewards/ThanxLoyalty'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'

const AccountLoyaltView = styled.div`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.margin} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0 0;
  }
`

const AccountLoyalty = () => {
  const { has_loyalty, has_thanx, has_levelup } = useSelector(selectBrand)
  const loyalty = has_loyalty ? (
    <AccountLoyaltyProgram />
  ) : has_thanx ? (
    <ThanxLoyalty isAccount={true} />
  ) : has_levelup ? (
    <LevelUpLoyalty />
  ) : null

  if (!loyalty) return null

  return <AccountLoyaltView>{loyalty}</AccountLoyaltView>
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
