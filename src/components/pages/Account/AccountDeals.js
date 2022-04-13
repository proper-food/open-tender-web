import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'
import styled from '@emotion/styled'

import { selectBrand, selectConfig } from '../../../slices'
import { Rewards } from '../..'
import AccountSectionTitle from './AccountSectionTitle'

const AccountDealsView = styled.div`
  width: 100%;
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountDeals = () => {
  const dispatch = useDispatch()
  const { has_deals } = useSelector(selectBrand)
  const { account: config } = useSelector(selectConfig)
  const { title } = config.deals
  const { profile } = useSelector(selectCustomer)
  const { entities } = useSelector(selectDeals)
  const { customer_id } = profile || {}

  useEffect(() => {
    if (has_deals) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, dispatch])

  return has_deals ? (
    <AccountDealsView>
      <AccountSectionTitle title={title} />
      <Rewards rewards={entities} />
    </AccountDealsView>
  ) : null
}

AccountDeals.displayName = 'AccountDeals'
export default AccountDeals
