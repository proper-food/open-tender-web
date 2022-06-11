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
  padding: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 2rem;
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
  const isMore = entities.length > displayed.length

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
