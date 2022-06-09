import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Reward } from '.'

const RewardsView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const RewardsContainer = styled('div')`
  margin: -0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: -0.5rem 0 0;
  }
`

const RewardView = styled('div')`
  width: 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 90%;
    padding: 1.5rem 1rem 1.5rem 0;
  }
`

const Rewards = ({ rewards, renderItem = Reward }) => {
  return (
    <RewardsView>
      <RewardsContainer>
        {rewards.map((reward) => (
          <RewardView key={reward.discount_id}>
            {renderItem({ item: reward })}
          </RewardView>
        ))}
      </RewardsContainer>
    </RewardsView>
  )
}

Rewards.displayName = 'Rewards'
Rewards.propTypes = {
  rewards: propTypes.array,
}

export default Rewards
