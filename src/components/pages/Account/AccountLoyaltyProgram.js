import React, { useEffect } from 'react'
import {
  fetchCustomerLoyalty,
  selectCustomerLoyaltyProgram,
} from '@open-tender/redux'
import Loading from '../../Loading'
import { useDispatch, useSelector } from 'react-redux'
import AccountLoyaltyPoints from './AccountLoyaltyPoints'

const AccountLoyaltyProgram = () => {
  const dispatch = useDispatch()
  const { program, loading } = useSelector(selectCustomerLoyaltyProgram)
  const hasProgram = program ? true : false
  const { points } = program || {}

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return loading === 'pending' && !hasProgram ? (
    <Loading text="Retrieving your loyalty status..." />
  ) : points ? (
    <AccountLoyaltyPoints program={program} />
  ) : (
    <AccountLoyaltyPoints
      program={{ points: { points: 0, name: 'Rewards Points' } }}
    />
  )
}

AccountLoyaltyProgram.displayName = 'AccountLoyaltyProgram'
AccountLoyaltyProgram.propTypes = {}

export default AccountLoyaltyProgram
