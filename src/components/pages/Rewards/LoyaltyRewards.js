import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'
import LoyaltyPrograms from './LoyaltyProgams'
import { Loading, PageSection, Rewards } from '../..'
import { selectConfig } from '../../../slices'

const LoyaltyRewards = () => {
  const dispatch = useDispatch()
  const { rewards: rewardsConfig } = useSelector(selectConfig)
  const {
    entities: rewards,
    loading,
    error,
  } = useSelector(selectCustomerRewards)
  const hasRewards = rewards.length > 0 && !error

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  return (
    <>
      {loading === 'pending' ? (
        <Loading text="Checking for rewards..." />
      ) : hasRewards ? (
        <PageSection {...rewardsConfig.rewards}>
          <Rewards rewards={rewards} />
        </PageSection>
      ) : null}
      <LoyaltyPrograms />
    </>
  )
}

LoyaltyRewards.displayName = 'LoyaltyRewards'

export default LoyaltyRewards
