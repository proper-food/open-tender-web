import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCustomerOrders } from '@open-tender/redux'

import { Loading, OrderCard } from '../..'
import { selectContent } from '../../../slices'
import AccountSection from './AccountSection'
import AccountSectionHeader from './AccountSectionHeader'
import { isBrowser } from 'react-device-detect'

const AccountOrdersView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const AccountOrdersContainer = styled('div')`
  margin: -0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0;
  }
`

const AccountOrdersOrder = styled('div')`
  width: 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 90%;
    padding: 0.5rem 1rem 0.5rem 0;
  }
`

const AccountOrders = () => {
  const { entities: orders, loading, error } = useSelector(selectCustomerOrders)
  const { account } = useSelector(selectContent)
  const { title, empty } = account.recentOrders
  const hasOrders = orders.length > 0 && !error
  const filtered = orders
    .map((i) => ({ ...i, key: i.order_id }))
    .filter((i) => i.order_type !== 'MERCH')
  const count = isBrowser ? 2 : 5
  const displayed = filtered.slice(0, count)
  const isMore = filtered.length > displayed.length
  const isLoading = loading === 'pending'

  return (
    <AccountSection>
      <AccountSectionHeader title={title} to={isMore ? '/orders' : null} />
      {hasOrders ? (
        <AccountOrdersView>
          <AccountOrdersContainer>
            {displayed.map((order) => (
              <AccountOrdersOrder key={order.order_id}>
                <OrderCard order={order} />
              </AccountOrdersOrder>
            ))}
          </AccountOrdersContainer>
        </AccountOrdersView>
      ) : isLoading ? (
        <Loading text="Retrieving your recent orders..." />
      ) : (
        <div>
          <p>{empty}</p>
        </div>
      )}
    </AccountSection>
  )
}

AccountOrders.displayName = 'AccountOrders'

export default AccountOrders
