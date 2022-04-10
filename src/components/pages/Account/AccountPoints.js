import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatQuantity } from '@open-tender/js'
import { Heading } from '@open-tender/components'

import iconMap from '../../iconMap'

const AccountPointsView = styled('div')`
  width: 100%;
`

const AccountPointsCount = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  p {
    display: block;
    margin: 0 0 0 -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h1};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h2};
    }
  }

  span {
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0 0 0 0.5rem;
    line-height: 0;
    color: ${(props) => props.theme.colors.primary};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0 0 0 0.3rem;
      width: 2.2rem;
      height: 2.2rem;
    }

    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const AccountPointsBalance = styled.p`
  margin: 0.3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const AccountPoints = ({ name, points }) => {
  return (
    <AccountPointsView>
      <AccountPointsCount>
        <Heading as="p">{formatQuantity(points)}</Heading>
        <span>{iconMap.Star}</span>
      </AccountPointsCount>
      <AccountPointsBalance>{name} Balance</AccountPointsBalance>
    </AccountPointsView>
  )
}

AccountPoints.displayName = 'AccountPoints'
AccountPoints.propTypes = {
  name: propTypes.string,
  points: propTypes.number,
}

export default AccountPoints
