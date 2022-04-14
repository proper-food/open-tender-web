import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'
import LoyaltyPrograms from './LoyaltyProgams'
import { Loading, PageSection, Rewards } from '../..'
import { selectConfig } from '../../../slices'
import PageContainer from '../../PageContainer'

const LoyaltyRewardsView = styled(PageContainer)`
  margin-top: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-top: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const LoyaltyRewardsContainer = styled(PageContainer)`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const LoyaltyRewardsRewards = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: -1rem auto 5rem;
`

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
    <LoyaltyRewardsView>
      {loading === 'pending' ? (
        <Loading text="Checking for rewards..." />
      ) : hasRewards ? (
        <>
          <LoyaltyRewardsContainer>
            <PageSection id="rewards" {...rewardsConfig.rewards} />
          </LoyaltyRewardsContainer>
          <LoyaltyRewardsRewards>
            <Rewards rewards={rewards} />
          </LoyaltyRewardsRewards>
        </>
      ) : null}
      <LoyaltyRewardsContainer>
        <LoyaltyPrograms />
      </LoyaltyRewardsContainer>
    </LoyaltyRewardsView>
  )
}

LoyaltyRewards.displayName = 'LoyaltyRewards'

export default LoyaltyRewards
