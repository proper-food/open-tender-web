import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { loyaltyType, formatDollars, formatQuantity } from '@open-tender/js'
import { Text } from '@open-tender/components'
import { ProgressBar, ProgressCircle } from '../..'
import AccountPoints from './AccountPoints'

const AccountLoyaltyProgramView = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.maxWidth};
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

const makeStatus = (tiers, status, points) => {
  if (!tiers) return null
  const highest = tiers[tiers.length - 1].threshold
  const total = highest * 1.2
  const progress = Math.min((status.progress / total) * 100, 100)
  const progressTiers = tiers.map((i) => ({
    ...i,
    points,
    percentage: (i.threshold / total) * 100,
    color: `#${i.hex_code}`,
    value: !points
      ? `${formatDollars(i.threshold, '', 0)}`
      : `${formatQuantity(i.threshold)}`,
  }))
  const daysMsg =
    status.days === 7300 ? 'all-time' : `in last ${status.days} days`
  const progressAmt = !points
    ? formatDollars(status.progress, '', 0)
    : formatQuantity(status.progress)
  const progressMsg = !points
    ? `${progressAmt} spent ${daysMsg}`
    : `${progressAmt} ${points.name.toLowerCase()} earned ${daysMsg}`
  return { progress, progressMsg, tiers: progressTiers }
}

const makeProgress = (loyalty_type, spend, redemption) => {
  if (!spend || !redemption || !loyalty_type) return null
  const currentSpend = parseFloat(spend.current)
  const threshold = parseFloat(redemption.threshold)
  const progress =
    loyalty_type === loyaltyType.CREDIT
      ? parseInt((currentSpend / threshold) * 100)
      : null
  return progress
}

const AccountLoyaltyProgram = ({ program, isLoading = false }) => {
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

  return (
    <AccountLoyaltyProgramView>
      {points ? (
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
            <ProgressCircle progress={currentProgress} isLoading={isLoading} />
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
AccountLoyaltyProgram.propTypes = {
  program: propTypes.object,
}

export default AccountLoyaltyProgram
