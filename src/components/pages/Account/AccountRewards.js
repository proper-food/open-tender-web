import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'

import Rewards from '../../Rewards'
import AccountSectionHeader from './AccountSectionHeader'
import { useEffect } from 'react'
import Loading from '../../Loading'
import { isMobile } from 'react-device-detect'

const AccountRewardsView = styled.div`
  width: 100%;
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountRewards = () => {
  const dispatch = useDispatch()
  const rewards = useSelector(selectCustomerRewards)
  const { entities, loading, error } = rewards
  const hasRewards = entities.length > 0 && !error
  const displayed = !isMobile ? entities.slice(0, 2) : entities
  const isMore = entities.length > displayed.length

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  if (!hasRewards) return null

  return (
    <AccountRewardsView>
      {loading === 'pending' && !hasRewards ? (
        <Loading text="Retrieving rewards..." />
      ) : (
        <>
          <AccountSectionHeader
            title="Your Rewards"
            to={isMore ? '/rewards' : null}
          />
          <Rewards rewards={displayed} />
        </>
      )}
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {}

export default AccountRewards
