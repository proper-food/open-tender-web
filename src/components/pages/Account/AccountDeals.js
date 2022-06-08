import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import { Rewards } from '../..'
import AccountSection from './AccountSection'
import AccountSectionHeader from './AccountSectionHeader'

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
    <AccountSection>
      <AccountSectionHeader title={title} to={isMore ? '/deals' : null} />
      <Rewards rewards={displayed} />
    </AccountSection>
  ) : null
}

AccountDeals.displayName = 'AccountDeals'
export default AccountDeals
