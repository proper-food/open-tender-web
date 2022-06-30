import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import {
  fetchCustomerRewards,
  selectCustomer,
  selectCustomerRewards,
} from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import { Reward, ScrollableSection } from '../..'

const AccountRewardsView = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.layout.padding};
  padding-bottom: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
  }
`

const AccountRewards = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { has_rewards } = useSelector(selectBrand)
  const hasCustomer = auth ? true : false
  const rewards = useSelector(selectCustomerRewards)
  const { account: config } = useSelector(selectConfig)
  const { title } = config.rewards
  const { entities, error } = rewards
  const hasRewards = entities.length > 0 && !error
  const displayed = !isMobile ? entities.slice(0, 2) : entities
  const isMore = entities.length > 1

  useEffect(() => {
    if (hasCustomer) {
      dispatch(fetchCustomerRewards())
    }
  }, [dispatch, hasCustomer])

  if (!hasRewards || !has_rewards) return null

  return (
    <AccountRewardsView>
      <ScrollableSection
        title={title}
        to={isMore ? '/rewards' : null}
        items={displayed}
        renderItem={Reward}
        keyName="discount_id"
      />
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {}

export default AccountRewards
