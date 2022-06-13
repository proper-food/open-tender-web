import { useEffect } from 'react'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'

import { Loading, Rewards, Reward } from '../..'

const RewardsListView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  // max-width: ${(props) => props.theme.breakpoints.tablet};
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    max-width: 60rem;
  }
`

const RewardsListReward = styled.div`
  margin: 0 0 1.5rem;
`

const RewardsList = () => {
  const dispatch = useDispatch()
  const { entities, loading, error } = useSelector(selectCustomerRewards)
  const hasRewards = entities.length > 0 && !error

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  return hasRewards ? (
    <RewardsListView>
      {isMobile ? (
        <>
          {entities.map((deal) => (
            <RewardsListReward>
              <Reward item={deal} />
            </RewardsListReward>
          ))}
        </>
      ) : (
        <Rewards rewards={entities} />
      )}
    </RewardsListView>
  ) : loading === 'pending' ? (
    <Loading text="Retrieving your rewards..." />
  ) : (
    <p>
      Looks like you don't currently have any rewards. Pleaes try back later!
    </p>
  )
}

RewardsList.displayName = 'RewardsList'

export default RewardsList
