import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import {
  fetchCustomerLoyalty,
  selectCustomerLoyaltyProgram,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram } from '../..'

const AccountLoyaltyProgramView = styled.div`
  & > div {
    border: 0;
    padding: 0;
  }
`

const AccountLoyaltyProgram = () => {
  const dispatch = useDispatch()
  const { program, loading } = useSelector(selectCustomerLoyaltyProgram)

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  if (!program) return null

  return (
    <AccountLoyaltyProgramView>
      {loading === 'pending' ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : (
        <LoyaltyProgram program={program} />
      )}
    </AccountLoyaltyProgramView>
  )
}

AccountLoyaltyProgram.displayName = 'AccountLoyaltyProgram'

export default AccountLoyaltyProgram
