import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectDeals } from '@open-tender/redux'

import { Deals } from '../..'

const AccountDealsView = styled.div`
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.margin} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0 0;
  }
`

const AccountDeals = ({ has_deals }) => {
  const [hasFetched, setHasFetched] = useState(false)
  const { entities, loading } = useSelector(selectDeals)
  const hasDeals = !hasFetched || entities.length

  useEffect(() => {
    if (loading === 'pending') setHasFetched(true)
  }, [loading])

  if (!has_deals || !hasDeals) return null

  return (
    <AccountDealsView>
      <Deals />
    </AccountDealsView>
  )
}

AccountDeals.displayName = 'AccountDeals'
AccountDeals.propTypes = {
  has_deals: propTypes.bool,
}

export default AccountDeals
