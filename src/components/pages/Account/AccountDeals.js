import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'
import styled from '@emotion/styled'

import { selectBrand, selectConfig } from '../../../slices'
import { Rewards } from '../..'
import AccountSectionHeader from './AccountSectionHeader'
import { isMobile } from 'react-device-detect'

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
  const displayed = !isMobile ? entities.slice(0, 2) : entities
  const isMore = entities.length > displayed.length
  const hasDeals = has_deals && displayed.length

  useEffect(() => {
    if (has_deals) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, dispatch])

  return hasDeals ? (
    <AccountDealsView>
      <AccountSectionHeader title={title} to={isMore ? '/deals' : null} />
      <Rewards rewards={displayed} />
    </AccountDealsView>
  ) : null
}

AccountDeals.displayName = 'AccountDeals'
export default AccountDeals
