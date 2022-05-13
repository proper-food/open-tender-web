import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { makeProgress, makeStatus } from '@open-tender/js'
import {
  fetchCustomerLoyalty,
  selectCustomerLoyaltyProgram,
} from '@open-tender/redux'
import { Text } from '@open-tender/components'
import { ProgressBar, ProgressCircle } from '../..'
import AccountPoints from './AccountPoints'
import Loading from '../../Loading'
import { useDispatch, useSelector } from 'react-redux'

const AccountLoyaltyProgramView = styled.div`
  margin: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
    margin: 0 0 2rem;
  }
`

const AccountLoyaltyProgramPoints = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AccountLoyaltyProgramTier = styled('div')`
  flex-grow: 1;
  padding: 0 0 0 3rem;
  text-align: right;

  p + p {
    margin: 0.6rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const AccountLoyaltyProgramCredit = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-of-type {
    flex-grow: 1;
    padding: 0 3rem 0 0;

    p + p {
      margin: 0.6rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const AccountLoyaltyProgramStatus = styled('div')`
  flex-grow: 0;
  padding: 3rem 0 3.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 3rem 0 3.5rem;
  }
`

const AccountLoyaltyProgress = styled('div')``

const AccountLoyaltyProgram = () => {
  const dispatch = useDispatch()
  const { program, loading } = useSelector(selectCustomerLoyaltyProgram)
  const hasProgram = program ? true : false
  const {
    loyalty_type,
    points,
    spend,
    redemption,
    credit,
    remaining,
    towards,
    progress,
    tiers,
    status,
  } = program || {}
  const currentProgress =
    progress || makeProgress(loyalty_type, spend, redemption)
  const currentCredit = credit ? parseFloat(credit.current) : 0
  const hasCredit = currentCredit > 0
  const currentStatus =
    tiers && status ? makeStatus(tiers, status, points) : null

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return (
    <AccountLoyaltyProgramView>
      {loading === 'pending' && !hasProgram ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : points ? (
        <AccountLoyaltyProgramPoints>
          <AccountPoints {...points} />
          {currentStatus && (
            <AccountLoyaltyProgramTier>
              {status.tier ? (
                <p>
                  You're at{' '}
                  <Text
                    color="primary"
                    bold={true}
                    style={{ color: `#${status.tier.hex_code}` }}
                  >
                    {status.tier.name}
                  </Text>{' '}
                  status
                </p>
              ) : currentStatus.progress ? (
                <p>You're making progress!</p>
              ) : null}
              <p>{currentStatus.progressMsg}</p>
            </AccountLoyaltyProgramTier>
          )}
        </AccountLoyaltyProgramPoints>
      ) : (
        <AccountLoyaltyProgramCredit>
          {currentCredit ? (
            <div>
              <Text color="primary" bold={true} as="p">
                ${currentCredit.toFixed(2)} in credit available!
              </Text>
              <p>Credit can be applied when you place your next order.</p>
            </div>
          ) : (
            <div>
              <Text color="primary" bold={true} as="p">
                $0.00 credit balance
              </Text>
              {currentProgress ? (
                <p>
                  {hasCredit ? "You're" : "You're"} ${remaining} away from{' '}
                  {hasCredit && 'another '}
                  {towards}.
                </p>
              ) : (
                <p>Make your first purchase to start earning rewards!</p>
              )}
            </div>
          )}
          <AccountLoyaltyProgress>
            <ProgressCircle
              progress={currentProgress}
              isLoading={loading === 'pending'}
            />
          </AccountLoyaltyProgress>
        </AccountLoyaltyProgramCredit>
      )}
      {currentStatus && (
        <AccountLoyaltyProgramStatus>
          <ProgressBar {...currentStatus} />
        </AccountLoyaltyProgramStatus>
      )}
    </AccountLoyaltyProgramView>
  )
}

AccountLoyaltyProgram.displayName = 'AccountLoyaltyProgram'
AccountLoyaltyProgram.propTypes = {}

export default AccountLoyaltyProgram
