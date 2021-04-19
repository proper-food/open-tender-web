import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { loyaltyType, formatDollars } from '@open-tender/js'
import { Box, Heading, Text } from '@open-tender/components'
import { ProgressBar, ProgressCircle } from '.'

const LoyaltyProgramView = styled(Box)`
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.maxWidth};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`

const LoyaltyProgramSummary = styled('div')`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 6rem 2.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 2.5rem;
    margin: 0 0 3rem;
  }

  & > div:first-of-type {
    flex-grow: 1;
  }
`

const LoyaltyProgramHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
  }

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const LoyaltyProgramCredit = styled('div')`
  margin: 1rem 0;

  p + p {
    margin: 0.6rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const LoyaltyProgramStatus = styled('div')`
  flex-grow: 0;
  margin: 1rem 0 0;
`

const LoyaltyProgramStatusHeader = styled('div')`
  margin: 0 0 2.5rem;

  p + p {
    margin: 0.6rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const LoyaltyProgramProgress = styled('div')`
  flex: 0 0 16rem;
  // width: 16rem;

  & > div {
    margin: 1rem auto;
  }

  p {
    text-align: center;
  }

  p:last-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  p:last-of-type {
    line-height: 1.4;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

// const tiers = [
//   {
//     level: 1,
//     threshold: 1000,
//     name: 'Green',
//     description: 'Lorem ipsum',
//   },
//   {
//     level: 2,
//     threshold: 2500,
//     name: 'Gold',
//     description: 'Lorem ipsum',
//   },
//   {
//     level: 3,
//     threshold: 5000,
//     name: 'Black',
//     description: 'Lorem ipsum',
//   },
// ]

// const status = {
//   level: 1,
//   name: 'Green',
//   progress: 1500,
// }

const makeStatus = (tiers, status, isDollars = true) => {
  if (!tiers) return null
  const highest = tiers[tiers.length - 1].threshold
  const total = highest * 1.2
  const progress = (status.progress / total) * 100
  const points = tiers.map((i) => ({
    percentage: (i.threshold / total) * 100,
    value: isDollars
      ? `${formatDollars(i.threshold, '', 0)}`
      : `${parseInt(i.threshold)}`,
  }))
  return { progress, points }
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

const LoyaltyProgram = ({ program, isLoading = false }) => {
  const {
    name,
    description,
    loyalty_type,
    spend,
    redemption,
    credit,
    remaining,
    towards,
    progress,
    tiers,
    status,
  } = program
  const currentProgress =
    progress || makeProgress(loyalty_type, spend, redemption)
  const currentCredit = credit ? parseFloat(credit.current) : 0
  const hasCredit = currentCredit > 0
  const currentStatus = tiers && status ? makeStatus(tiers, status) : null

  return (
    <LoyaltyProgramView>
      <LoyaltyProgramSummary>
        <div>
          <LoyaltyProgramHeader>
            <h2>{name}</h2>
            {description && <p>{description}</p>}
          </LoyaltyProgramHeader>
          {currentCredit ? (
            <LoyaltyProgramCredit>
              <Text color="success" bold={true} as="p">
                ${currentCredit.toFixed(2)} in credit available!
              </Text>
              <p>Apply to your next order when you checkout.</p>
            </LoyaltyProgramCredit>
          ) : (
            <LoyaltyProgramCredit>
              <Text color="primary" bold={true} as="p">
                $0.00 credit balance
              </Text>
              <p>Make progress towards your next credit with every order.</p>
            </LoyaltyProgramCredit>
          )}
        </div>
        {currentStatus && (
          <LoyaltyProgramStatus>
            <LoyaltyProgramStatusHeader>
              <p>
                You're currently at{' '}
                <Text color="primary" bold={true}>
                  {status.name}
                </Text>{' '}
                status
              </p>
              <p>
                {formatDollars(status.progress, '', 0)} spent in the last 365
                days
              </p>
            </LoyaltyProgramStatusHeader>
            <ProgressBar {...currentStatus} />
          </LoyaltyProgramStatus>
        )}
      </LoyaltyProgramSummary>
      {!!currentProgress && (
        <LoyaltyProgramProgress>
          <Heading as="p">Current Progress</Heading>
          <ProgressCircle progress={currentProgress} isLoading={isLoading} />
          {currentProgress ? (
            <p>
              {hasCredit ? "You're" : "You're"} ${remaining} away from{' '}
              {hasCredit && 'another '}
              {towards}
            </p>
          ) : (
            <p>Make your first purchase to start earning rewards!</p>
          )}
        </LoyaltyProgramProgress>
      )}
    </LoyaltyProgramView>
  )
}

LoyaltyProgram.displayName = 'LoyaltyProgram'
LoyaltyProgram.propTypes = {
  program: propTypes.object,
}

export default LoyaltyProgram
