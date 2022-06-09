import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { makeProgress } from '@open-tender/js'
import {
  fetchCustomerLoyalty,
  selectCustomerLoyaltyProgram,
} from '@open-tender/redux'
import { ProgressCircle } from '../..'
import AccountPoints from './AccountPoints'
import Loading from '../../Loading'
import { useDispatch, useSelector } from 'react-redux'

const AccountGreetingLoyaltyView = styled.div`
  flex: 0;
  padding: 0 0 0 2rem;
  text-align: right;
`

const AccountGreetingLoyalty = () => {
  const dispatch = useDispatch()
  const { program, loading } = useSelector(selectCustomerLoyaltyProgram)
  const hasProgram = program ? true : false
  const { loyalty_type, points, spend, redemption, progress } = program || {}
  const currentProgress =
    progress || makeProgress(loyalty_type, spend, redemption)

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return (
    <AccountGreetingLoyaltyView>
      {loading === 'pending' && !hasProgram ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : points ? (
        <AccountPoints {...points} />
      ) : (
        <ProgressCircle
          progress={currentProgress}
          isLoading={loading === 'pending'}
        />
      )}
    </AccountGreetingLoyaltyView>
  )
}

AccountGreetingLoyalty.displayName = 'AccountGreetingLoyalty'
AccountGreetingLoyalty.propTypes = {}

export default AccountGreetingLoyalty
