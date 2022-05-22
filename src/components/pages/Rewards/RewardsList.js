import { useEffect } from 'react'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'

import { selectConfig } from '../../../slices'
import {
  Loading,
  Rewards,
  PageContainer,
  PageContent,
  PageTitle,
  Reward,
} from '../..'

const RewardsListView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  max-width: ${(props) => props.theme.breakpoints.tablet};
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
    <PageContainer>
      <PageTitle {...rewardsConfig.rewards} />
      {hasRewards ? (
        <RewardsListView>
          {isMobile ? (
            <>
              {rewards.map((deal) => (
                <RewardsListReward>
                  <Reward item={deal} />
                </RewardsListReward>
              ))}
            </>
          ) : (
            <Rewards rewards={rewards} />
          )}
        </RewardsListView>
      ) : (
        <PageContent>
          {loading === 'pending' ? (
            <Loading text="Retrieving your rewards..." />
          ) : (
            <p>
              Looks like you don't currently have any rewards. Pleaes try back
              later!
            </p>
          )}
        </PageContent>
      )}
    </PageContainer>
  )
}

RewardsList.displayName = 'RewardsList'

export default RewardsList
