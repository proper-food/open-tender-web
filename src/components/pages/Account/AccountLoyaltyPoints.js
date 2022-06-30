import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { makeProgress, makeStatus, formatQuantity } from '@open-tender/js'
import { Headline, Heading, Preface, Text } from '@open-tender/components'
import { PointsProgress, SeeMoreLink } from '../..'
import Loading from '../../Loading'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import iconMap from '../../iconMap'

const AccountLoyaltyPointsView = styled.div``

const AccountLoyaltyPointsTitle = styled.div`
  margin: 0 0 1.5rem;
  text-align: left;
  font-size: ${(props) => props.theme.fonts.sizes.big};
`

const AccountPointsView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  // background-color: pink;
`

const AccountPointsCount = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  // background-color: palegreen;
  margin-bottom: -0.2 rem;

  span {
    display: block;
    line-height: 1;
  }
`

const AccountPointsLabel = styled(Preface)`
  margin: 0 0 0.3rem 0.6rem;
`

const AccountPoints = ({ points }) => {
  return (
    <AccountPointsView>
      <AccountPointsCount>
        <Headline size="h1">{formatQuantity(400)}</Headline>
        <AccountPointsLabel size="xSmall">Rewards Points</AccountPointsLabel>
      </AccountPointsCount>
      <SeeMoreLink text="See Details" to="/loyalty" />
    </AccountPointsView>
  )
}

const AccountLoyaltyPoints = ({ program }) => {
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
  const currentStatus =
    tiers && status ? makeStatus(tiers, status, points) : null

  return (
    <AccountLoyaltyPointsView>
      <AccountLoyaltyPointsTitle>
        <Heading as="p">Your rewards...</Heading>
      </AccountLoyaltyPointsTitle>
      <AccountPoints {...points} />
      <PointsProgress {...currentStatus} />
    </AccountLoyaltyPointsView>
  )
}

AccountLoyaltyPoints.displayName = 'AccountLoyaltyPoints'
AccountLoyaltyPoints.propTypes = {
  program: propTypes.object,
}

export default AccountLoyaltyPoints
