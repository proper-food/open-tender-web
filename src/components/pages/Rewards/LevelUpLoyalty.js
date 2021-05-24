import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerLevelUp,
  selectCustomerLevelUpProgram,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageContent } from '../..'
import LevelUpConnect from './LevelUpConnect'

const LevelUpLoyalty = () => {
  const dispatch = useDispatch()
  const { program, loading, error } = useSelector(selectCustomerLevelUpProgram)
  const { credit } = program || {}
  const extLoyalty = credit
    ? { ...program, credit: { current: credit } }
    : program

  useEffect(() => {
    dispatch(fetchCustomerLevelUp())
  }, [dispatch])

  return (
    <PageContent style={{ maxWidth: '76.8rem', textAlign: 'left' }}>
      {loading === 'pending' ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {program && <LoyaltyProgram program={extLoyalty} />}
          <LevelUpConnect />
        </>
      )}
    </PageContent>
  )
}

LevelUpLoyalty.displayName = 'LevelUpLoyalty'

export default LevelUpLoyalty
