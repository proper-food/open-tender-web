import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'

import {
  Loading,
  LoyaltyProgram,
  PageContent,
  PageError,
  PageSection,
} from '../..'
import styled from '@emotion/styled'
import { selectConfig } from '../../../slices'

const LoyaltyProgamsView = styled('div')`
  & > div + div {
    margin: 3rem auto 0;
  }
`

const LoyaltyPrograms = () => {
  const dispatch = useDispatch()
  const { rewards: rewardsConfig } = useSelector(selectConfig)
  const { entities, loading, error } = useSelector(selectCustomerLoyalty)
  const isLoading = loading === 'pending'

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return (
    <>
      {error ? (
        <PageError error={error} />
      ) : entities.length ? (
        <PageSection {...rewardsConfig.loyalty}>
          <LoyaltyProgamsView>
            {entities.map((program) => {
              return (
                <LoyaltyProgram
                  key={program.name}
                  program={program}
                  isLoading={isLoading}
                />
              )
            })}
          </LoyaltyProgamsView>
        </PageSection>
      ) : (
        <PageContent>
          {isLoading ? (
            <Loading text="Retrieving your rewards..." />
          ) : (
            <p>Looks like you don't have any reward programs yet.</p>
          )}
        </PageContent>
      )}
    </>
  )
}

LoyaltyPrograms.displayName = 'LoyaltyPrograms'

export default LoyaltyPrograms
