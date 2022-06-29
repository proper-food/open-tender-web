import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectDeals } from '@open-tender/redux'

import { Deals } from '../..'

const GuestDealsView = styled.div`
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const GuestDeals = ({ has_deals }) => {
  const [hasFetched, setHasFetched] = useState(false)
  const { entities, loading } = useSelector(selectDeals)
  const hasDeals = !hasFetched || entities.length

  useEffect(() => {
    if (loading === 'pending') setHasFetched(true)
  }, [loading])

  if (!has_deals || !hasDeals) return null

  return (
    <GuestDealsView>
      <Deals />
    </GuestDealsView>
  )
}

GuestDeals.displayName = 'GuestDeals'
GuestDeals.propTypes = {
  has_deals: propTypes.bool,
}

export default GuestDeals
