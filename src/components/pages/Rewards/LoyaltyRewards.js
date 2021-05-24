import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'
import LoyaltyPrograms from './LoyaltyProgams'
import { Loading, PageSection, Rewards } from '../..'

const LoyaltyRewards = () => {
  const dispatch = useDispatch()
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
        <PageSection
          title="You've got rewards!"
          subtitle="Below is a list of rewards that can be applied either in-store or online"
        >
          <Rewards rewards={rewards} />
        </PageSection>
      ) : null}
      <LoyaltyPrograms />
    </>
  )
}

LoyaltyRewards.displayName = 'LoyaltyRewards'

export default LoyaltyRewards
