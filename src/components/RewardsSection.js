import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'
import { useDispatch, useSelector } from 'react-redux'

import { Loading, PageSection, Rewards } from '.'

const RewardsSection = ({
  title = 'Available Rewards',
  subtitle = 'These discounts can be applied either in-store or online',
  empty = "Looks like you haven't earned any rewards yet. It's only a matter of time!",
  limit = 3,
}) => {
  const dispatch = useDispatch()
  const {
    entities: rewards,
    loading,
    error,
  } = useSelector(selectCustomerRewards)
  const hasRewards = rewards.length > 0 && !error
  const displayed = limit ? rewards.slice(0, limit) : rewards
  const isMore = rewards.length > displayed.length

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      to={isMore ? '/deals' : null}
    >
      {loading === 'pending' ? (
        <Loading text="Checking for rewards..." />
      ) : hasRewards ? (
        <Rewards rewards={displayed} />
      ) : (
        <p>{empty}</p>
      )}
    </PageSection>
  )
}

RewardsSection.displayName = 'RewardsSection'
RewardsSection.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  empty: propTypes.string,
  limit: propTypes.number,
}

export default RewardsSection
